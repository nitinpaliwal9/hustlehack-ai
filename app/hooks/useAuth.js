'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase = null

// Initialize Supabase client only on client side
if (typeof window !== 'undefined' && supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('✅ Supabase client initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error)
  }
} else if (typeof window !== 'undefined') {
  console.warn('⚠️ Supabase environment variables not found. Please configure .env.local file.')
}

// Custom hook for authentication
export function useAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  // Initialize auth state
  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      setError('Supabase not configured. Please add environment variables.')
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
          await checkUserProfile(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Check user profile status
  const checkUserProfile = async (user) => {
    try {
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('id, name, email, role')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking user profile:', error)
        return 'error'
      }

      if (existingUser) {
        console.log('✅ User profile exists')
        return 'complete'
      } else {
        console.log('📝 User profile missing')
        return 'incomplete'
      }
    } catch (error) {
      console.error('Error in checkUserProfile:', error)
      return 'error'
    }
  }

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
    if (!supabase) throw new Error('Supabase not initialized')

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

      // Show success notification
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification(`🎉 Welcome back, ${userName}!`, 'success')
      }

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
      // Show loading notification
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('🔄 Redirecting to Google...', 'info', 2000)
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (error) throw error

      console.log('✅ Google OAuth flow initiated successfully')
      return data
    } catch (error) {
      setError(error.message)
      
      // Handle specific error cases
      let errorMessage = 'Failed to initiate Google login. Please try again.'
      
      if (error.message.includes('popup')) {
        errorMessage = 'Please allow popups for this site and try again.'
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.'
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

  return {
    // State
    user,
    isLoading,
    isAuthenticated,
    error,
    
    // Actions
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    resetPassword,
    getUserProfile,
    checkUserProfile,
    checkNetworkStatus,
    
    // Utilities
    clearError: () => setError(null),
    supabase
  }
}

// Export Supabase client for direct use in components
export { supabase }

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

// Auth context provider component
export function AuthProvider({ children }) {
  const auth = useAuth()

  return (
    <div>
      {children}
    </div>
  )
}
