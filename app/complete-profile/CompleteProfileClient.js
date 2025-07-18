'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, Briefcase, CheckCircle, AlertCircle, ArrowRight, Loader, UserPlus, Shield, Zap } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient';
import { getPlanDisplayName } from '../planUtils';

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
        const cleanPhone = value.replace(/\D/g, '')
        // For Indian numbers, expect 12 digits (91 + 10 digits)
        if (cleanPhone.length < 12) return 'Please enter a valid Indian phone number'
        if (cleanPhone.length > 13) return 'Phone number is too long'
        return ''
      case 'role':
        if (!value) return 'Please select your role'
        return ''
      default:
        return ''
    }
  }

  const validateForm = () => {
    const errors = {}
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field])
      if (error) errors[field] = error
    })
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(formErrors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.focus()
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)
    setFormErrors({})

    try {
      // Upsert user profile (no plan logic here)
      const { data, error: upsertError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          plan: 'starter',
          plan_expiry: null,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .select();
      if (upsertError) throw upsertError;
      if (!data || data.length === 0) throw new Error('Profile update failed. No data returned.');

      // First-100 check and upsert subscription
      const eligible = await isUserInFirst100(user.id);
      if (eligible) {
        const subSuccess = await upsertSubscriptionForFirst100(user.id);
        if (subSuccess) setShowCongrats(true);
      }
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/dashboard'); // Redirect to dashboard after success
      }, 1200);
    } catch (error) {
      console.error('Profile completion failed:', error);
      if (typeof window !== 'undefined' && window.showNotification) {
        const errorMessage = error.message && error.message.includes('timed out')
          ? 'Request timed out. Please check your connection.'
          : error.message || 'Failed to complete profile. Please try again.';
        window.showNotification(`❌ ${errorMessage}`, 'error', 5000);
      }
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Handle phone number formatting
    let processedValue = value
    if (name === 'phone') {
      // Don't allow removal of +91 prefix
      if (!value.startsWith('+91 ')) {
        processedValue = '+91 ' + value.replace(/[^0-9]/g, '')
      } else {
        // Remove all non-digits except the +91 prefix
        const phoneDigits = value.slice(4).replace(/\D/g, '')
        // Limit to 10 digits after +91
        const limitedDigits = phoneDigits.slice(0, 10)
        processedValue = '+91 ' + limitedDigits
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setFocusedField(null)
    
    // Validate field on blur
    const error = validateField(name, value)
    if (error) {
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle size={48} className="text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Profile Completed Successfully!</h2>
          <p className="text-lg text-gray-300 mb-2">Welcome to HustleHack AI! 🚀</p>
          <p className="text-gray-400">Redirecting you to get started...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#7F5AF0] border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] opacity-20 animate-pulse"></div>
          </div>
          <p className="text-2xl text-white font-bold mb-2">Loading...</p>
          <p className="text-gray-300 text-lg">Please wait while we prepare your profile</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-4">You need to be logged in to complete your profile.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#7F5AF0] text-white px-6 py-3 rounded-lg hover:bg-[#6D4DC6] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  if (profileCheckError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-bold mb-4">We couldn't connect to our database.</p>
          <p className="text-gray-700 mb-2">Please check your internet connection or try again later.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
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
          <div className="flex items-center space-x-6 flex-wrap w-full max-w-xs sm:max-w-none">
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <span className="ml-2 text-sm text-gray-300 truncate">Sign Up</span>
            </div>
            <div className="w-12 h-0.5 bg-[#7F5AF0] flex-shrink-0"></div>
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <span className="ml-2 text-sm text-[#7F5AF0] font-medium truncate">Complete Profile</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-600 flex-shrink-0"></div>
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-sm font-bold">3</div>
              <span className="ml-2 text-sm text-gray-400 truncate">Get Started</span>
            </div>
          </div>
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
                    placeholder="+91 9876543210"
                    required
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? 'phone-error' : undefined}
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
