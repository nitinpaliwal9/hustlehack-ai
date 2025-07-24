'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Briefcase, CheckCircle, AlertCircle, ArrowRight, Loader, UserPlus, Shield, Zap } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient';
import './complete-profile.css';

// Helper for phone validation (international)
function validateInternationalPhone(value) {
  // Simple E.164 regex: +[country][number], min 8, max 15 digits
  return /^\+\d{8,15}$/.test(value.replace(/\s/g, ''));
}

export default function CompleteProfileClient() {
  const { user, isLoading, isAuthenticated, completeProfile, checkUserProfile, isUserInFirst100, upsertSubscriptionForFirst100 } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+91 ',
    role: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [profileCheckError, setProfileCheckError] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  // Add error state for profile submission
  const [submitError, setSubmitError] = useState('');

  // Auto-save and restore form data
  useEffect(() => {
    // Restore from localStorage
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('profileFormData');
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    }
  }, []);
  useEffect(() => {
    // Auto-save to localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('profileFormData', JSON.stringify(formData));
    }
  }, [formData]);

  // Cleanup effect to clear loading state on unmount
  useEffect(() => {
    return () => {
      setIsSubmitting(false);
      // Clear any pending timeouts
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('profileFormData');
      }
    };
  }, []);

  // Debug: Check environment variables (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Environment check:', {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseClient: !!supabase
      });
    }
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !isAuthenticated) {
      console.log('User not authenticated, redirecting to home')
      router.push('/')
      return
    }

    // Pre-fill email if user is authenticated
    if (user && user.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }))
    }

    // Check if profile is already complete
    if (user && !profileCheckError) {
      checkUserProfile(user).then(status => {
        if (status === 'complete') {
          console.log('Profile already complete, redirecting to contact form')
          router.push('/contact')
        } else if (status === 'error') {
          setProfileCheckError(true);
        }
      })
    }
  }, [user, isLoading, isAuthenticated, router, checkUserProfile, profileCheckError])

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address'
        return ''
      case 'phone':
        if (!value.trim()) return 'Phone number is required'
        if (!validateInternationalPhone(value)) return 'Please enter a valid international phone number (e.g. +1234567890)'
        return ''
      case 'role':
        if (!value) return 'Please select your role'
        return ''
      default:
        return ''
    }
  }

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });
    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setIsSubmitting(false); // Ensure loading state is cleared
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setFormErrors({});

    try {
      // Check if Supabase is available
      if (!supabase) {
        setSubmitError('Supabase client not initialized. Please check your environment variables.');
        setIsSubmitting(false);
        return;
      }

      // Check Supabase connectivity
      const isHealthy = await checkSupabaseHealth();
      if (!isHealthy) {
        setSubmitError('Unable to connect to database. Please check your connection and try again.');
        setIsSubmitting(false);
        return;
      }

      // Verify user is authenticated
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      if (authError || !currentUser) {
        setSubmitError('Authentication failed. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      console.log('DEBUG: Submitting minimal profile update to Supabase:', {
        id: currentUser?.id,
        profile_completed: true
      });

      // Add timeout protection (10s for fast feedback)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out. Please try again.')), 10000)
      );

      // Minimal update for debugging
      const profileUpdatePromise = supabase
        .from('users')
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          profile_completed: true
        })
        .eq('id', currentUser.id)
        .select();

      const { data, error: updateError } = await Promise.race([
        profileUpdatePromise,
        timeoutPromise
      ]);

      console.log('DEBUG: Minimal update result:', { data, updateError });
      if (updateError) {
        setSubmitError('Update error: ' + (updateError.message || 'Unknown error'));
        setIsSubmitting(false);
        return;
      }
      if (!data || data.length === 0) {
        setSubmitError('Profile update failed. No data returned.');
        setIsSubmitting(false);
        return;
      }
      console.log('DEBUG: Profile update successful:', data[0]);

      setIsSubmitting(false);
      setIsSuccess(true);
      // Refetch user row and check profile completion before redirecting
      try {
        const { data: refetchedUser, error: refetchError } = await supabase
          .from('users')
          .select('id, name, email, role, profile_completed, phone')
          .eq('id', currentUser.id)
          .single();
        console.log('[Profile Refetch] User:', refetchedUser, 'Error:', refetchError);
        if (refetchError || !refetchedUser) {
          setSubmitError('Could not verify profile completion. Please refresh and try again.');
          setIsSuccess(false);
          return;
        }
        // Check all required fields
        const isComplete = refetchedUser.profile_completed === true &&
          !!refetchedUser.name &&
          !!refetchedUser.role &&
          !!refetchedUser.phone &&
          refetchedUser.name.trim().length > 1 &&
          refetchedUser.role.trim().length > 0 &&
          refetchedUser.phone.trim().length > 7;
        console.log('[Profile Refetch] Completion status:', isComplete);
        if (isComplete) {
          setTimeout(() => {
            router.push('/dashboard');
          }, 1200);
        } else {
          setSubmitError('Profile not fully complete after update. Please check all fields and try again.');
          setIsSuccess(false);
        }
      } catch (err) {
        setSubmitError('Error verifying profile completion. Please refresh and try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('DEBUG: Profile completion failed:', error);
      setSubmitError(error.message || 'Profile completion failed. Please try again.');
      setIsSubmitting(false);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Add health check for Supabase connectivity
  const checkSupabaseHealth = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('❌ Supabase health check failed:', error);
        return false;
      }
      
      console.log('✅ Supabase health check passed');
      return true;
    } catch (error) {
      console.error('❌ Supabase health check error:', error);
      return false;
    }
  };

  // Add retry mechanism for profile completion
  const retryProfileUpdate = async (updateData, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Profile update attempt ${attempt}/${maxRetries}`);
        
        const { data, error } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', user.id)
          .select();
        
        if (error) {
          console.error(`Attempt ${attempt} failed:`, error);
          if (attempt === maxRetries) throw error;
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
        
        console.log(`✅ Profile update successful on attempt ${attempt}`);
        return { data, error: null };
      } catch (error) {
        if (attempt === maxRetries) throw error;
        console.warn(`Attempt ${attempt} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  };

  // Real-time validation for each field
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'phone') {
      if (!value.startsWith('+91 ')) {
        processedValue = '+91 ' + value.replace(/[^0-9]/g, '');
      } else {
        const phoneDigits = value.slice(4).replace(/\D/g, '');
        const limitedDigits = phoneDigits.slice(0, 10);
        processedValue = '+91 ' + limitedDigits;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    // Real-time validation
    const error = validateField(name, processedValue);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocusedField(null);
    // Validate field on blur
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fade-in p-4">
        <div className="bg-gradient-to-br from-[#1a1333] via-[#232946] to-[#0f172a] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md md:max-w-lg w-full text-center border-2 sm:border-4 border-[#7F5AF0] animate-pop-in animate-glow-border overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce shadow-xl border-2 sm:border-4 border-green-400 animate-glow">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-lg animate-fade-in-up leading-tight">Profile Completed Successfully!</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 animate-fade-in-up delay-100 leading-relaxed">Welcome to HustleHack AI! 🚀</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 animate-fade-in-up delay-200">Redirecting you to get started...</p>
            <div className="mt-6 sm:mt-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 sm:border-4 border-[#7F5AF0] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fade-in p-4">
        <div className="bg-gradient-to-br from-[#1a1333] via-[#232946] to-[#0f172a] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md md:max-w-lg w-full text-center border-2 sm:border-4 border-[#7F5AF0] animate-pop-in animate-glow-border overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce shadow-xl border-2 sm:border-4 border-[#FFE27A] animate-glow">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 sm:border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-lg animate-fade-in-up leading-tight">Loading...</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 animate-fade-in-up delay-100 leading-relaxed">Please wait while we prepare your profile</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fade-in p-4">
        <div className="bg-gradient-to-br from-[#1a1333] via-[#232946] to-[#0f172a] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md md:max-w-lg w-full text-center border-2 sm:border-4 border-red-500 animate-pop-in animate-glow-border overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce shadow-xl border-2 sm:border-4 border-red-400 animate-glow">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-lg animate-fade-in-up leading-tight">Access Denied</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 animate-fade-in-up delay-100 leading-relaxed">You need to be logged in to complete your profile.</p>
            <button
              onClick={() => router.push('/')}
              className="w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold text-sm sm:text-base md:text-lg shadow-xl hover:from-[#6D4DC6] hover:to-[#00E6B3] transition-all duration-300 animate-fade-in-up delay-200"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (profileCheckError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fade-in p-4">
        <div className="bg-gradient-to-br from-[#1a1333] via-[#232946] to-[#0f172a] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md md:max-w-lg w-full text-center border-2 sm:border-4 border-red-500 animate-pop-in animate-glow-border overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce shadow-xl border-2 sm:border-4 border-red-400 animate-glow">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-lg animate-fade-in-up leading-tight">Connection Error</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 animate-fade-in-up delay-100 leading-relaxed">We couldn't connect to our database. Please check your internet connection or try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold text-sm sm:text-base md:text-lg shadow-xl hover:from-[#6D4DC6] hover:to-[#00E6B3] transition-all duration-300 animate-fade-in-up delay-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showCongrats) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2">
        <div className="bg-gradient-to-br from-[#7F5AF0] via-[#232946] to-[#00FFC2] rounded-3xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-md w-full text-center animate-fade-in">
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-3 sm:mb-4 animate-bounce">
              <UserPlus size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-base sm:text-lg text-[#FFD700] font-semibold mb-2">You are among the first 100 users!</p>
            <p className="text-gray-200 mb-4 text-sm sm:text-base">You’re getting <span className="font-bold text-[#00FFC2]">Creator Mode</span> access for your first month. Enjoy all premium features and let’s build something amazing together!</p>
            <button
              className="mt-2 sm:mt-4 bg-[#7F5AF0] hover:bg-[#6D4DC6] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg shadow-lg w-full"
              onClick={() => { setShowCongrats(false); router.push('/dashboard'); }}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="complete-profile-container">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 pt-28">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-full mb-8">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Complete Your Profile
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Just a few details to get you started on your HustleHack AI journey
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col sm:flex-row items-center w-full max-w-xs sm:max-w-none">
            {/* Step 1 */}
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <span className="ml-2 text-sm text-gray-300 truncate">Sign Up</span>
            </div>
            {/* Connector */}
            <div className="h-8 w-0.5 bg-[#7F5AF0] sm:h-0.5 sm:w-12 sm:bg-[#7F5AF0] my-2 sm:my-0 sm:mx-3"></div>
            {/* Step 2 */}
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <span className="ml-2 text-sm text-[#7F5AF0] font-medium truncate">Complete Profile</span>
            </div>
            {/* Connector */}
            <div className="h-8 w-0.5 bg-gray-600 sm:h-0.5 sm:w-12 sm:bg-gray-600 my-2 sm:my-0 sm:mx-3"></div>
            {/* Step 3 */}
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-sm font-bold">3</div>
              <span className="ml-2 text-sm text-gray-400 truncate">Get Started</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
          <div
            className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100}%` }}
            aria-valuenow={(Object.values(formData).filter(Boolean).length / Object.keys(formData).length) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          ></div>
        </div>

        {/* Main Form Container */}
        <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
            <p className="text-white/90">This helps us personalize your experience</p>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            {submitError && <div className="text-red-500 text-sm mb-4 text-center">{submitError}</div>}
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-4">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`w-5 h-5 transition-colors ${
                      focusedField === 'name' ? 'text-[#7F5AF0]' : 'text-gray-500'
                    }`} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 ${
                      formErrors.name 
                        ? 'border-red-500 focus:border-red-500' 
                        : focusedField === 'name'
                        ? 'border-[#7F5AF0] shadow-lg shadow-[#7F5AF0]/20'
                        : 'border-gray-600 hover:border-gray-500'
                    } focus:ring-0 focus:outline-none`}
                    placeholder="Enter your full name"
                    required
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    autoComplete="name"
                  />
                </div>
                {formErrors.name && (
                  <div className="mt-3 flex items-center text-red-600" id="name-error">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">{formErrors.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-4">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 ${
                      formErrors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : focusedField === 'email'
                        ? 'border-[#7F5AF0] shadow-lg shadow-[#7F5AF0]/20'
                        : 'border-gray-600 hover:border-gray-500'
                    } focus:ring-0 focus:outline-none`}
                    placeholder="Enter your email address"
                    required
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-400 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Email verified
                </p>
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-4">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className={`w-5 h-5 transition-colors ${
                      focusedField === 'phone' ? 'text-[#7F5AF0]' : 'text-gray-500'
                    }`} />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 ${
                      formErrors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : focusedField === 'phone'
                        ? 'border-[#7F5AF0] shadow-lg shadow-[#7F5AF0]/20'
                        : 'border-gray-600 hover:border-gray-500'
                    } focus:ring-0 focus:outline-none`}
                    placeholder="e.g. +1234567890"
                    required
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                    autoComplete="tel"
                  />
                </div>
                {formErrors.phone && (
                  <div className="mt-3 flex items-center text-red-600" id="phone-error">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">{formErrors.phone}</span>
                  </div>
                )}
              </div>

              {/* Role Field */}
              <div className="relative">
                <label htmlFor="role" className="block text-sm font-semibold text-gray-200 mb-4">
                  Your Role *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase className={`w-5 h-5 transition-colors ${
                      focusedField === 'role' ? 'text-[#7F5AF0]' : 'text-gray-500'
                    }`} />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    onFocus={() => handleFocus('role')}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-lg transition-all duration-300 appearance-none bg-gray-700 text-white ${
                      formErrors.role 
                        ? 'border-red-500 focus:border-red-500' 
                        : focusedField === 'role'
                        ? 'border-[#7F5AF0] shadow-lg shadow-[#7F5AF0]/20'
                        : 'border-gray-600 hover:border-gray-500'
                    } focus:ring-0 focus:outline-none cursor-pointer`}
                    required
                    aria-invalid={!!formErrors.role}
                    aria-describedby={formErrors.role ? 'role-error' : undefined}
                  >
                    <option value="">Select your role</option>
                    <option value="Student">🎓 Student</option>
                    <option value="Creator">🎨 Creator</option>
                    <option value="Entrepreneur">💼 Entrepreneur</option>
                    <option value="Other">🔧 Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {formErrors.role && (
                  <div className="mt-3 flex items-center text-red-600" id="role-error">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">{formErrors.role}</span>
                  </div>
                )}
              </div>

              {/* Form Benefits */}
              <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl p-8 my-12">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-[#7F5AF0]" />
                  What you'll get:
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-200">Personalized AI tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-200">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-200">Exclusive features</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 px-8 rounded-2xl text-white font-bold text-lg transition-all duration-500 flex items-center justify-center space-x-3 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed transform scale-95' 
                      : 'bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] hover:from-[#6D4DC6] hover:to-[#00E6B3] transform hover:scale-105 shadow-2xl hover:shadow-[#7F5AF0]/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Completing Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Profile & Continue</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Security & Privacy Note */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-lg font-semibold text-white">Your data is secure</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              By completing your profile, you agree to our{' '}
              <a href="/policies/terms-and-conditions" className="text-[#7F5AF0] hover:underline font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/policies/privacy-policy" className="text-[#7F5AF0] hover:underline font-medium">
                Privacy Policy
              </a>
              . We use industry-standard encryption to protect your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
