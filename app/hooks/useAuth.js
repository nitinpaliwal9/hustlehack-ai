'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { supabase } from '../../lib/supabaseClient'

// Custom hook for authentication
export function useAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)
  const [criticalError, setCriticalError] = useState(null); // For fatal config/network errors

  // Initialize auth state
  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      setError('Supabase not configured. Please add environment variables.')
      setCriticalError('Supabase is not configured. Please check your environment variables.');
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setError(error.message)
        } else {
          setUser(session?.user || null)
          setIsAuthenticated(!!session?.user)
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        setUser(session?.user || null)
        setIsAuthenticated(!!session?.user)
        setIsLoading(false)
        
        if (event === 'SIGNED_IN' && session?.user) {
          // Check user profile status
          const profileStatus = await checkUserProfile(session.user)
          // If checkUserProfile returns 'error', set critical error and do not redirect
          if (profileStatus === 'error') {
            setCriticalError('Could not connect to the database. Please try again later.');
            return;
          }
          // If profile is incomplete, redirect to complete-profile (user already exists from trigger)
          if (profileStatus === 'incomplete') {
            if (typeof window !== 'undefined') {
              // Don't upsert here - let the profile completion form handle it
              console.log('📝 Redirecting to profile completion');
              window.location.href = '/complete-profile'
            }
          } else if (profileStatus === 'complete') {
            console.log('✅ Profile complete, redirecting to dashboard')
            if (typeof window !== 'undefined') {
              window.location.href = '/dashboard'
            }
          }
        }
        
        // Update UI for authentication state changes
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setIsAuthenticated(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Check user profile status
  const checkUserProfile = useCallback(async (user) => {
    if (!supabase || !user) {
      console.warn('Supabase not initialized or user not provided')
      // Do not throw, just return error
      return 'error'
    }

    try {
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('id, name, email, role, profile_completed, phone')
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn('Error checking user profile:', error)
        // If user doesn't exist (PGRST116), they need to complete profile
        if (error.code === 'PGRST116') {
          console.log('📝 User profile missing - needs completion')
          return 'incomplete'
        }
        // For other errors, assume incomplete to be safe
        return 'incomplete'
      }

      // Check if profile is truly complete
      const isComplete = existingUser && 
        existingUser.profile_completed === true && 
        existingUser.name && 
        existingUser.role && 
        existingUser.phone

      if (isComplete) {
        console.log('✅ User profile complete')
        return 'complete'
      } else {
        console.log('📝 User profile incomplete')
        return 'incomplete'
      }
    } catch (error) {
      console.error('Error in checkUserProfile:', error)
      // If it's a network/config error, return 'error' so the UI can handle it
      if (error.message && error.message.includes('Failed to fetch')) {
        return 'error';
      }
      return 'incomplete' // Default to incomplete for safety
    }
  }, [])

  // Sign up with email
  const signUp = useCallback(async (email, password, userData = {}) => {
    if (!supabase) throw new Error('Supabase not initialized')

    setIsLoading(true)
    setError(null)

    try {
      // Check if user already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .limit(1)

      if (existingUsers && existingUsers.length > 0) {
        throw new Error('This email is already registered. Please sign in instead.')
      }

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name || '',
            role: userData.role || '',
            timestamp: new Date().toISOString(),
            ...userData
          }
        }
      })

      if (error) throw error

      // Show success notification
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('🎉 Account created successfully! Please check your email to verify your account.', 'success')
      }

      return { user: data.user, session: data.session }
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ ${error.message}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sign in with email
  const signIn = useCallback(async (email, password) => {
    if (!supabase) {
      setCriticalError('Supabase is not configured. Please check your environment variables.');
      throw new Error('Supabase not initialized')
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Get user profile
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      const userName = userProfile?.name || data.user.user_metadata?.name || data.user.email.split('@')[0]

      // Removed welcome notification to prevent repeated messages

      return { user: data.user, session: data.session, profile: userProfile }
    } catch (error) {
      setError(error.message)
      
      let errorMessage = error.message
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please try again.'
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and confirm your account first.'
      }

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ ${errorMessage}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('⚠️ Authentication not configured. Please set up Supabase.', 'warning')
      }
      throw new Error('Supabase not initialized')
    }

    setIsLoading(true)
    setError(null)

    try {
      // Debug information for production troubleshooting
      console.log('🔍 Debug Info:')
      console.log('- Current origin:', window.location.origin)
      console.log('- Supabase URL:', supabase.auth.signInWithOAuth)
      console.log('- Environment:', process.env.NODE_ENV)
      
      // Check if we're on production and show specific guidance
      const isProduction = window.location.origin.includes('hustlehackai.in')
      const redirectUrl = `${window.location.origin}/auth/callback`
      
      console.log('- Is Production:', isProduction)
      console.log('- Redirect URL:', redirectUrl)
      
      // Show loading notification
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('🔄 Redirecting to Google...', 'info', 2000)
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (error) {
        console.error('❌ Supabase OAuth Error:', error)
        throw error
      }

      console.log('✅ Google OAuth flow initiated successfully', data)
      return data
    } catch (error) {
      console.error('❌ Google Sign-in Error Details:')
      console.error('- Error message:', error.message)
      console.error('- Error code:', error.code)
      console.error('- Full error:', error)
      
      setError(error.message)
      
      // Handle specific error cases with better messaging
      let errorMessage = 'Google sign-in failed. Please try again.'
      
      if (error.message.includes('popup')) {
        errorMessage = 'Please allow popups for this site and try again.'
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.'
      } else if (error.message.includes('oauth')) {
        errorMessage = 'OAuth configuration error. Please contact support.'
      } else if (error.message.includes('redirect')) {
        errorMessage = 'Redirect configuration error. Please contact support.'
      }
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ ${errorMessage}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    if (!supabase) throw new Error('Supabase not initialized')

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('✅ Signed out successfully', 'success')
      }

      // Optional: Reload page to reset state
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('❌ Sign out failed', 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Complete user profile (first time setup)
  const completeProfile = useCallback(async (profileData) => {
    if (!supabase || !user) throw new Error('User not authenticated')

    // Add this check to ensure user.id is present
    if (!user.id) {
      throw new Error('User ID is missing. Please sign in again before completing your profile.');
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log('🔄 Starting profile completion for user:', user.id)
      console.log('📋 Profile data:', profileData)
      console.log('🔐 User auth details:', {
        id: user.id,
        email: user.email,
        email_confirmed_at: user.email_confirmed_at,
        role: user.role
      })

      // Check if user exists in database first
      console.log('🔍 Checking if user exists in database...')
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id, email, name, role, profile_completed')
        .eq('id', user.id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error checking existing user:', checkError)
        console.error('❌ Error details:', {
          code: checkError.code,
          message: checkError.message,
          details: checkError.details,
          hint: checkError.hint
        })
        
        // Check for RLS policy violations
        if (checkError.message?.includes('permission denied') || 
            checkError.message?.includes('insufficient privileges') ||
            checkError.code === '42501') {
          throw new Error('Database permission denied. Please contact support if this persists.')
        }
        
        throw checkError
      }

      if (existingUser) {
        console.log('👤 Found existing user:', existingUser)
      } else {
        console.log('🆕 New user - will be created')
      }

      // Prepare upsert data
      const upsertData = {
        id: user.id,
        email: user.email,
        name: profileData.name,
        phone: profileData.phone,
        role: profileData.role,
        profile_completed: true,
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Add created_at only for new users
      if (!existingUser) {
        upsertData.created_at = new Date().toISOString()
      }

      console.log('💾 Upserting user profile with data:', upsertData)

      // Add timeout to prevent infinite hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile completion timed out after 30 seconds')), 30000)
      })

      const upsertPromise = supabase
        .from('users')
        .upsert(upsertData)
        .select()

      const { data: insertData, error: insertError } = await Promise.race([
        upsertPromise,
        timeoutPromise
      ])

      if (insertError) {
        console.error('❌ Profile completion error:', insertError)
        console.error('❌ Error details:', {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint
        })
        
        // Enhanced error handling for common issues
        if (insertError.message?.includes('permission denied') || 
            insertError.message?.includes('insufficient privileges') ||
            insertError.code === '42501') {
          throw new Error('Database permission denied. Row-Level Security may be blocking this operation.')
        }
        
        if (insertError.message?.includes('violates row-level security policy')) {
          throw new Error('Profile update blocked by security policy. Please contact support.')
        }
        
        if (insertError.message?.includes('duplicate key')) {
          throw new Error('User profile already exists. Please refresh the page and try again.')
        }
        
        if (insertError.message?.includes('timeout') || insertError.code === '57014') {
          throw new Error('Database operation timed out. Please check your internet connection and try again.')
        }
        
        throw insertError
      }

      console.log('✅ Profile completion successful:', insertData)

      // Update auth user metadata (non-blocking)
      try {
        console.log('🔄 Updating auth user metadata...')
        const { data: authData, error: authError } = await supabase.auth.updateUser({
          data: {
            name: profileData.name,
            phone: profileData.phone,
            role: profileData.role
          }
        })

        if (authError) {
          console.warn('⚠️ Auth metadata update error (non-critical):', authError)
        } else {
          console.log('✅ Auth metadata updated successfully')
        }
      } catch (authError) {
        console.warn('⚠️ Auth metadata update failed (non-critical):', authError)
      }

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('✅ Profile completed successfully!', 'success')
      }

      // Check if the user is among the first 100 signups
      const eligible = await isUserInFirst100(user.id);
      if (eligible) {
        const success = await upsertSubscriptionForFirst100(user.id);
        if (success) {
          // Show congratulatory popup, etc.
        }
      }

      return { profileData: insertData }
    } catch (error) {
      console.error('❌ Complete profile error:', error)
      console.error('❌ Error stack:', error.stack)
      
      setError(error.message)
      
      let userMessage = error.message
      if (error.message.includes('not authenticated')) {
        userMessage = 'Please sign in again and try completing your profile.'
      } else if (error.message.includes('timed out')) {
        userMessage = 'The operation timed out. Please check your internet connection and try again.'
      } else if (error.message.includes('permission denied')) {
        userMessage = 'Permission denied. Please contact support if this issue persists.'
      }
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ Failed to complete profile: ${userMessage}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    if (!supabase || !user) throw new Error('User not authenticated')

    setIsLoading(true)
    setError(null)

    try {
      // Update auth user metadata
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: updates
      })

      if (authError) throw authError

      // Update user profile in database
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()

      if (profileError) throw profileError

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('✅ Profile updated successfully', 'success')
      }

      return { authData, profileData }
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ Failed to update profile: ${error.message}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Reset password
  const resetPassword = useCallback(async (email) => {
    if (!supabase) throw new Error('Supabase not initialized')

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) throw error

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('📧 Password reset email sent! Check your inbox.', 'success')
      }
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ Failed to send reset email: ${error.message}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update password (for reset flow)
  const updatePassword = useCallback(async (newPassword) => {
    if (!supabase) throw new Error('Supabase not initialized')

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('✅ Password updated successfully!', 'success')
      }

      return { success: true }
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ Failed to update password: ${error.message}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Enable 2FA
  const enable2FA = useCallback(async () => {
    if (!supabase || !user) throw new Error('User not authenticated')

    setIsLoading(true)
    setError(null)

    try {
      // Generate TOTP secret
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        issuer: 'HustleHack AI',
        friendlyName: user.email
      })

      if (error) throw error

      return {
        qrCode: data.qr_code,
        secret: data.secret,
        factorId: data.id
      }
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ Failed to enable 2FA: ${error.message}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [user])

  // Verify 2FA setup
  const verify2FASetup = useCallback(async (factorId, code) => {
    if (!supabase) throw new Error('Supabase not initialized')

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: factorId,
        code
      })

      if (error) throw error

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('✅ 2FA enabled successfully!', 'success')
      }

      return { success: true }
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ Invalid code. Please try again.`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Disable 2FA
  const disable2FA = useCallback(async (factorId) => {
    if (!supabase) throw new Error('Supabase not initialized')

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.mfa.unenroll({
        factorId
      })

      if (error) throw error

      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('✅ 2FA disabled successfully!', 'success')
      }

      return { success: true }
    } catch (error) {
      setError(error.message)
      
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`❌ Failed to disable 2FA: ${error.message}`, 'error')
      }
      
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get user's 2FA factors
  const get2FAFactors = useCallback(async () => {
    if (!supabase || !user) return []

    try {
      const { data, error } = await supabase.auth.mfa.listFactors()
      
      if (error) throw error
      
      return data.totp || []
    } catch (error) {
      console.error('Error getting 2FA factors:', error)
      return []
    }
  }, [user])

  // Get user profile
  const getUserProfile = useCallback(async () => {
    if (!supabase || !user) return null

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserProfile:', error)
      return null
    }
  }, [user])

  // Check network status
  const checkNetworkStatus = useCallback(() => {
    if (!navigator.onLine) {
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('⚠️ You are offline. Some features may not work.', 'warning', 5000)
      }
      return false
    }
    return true
  }, [])

  async function upsertSubscriptionForFirst100(userId) {
    // Set expiry to 30 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const { data, error } = await supabase
      .from('subscriptions')
      .upsert([
        {
          user_id: userId,
          plan_name: 'creator',
          expiry_date: expiryDate.toISOString(), // Use expiryDate if your column is timestamp without timezone
          // created_at and updated_at will auto-populate
        }
      ], { onConflict: ['user_id'] }); // Ensures only one row per user

    if (error) {
      console.error('Error upserting subscription:', error);
      // Handle error (show notification, etc.)
      return false;
    }
    return true;
  }

  async function isUserInFirst100(userId) {
    // Fetch the user's created_at timestamp
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('created_at')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user:', userError);
      return false;
    }

    // Count users who signed up before or at the same time
    const { count, error: countError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .lte('created_at', userData.created_at);

    if (countError) {
      console.error('Error counting users:', countError);
      return false;
    }

    return count <= 100;
  }

  return {
    // State
    user,
    isLoading,
    isAuthenticated,
    error,
    criticalError,
    
    // Actions
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    completeProfile,
    updateProfile,
    resetPassword,
    updatePassword,
    getUserProfile,
    checkUserProfile,
    checkNetworkStatus,
    
    // 2FA Functions
    enable2FA,
    verify2FASetup,
    disable2FA,
    get2FAFactors,
    
    // First 100 Functions
    isUserInFirst100,
    upsertSubscriptionForFirst100,
    
    // Utilities
    clearError: () => setError(null),
    clearCriticalError: () => setCriticalError(null),
    supabase
  }
}

// Custom hook to get the user's current plan from subscriptions (with fallback)
export function useUserPlan(userId) {
  const [plan, setPlan] = useState('starter');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      setLoading(true);
      if (userId) {
        // Try subscriptions table first
        let { data, error } = await supabase
          .from('subscriptions')
          .select('plan_name')
          .eq('user_id', userId)
          .single();
        if (!error && data?.plan_name) {
          setPlan(data.plan_name);
        } else {
          // fallback to users table
          let { data: userData } = await supabase
            .from('users')
            .select('plan')
            .eq('id', userId)
            .single();
          if (userData?.plan) setPlan(userData.plan);
        }
      }
      setLoading(false);
    }
    fetchPlan();
  }, [userId]);

  return { plan, loading };
}

// Higher-order component for protected routes
export function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading, user } = useAuth()

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      // Redirect to login or show login modal
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
      return null
    }

    return <WrappedComponent {...props} user={user} />
  }
}

// Create AuthContext
export const AuthContext = createContext(null)

// Auth context provider component
export function AuthProvider({ children }) {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// Optional: helper hook for consuming context
export function useAuthContext() {
  return useContext(AuthContext)
}
