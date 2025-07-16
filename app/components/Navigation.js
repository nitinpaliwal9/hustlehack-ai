'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Sparkles } from 'lucide-react';
import { useUserPlan } from '../hooks/useAuth';
import { getPlanDisplayName } from '../planUtils';

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

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!checkNetworkStatus()) return
    
    const email = document.getElementById('loginEmail')?.value?.trim()
    const password = document.getElementById('loginPassword')?.value?.trim()
    
    if (!email || !password) {
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('Please enter both email and password', 'error')
      }
      return
    }
    
    setIsLoading(true)
    try {
      await signIn(email, password)
      closeModal('login-modal')
      // Redirect to contact form
      setTimeout(() => {
        window.location.href = '/contact'
      }, 1500)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!checkNetworkStatus()) return
    
    const name = document.getElementById('name')?.value?.trim()
    const email = document.getElementById('email')?.value?.trim()
    const password = document.getElementById('password')?.value?.trim()
    const role = document.getElementById('role')?.value
    
    if (!name || !email || !password || !role) {
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('Please fill in all fields', 'error')
      }
      return
    }
    
    if (password.length < 6) {
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('Password must be at least 6 characters long', 'error')
      }
      return
    }
    
    setIsLoading(true)
    try {
      await signUp(email, password, { name, role })
      closeModal('signup-modal')
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
  let planIcon = null;
  if (plan === 'pro') {
    planBadgeClass = 'bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-300 text-black shadow-lg animate-glow border border-yellow-400';
    planIcon = <span className="mr-1 text-base">👑</span>;
  } else if (plan === 'creator') {
    planBadgeClass = 'bg-gradient-to-r from-blue-400 via-pink-500 to-purple-400 text-white shadow-md animate-sparkle border-2 border-pink-400';
    planIcon = <span className="mr-2">✨</span>;
  } else if (plan === 'starter') {
    planBadgeClass = 'bg-gradient-to-r from-teal-400 via-gray-700 to-gray-900 text-white shadow border-2 border-teal-400';
    planIcon = <span className="mr-2">🚀</span>;
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

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <Image 
              src="/assets/images/logo (2).png" 
              alt="HustleHack AI Logo" 
              className="logo-icon" 
              width={40}
              height={40}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span className="logo-text">HustleHack AI</span>
          </Link>
          
          <ul className="nav-menu">
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/#features" className="nav-link">Features</Link></li>
            <li><Link href="/#pricing" className="nav-link">Pricing</Link></li>
            <li><Link href="/resources" className="nav-link">Resources</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
          
          {/* Plan Badge - always visible, premium styling */}
          {isAuthenticated && !planLoading && (
            <div className={`hidden md:flex items-center ml-6 mr-2 px-3 py-1 rounded-full font-bold tracking-wide uppercase ${planBadgeClass}`}
              style={{ minWidth: 100, letterSpacing: 1, position: 'relative', zIndex: 20, boxShadow: '0 2px 8px 0 rgba(127,90,240,0.10)', whiteSpace: 'nowrap', color: '#181818', textShadow: 'none', borderRadius: '18px', fontSize: '0.95rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {planIcon}
              <span className="shine-text" style={{ background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset', backgroundClip: 'unset', fontSize: 'inherit', whiteSpace: 'nowrap' }}>{planDisplay}</span>
            </div>
          )}

          <div className="nav-actions">
            <button className="theme-toggle btn btn-ghost" onClick={() => window.toggleTheme && window.toggleTheme()}>
              🌙
            </button>
            
            {/* Show auth buttons when not authenticated */}
            {!isAuthenticated && (
              <>
                <a href="#" className="btn btn-ghost" onClick={() => openModal('login-modal')}>Sign In</a>
                <a href="#" className="btn btn-primary" onClick={() => openModal('signup-modal')}>Get Started</a>
              </>
            )}
            
            {/* Profile Dropdown (show when authenticated) */}
            {isAuthenticated && (
              <div className={`profile-dropdown ${isProfileDropdownOpen ? 'active' : ''}`} id="profileDropdown">
                <button className="profile-btn btn btn-ghost" id="profileBtn" onClick={toggleProfileDropdown}>
                  <span className="profile-avatar">👤</span>
                  <span className="profile-name">{getDisplayName()}</span>
                  <span className={`profile-arrow ${isProfileDropdownOpen ? 'rotate' : ''}`}>▼</span>
                </button>
                <div className={`profile-menu ${isProfileDropdownOpen ? 'show' : ''}`} id="profileMenu">
                  <Link href="/dashboard" className="profile-menu-item" onClick={closeProfileDropdown}>
                    <span className="profile-menu-icon">🎯</span>
                    Dashboard
                  </Link>
                  <Link href="/contact" className="profile-menu-item" onClick={closeProfileDropdown}>
                    <span className="profile-menu-icon">👤</span>
                    Profile Settings
                  </Link>
                  <Link href="/billing" className="profile-menu-item" onClick={closeProfileDropdown}>
                    <span className="profile-menu-icon">💳</span>
                    Billing
                  </Link>
                  <Link href="/help" className="profile-menu-item" onClick={closeProfileDropdown}>
                    <span className="profile-menu-icon">❓</span>
                    Help & Support
                  </Link>
                  <div className="profile-menu-divider"></div>
                  <button className="profile-menu-item" onClick={(e) => { e.preventDefault(); closeProfileDropdown(); handleSignOut(e); }}>
                    <span className="profile-menu-icon">🚪</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>☰</button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(20,20,30,0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            color: 'white',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontSize: '20px',
            overflowY: 'auto',
          }}>
            {/* Mobile Menu Header */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 24px 12px 24px', borderBottom: '1px solid rgba(127,90,240,0.15)', background: 'rgba(36,41,46,0.7)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Image src="/assets/images/logo (2).png" alt="HustleHack AI Logo" width={36} height={36} style={{ borderRadius: 12, boxShadow: '0 2px 8px #7F5AF0' }} />
                <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: 1, color: '#7F5AF0', textShadow: '0 2px 8px #7F5AF0' }}>HustleHack AI</span>
              </div>
              <button onClick={closeMobileMenu} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, borderRadius: 8, padding: 4, transition: 'background 0.2s', cursor: 'pointer' }} aria-label="Close Menu">
                <span style={{ display: 'inline-block', transform: 'rotate(45deg)', fontSize: 32, fontWeight: 700 }}>+</span>
              </button>
            </div>
            {/* Plan Badge (mobile) */}
            {isAuthenticated && !planLoading && (
              <div className={`flex items-center mt-6 mb-2 px-3 py-1 rounded-full font-bold tracking-wide uppercase ${planBadgeClass}`}
                style={{ minWidth: 100, letterSpacing: 1, boxShadow: '0 2px 8px 0 rgba(127,90,240,0.10)', whiteSpace: 'nowrap', color: '#181818', textShadow: 'none', borderRadius: '18px', fontSize: '0.95rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {planIcon}
                <span className="shine-text" style={{ background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset', backgroundClip: 'unset', fontSize: 'inherit', whiteSpace: 'nowrap' }}>{planDisplay}</span>
              </div>
            )}
            {/* Mobile Menu Links */}
            <div style={{ width: '100%', marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '18px 0', width: '100%', textAlign: 'left', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}>
                🏠 Home
              </Link>
              <Link href="/#features" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '18px 0', width: '100%', textAlign: 'left', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}>
                ✨ Features
              </Link>
              <Link href="/#pricing" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '18px 0', width: '100%', textAlign: 'left', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}>
                💰 Pricing
              </Link>
              <Link href="/resources" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '18px 0', width: '100%', textAlign: 'left', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}>
                📚 Resources
              </Link>
              <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '18px 0', width: '100%', textAlign: 'left', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}>
                ℹ️ About
              </Link>
              <Link href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '18px 0', width: '100%', textAlign: 'left', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24 }}>
                📞 Contact
              </Link>
              {isAuthenticated && (
                <>
                  <div style={{ color: '#7F5AF0', fontWeight: 700, fontSize: 18, margin: '32px 0 8px 0', width: '100%', textAlign: 'center', letterSpacing: 1 }}>Account</div>
                  <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '16px 0', width: '100%', textAlign: 'center', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    🎯 Dashboard
                  </Link>
                  <Link href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '16px 0', width: '100%', textAlign: 'center', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    👤 Profile Settings
                  </Link>
                  <Link href="/billing" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '16px 0', width: '100%', textAlign: 'center', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    💳 Billing
                  </Link>
                  <Link href="/help" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 600, padding: '16px 0', width: '100%', textAlign: 'center', borderBottom: '1px solid rgba(127,90,240,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    ❓ Help & Support
                  </Link>
                  <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: '#FF5A5F', fontWeight: 700, fontSize: 20, width: '100%', textAlign: 'center', padding: '16px 0', marginTop: 8, cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' }}>
                    🚪 Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
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
          
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" id="loginEmail" className="form-input" placeholder="Enter your email" required />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-input-container">
                <input type="password" id="loginPassword" className="form-input" placeholder="Enter your password" required />
                <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('loginPassword')}>
                  👁️
                </button>
              </div>
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
          <button className="modal-close" onClick={() => closeModal('signup-modal')}>&times;</button>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>🚀 Start Your Journey</h2>
          
          <form id="signupForm">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" id="name" className="form-input" placeholder="Your Name" required />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Your Email" required />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-input-container">
                <input type="password" id="password" className="form-input" placeholder="Password" required />
                <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('password')}>
                  👁️
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">I am a...</label>
              <select id="role" className="form-input" required>
                <option value="">Select your role</option>
                <option value="Student">Student</option>
                <option value="Content Creator">Content Creator</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Hustler">Hustler</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }} id="signupBtn">
              <span className="btn-text">Create Account</span>
              <span className="btn-loading" style={{ display: 'none' }}>Creating Account...</span>
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'var(--gray-400)' }}>Already have an account? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }} onClick={switchToLogin}>Sign In</a></p>
            </div>
          </form>
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
 