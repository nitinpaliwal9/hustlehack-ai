'use client'

import { LazyComponent, LazyNavigation, LazyFooter, LazyLoadingSpinner } from './components/LazyComponent'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import Image from 'next/image'
import PoweredByBar from './components/PoweredByBar';

export default function HomePage() {
  const { signInWithGoogle, user, isLoading } = useAuth()
  const router = useRouter()
  const [openFAQ, setOpenFAQ] = useState(Array(6).fill(false));
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Debug navigation
  useEffect(() => {
    console.log('🏠 HomePage mounted/re-rendered')
  })
  
  // Check user profile completion status
  const checkUserProfile = async (userId) => {
    if (!userId) return null;
    
    try {
      setProfileLoading(true);
      const { data: profile, error } = await supabase
        .from('users')
        .select('id, name, email, role, profile_completed, phone')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Error checking user profile:', error);
        return null;
      }

      return profile;
    } catch (error) {
      console.error('Error in checkUserProfile:', error);
      return null;
    } finally {
      setProfileLoading(false);
    }
  };

  // Load client utilities on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let lastFocus = Date.now();
    const loadClientUtils = () => {
      // Check if script is already loaded
      const existingScript = document.querySelector('script[src="/js/client-utils.js"]')
      if (existingScript) {
        console.log('Client utils script already loaded')
        // Re-initialize client utilities even if script exists
        if (typeof window.initializeClientUtils === 'function') {
          window.initializeClientUtils()
        }
        return
      }
      const script = document.createElement('script')
      script.src = '/js/client-utils.js'
      script.async = true
      script.onload = () => {
        console.log('Client utils loaded successfully')
        // Initialize client utilities after script loads
        if (typeof window.initializeClientUtils === 'function') {
          window.initializeClientUtils()
        }
      }
      script.onerror = (error) => {
        console.error('Error loading client utils:', error)
      }
      document.head.appendChild(script)
    }
    // Load client utilities
    loadClientUtils()
    // Debounced re-initialization on tab focus
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocus > 30000) { // Only re-init if >30s since last focus
        if (typeof window.initializeClientUtils === 'function') {
          window.initializeClientUtils();
        }
      }
      lastFocus = now;
    };
    window.addEventListener('focus', handleFocus);
    // Re-initialize on route changes
    const handleRouteChange = () => {
      setTimeout(() => {
        if (typeof window.initializeClientUtils === 'function') {
          window.initializeClientUtils()
        }
      }, 100)
    }
    window.addEventListener('popstate', handleRouteChange)
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // Check user profile when user changes
  useEffect(() => {
    if (user?.id) {
      checkUserProfile(user.id).then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [user]);

  // Handle route changes and re-initialization
  useEffect(() => {
    const handleRouteChange = () => {
      // Re-initialize client utilities on route change
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.initializeClientUtils === 'function') {
          window.initializeClientUtils()
        }
      }, 100)
    }

    // Listen for route changes
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handleRouteChange)
      
      // Also handle pushstate events
      const originalPushState = history.pushState
      history.pushState = function(...args) {
        originalPushState.apply(history, args)
        handleRouteChange()
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handleRouteChange)
      }
    }
  }, [])

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      console.log('🚀 Starting Google sign-in...')
      
      // Show loading notification
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('🔄 Redirecting to Google...', 'info', 2000)
      }
      
      await signInWithGoogle()
      console.log('✅ Google sign-in initiated successfully')
    } catch (error) {
      console.error('❌ Google sign-in failed:', error)
      
      // Show error notification
      if (typeof window !== 'undefined' && window.showNotification) {
        let errorMessage = 'Google sign-in failed. Please try again.'
        
        if (error.message.includes('not configured')) {
          errorMessage = 'Google OAuth not configured. Please check setup guide.'
        } else if (error.message.includes('popup')) {
          errorMessage = 'Please allow popups and try again.'
        }
        
        window.showNotification(`❌ ${errorMessage}`, 'error', 5000)
      }
    }
  }
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  }

  if (isLoading || profileLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LazyLoadingSpinner message="Loading..." />
      </div>
    );
  }
  
  return (
    <div className="overflow-x-hidden w-full" key={typeof window !== 'undefined' ? window.location.pathname : 'homepage'}>
      <LazyNavigation />

      {/* Hero Section */}
      <header className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center px-3 sm:px-0 py-10 sm:py-20 overflow-hidden">
        {/* Animated background overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle animated particles (CSS or SVG) */}
          <div className="absolute inset-0 animate-fade-in" style={{background: 'radial-gradient(ellipse at 60% 30%, #7F5AF022 0%, transparent 70%), radial-gradient(ellipse at 30% 80%, #00FFC222 0%, transparent 70%)'}} />
          {/* Faint vertical gradient for separation */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#181A2A] via-transparent to-[#232946] opacity-80" />
        </div>
        <Image
          src="/hero_section.webp"
          alt="HustleHack AI – AI tools for creators, students & solopreneurs"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 z-0" />
        <div className="relative z-10 max-w-2xl w-full px-3 sm:px-6 text-center flex flex-col items-center justify-center">
          {/* Animated Credibility Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-7 rounded-full bg-white/95 shadow-lg border border-[#7F5AF0]/20 text-[#232946] font-semibold text-xs sm:text-sm tracking-wide uppercase animate-slide-fade-down hero-badge-glow" style={{fontFamily:'Inter, Sora, sans-serif', letterSpacing:'0.06em', boxShadow:'0 2px 16px 0 #00FFC2AA, 0 1px 8px 0 #7F5AF0AA'}}>
            <span className="text-lg">✅</span>
            <span className="font-bold text-[#1a237e]" style={{fontWeight:700}}> #1 AI Tool </span>
            <span className="hidden xs:inline">for</span>
            <span className="ml-1 whitespace-nowrap">Indian Creators & Students</span>
          </div>
          {/* Headline with gradient AI */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 sm:mb-7 animate-fade-in-up" style={{letterSpacing:'-0.01em'}}>
            <span className="shimmer-text">Build.</span> Launch. <span className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] bg-clip-text text-transparent drop-shadow-lg">AI</span>. <span className="shimmer-text">Earn</span>
          </h1>
          {/* Subheadline */}
          <p className="mt-0 sm:mt-2 text-sm sm:text-base md:text-lg text-white/90 mb-8 sm:mb-10 font-light animate-fade-in-up-2" style={{fontWeight:400, color:'#e5e7eb'}}>
            Tools, templates & growth packs for students and creators.
          </p>
          {/* CTA Buttons (3 only) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-2 sm:mt-4 w-full">
            <Link href="/instant-hustle" className="w-full sm:w-auto max-w-xs sm:min-w-[200px] flex items-center justify-center gap-2 rounded-full font-extrabold text-base sm:text-lg px-7 sm:px-10 py-3 sm:py-4 shadow-xl border-2 border-[#7F5AF0]/30 bg-gradient-to-br from-white/80 via-[#E9E4F0]/80 to-[#7F5AF0]/20 text-[#232946] hover:from-[#FFD700]/90 hover:to-[#7F5AF0]/40 hover:text-[#1a1333] focus:outline-none transition-all duration-200 backdrop-blur-md hover:scale-105">
              <span className="inline-block text-xl align-middle">🚀</span> Start with Hustle Lite
            </Link>
            <Link href="#features" className="w-full sm:w-auto max-w-xs sm:min-w-[200px] flex items-center justify-center gap-2 rounded-full font-extrabold text-base sm:text-lg px-7 sm:px-10 py-3 sm:py-4 shadow-xl border-2 border-[#00FFC2]/30 bg-gradient-to-br from-white/80 via-[#E9E4F0]/80 to-[#00FFC2]/20 text-[#232946] hover:from-[#FFD700]/90 hover:to-[#00FFC2]/40 hover:text-[#1a1333] focus:outline-none transition-all duration-200 backdrop-blur-md hover:scale-105" onClick={e => {e.preventDefault(); const el=document.getElementById('features'); if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}}>
              <span className="inline-block text-xl align-middle">🧠</span> Explore AI Tools
            </Link>
            <Link href="#pricing" className="w-full sm:w-auto max-w-xs sm:min-w-[200px] flex items-center justify-center gap-2 rounded-full font-extrabold text-base sm:text-lg px-7 sm:px-10 py-3 sm:py-4 shadow-xl border-2 border-[#FFD700]/40 bg-gradient-to-br from-white/80 via-[#E9E4F0]/80 to-[#FFD700]/20 text-[#232946] hover:from-[#FFD700]/90 hover:to-[#7F5AF0]/40 hover:text-[#1a1333] focus:outline-none transition-all duration-200 backdrop-blur-md hover:scale-105" onClick={e => {e.preventDefault(); const el=document.getElementById('pricing'); if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}}>
              <span className="inline-block text-xl align-middle">📚</span> Access Resources
            </Link>
          </div>
        </div>
        {/* Hero Animations and Royal Button Styles */}
        <style jsx>{`
          .hero-btn-royal {
            @apply flex items-center justify-center gap-2 rounded-full font-extrabold text-base sm:text-lg px-7 sm:px-10 py-3 sm:py-4 shadow-xl transition-all duration-200 border-2 border-transparent bg-gradient-to-br from-[#fff]/80 via-[#E9E4F0]/80 to-[#7F5AF0]/20 text-[#232946] hover:from-[#FFD700]/90 hover:to-[#7F5AF0]/40 hover:text-[#1a1333] focus:outline-none;
            background: linear-gradient(120deg, #fff 60%, #E9E4F0 80%, #7F5AF0 100%);
            color: #232946;
            border: 2px solid rgba(127,90,240,0.12);
            box-shadow: 0 2px 24px 0 #7F5AF055, 0 1.5px 8px 0 #FFD70033, 0 0 0 1.5px #fff inset;
            font-family: 'Sora', 'Inter', sans-serif;
            font-weight: 800;
            letter-spacing: 0.01em;
            position: relative;
            z-index: 1;
            overflow: hidden;
          }
          .hero-btn-royal:before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: linear-gradient(120deg, #FFD70055 0%, #7F5AF055 100%);
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 0;
          }
          .hero-btn-royal:hover, .hero-btn-royal:focus {
            color: #1a1333;
            border-color: #FFD700;
            box-shadow: 0 4px 32px 0 #FFD70055, 0 2px 16px 0 #7F5AF0AA, 0 0 0 2px #FFD700 inset;
            background: linear-gradient(120deg, #FFD700 60%, #E9E4F0 80%, #7F5AF0 100%);
          }
          .hero-btn-royal:hover:before, .hero-btn-royal:focus:before {
            opacity: 0.18;
          }
          .hero-btn-royal span {
            position: relative;
            z-index: 2;
            font-size: 1.25em;
            margin-right: 0.25em;
          }
        `}</style>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="section py-24" role="region" aria-label="How HustleHack AI works">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="section-title premium-heading mb-2" tabIndex="0">How It Works</h2>
          <p className="section-subtitle text-lg text-gray-300 mb-10" tabIndex="0">Get started with HustleHack AI in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">🔍</span>
              <h3 className="card-title premium-heading mb-2">Pick Your Plan</h3>
              <p className="card-description text-gray-200">Choose from our flexible plans designed for different needs and budgets. Start with basics or go pro.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">🎁</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Unlock Tools & Resources</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Access AI tools, templates, prompts, and exclusive content to supercharge your productivity.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">🚀</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Grow & Scale</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Apply your newfound skills to grow your studies, side hustles, and creative projects faster than ever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section py-24" role="region" aria-label="Platform features">
        <div className="container max-w-7xl mx-auto px-6">
          <h2 className="section-title premium-heading mb-2" tabIndex="0">Why Choose HustleHack AI?</h2>
          <p className="section-subtitle text-lg text-gray-300 mb-10" tabIndex="0">Everything you need to succeed in the AI-driven world</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-xl sm:text-2xl mb-1 sm:mb-2 block">✨</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-sm sm:text-base md:text-lg break-words min-w-0 max-w-full">Weekly AI Drops</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Fresh AI tools, prompts, and resources delivered weekly to keep you ahead of the curve.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">🛠️</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Tools & Templates</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Ready-to-use templates, blueprints, and automation tools for instant productivity boost.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">📚</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Study & Creator Resources</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Comprehensive guides, tutorials, and resources for students and content creators.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">🧠</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Learn AI on the Go</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Mobile-friendly platform with bite-sized learning modules that fit your schedule.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">🎯</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Personalized Learning</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">AI-powered recommendations based on your interests and learning goals.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">🌟</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Community Access</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Connect with like-minded hustlers, get feedback, and collaborate on projects.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">💡</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Innovation Hub</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Access to cutting-edge AI tools and beta features before they go mainstream.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-2xl sm:text-3xl mb-2 sm:mb-4 block">🏆</span>
              <h3 className="card-title premium-heading mb-1 sm:mb-2 text-base sm:text-lg md:text-xl">Success Tracking</h3>
              <p className="card-description text-gray-200 text-sm sm:text-base">Track your progress, achievements, and growth with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section py-24 relative" role="region" aria-label="Pricing plans">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 z-0 animate-bg-gradient" style={{ pointerEvents: 'none', opacity: 0.5 }} />
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <h2 className="section-title premium-heading mb-2" tabIndex="0">Choose Your Plan</h2>
          <p className="section-subtitle text-lg text-gray-300 mb-10" tabIndex="0">Flexible pricing that grows with your ambitions</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <div className="pricing-rating">
                <div className="rating-stars" aria-label="4.2 out of 5 stars">
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star partial" aria-hidden="true">★</span>
                </div>
                <span className="rating-text">4.2/5 (2,847 reviews)</span>
              </div>
              <h3 className="pricing-title premium-plan-name">Starter Hustle</h3>
              <p className="pricing-subtitle text-gray-200">Perfect for getting started</p>
              <div className="pricing-container">
                <div className="pricing-original">₹499</div>
                <div className="pricing-current">₹99<span className="pricing-period">/month</span></div>
                <div className="pricing-discount">80% OFF</div>
              </div>
              <ul className="pricing-features">
                <li>Essential AI tools & templates</li>
                <li>Basic automation scripts</li>
                <li>Community access</li>
                <li>Email support</li>
              </ul>
              <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-outline premium-btn glow-cta" target="_blank" rel="noopener noreferrer" aria-label="Get Started with Starter Hustle">Get Started Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-rating">
                <div className="rating-stars" aria-label="4.8 out of 5 stars">
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                </div>
                <span className="rating-text">4.8/5 (5,632 reviews)</span>
              </div>
              <h3 className="pricing-title premium-plan-name">Creator Mode</h3>
              <p className="pricing-subtitle text-gray-200">For serious creators</p>
              <div className="pricing-container">
                <div className="pricing-original">₹799</div>
                <div className="pricing-current">₹199<span className="pricing-period">/month</span></div>
                <div className="pricing-discount">75% OFF</div>
              </div>
              <ul className="pricing-features">
                <li>Everything in Starter +</li>
                <li>Advanced AI workflows</li>
                <li>Premium templates library</li>
                <li>Priority support</li>
                <li>Weekly live sessions</li>
              </ul>
              <a href="https://rzp.io/rzp/atTfuqqZ" className="btn btn-primary premium-btn glow-cta" target="_blank" rel="noopener noreferrer" aria-label="Level Up with Creator Mode">Level Up Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <div className="pricing-rating">
                <div className="rating-stars" aria-label="4.5 out of 5 stars">
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star half" aria-hidden="true">★</span>
                </div>
                <span className="rating-text">4.5/5 (1,923 reviews)</span>
              </div>
              <h3 className="pricing-title premium-plan-name">Pro Hacker</h3>
              <p className="pricing-subtitle text-gray-200">Maximum firepower</p>
              <div className="pricing-container">
                <div className="pricing-original">₹1,199</div>
                <div className="pricing-current">₹299<span className="pricing-period">/month</span></div>
                <div className="pricing-discount">75% OFF</div>
              </div>
              <ul className="pricing-features">
                <li>Everything in Creator +</li>
                <li>Exclusive AI models</li>
                <li>Custom automation builds</li>
                <li>1-on-1 strategy calls</li>
                <li>VIP community access</li>
              </ul>
              <a href="https://rzp.io/rzp/nraUuNBx" className="btn btn-outline premium-btn glow-cta" target="_blank" rel="noopener noreferrer" aria-label="Go Pro with Pro Hacker">Go Pro Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section py-24" role="region" aria-label="User testimonials">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="section-title premium-heading mb-2" tabIndex="0">What Our Users Say</h2>
          <p className="section-subtitle text-lg text-gray-300 mb-10" tabIndex="0">Join thousands of students and creators who are already winning with AI</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <p className="card-description text-gray-200">&quot;HustleHack AI transformed my content creation workflow. I&apos;m now producing 3x more content with better quality!&quot;</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Priya Sharma</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Content Creator, Mumbai</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <p className="card-description text-gray-200">&quot;The AI study tools helped me crack my engineering entrance exam. The personalized learning path was a game-changer!&quot;</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Arjun Patel</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Student, Delhi</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <p className="card-description text-gray-200">&quot;My freelance business grew 5x after using HustleHack&apos;s automation tools. The ROI was incredible!&quot;</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Sneha Reddy</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Freelancer, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section py-24" role="region" aria-label="Frequently asked questions">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="section-title premium-heading mb-2" tabIndex="0">Frequently Asked Questions</h2>
          <p className="section-subtitle text-lg text-gray-300 mb-10" tabIndex="0">Everything you need to know about HustleHack AI</p>
          <div className="faq-container" role="list">
            {/* FAQ items with React state for open/close */}
            {[
              {
                q: 'What is HustleHack AI?',
                a: 'HustleHack AI is a comprehensive platform designed for young Indian students, creators, and solopreneurs. We provide AI tools, templates, prompts, and resources to help you learn faster, create better content, and grow your ventures using artificial intelligence.'
              },
              {
                q: 'How do I get started?',
                a: 'Getting started is easy! Simply choose a plan that fits your needs, sign up for an account, and you\'ll get instant access to our platform. We also provide onboarding tutorials to help you make the most of our tools.'
              },
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. You&apos;ll continue to have access to your account until the end of your current billing cycle.'
              },
              {
                q: 'Do you offer student discounts?',
                a: 'Yes! We offer special student pricing for verified students. Contact our support team with your student ID to learn more about available discounts and verification process.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners.'
              },
              {
                q: 'Is there a free trial available?',
                a: 'Yes! We offer a 7-day free trial for new users. You can explore all features and decide which plan works best for you before committing to a subscription.'
              }
            ].map((item, idx) => (
              <div className="faq-item" role="listitem" tabIndex="0" key={idx}>
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={openFAQ[idx]}
                  aria-controls={`faq-answer-${idx}`}
                >
                  {item.q}
                  <span className="faq-icon">{openFAQ[idx] ? '-' : '+'}</span>
                </button>
                <div
                  className={`faq-answer${openFAQ[idx] ? ' show' : ''}`}
                  id={`faq-answer-${idx}`}
                  hidden={!openFAQ[idx]}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section py-24" style={{background: 'linear-gradient(135deg, #7F5AF0, #00FFC2)', color: 'white'}} role="region" aria-label="Final call to action">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <h2 className="section-title premium-heading mb-2" style={{color: 'white'}} tabIndex="0">Ready to Unlock Your AI Superpowers?</h2>
          <p className="section-subtitle text-lg text-gray-200 mb-10" style={{color: 'white', opacity: 0.9}} tabIndex="0">Join thousands of students and creators who are already building their future with AI</p>
          <div className="hero-actions flex flex-col md:flex-row gap-4 justify-center items-center" role="group" aria-label="Final actions">
            <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-lg premium-btn" style={{background: 'white', color: '#7F5AF0'}} target="_blank" rel="noopener noreferrer" aria-label="Start with Starter Hustle - ₹99">🚀 Start with Starter Hustle - ₹99</a>
            <a href="#pricing" className="btn btn-lg premium-btn" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white'}} aria-label="Compare Plans">Compare Plans</a>
          </div>
        </div>
      </section>

      {/* Powered By Bar */}
      <PoweredByBar />

      {/* Footer */}
      <LazyFooter />
      {/* Animations for gradient and confetti */}
    </div>
  )
}

