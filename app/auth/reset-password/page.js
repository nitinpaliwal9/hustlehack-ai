'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import Navigation from '../../components/Navigation'
import { 
  Key, 
  Eye, 
  EyeOff, 
  Loader, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Shield
} from 'lucide-react'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updatePassword, isLoading, error } = useAuth()
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  // Extract tokens from URL or hash
  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const type = params.get('type')
    
    if (type === 'recovery' && access_token && refresh_token) {
      setAccessToken(access_token)
      setRefreshToken(refresh_token)
      
      // Set the session using the tokens
      const setSession = async () => {
        try {
          const { supabase } = await import('../../hooks/useAuth')
          await supabase.auth.setSession({
            access_token,
            refresh_token
          })
        } catch (error) {
          console.error('Error setting session:', error)
          setFormErrors({ general: 'Invalid or expired reset link' })
        }
      }
      
      setSession()
    } else {
      setFormErrors({ general: 'Invalid or expired reset link' })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    setFormErrors({})
    
    try {
      await updatePassword(formData.password)
      setResetSuccess(true)
      
      // Redirect to login after success
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      setFormErrors({ general: error.message || 'Failed to reset password' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' }
    
    let strength = 0
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ]
    
    strength = checks.filter(Boolean).length
    
    if (strength <= 2) return { strength, label: 'Weak', color: 'text-red-400' }
    if (strength === 3) return { strength, label: 'Fair', color: 'text-yellow-400' }
    if (strength === 4) return { strength, label: 'Good', color: 'text-blue-400' }
    return { strength, label: 'Strong', color: 'text-green-400' }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navigation />
        
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-full mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10 animate-pulse"></div>
                <CheckCircle className="w-10 h-10 text-green-400 relative z-10" />
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                Password Reset Successful!
              </h1>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Your password has been successfully updated. You can now sign in with your new password and continue using HustleHack AI.
              </p>
              
              <div className="flex items-center justify-center text-sm text-gray-400 bg-gray-700/50 rounded-lg p-4">
                <Loader className="w-4 h-4 animate-spin mr-2 text-primary" />
                <span>Redirecting to login in a few seconds...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mb-6 relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-accent/20 animate-pulse"></div>
                <Key className="w-10 h-10 text-white relative z-10" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">Reset Your Password</h1>
              <p className="text-gray-300 leading-relaxed">Create a new secure password for your HustleHack AI account</p>
            </div>

            {/* Error Message */}
            {formErrors.general && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-red-300 font-medium">{formErrors.general}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/70 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-200 pr-12"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 bg-gray-600/50 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            passwordStrength.strength <= 2 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                            passwordStrength.strength === 3 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                            passwordStrength.strength === 4 ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gradient-to-r from-green-500 to-green-400'
                          }`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${passwordStrength.color}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Password must contain uppercase, lowercase, number, and special character
                    </div>
                  </div>
                )}
                
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/70 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-200 pr-12"
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !accessToken}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:from-primary/80 hover:to-accent/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading component for Suspense fallback
function ResetPasswordLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mb-6 relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-accent/20 animate-pulse"></div>
                <Key className="w-10 h-10 text-white relative z-10" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">Reset Your Password</h1>
              <div className="flex items-center justify-center mt-8">
                <Loader className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-gray-400">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main export with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  )
}
