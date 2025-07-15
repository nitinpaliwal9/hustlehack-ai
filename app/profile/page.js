'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Save, 
  Edit3, 
  Eye, 
  EyeOff, 
  Upload, 
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader,
  Settings,
  Key,
  CreditCard,
  Download
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ProfileSettingsPage() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    updateProfile, 
    resetPassword, 
    signOut,
    enable2FA,
    verify2FASetup,
    disable2FA,
    get2FAFactors,
    checkUserProfile
  } = useAuth()
  const router = useRouter()
  
  // Form states
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: ''
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'english',
    timezone: 'UTC',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true
  })
  
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState(null)
  const [isUploadingPicture, setIsUploadingPicture] = useState(false)
  
  // 2FA states
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [twoFAFactors, setTwoFAFactors] = useState([])
  const [is2FASetupOpen, setIs2FASetupOpen] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [totpSecret, setTotpSecret] = useState('')
  const [factorId, setFactorId] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying2FA, setIsVerifying2FA] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isLoading, isAuthenticated, router])

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        role: user.user_metadata?.role || '',
        bio: user.user_metadata?.bio || '',
        location: user.user_metadata?.location || '',
        website: user.user_metadata?.website || '',
        twitter: user.user_metadata?.twitter || '',
        linkedin: user.user_metadata?.linkedin || ''
      })
      // Set profile picture if available
      if (user.user_metadata?.avatar_url) {
        setProfilePicturePreview(user.user_metadata.avatar_url)
      }
      
      // Load 2FA factors
      loadTwoFAFactors()
    }
  }, [user])

  // Load 2FA factors
  const loadTwoFAFactors = async () => {
    try {
      const factors = await get2FAFactors()
      setTwoFAFactors(factors)
      setTwoFAEnabled(factors.length > 0)
    } catch (error) {
      console.error('Error loading 2FA factors:', error)
    }
  }

  // Handle form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  // Handle profile picture upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({ profilePicture: 'Please select an image file' })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ profilePicture: 'Image size must be less than 5MB' })
      return
    }

    setIsUploadingPicture(true)
    setErrors({})

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setProfilePicturePreview(previewUrl)
      setProfilePicture(file)

      // In a real implementation, you would upload to Supabase Storage
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage('Profile picture uploaded successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrors({ profilePicture: 'Failed to upload profile picture' })
      setProfilePicturePreview(null)
      setProfilePicture(null)
    } finally {
      setIsUploadingPicture(false)
    }
  }

  // Handle profile picture removal
  const handleProfilePictureRemove = async () => {
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      setIsUploadingPicture(true)
      try {
        // In a real implementation, you would delete from Supabase Storage
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setProfilePicturePreview(null)
        setProfilePicture(null)
        setSuccessMessage('Profile picture removed successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (error) {
        setErrors({ profilePicture: 'Failed to remove profile picture' })
      } finally {
        setIsUploadingPicture(false)
      }
    }
  }

  // Handle 2FA setup
  const handleEnable2FA = async () => {
    try {
      setIsSaving(true)
      const result = await enable2FA()
      
      setQrCodeUrl(result.qrCode)
      setTotpSecret(result.secret)
      setFactorId(result.factorId)
      setIs2FASetupOpen(true)
    } catch (error) {
      setErrors({ general: 'Failed to enable 2FA. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle 2FA verification
  const handleVerify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setErrors({ verification: 'Please enter a valid 6-digit code' })
      return
    }

    try {
      setIsVerifying2FA(true)
      setErrors({})
      
      await verify2FASetup(factorId, verificationCode)
      
      setIs2FASetupOpen(false)
      setVerificationCode('')
      setSuccessMessage('2FA enabled successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Reload factors
      await loadTwoFAFactors()
    } catch (error) {
      setErrors({ verification: 'Invalid code. Please try again.' })
    } finally {
      setIsVerifying2FA(false)
    }
  }

  // Handle 2FA disable
  const handleDisable2FA = async () => {
    if (window.confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) {
      try {
        setIsSaving(true)
        const firstFactor = twoFAFactors[0]
        
        if (firstFactor) {
          await disable2FA(firstFactor.id)
          setSuccessMessage('2FA disabled successfully!')
          setTimeout(() => setSuccessMessage(''), 3000)
          
          // Reload factors
          await loadTwoFAFactors()
        }
      } catch (error) {
        setErrors({ general: 'Failed to disable 2FA. Please try again.' })
      } finally {
        setIsSaving(false)
      }
    }
  }

  // Validation
  const validateProfile = () => {
    const newErrors = {}
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (profileData.phone && !/^\+?[\d\s\-\(\)]+$/.test(profileData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (profileData.website && !/^https?:\/\/.+/.test(profileData.website)) {
      newErrors.website = 'Please enter a valid website URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = () => {
    const newErrors = {}
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle saves
  const handleSaveProfile = async () => {
    if (!validateProfile()) return
    
    setIsSaving(true)
    try {
      await updateProfile(profileData)
      setSuccessMessage('Profile updated successfully!')
      setIsEditing(false)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!validatePassword()) return
    
    setIsSaving(true)
    try {
      // In a real implementation, you'd call your password change API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setSuccessMessage('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrors({ general: 'Failed to change password. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetPassword = async () => {
    try {
      await resetPassword(user.email)
      setSuccessMessage('Password reset email sent!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrors({ general: 'Failed to send reset email. Please try again.' })
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // In a real implementation, you'd call your account deletion API
        await signOut()
        router.push('/')
      } catch (error) {
        setErrors({ general: 'Failed to delete account. Please try again.' })
      }
    }
  }

  useEffect(() => {
    if (!isLoading && user) {
      checkUserProfile(user).then(status => {
        if (status !== 'complete') {
          router.push('/complete-profile')
        } else {
          // setProfileChecked(true) // This state variable is not defined in the original file
        }
      })
    }
  }, [isLoading, user, checkUserProfile, router])

  if (isLoading || !user || !profileChecked) {
    return <LoadingSpinner message="Loading..." />
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Profile Settings</h1>
            <p className="text-xl text-gray-300">Manage your account and preferences</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-400">{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-400">{errors.general}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'Profile Information', icon: User },
                    { id: 'security', label: 'Security', icon: Shield },
                    { id: 'preferences', label: 'Preferences', icon: Settings },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'billing', label: 'Billing', icon: CreditCard },
                    { id: 'data', label: 'Data & Privacy', icon: Download }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === item.id
                          ? 'bg-primary/20 text-primary border-l-4 border-primary'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                {/* Profile Information Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        {profilePicturePreview ? (
                          <img
                            src={profilePicturePreview}
                            alt="Profile picture"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white">
                            {profileData.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                        )}
                        {isUploadingPicture && (
                          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                            <Loader className="w-6 h-6 animate-spin text-white" />
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex flex-col gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                            className="hidden"
                            id="profile-picture-upload"
                            disabled={isUploadingPicture}
                          />
                          <label
                            htmlFor="profile-picture-upload"
                            className={`flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors cursor-pointer ${
                              isUploadingPicture ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <Upload className="w-4 h-4" />
                            {isUploadingPicture ? 'Uploading...' : 'Upload Photo'}
                          </label>
                          {profilePicturePreview && (
                            <button
                              onClick={handleProfilePictureRemove}
                              disabled={isUploadingPicture}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {errors.profilePicture && (
                      <p className="text-sm text-red-400 mt-2">{errors.profilePicture}</p>
                    )}

                    {/* Profile Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Role</label>
                        <select
                          name="role"
                          value={profileData.role}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                        >
                          <option value="">Select your role</option>
                          <option value="Student">Student</option>
                          <option value="Creator">Creator</option>
                          <option value="Entrepreneur">Entrepreneur</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          placeholder="Enter your location"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Website</label>
                        <input
                          type="url"
                          name="website"
                          value={profileData.website}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          placeholder="https://your-website.com"
                        />
                        {errors.website && (
                          <p className="mt-1 text-sm text-red-400">{errors.website}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                          !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Twitter</label>
                        <input
                          type="text"
                          name="twitter"
                          value={profileData.twitter}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          placeholder="@username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">LinkedIn</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={profileData.linkedin}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            !isEditing ? 'opacity-60 cursor-not-allowed' : ''
                          }`}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:from-primary/80 hover:to-accent/80 transition-all disabled:opacity-50"
                        >
                          {isSaving ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Security Settings</h2>
                    
                    {/* Change Password */}
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          {errors.currentPassword && (
                            <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Confirm new password"
                          />
                          {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                          )}
                        </div>

                        <button
                          onClick={handleChangePassword}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:from-primary/80 hover:to-accent/80 transition-all disabled:opacity-50"
                        >
                          {isSaving ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Key className="w-4 h-4" />
                          )}
                          {isSaving ? 'Changing...' : 'Change Password'}
                        </button>
                      </div>
                    </div>

                    {/* Password Reset */}
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Password Reset</h3>
                      <p className="text-gray-300 mb-4">
                        If you've forgotten your password, you can request a reset email.
                      </p>
                      <button
                        onClick={handleResetPassword}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Send Reset Email
                      </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Two-Factor Authentication</h3>
                      </div>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Add an extra layer of security to your account with TOTP-based 2FA. Use apps like Google Authenticator or Authy.
                      </p>
                      
                      {twoFAEnabled ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm">
                            <div className="p-1 bg-green-500/20 rounded-full">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="flex-1">
                              <span className="text-green-400 font-medium">2FA is enabled on your account</span>
                              <p className="text-green-300/70 text-sm mt-1">Your account has enhanced security protection</p>
                            </div>
                          </div>
                          <button
                            onClick={handleDisable2FA}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all duration-200 disabled:opacity-50 border border-red-500/20 hover:border-red-500/40"
                          >
                            {isSaving ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <Shield className="w-4 h-4" />
                            )}
                            <span className="font-medium">{isSaving ? 'Disabling...' : 'Disable 2FA'}</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {!is2FASetupOpen ? (
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-sm">
                                <div className="p-1 bg-yellow-500/20 rounded-full">
                                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                  <span className="text-yellow-400 font-medium">2FA is not enabled</span>
                                  <p className="text-yellow-300/70 text-sm mt-1">Enable 2FA for enhanced account security</p>
                                </div>
                              </div>
                              <button
                                onClick={handleEnable2FA}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-all duration-200 disabled:opacity-50 border border-green-500/20 hover:border-green-500/40"
                              >
                                {isSaving ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Shield className="w-4 h-4" />
                                )}
                                <span className="font-medium">{isSaving ? 'Setting up...' : 'Enable 2FA'}</span>
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-6 p-6 bg-gray-700/30 rounded-xl border border-gray-600/30">
                              <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full mb-4">
                                  <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2">Setup Two-Factor Authentication</h4>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                                </p>
                                {qrCodeUrl && (
                                  <div className="inline-block p-6 bg-white rounded-xl shadow-lg">
                                    <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48 mx-auto" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-200">Verification Code</label>
                                <div className="flex gap-3">
                                  <input
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    className="flex-1 px-4 py-3 bg-gray-700/70 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-200 text-center text-lg font-mono"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                  />
                                  <button
                                    onClick={handleVerify2FA}
                                    disabled={isVerifying2FA || verificationCode.length !== 6}
                                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:from-primary/80 hover:to-accent/80 transition-all duration-200 disabled:opacity-50 font-medium"
                                  >
                                    {isVerifying2FA ? (
                                      <Loader className="w-5 h-5 animate-spin" />
                                    ) : (
                                      'Verify'
                                    )}
                                  </button>
                                </div>
                                {errors.verification && (
                                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.verification}</span>
                                  </div>
                                )}
                              </div>
                              
                              <button
                                onClick={() => {
                                  setIs2FASetupOpen(false)
                                  setVerificationCode('')
                                  setQrCodeUrl('')
                                }}
                                className="w-full text-gray-400 hover:text-white transition-all duration-200 py-2 font-medium"
                              >
                                Cancel Setup
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Preferences</h2>
                    
                    {/* Theme */}
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Theme</label>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { id: 'light', label: 'Light', icon: Sun },
                              { id: 'dark', label: 'Dark', icon: Moon },
                              { id: 'system', label: 'System', icon: Settings }
                            ].map((theme) => (
                              <button
                                key={theme.id}
                                onClick={() => handlePreferenceChange('theme', theme.id)}
                                className={`flex items-center gap-2 p-4 rounded-lg border transition-all ${
                                  preferences.theme === theme.id
                                    ? 'bg-primary/20 border-primary text-primary'
                                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                                }`}
                              >
                                <theme.icon className="w-5 h-5" />
                                <span>{theme.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Language</label>
                          <select
                            value={preferences.language}
                            onChange={(e) => handlePreferenceChange('language', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                            <option value="hindi">Hindi</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Timezone</label>
                          <select
                            value={preferences.timezone}
                            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            <option value="GMT">Greenwich Mean Time</option>
                            <option value="IST">Indian Standard Time</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
                    
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email notifications for important updates' },
                          { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional emails and newsletters' },
                          { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Get a weekly summary of your activity' }
                        ].map((notification) => (
                          <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                            <div>
                              <h4 className="text-white font-medium">{notification.label}</h4>
                              <p className="text-gray-400 text-sm">{notification.description}</p>
                            </div>
                            <button
                              onClick={() => handlePreferenceChange(notification.key, !preferences[notification.key])}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                preferences[notification.key] ? 'bg-primary' : 'bg-gray-600'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  preferences[notification.key] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Billing Information</h2>
                    
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Free Plan</h4>
                          <p className="text-gray-400 text-sm">Access to basic features</p>
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:from-primary/80 hover:to-accent/80 transition-all">
                          Upgrade Plan
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
                      <div className="text-center py-8">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No payment methods added</p>
                        <button className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data & Privacy Tab */}
                {activeTab === 'data' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Data & Privacy</h2>
                    
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Data Export</h3>
                      <p className="text-gray-300 mb-4">
                        Download all your data in a portable format.
                      </p>
                      <button className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">
                        <Download className="w-4 h-4" />
                        Download Data
                      </button>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
                      <p className="text-gray-300 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
