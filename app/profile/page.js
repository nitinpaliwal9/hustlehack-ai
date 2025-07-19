'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Shield, 
  Key, 
  Trash2, 
  Save, 
  Edit3, 
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Download,
  Upload
} from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function ProfileSettingsPage() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth()
  const router = useRouter()
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  })
  
  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  
  // Password change states
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  
  // Data export states
  const [isExporting, setIsExporting] = useState(false)
  const [exportData, setExportData] = useState(null)

  // Load profile data on component mount
  useEffect(() => {
    if (user && !isLoading) {
      loadProfileData()
    }
  }, [user, isLoading])

  const loadProfileData = async () => {
    try {
      setIsLoadingProfile(true)
      
      const { data: profile, error } = await supabase
        .from('users')
        .select('name, email, phone, role, profile_completed, created_at, last_login')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error loading profile:', error)
        setErrors({ general: 'Failed to load profile data' })
        return
      }

      setProfileData({
        name: profile.name || '',
        email: profile.email || user.email || '',
        phone: profile.phone || '',
        role: profile.role || ''
      })
    } catch (error) {
      console.error('Error in loadProfileData:', error)
      setErrors({ general: 'Failed to load profile data' })
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear field-specific error
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (profileData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+\d{8,15}$/.test(profileData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid international phone number'
    }
    
    if (!profileData.role) {
      newErrors.role = 'Please select your role'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveProfile = async () => {
    if (!validateForm()) return
    
    try {
      setIsSaving(true)
      setErrors({})
      
      const { error } = await supabase
        .from('users')
        .update({
          name: profileData.name.trim(),
          email: profileData.email.trim(),
          phone: profileData.phone.trim(),
          role: profileData.role,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) {
        console.error('Error updating profile:', error)
        setErrors({ general: 'Failed to update profile. Please try again.' })
        return
      }

      setSuccessMessage('Profile updated successfully!')
      setIsEditing(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error in handleSaveProfile:', error)
      setErrors({ general: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    // Validate password form
    const newPasswordErrors = {}
    
    if (!passwordData.currentPassword) {
      newPasswordErrors.currentPassword = 'Current password is required'
    }
    
    if (!passwordData.newPassword) {
      newPasswordErrors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 6) {
      newPasswordErrors.newPassword = 'Password must be at least 6 characters'
    }
    
    if (!passwordData.confirmPassword) {
      newPasswordErrors.confirmPassword = 'Please confirm your new password'
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newPasswordErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (Object.keys(newPasswordErrors).length > 0) {
      setPasswordErrors(newPasswordErrors)
      return
    }
    
    try {
      setIsChangingPassword(true)
      setPasswordErrors({})
      
      // Change password using Supabase auth
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      })
      
      if (error) {
        console.error('Error changing password:', error)
        setPasswordErrors({ general: 'Failed to change password. Please try again.' })
        return
      }
      
      setSuccessMessage('Password changed successfully!')
      setShowPasswordForm(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error in handlePasswordChange:', error)
      setPasswordErrors({ general: 'Failed to change password. Please try again.' })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const exportUserData = async () => {
    try {
      setIsExporting(true)
      
      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (userError) {
        console.error('Error fetching user data:', userError)
        setErrors({ general: 'Failed to export data' })
        return
      }
      
      // Fetch subscription data
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      // Fetch user analytics
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      const exportData = {
        user: userData,
        subscription: subscriptionData || null,
        analytics: analyticsData || null,
        exportedAt: new Date().toISOString()
      }
      
      setExportData(exportData)
      
      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `hustlehack-data-${user.id}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setSuccessMessage('Data exported successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error in exportUserData:', error)
      setErrors({ general: 'Failed to export data' })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.')) {
      return
    }
    
    if (!window.confirm('This is your final warning. All your data, subscriptions, and account information will be permanently deleted. Are you absolutely sure?')) {
      return
    }
    
    try {
      // Delete user data from database
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', user.id)
      
      if (deleteError) {
        console.error('Error deleting user data:', deleteError)
        setErrors({ general: 'Failed to delete account. Please contact support.' })
        return
      }
      
      // Sign out the user
      await signOut()
      
      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Error in handleDeleteAccount:', error)
      setErrors({ general: 'Failed to delete account. Please contact support.' })
    }
  }

  if (isLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F5AF0] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/')
    return null
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 sm:pt-28 lg:pt-32">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-6">Profile Settings</h1>
            <p className="text-sm sm:text-base text-gray-300">Manage your account information and preferences</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300">{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300">{errors.general}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Main Profile Section */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Profile Information Card */}
              <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#7F5AF0]" />
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#7F5AF0] text-white rounded-lg hover:bg-[#6D4DC6] transition-colors text-sm sm:text-base w-full sm:w-auto"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          loadProfileData() // Reset to original data
                        }}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                        isEditing 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0]' 
                          : 'bg-gray-900 border-gray-700 text-gray-400'
                      } transition-colors`}
                    />
                    {errors.name && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                        isEditing 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0]' 
                          : 'bg-gray-900 border-gray-700 text-gray-400'
                      } transition-colors`}
                    />
                    {errors.email && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      placeholder="+91 9876543210"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                        isEditing 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0]' 
                          : 'bg-gray-900 border-gray-700 text-gray-400'
                      } transition-colors`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select
                      value={profileData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                        isEditing 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0]' 
                          : 'bg-gray-900 border-gray-700 text-gray-400'
                      } transition-colors`}
                    >
                      <option value="">Select your role</option>
                      <option value="Student">Student</option>
                      <option value="Content Creator">Content Creator</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Hustler">Hustler</option>
                    </select>
                    {errors.role && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.role}</p>}
                  </div>
                </div>
              </div>

              {/* Password Change Card */}
              <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                    <Key className="w-5 h-5 sm:w-6 sm:h-6 text-[#7F5AF0]" />
                    Change Password
                  </h2>
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#7F5AF0] text-white rounded-lg hover:bg-[#6D4DC6] transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    {showPasswordForm ? 'Cancel' : 'Change Password'}
                  </button>
                </div>

                {showPasswordForm && (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword}</p>}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordErrors.newPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-600 text-white focus:border-[#7F5AF0] focus:ring-1 focus:ring-[#7F5AF0] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmPassword}</p>}
                    </div>

                    {passwordErrors.general && <p className="text-red-400 text-sm">{passwordErrors.general}</p>}

                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isChangingPassword ? 'Changing Password...' : 'Change Password'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Actions Card */}
              <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#7F5AF0]" />
                  Account Actions
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={exportUserData}
                    disabled={isExporting}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    {isExporting ? 'Exporting...' : 'Export My Data'}
                  </button>
                  
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Danger Zone Card */}
              <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-red-500/30 p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  Danger Zone
                </h3>
                
                <p className="text-gray-300 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                
                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
