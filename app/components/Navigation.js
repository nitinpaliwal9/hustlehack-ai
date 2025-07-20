'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Sparkles } from 'lucide-react';
import { useUserPlan } from '../hooks/useAuth';
import { getPlanDisplayName } from '../planUtils';
import zxcvbn from 'zxcvbn';

// Focus trap utility
function useFocusTrap(isOpen, modalRef) {
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusableSelectors = [
      'a[href]', 'button:not([disabled])', 'textarea:not([disabled])', 'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'
    ];
    const focusableEls = modalRef.current.querySelectorAll(focusableSelectors.join(','));
    if (!focusableEls.length) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    function trap(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        modalRef.current.querySelector('.modal-close')?.click();
      }
    }
    modalRef.current.addEventListener('keydown', trap);
    // Focus first element
    setTimeout(() => firstEl.focus(), 10);
    return () => modalRef.current.removeEventListener('keydown', trap);
  }, [isOpen, modalRef]);
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  
  // Use authentication hook
  const { user, isAuthenticated, signIn, signUp, signInWithGoogle, signOut, resetPassword, checkNetworkStatus, error: authError } = useAuth()
  const userId = user?.id;
  const { plan, loading: planLoading } = useUserPlan(userId);
  
  // Show warning if Supabase is not configured
  useEffect(() => {
    if (authError && authError.includes('Supabase not configured')) {
      console.warn('⚠️ Supabase not configured. Authentication features will be disabled.')
    }
  }, [authError])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect current path for active states
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  // Close mobile menu and profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu
      if (isMobileMenuOpen && !event.target.closest('.mobile-nav-menu') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false)
      }
      
      // Close profile dropdown
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false)
      }
    }
    
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden' // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'unset'
    }
    
    if (isProfileDropdownOpen || isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen, isProfileDropdownOpen])

  // Debug CSS loading
  useEffect(() => {
    console.log('🎨 DEBUG: Navigation component mounted')
    console.log('🎨 DEBUG: Checking if mobile menu styles are loaded...')
    
    const checkStyles = () => {
      const mobileMenuStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary')
      console.log('🎨 DEBUG: CSS custom property --primary:', mobileMenuStyle)
      
      // Check if our mobile menu styles are loaded
      const testElement = document.createElement('div')
      testElement.className = 'mobile-nav-menu'
      document.body.appendChild(testElement)
      
      const computedStyles = getComputedStyle(testElement)
      console.log('🎨 DEBUG: Mobile menu background:', computedStyles.background)
      console.log('🎨 DEBUG: Mobile menu position:', computedStyles.position)
      console.log('🎨 DEBUG: Mobile menu display:', computedStyles.display)
      
      document.body.removeChild(testElement)
    }
    
    // Check styles after a short delay to ensure CSS is loaded
    setTimeout(checkStyles, 100)
  }, [])

  // Debug mobile menu visibility
  useEffect(() => {
    if (isMobileMenuOpen) {
      console.log('🔍 DEBUG: Mobile menu is open, checking DOM...')
      setTimeout(() => {
        const mobileMenu = document.querySelector('.mobile-nav-menu')
        if (mobileMenu) {
          console.log('🔍 DEBUG: Mobile menu found in DOM')
          console.log('🔍 DEBUG: Mobile menu computed styles:', getComputedStyle(mobileMenu))
          console.log('🔍 DEBUG: Mobile menu position:', mobileMenu.style.position)
          console.log('🔍 DEBUG: Mobile menu zIndex:', mobileMenu.style.zIndex)
          console.log('🔍 DEBUG: Mobile menu display:', mobileMenu.style.display)
        } else {
          console.log('❌ DEBUG: Mobile menu NOT found in DOM')
        }
      }, 100)
    }
  }, [isMobileMenuOpen])

  // Enhanced authentication handlers
  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  // Add error state for login and signup
  const [loginSubmitError, setLoginSubmitError] = useState('');
  const [signupSubmitError, setSignupSubmitError] = useState('');

  // Update handleLogin to show error and allow retry
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginSubmitError('');
    if (!checkNetworkStatus()) return;
    const { email, password } = loginFields;
    // Validate all fields before submit
    const errors = {
      email: validateLoginField('email', email),
      password: validateLoginField('password', password),
    };
    setLoginErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setIsLoading(true);
    try {
      await signIn(email, password);
      closeModal('login-modal');
      setLoginFields({ email: '', password: '' });
    } catch (error) {
      setLoginSubmitError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add state for post-signup email verification UI
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  // Update handleSignup to show error and allow retry
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupSubmitError('');
    if (!checkNetworkStatus()) return;
    const { name, email, password, role } = signupFields;
    // Validate all fields before submit
    const errors = {
      name: validateSignupField('name', name),
      email: validateSignupField('email', email),
      password: validateSignupField('password', password),
      role: validateSignupField('role', role),
    };
    setSignupErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setIsLoading(true);
    try {
      await signUp(email, password, { name, role });
      setShowCheckEmail(true);
      setResendSuccess(false);
      setResendError('');
    } catch (error) {
      setSignupSubmitError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification email logic
  const handleResendVerification = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setResendError('');
    try {
      // Try to use Supabase resend confirmation API if available
      if (typeof window !== 'undefined' && window.supabase) {
        const { error } = await window.supabase.auth.resend({ type: 'signup', email: signupFields.email });
        if (error) throw error;
        setResendSuccess(true);
      } else {
        setResendError('Resend not available. Please check your email or try again later.');
      }
    } catch (err) {
      setResendError(err.message || 'Failed to resend verification email.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Google sign in error:', error)
    }
  }

  const openUserProfile = () => {
    if (isAuthenticated) {
      window.location.href = '/contact'
    } else {
      openModal('login-modal')
    }
  }

  const togglePasswordVisibility = (fieldId) => {
    if (typeof window !== 'undefined' && window.togglePasswordVisibility) {
      window.togglePasswordVisibility(fieldId)
    }
  }

  const toggleMobileMenu = () => {
    console.log('Toggling mobile menu. Current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log('Mobile menu state after toggle:', !isMobileMenuOpen);
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleProfileDropdown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false)
  }

  const switchToSignup = () => {
    closeModal('login-modal')
    setTimeout(() => openModal('signup-modal'), 300)
  }

  const switchToLogin = () => {
    closeModal('signup-modal')
    setTimeout(() => openModal('login-modal'), 300)
  }

  const handleForgotPassword = async () => {
    const email = document.getElementById('loginEmail')?.value?.trim()
    
    if (!email) {
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('Please enter your email address first', 'error')
      }
      return
    }
    
    try {
      await resetPassword(email)
      closeModal('login-modal')
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('Password reset email sent! Check your inbox.', 'success')
      }
    } catch (error) {
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('Failed to send reset email. Please try again.', 'error')
      }
    }
  }

  const openModal = (modalId) => {
    if (typeof window !== 'undefined' && window.openModal) {
      window.openModal(modalId)
    }
  }

  const closeModal = (modalId) => {
    if (typeof window !== 'undefined' && window.closeModal) {
      window.closeModal(modalId)
    }
  }

  // Get display name
  const getDisplayName = () => {
    if (!user) return 'User'
    return user.user_metadata?.name || user.email?.split('@')[0] || 'User'
  }

  // Plan badge styling logic
  const planDisplay = getPlanDisplayName(plan);
  let planBadgeClass = '';
  if (plan === 'pro') {
    planBadgeClass = 'bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-300 text-black shadow-lg animate-glow border border-yellow-400';
  } else if (plan === 'creator') {
    planBadgeClass = 'bg-gradient-to-r from-blue-400 via-pink-500 to-purple-400 text-white shadow-md animate-sparkle border-2 border-pink-400';
  } else if (plan === 'starter') {
    planBadgeClass = 'bg-gradient-to-r from-teal-400 via-gray-700 to-gray-900 text-white shadow border-2 border-teal-400';
  }

  const loginModalRef = useRef(null);
  const signupModalRef = useRef(null);
  useFocusTrap(isMobileMenuOpen, loginModalRef);
  useFocusTrap(isMobileMenuOpen, signupModalRef);

  const mobileMenuLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'block',
    margin: '10px 0'
  };

  // Real-time validation state for login/signup
  const [loginFields, setLoginFields] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupFields, setSignupFields] = useState({ name: '', email: '', password: '', role: '' });
  const [signupErrors, setSignupErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });

  // Validation helpers
  const validateLoginField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };
  const validateSignupField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'role':
        if (!value) return 'Please select your role';
        return '';
      default:
        return '';
    }
  };

  // Real-time handlers for login
  const handleLoginFieldChange = (e) => {
    const { name, value } = e.target;
    setLoginFields((prev) => ({ ...prev, [name]: value }));
    setLoginErrors((prev) => ({ ...prev, [name]: validateLoginField(name, value) }));
  };
  const handleLoginFieldBlur = (e) => {
    const { name, value } = e.target;
    setLoginErrors((prev) => ({ ...prev, [name]: validateLoginField(name, value) }));
  };

  // Real-time handlers for signup
  const handleSignupFieldChange = (e) => {
    const { name, value } = e.target;
    setSignupFields((prev) => ({ ...prev, [name]: value }));
    setSignupErrors((prev) => ({ ...prev, [name]: validateSignupField(name, value) }));
    if (name === 'password') {
      const result = zxcvbn(value);
      setPasswordStrength({ score: result.score, feedback: result.feedback.suggestions[0] || '' });
    }
  };
  const handleSignupFieldBlur = (e) => {
    const { name, value } = e.target;
    setSignupErrors((prev) => ({ ...prev, [name]: validateSignupField(name, value) }));
  };

  // Add state for email verification check
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const verificationIntervalRef = useRef(null);

  // Function to check email verification status
  const checkEmailVerified = async () => {
    setCheckingVerification(true);
    setVerificationError('');
    setVerificationSuccess(false);
    try {
      if (typeof window !== 'undefined' && window.supabase) {
        const { data, error } = await window.supabase.auth.getUser();
        if (error) throw error;
        if (data?.user?.email_confirmed_at) {
          setVerificationSuccess(true);
          setShowCheckEmail(false);
          // Optionally, auto-login or redirect to dashboard
          window.location.reload();
        } else {
          setVerificationError('Email not verified yet. Please check your inbox and click the verification link.');
        }
      }
    } catch (err) {
      setVerificationError(err.message || 'Failed to check verification status.');
    } finally {
      setCheckingVerification(false);
    }
  };

  // Optionally, auto-poll for verification status every 5 seconds
  useEffect(() => {
    if (showCheckEmail) {
      verificationIntervalRef.current = setInterval(checkEmailVerified, 5000);
    } else {
      clearInterval(verificationIntervalRef.current);
    }
    return () => clearInterval(verificationIntervalRef.current);
  }, [showCheckEmail]);

  return (
    <>
      <style jsx>{`
        .nav-link:hover {
          color: #7F5AF0 !important;
          border-bottom-color: #7F5AF0 !important;
          transform: translateY(-1px);
        }
        .nav-link.active {
          color: #7F5AF0 !important;
          border-bottom-color: #7F5AF0 !important;
        }
        .theme-toggle:hover {
          background: rgba(127,90,240,0.1) !important;
          border-color: rgba(127,90,240,0.3) !important;
          transform: scale(1.05);
        }
        .btn-ghost:hover {
          background: rgba(127,90,240,0.1) !important;
          border-color: #7F5AF0 !important;
          transform: translateY(-1px);
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #6D4DC6 0%, #00E6B3 100%) !important;
          box-shadow: 0 0 12px rgba(127,90,240,0.5), 0 8px 25px rgba(127,90,240,0.4) !important;
          transform: translateY(-2px);
        }
      `}</style>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black/70 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src="/assets/images/logo (2).png" alt="HustleHack AI Logo" className="w-8 h-8" width={32} height={32} />
            <span className="text-xl font-bold ml-2 text-gradient">HustleHack AI</span>
          </div>
          <ul className="flex items-center gap-6 text-sm font-medium ml-8">
            <li><Link href="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>Home</Link></li>
            <li><Link href="/#features" className="nav-link">Features</Link></li>
            <li><Link href="/#pricing" className="nav-link">Pricing</Link></li>
            <li><Link href="/instant-hustle" className={`nav-link ${currentPath === '/instant-hustle' ? 'active' : ''}`}>Instant Hustle Lite <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-[#00FFC2] text-black">NEW</span></Link></li>
            <li><Link href="/client-finder" className={`nav-link ${currentPath === '/client-finder' ? 'active' : ''}`}>Client Finder <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-[#7F5AF0] text-white">BETA</span></Link></li>
            <li><Link href="/resources" className={`nav-link ${currentPath === '/resources' ? 'active' : ''}`}>Resources</Link></li>
            <li><Link href="/about" className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}>About</Link></li>
            <li><Link href="/contact" className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}>Contact</Link></li>
           </ul>
            </div>
        <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <>
              <a href="#" className="border px-4 py-2 rounded-lg" onClick={() => openModal('login-modal')}>Sign In</a>
              <a href="#" className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] px-4 py-2 rounded-lg text-white font-semibold" onClick={() => openModal('signup-modal')}>Get Started</a>
              </>
            )}
            {isAuthenticated && (
            <div className="profile-dropdown relative ml-2">
              <button className="profile-btn flex items-center gap-2 px-4 py-2 rounded-lg border" onClick={toggleProfileDropdown}>
                  <span className="profile-avatar">👤</span>
                  <span className="profile-name">{getDisplayName()}</span>
                  <span className={`profile-arrow ${isProfileDropdownOpen ? 'rotate' : ''}`}>▼</span>
                </button>
              {/* Profile dropdown menu here */}
              </div>
            )}
          </div>
      </nav>

      {/* Login Modal */}
      <div id="login-modal" className="modal" ref={loginModalRef}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => closeModal('login-modal')}>&times;</button>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Welcome Back!</h2>
          {/* Google Sign In Button */}
          <button 
            type="button" 
            className="btn-google" 
            onClick={handleGoogleSignIn}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
          <div className="auth-divider" style={{ textAlign: 'center', margin: '1rem 0', position: 'relative' }}>
            <span style={{ background: 'var(--bg-color)', padding: '0 1rem', color: 'var(--gray-400)' }}>or continue with email</span>
          </div>
          {loginSubmitError && <div className="text-red-500 text-sm mb-4 text-center">{loginSubmitError}</div>}
          <form id="loginForm" onSubmit={handleLogin} autoComplete="off">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" id="loginEmail" name="email" className="form-input" placeholder="Enter your email" required value={loginFields.email} onChange={handleLoginFieldChange} onBlur={handleLoginFieldBlur} />
              {loginErrors.email && <div className="text-red-500 text-xs mt-1">{loginErrors.email}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-input-container">
                <input type="password" id="loginPassword" name="password" className="form-input" placeholder="Enter your password" required value={loginFields.password} onChange={handleLoginFieldChange} onBlur={handleLoginFieldBlur} />
                <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('loginPassword')}>👁️</button>
              </div>
              {loginErrors.password && <div className="text-red-500 text-xs mt-1">{loginErrors.password}</div>}
            </div>
            <button 
              type="submit" 
              id="loginBtn" 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <div style={{ textAlign: 'center' }}>
              <a href="#" onClick={handleForgotPassword} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'var(--gray-400)' }}>Don&apos;t have an account? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }} onClick={switchToSignup}>Sign Up</a></p>
            </div>
          </form>
        </div>
      </div>
      {/* Sign Up Modal */}
      <div id="signup-modal" className="modal" ref={signupModalRef}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => { closeModal('signup-modal'); setShowCheckEmail(false); }}>&times;</button>
          {showCheckEmail ? (
            <div className="text-center py-12 px-4">
              <h2 className="text-2xl font-bold text-white mb-4">Check your email!</h2>
              <p className="text-gray-300 mb-4">We've sent a verification link to <span className="font-semibold text-[#7F5AF0]">{signupFields.email}</span>. Please verify your email to activate your account.</p>
              <button
                className="btn btn-primary mt-4"
                onClick={handleResendVerification}
                disabled={resendLoading}
              >
                {resendLoading ? 'Resending...' : 'Resend Verification Email'}
              </button>
              <div className="mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={checkEmailVerified}
                  disabled={checkingVerification}
                >
                  {checkingVerification ? "Checking..." : "I've verified, continue"}
                </button>
              </div>
              {verificationSuccess && <div className="text-green-500 mt-3">Email verified! Redirecting...</div>}
              {verificationError && <div className="text-red-500 mt-3">{verificationError}</div>}
              {resendSuccess && <div className="text-green-500 mt-3">Verification email resent!</div>}
              {resendError && <div className="text-red-500 mt-3">{resendError}</div>}
              <div className="mt-8 text-gray-400 text-sm">Didn’t get the email? Check your spam folder or try resending.</div>
            </div>
          ) : (
            <>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>🚀 Start Your Journey</h2>
              {signupSubmitError && <div className="text-red-500 text-sm mb-4 text-center">{signupSubmitError}</div>}
              <form id="signupForm" autoComplete="off" onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
                  <input type="text" id="name" name="name" className="form-input" placeholder="Your Name" required value={signupFields.name} onChange={handleSignupFieldChange} onBlur={handleSignupFieldBlur} />
                  {signupErrors.name && <div className="text-red-500 text-xs mt-1">{signupErrors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="Your Email" required value={signupFields.email} onChange={handleSignupFieldChange} onBlur={handleSignupFieldBlur} />
                  {signupErrors.email && <div className="text-red-500 text-xs mt-1">{signupErrors.email}</div>}
            </div>
            <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
              <div className="password-input-container">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-input"
                      placeholder="Password"
                      required
                      value={signupFields.password}
                      onChange={handleSignupFieldChange}
                      onBlur={handleSignupFieldBlur}
                      aria-describedby="password-strength"
                      aria-invalid={!!signupErrors.password}
                    />
                    <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('password')} aria-label="Show or hide password">👁️</button>
                  </div>
                  {signupErrors.password && <div className="text-red-500 text-xs mt-1">{signupErrors.password}</div>}
                  {/* Password strength meter */}
                  <div id="password-strength" className="mt-2">
                    <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                      <div
                        className={`h-2 rounded transition-all duration-300 ${
                          passwordStrength.score === 0 ? 'w-1/5 bg-red-400' :
                          passwordStrength.score === 1 ? 'w-2/5 bg-orange-400' :
                          passwordStrength.score === 2 ? 'w-3/5 bg-yellow-400' :
                          passwordStrength.score === 3 ? 'w-4/5 bg-blue-400' :
                          'w-full bg-green-500'
                        }`}
                      ></div>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      {signupFields.password && (
                        passwordStrength.score < 3
                          ? `Weak password. ${passwordStrength.feedback}`
                          : passwordStrength.score < 4
                            ? 'Good password, but could be stronger.'
                            : 'Strong password!'
                      )}
                    </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">I am a...</label>
                  <select id="role" name="role" className="form-input" required value={signupFields.role} onChange={handleSignupFieldChange} onBlur={handleSignupFieldBlur}>
                <option value="">Select your role</option>
                <option value="Student">Student</option>
                <option value="Content Creator">Content Creator</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Hustler">Hustler</option>
              </select>
                  {signupErrors.role && <div className="text-red-500 text-xs mt-1">{signupErrors.role}</div>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} id="signupBtn">
              <span className="btn-text">Create Account</span>
              <span className="btn-loading" style={{ display: 'none' }}>Creating Account...</span>
            </button>
            <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'var(--gray-400)' }}>Already have an account? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }} onClick={switchToLogin}>Sign In</a></p>
            </div>
          </form>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .animate-glow {
          box-shadow: 0 0 16px 4px #ffe27a, 0 0 32px 8px #7f5af0;
          animation: glowPulse 2.5s infinite alternate;
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 16px 4px #ffe27a, 0 0 32px 8px #7f5af0; }
          100% { box-shadow: 0 0 32px 8px #ffe27a, 0 0 48px 16px #7f5af0; }
        }
        .animate-sparkle {
          animation: sparkle 2s infinite linear;
        }
        @keyframes sparkle {
          0%, 100% { filter: drop-shadow(0 0 8px #fff) brightness(1.1); }
          50% { filter: drop-shadow(0 0 16px #ffb6f9) brightness(1.3); }
        }
        .shine-text {
          background: linear-gradient(90deg, #fff 20%, #ffe27a 40%, #7f5af0 60%, #fff 80%);
          background-size: 200% auto;
          animation: shineMove 2.5s linear infinite;
        }
        @keyframes shineMove {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </>
  )
}
 