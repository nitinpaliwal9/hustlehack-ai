'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { useState, useEffect, useRef, MouseEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Sparkles } from 'lucide-react';
import { useUserPlan } from '../hooks/useAuth';
import { getPlanDisplayName } from '../planUtils';
import PlanBadgeModal from '@/app/components/PlanBadgeModal';
import zxcvbn from 'zxcvbn';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
const BLOG_CATEGORIES = [
  {
    name: 'AI for Creators',
    slug: 'ai-for-creators',
    description: 'Tips on leveraging AI to build & grow as a content creator.',
  },
  {
    name: 'Hustle Strategies',
    slug: 'hustle-strategies',
    description: 'Side hustles, passive income hacks, and success stories.',
  },
  {
    name: 'Design & Branding',
    slug: 'design-branding',
    description: 'Canva, visuals, personal brand building with AI.',
  },
  {
    name: 'Marketing & Growth',
    slug: 'marketing-growth',
    description: 'Organic + paid growth, funnel tactics, retention tips.',
  },
  {
    name: 'AI Tools & Reviews',
    slug: 'ai-tools-reviews',
    description: 'Deep-dives, comparisons, and usage tips for AI tools.',
  },
  {
    name: 'Freelancing & Clients',
    slug: 'freelancing-clients',
    description: 'Client acquisition, service delivery, scaling freelance.',
  },
  {
    name: 'Productivity & Mindset',
    slug: 'productivity-mindset',
    description: 'High-performance habits, routines, and focus with AI.',
  },
  {
    name: 'Behind HustleHack AI',
    slug: 'behind-hustlehack-ai',
    description: 'Product updates, team insights, founder thoughts.',
  },
];

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
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogOverlayOpen, setBlogOverlayOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  
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

  // Close dropdown on outside click or ESC
  useEffect(() => {
    function handleClick(e) {
      if (isProfileDropdownOpen && dropdownRef.current && dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setIsProfileDropdownOpen(false);
    }
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isProfileDropdownOpen]);

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

  // Plan badge mapping
  const getPlanBadge = (plan) => {
    if (!isAuthenticated || !plan || plan === 'Not active') return null;
    if (plan === 'pro') {
      return (
        <span
          className="hidden sm:inline-block ml-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-yellow-400 shadow-sm align-middle bg-white/5 premium-gold-text hover:animate-shimmer"
          title="You're on the PRO HACKER plan – Enjoy unlimited tools!"
          style={{ fontVariant: 'small-caps', letterSpacing: '0.08em' }}
        >
          <span className="premium-gold-text-gradient">PRO HACKER</span>
        </span>
      );
    }
    if (plan === 'creator') {
      return (
        <span
          className="hidden sm:inline-block ml-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#7F5AF0] to-[#6B46C1] text-white border border-[#7F5AF0] shadow-sm align-middle"
          title="Your current HustleHack AI plan."
          style={{ fontVariant: 'small-caps', letterSpacing: '0.08em' }}
        >
          CREATOR
        </span>
      );
    }
    if (plan === 'starter') {
      return (
        <span
          className="hidden sm:inline-block ml-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-teal-400 via-gray-700 to-gray-900 text-white border-2 border-teal-400 shadow align-middle"
          title="Your current HustleHack AI plan."
          style={{ fontVariant: 'small-caps', letterSpacing: '0.08em' }}
        >
          STARTER
        </span>
      );
    }
    return null;
  };

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

  // Add state for mobile nav
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Robust dropdown: state for disabling buttons and error feedback
  const [dropdownBusy, setDropdownBusy] = useState(false);
  const [dropdownError, setDropdownError] = useState('');

  // Keyboard navigation for dropdown
  useEffect(() => {
    if (!isProfileDropdownOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsProfileDropdownOpen(false);
      // Arrow key navigation
      const items = document.querySelectorAll('.profile-dropdown button');
      if (!items.length) return;
      const active = document.activeElement;
      let idx = Array.from(items).indexOf(active);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
      } else if (e.key === 'Tab') {
        // Trap focus
        if (e.shiftKey && idx === 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && idx === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isProfileDropdownOpen]);

  // Log router for debugging
  console.log('[Navigation] router:', router);

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
      <nav className="sticky top-0 z-50 w-full border-b border-[#232946]/70 bg-[#0A1020]">
        {/* Desktop Navbar - Three Section Horizontal Layout */}
        <div className="hidden md:block w-full bg-[#0A1020]">
          <div className="flex items-center justify-between px-6 pt-4 pb-2 w-full">
            {/* Left: Brand/Logo */}
            <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
              <Link href="/" aria-label="Go to Home" onClick={e => {
                e.preventDefault();
                if (window.location.pathname === "/") {
                  router.refresh();
                } else {
                  router.push("/");
                  setTimeout(() => router.refresh(), 100);
                }
              }} className="flex items-center gap-2 cursor-pointer select-none min-w-0">
                <Image src="/logo (2).webp" alt="HustleHack AI Logo" className="w-8 h-8" width={32} height={32} />
                <span className="text-xl font-bold ml-2 text-gradient whitespace-nowrap">HustleHack AI</span>
              </Link>
            </div>
            {/* Center: 2x5 Nav Links Grid as a block */}
            <div className="flex-1 flex justify-center items-center">
              <ul className="flex gap-6 text-[16px] font-semibold min-w-0 whitespace-nowrap items-center">
                <li><Link href="/" className={`nav-link pointer-events-auto ${currentPath === '/' ? 'active' : ''}`}>Home</Link></li>
                <li><Link href="/features" className={`nav-link pointer-events-auto ${currentPath === '/features' ? 'active' : ''}`}>Features</Link></li>
                <li><Link href="/ai-products" className={`nav-link pointer-events-auto ${currentPath === '/ai-products' ? 'active' : ''}`}>Tools</Link></li>
                <li><Link href="/pricing" className={`nav-link pointer-events-auto ${currentPath === '/pricing' ? 'active' : ''}`}>Pricing</Link></li>
                <li className="relative group">
                  <Link href="/resources" className={`nav-link pointer-events-auto ${currentPath.startsWith('/resources') ? 'active' : ''}`}>Resources</Link>
                  <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-[#181A2A] border border-[#232946]/40 rounded-lg shadow-lg min-w-[180px] z-50">
                    <Link href="/resources/blog" className="block px-4 py-2 text-sm text-white hover:bg-[#232946] rounded-t-lg">Blog</Link>
                    <Link href="/resources/ebooks" className="block px-4 py-2 text-sm text-white hover:bg-[#232946]">eBooks</Link>
                    <Link href="/resources" className="block px-4 py-2 text-sm text-white hover:bg-[#232946] rounded-b-lg">All Resources</Link>
                  </div>
                </li>
              </ul>
            </div>
            {/* Right: Plan badge + actions */}
            <div className="flex items-center gap-4 ml-auto min-w-0 flex-shrink-0">
              <button 
                className="plan-badge px-4 py-2 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold shadow-lg transition-all whitespace-nowrap"
                onClick={() => setIsModalOpen(true)}
              >
                Creator Plan
              </button>
              <PlanBadgeModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
              {isAuthenticated && (
                <div className="hidden md:inline-flex relative" style={{ marginLeft: 8 }}>
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#232946] hover:bg-[#151a28] text-white font-semibold shadow transition text-base focus:outline-none"
                    onClick={toggleProfileDropdown}
                    aria-haspopup="true"
                    aria-expanded={isProfileDropdownOpen}
                    aria-label="Account Menu"
                  >
                    <span role="img" aria-label="Profile">👤</span>
                    Account
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {isProfileDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="profile-dropdown absolute right-0 mt-2 w-56 bg-[#181A2A] border border-[#232946]/40 rounded-xl shadow-lg z-50 animate-fade-in"
                      role="menu"
                      aria-label="Account options"
                    >
                      {dropdownError && (
                        <div className="px-5 py-2 text-red-400 text-sm font-semibold">{dropdownError}</div>
                      )}
                      <button
                        className="block w-full text-left px-5 py-3 text-white hover:bg-[#232946] rounded-t-xl transition"
                        onMouseDown={async () => {
                          if (dropdownBusy) return;
                          setDropdownBusy(true);
                          setDropdownError('');
                          try {
                            setIsProfileDropdownOpen(false);
                            await router.push('/dashboard');
                          } catch (err) {
                            setDropdownError('Failed to navigate. Please try again.');
                          } finally {
                            setDropdownBusy(false);
                          }
                        }}
                        disabled={dropdownBusy}
                        tabIndex={0}
                        role="menuitem"
                      >Dashboard</button>
                      <button
                        className="block w-full text-left px-5 py-3 text-white hover:bg-[#232946] transition"
                        onMouseDown={async () => {
                          if (dropdownBusy) return;
                          setDropdownBusy(true);
                          setDropdownError('');
                          try {
                            setIsProfileDropdownOpen(false);
                            await router.push('/profile');
                          } catch (err) {
                            setDropdownError('Failed to navigate. Please try again.');
                          } finally {
                            setDropdownBusy(false);
                          }
                        }}
                        disabled={dropdownBusy}
                        tabIndex={0}
                        role="menuitem"
                      >Profile Settings</button>
                      <button
                        className="block w-full text-left px-5 py-3 text-white hover:bg-[#232946] transition"
                        onMouseDown={async () => {
                          if (dropdownBusy) return;
                          setDropdownBusy(true);
                          setDropdownError('');
                          try {
                            setIsProfileDropdownOpen(false);
                            await router.push('/my-plans');
                          } catch (err) {
                            setDropdownError('Failed to navigate. Please try again.');
                          } finally {
                            setDropdownBusy(false);
                          }
                        }}
                        disabled={dropdownBusy}
                        tabIndex={0}
                        role="menuitem"
                      >Billing</button>
                      <button
                        onMouseDown={async (e) => {
                          if (dropdownBusy) return;
                          setDropdownBusy(true);
                          setDropdownError('');
                          try {
                            setIsProfileDropdownOpen(false);
                            await handleSignOut(e);
                          } catch (err) {
                            setDropdownError('Failed to logout. Please try again.');
                          } finally {
                            setDropdownBusy(false);
                          }
                        }}
                        className="w-full text-left px-5 py-3 text-red-400 hover:bg-[#232946] rounded-b-xl transition"
                        disabled={dropdownBusy}
                        tabIndex={0}
                        role="menuitem"
                      >Logout</button>
                    </div>
                  )}
                </div>
              )}
              {!isAuthenticated && (
                <div className="hidden md:flex gap-2 items-center ml-2">
                  <button
                    className="px-4 py-2 rounded-2xl bg-transparent border border-white/60 text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition"
                    onClick={signInWithGoogle}
                  >
                    <span className="inline-block align-middle" style={{width: 22, height: 22}}>
                      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path d="M44.5 20H24v8.5h11.7C34.7 32.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.7 6.2 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" fill="#FFC107"/>
                          <path d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c2.6 0 5 .8 7 2.3l6.4-6.4C33.7 6.2 29.1 4 24 4c-7.1 0-13.1 3.7-16.7 9.3z" fill="#FF3D00"/>
                          <path d="M24 44c5.9 0 10.8-1.9 14.4-5.1l-6.6-5.4C29.2 35.7 26.7 36.5 24 36.5c-6.1 0-10.7-4.1-12.5-9.6l-7 5.4C7.9 40.3 15.3 44 24 44z" fill="#4CAF50"/>
                          <path d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C17.3 41.9 20.5 44 24 44c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" fill="#1976D2"/>
                        </g>
                      </svg>
                    </span>
                    <span>Continue with Google</span>
                  </button>
                  <Link
                    href="/plans"
                    className="px-4 py-2 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-center shadow-lg transition"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Navbar */}
        <div className="md:hidden w-full bg-[#0A1020] border-b border-[#232946]/70">
          {/* Row 1: Logo + Plan Badge + Menu Toggle */}
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" aria-label="Go to Home" onClick={e => {
              e.preventDefault();
              if (window.location.pathname === "/") {
                router.refresh();
              } else {
                router.push("/");
                setTimeout(() => router.refresh(), 100);
              }
            }} className="flex items-center gap-2 cursor-pointer select-none">
              <Image src="/logo (2).webp" alt="HustleHack AI Logo" className="w-8 h-8" width={32} height={32} />
              <span className="text-lg font-bold ml-2 text-gradient">HustleHack AI</span>
            </Link>
            {isAuthenticated && !planLoading && (
              <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold bg-[#7F5AF0]/20 text-[#7F5AF0]">
                {planDisplay}
              </span>
            )}
            {/* Mobile Profile Avatar */}
            {isAuthenticated && (
              <button
                className="ml-2 flex items-center justify-center rounded-full bg-[#232136] w-10 h-10 text-2xl md:hidden border border-[#2d2a45] focus:outline-none focus:ring-2 focus:ring-[#7F5AF0]"
                onClick={() => setIsProfileDropdownOpen(v => !v)}
                aria-label="Open profile menu"
              >
                <span role="img" aria-label="Profile">👤</span>
              </button>
            )}
            <button
              className="ml-auto text-white text-2xl focus:outline-none"
              onClick={() => setMobileNavOpen(v => !v)}
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? '✕' : '☰'}
            </button>
          </div>
          {/* Row 2: Scrollable nav pills */}
          <div className={`transition-all duration-300 ${mobileNavOpen ? 'max-h-32 py-2' : 'max-h-0 py-0'} overflow-hidden`}> 
            <div className="flex overflow-x-auto gap-2 px-2 pb-2 scrollbar-hide whitespace-nowrap">
              {[
                { href: '/', label: 'Home' },
                { href: '/features', label: 'Features' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/instant-hustle', label: 'Instant Hustle Lite' },
                { href: '/client-finder', label: 'Client Finder' },
                { href: '/resources', label: 'Resources' },
                { href: '/ai-products', label: 'AI Products', badge: 'HOT', accent: true },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/blog', label: 'Blog' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-block px-4 py-2 rounded-full font-medium text-sm transition-colors bg-[#232136] text-gray-100 hover:bg-[#7F5AF0] hover:text-white ${currentPath === link.href ? 'bg-[#7F5AF0] text-white' : ''} ${link.accent ? 'font-bold text-[#377DFF] border border-[#377DFF] bg-[#377DFF]/10' : ''}`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {link.label}
                  {link.badge && <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-[#377DFF]/10 text-[#377DFF]">{link.badge}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Sign In / Get Started CTA for mobile - removed as per request */}
      </nav>
      {/* Mobile Profile Overlay (outside nav for correct JSX structure) */}
      {isProfileDropdownOpen && (
        <div className="fixed inset-0 z-[999] flex items-end md:hidden" style={{ background: 'rgba(24,24,36,0.92)' }}>
          <div className="w-full rounded-t-2xl bg-[#18181b] border-t border-[#232136] shadow-2xl animate-slideup-profile p-6">
            <div className="flex flex-col gap-2">
              <button
                className="w-full text-left px-4 py-4 text-lg text-gray-100 rounded-lg hover:bg-[#232136] transition"
                onClick={e => { e.preventDefault(); setIsProfileDropdownOpen(false); router.push('/dashboard'); }}
              >Dashboard</button>
              <button
                className="w-full text-left px-4 py-4 text-lg text-gray-100 rounded-lg hover:bg-[#232136] transition"
                onClick={e => { e.preventDefault(); setIsProfileDropdownOpen(false); router.push('/my-plans'); }}
              >My Plan</button>
              <button
                className="w-full text-left px-4 py-4 text-lg text-gray-100 rounded-lg hover:bg-[#232136] transition"
                onClick={e => { e.preventDefault(); setIsProfileDropdownOpen(false); router.push('/profile'); }}
              >Account Settings</button>
              <button
                className="w-full text-left px-4 py-4 text-lg text-red-400 rounded-lg hover:bg-[#232136] transition"
                onClick={async e => { e.preventDefault(); setIsProfileDropdownOpen(false); await handleSignOut(e); }}
              >Sign Out</button>
            </div>
            <button
              className="mt-6 w-full py-3 rounded-lg bg-[#232136] text-gray-400 text-base font-medium hover:bg-[#232136]/80 transition"
              onClick={() => setIsProfileDropdownOpen(false)}
            >Close</button>
          </div>
          {/* Overlay background click closes menu */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsProfileDropdownOpen(false)} />
        </div>
      )}
      <style jsx global>{`
        @keyframes slideup-profile {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideup-profile {
          animation: slideup-profile 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </>
  )
}
 