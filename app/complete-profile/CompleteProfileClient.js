'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function CompleteProfileClient() {
  const { user, isLoading, isAuthenticated, completeProfile, checkUserProfile } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (user) {
      checkUserProfile(user).then(status => {
        if (status === 'complete') {
          console.log('Profile already complete, redirecting to dashboard')
          router.push('/dashboard')
        }
      })
    }
  }, [user, isLoading, isAuthenticated, router, checkUserProfile])

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number (10-15 digits)'
    }

    if (!formData.role) {
      errors.role = 'Please select your role'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      console.log('Submitting profile data:', formData)
      
      await completeProfile({
        name: formData.name,
        phone: formData.phone,
        role: formData.role
      })

      console.log('Profile completed successfully')
      
      // Redirect to dashboard after successful completion
      router.push('/dashboard')
    } catch (error) {
      console.error('Profile completion failed:', error)
      // Error handling is already done in the completeProfile function
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#7F5AF0] border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] opacity-20 animate-pulse"></div>
          </div>
          <p className="text-2xl text-gray-700 font-bold mb-2">Loading...</p>
          <p className="text-gray-500 text-lg">Please wait while we prepare your profile</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to complete your profile.</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Complete Your Profile
          </h1>
          <p className="text-xl text-gray-600">
            Just a few details to get you started on your HustleHack AI journey
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#7F5AF0]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7F5AF0] focus:border-[#7F5AF0] transition-colors ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                required
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#7F5AF0] focus:border-[#7F5AF0] transition-colors ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your email address"
                required
                disabled // Email is prefilled and disabled
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7F5AF0] focus:border-[#7F5AF0] transition-colors ${
                  formErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
                required
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7F5AF0] focus:border-[#7F5AF0] transition-colors ${
                  formErrors.role ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select your role</option>
                <option value="Student">Student</option>
                <option value="Creator">Creator</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.role && (
                <p className="mt-1 text-sm text-red-600">{formErrors.role}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] hover:from-[#6D4DC6] hover:to-[#00E6B3] transform hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Completing Profile...
                  </div>
                ) : (
                  'Complete Profile & Continue'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            By completing your profile, you agree to our{' '}
            <a href="/policies/terms-and-conditions" className="text-[#7F5AF0] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/policies/privacy-policy" className="text-[#7F5AF0] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
