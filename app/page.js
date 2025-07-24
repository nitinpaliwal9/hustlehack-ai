'use client'

import { LazyComponent, LazyNavigation, LazyFooter, LazyLoadingSpinner } from './components/LazyComponent'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import Image from 'next/image'
import PoweredByBar from './components/PoweredByBar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const CardCarousel = dynamic(() => import('./components/card-carousel').then(mod => mod.CardCarousel), { ssr: false, loading: () => <div className="min-h-[220px] flex items-center justify-center w-full"><span className="animate-pulse text-[#7F5AF0] text-xl">Loading testimonials...</span></div> });

export default function HomePage() {
  const { signInWithGoogle, user, isLoading } = useAuth()
  const router = useRouter()
  const [openFAQ, setOpenFAQ] = useState(Array(6).fill(false));
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

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

  // Retry handler for loading errors
  const handleRetry = async () => {
    setLoadingError(null);
    setProfileLoading(true);
    try {
      if (user?.id) {
        await checkUserProfile(user.id).then(setUserProfile);
      }
    } catch (err) {
      setLoadingError('Failed to reload. Please check your connection and try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  // Listen for loading errors from useAuth (network/server issues)
  useEffect(() => {
    if (!isLoading && !profileLoading && !user && !userProfile) {
      setLoadingError('Taking longer than expected. There might be a network issue or the server is busy.');
    }
  }, [isLoading, profileLoading, user, userProfile]);

  if (isLoading || profileLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <LazyLoadingSpinner message="Loading..." />
        {loadingError && (
          <div className="mt-8 text-center">
            <div className="text-lg font-semibold text-red-400 mb-2">{loadingError}</div>
            <button
              onClick={handleRetry}
              className="px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-lg shadow-lg transition-all duration-150 mt-2"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="w-full scroll-smooth overflow-x-hidden" key={typeof window !== 'undefined' ? window.location.pathname : 'homepage'}>
      <LazyNavigation />

      {/* Hero Section with background image, overlay, and large center-aligned headline */}
      <header
        className="w-full min-h-[80vh] flex items-center justify-center px-2 sm:px-4 md:px-12 pt-20 sm:pt-28 md:pt-56 pb-8 md:pb-24 relative overflow-hidden"
        style={{
          backgroundImage: "url('/Journey from Student to Startup Founder.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top -40px',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0A1020]/80 z-0"></div>
        {/* Bottom Gradient Overlay for smooth darkness */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{background: 'linear-gradient(to bottom, rgba(10,16,32,0) 60%, rgba(10,16,32,0.95) 100%)'}}></div>
        {/* Centered Text Block, lowered to reveal faces */}
        <div className="relative z-10 w-full flex flex-col items-center justify-end text-center mt-20 sm:mt-32 md:mt-80 md:mt-[28rem] px-2" style={{maxWidth: '900px'}}>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 sm:mb-10 leading-tight tracking-tight drop-shadow-lg">
            From Student to Founder
          </h1>
          <h2 className="text-xl sm:text-3xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 sm:mb-10 leading-tight tracking-tight drop-shadow-lg">
            Your AI Growth Toolkit.
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-[#cbd5e1] mb-6 sm:mb-8 font-light drop-shadow max-w-xs sm:max-w-xl md:max-w-2xl mx-auto">HustleHack AI helps ambitious students learn faster, create smarter, and launch side hustles with AI — all in one place.</p>
          {user ? (
            <Link
              href="/dashboard"
              className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-lg sm:text-xl md:text-2xl px-6 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-lg transition-all duration-150 mt-2"
            >
              Dashboard
            </Link>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-lg sm:text-xl md:text-2xl px-6 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-lg transition-all duration-150 mt-2"
            >
              Start for Free
            </button>
          )}
        </div>
      </header>

      {/* Growth Journey Section styled like 'How it Works', with our content */}
      <section id="growth-journey" className="section py-10 sm:py-20 bg-[#0A1020]" role="region" aria-label="Growth Journey">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-[#0A1020] border border-[#232946] rounded-2xl shadow-lg p-6 md:p-14 flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 text-center">The Growth Journey</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
              <div className="flex flex-col items-center text-center px-4">
                <span className="text-4xl md:text-5xl mb-4 text-[#2563eb] flex items-center justify-center"><svg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='20' cy='20' r='20' fill='#2563eb' fillOpacity='0.15'/><path d='M20 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6c-2.67 0-8 1.34-8 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2c0-2.66-5.33-4-8-4z' fill='#2563eb'/></svg></span>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Study Smarter</h3>
                <p className="text-gray-300 text-base">AI notes, planners, exam hacks.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <span className="text-4xl md:text-5xl mb-4 text-[#2563eb] flex items-center justify-center"><svg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='20' cy='20' r='20' fill='#2563eb' fillOpacity='0.15'/><path d='M14 20h12M20 14v12' stroke='#2563eb' strokeWidth='2' strokeLinecap='round'/></svg></span>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Create Faster</h3>
                <p className="text-gray-300 text-base">Social media prompts, content planners.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <span className="text-4xl md:text-5xl mb-4 text-[#2563eb] flex items-center justify-center"><svg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='20' cy='20' r='20' fill='#2563eb' fillOpacity='0.15'/><path d='M16 24l4-4 4 4M20 16v8' stroke='#2563eb' strokeWidth='2' strokeLinecap='round'/></svg></span>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Launch Mini Startups</h3>
                <p className="text-gray-300 text-base">AI business ideas, pitch decks, MVP templates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What's Inside HustleHack AI? */}
      <section id="whats-inside" className="section py-8 sm:py-20 bg-[#0A1020]" role="region" aria-label="What's Inside HustleHack AI?">
        <div className="container max-w-6xl mx-auto px-2 sm:px-4">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 sm:mb-10 text-center">What’s Inside HustleHack AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-[#151a28] border border-[#232946] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center">
              <span className="text-5xl mb-4 text-[#2563eb]">📦</span>
              <h3 className="text-xl font-semibold text-white mb-2">Weekly Hustle Drops</h3>
              <p className="text-gray-300 text-base">New AI blueprints every week.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-[#151a28] border border-[#232946] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center">
              <span className="text-5xl mb-4 text-[#2563eb]">🗂️</span>
              <h3 className="text-xl font-semibold text-white mb-2">Done-for-you templates</h3>
              <p className="text-gray-300 text-base">Notion dashboards, content packs, startup planners.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-[#151a28] border border-[#232946] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center">
              <span className="text-5xl mb-4 text-[#2563eb]">⚡</span>
              <h3 className="text-xl font-semibold text-white mb-2">1-click study and content generators</h3>
              <p className="text-gray-300 text-base">Instantly create study notes, content, and more with a single click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Community & Social Proof */}
      <section id="community" className="section py-8 sm:py-20 bg-[#151a28]" role="region" aria-label="Community & Social Proof">
        <div className="container max-w-3xl mx-auto px-2 sm:px-4 flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-8">Join 100+ students and creators who are building with AI.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full">
            <span className="inline-flex items-center justify-center mb-3 sm:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48" fill="none">
                <g>
                  <circle cx="24" cy="24" r="24" fill="#25D366"/>
                  <path d="M34.6 29.7c-.5-.2-2.8-1.4-3.2-1.6-.4-.2-.7-.2-1 .2-.3.4-1.1 1.6-1.4 1.9-.3.3-.5.4-1 .1-2.7-1.1-4.5-3.7-5.2-4.5-.4-.5-.1-.8.2-1.1.3-.3.6-.7.9-1.1.3-.4.2-.7 0-1.1-.2-.4-1.1-2.7-1.5-3.7-.4-.9-.8-.8-1.1-.8-.3 0-.7 0-1.1 0-.4 0-1 .1-1.5.7-.5.6-2 2-2 4.8 0 2.8 2 5.5 2.3 5.9.3.4 4 6.1 9.7 8.3 1.4.6 2.5.9 3.3 1.1 1.4.4 2.7.3 3.7.2 1.1-.2 3.5-1.4 4-2.7.5-1.3.5-2.5.3-2.7-.2-.2-.5-.4-1-.6z" fill="#fff"/>
                </g>
              </svg>
            </span>
            <a
              href="https://chat.whatsapp.com/E8soXdqX3IfCeYie93qlIh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg sm:text-xl md:text-2xl px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg transition-all duration-150 w-full sm:w-auto text-center"
              style={{ boxShadow: '0 4px 24px 0 rgba(37,211,102,0.15)' }}
              aria-label="Join WhatsApp Community"
            >
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section py-10 sm:py-16 bg-[#0A1020]" role="region" aria-label="Final CTA">
        <div className="container max-w-3xl mx-auto px-2 sm:px-4 flex flex-col items-center text-center">
          <div className="relative flex justify-center items-center w-full my-8">
            <div className="relative w-full max-w-2xl flex items-center justify-center">
              <svg
                className="absolute left-0 top-0 w-full h-full z-0"
                viewBox="0 0 600 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: 'none' }}
              >
                <defs>
                  <linearGradient id="neon-gradient" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7F5AF0" />
                    <stop offset="0.5" stopColor="#00FFC2" />
                    <stop offset="1" stopColor="#7F5AF0" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect
                  x="8" y="8" width="584" height="144" rx="40"
                  stroke="url(#neon-gradient)"
                  strokeWidth="6"
                  fill="none"
                  filter="url(#glow)"
                  strokeDasharray="1200"
                  strokeDashoffset="0"
                  style={{
                    animation: 'dashmove 3s linear infinite',
                  }}
                />
                <style>{`
                  @keyframes dashmove {
                    0% { stroke-dashoffset: 1200; opacity: 1; }
                    60% { opacity: 1; }
                    80% { opacity: 0.5; }
                    100% { stroke-dashoffset: 0; opacity: 0; }
                  }
                `}</style>
              </svg>
              <div className="relative z-10 bg-[#151a28] rounded-[2rem] px-6 sm:px-12 py-10 sm:py-14 w-full flex items-center justify-center" style={{boxShadow: '0 0 32px 0 rgba(127,90,240,0.15)'}}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-0">Don’t just study. Don’t just dream. Build your future with AI.</h2>
              </div>
            </div>
          </div>
          {user ? (
            <Link
              href="/dashboard"
              className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-lg sm:text-xl md:text-2xl px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-lg transition-all duration-150 mt-8"
              aria-label="Dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-lg sm:text-xl md:text-2xl px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-lg transition-all duration-150 mt-8"
              aria-label="Start Your Hustle Today."
            >
              Start Your Hustle Today.
            </button>
          )}
        </div>
        <style jsx>{`
          .neon-border-card {
            position: relative;
            border-radius: 2rem;
            overflow: visible;
          }
          .neon-border-card::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 2rem;
            z-index: 1;
            background: none;
            pointer-events: none;
            width: calc(100% + 8px);
            height: calc(100% + 8px);
            /* Use a moving radial gradient for the glowing point */
            background: conic-gradient(from 0deg, #7F5AF0 0deg, #00FFC2 90deg, transparent 120deg, transparent 360deg);
            filter: blur(2px) brightness(1.5);
            animation: neon-glow-revolve 3s linear infinite;
            opacity: 0.9;
          }
          @keyframes neon-glow-revolve {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>

      {/* Testimonial Section - Card Carousel */}
      <section className="py-8 sm:py-10 bg-[#0A1020]">
        <div className="container max-w-4xl mx-auto px-2 sm:px-4">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-6 sm:mb-8 text-center">What Students & Creators Say</h2>
          <Suspense fallback={<div className="min-h-[220px] flex items-center justify-center w-full"><span className="animate-pulse text-[#7F5AF0] text-xl">Loading testimonials...</span></div>}>
            <CardCarousel
              images={[
                { src: '', alt: 'Tanya', text: '“I was stuck in this cycle of saving AI tools from Reels but never actually using them. HustleHack AI gave me a clean shortcut — tools, templates, and ideas that I could just plug into my college stuff and content workflow. Way less stressful now.”\n— Tanya, 1st Year BCom, Delhi' },
                { src: '', alt: 'Ansh', text: '“Bro I didn’t even know you could use ChatGPT like this. The prompt packs are literally better than those paid YouTube courses. I’ve used it for college work, captions, even DMs.”\n— Ansh, Class 12th, Kota (JEE)' },
                { src: '', alt: 'Naina', text: '“I’m a creator on Insta with like 8k followers. Earlier I’d get stuck on what to post. The Creator Mode pack gave me ideas + caption styles + even hooks I now reuse. It’s like Notion + ChatGPT but made for people like us.”\n— Naina, Fashion Creator, Mumbai' },
                { src: '', alt: 'Siddharth', text: '“I don’t like reading long PDFs. HustleHack has stuff that just makes sense — like templates for planning, studying, even writing emails. I started using it during my exam prep and didn’t expect to continue after, but I still use the stuff now.”\n— Siddharth, 1st Year BTech, Chandigarh' },
                { src: '', alt: 'Rhea', text: '“There’s too much noise on the internet. HustleHack didn’t feel like another productivity guru thing. It was chill, but useful. Like it actually helped me plan my week better and finish assignments on time.”\n— Rhea, Class 12, CBSE, Bangalore' },
                { src: '', alt: 'Aayush', text: '“Not gonna lie, I got it because of FOMO — my senior shared it in our Telegram group. But it’s actually useful. Especially the Pro Hacker tools, I used them to write a portfolio, and my internship mail got replies after weeks of ghosting.”\n— Aayush, 2nd Year CS, Pune' },
                { src: '', alt: 'Imran', text: '“I run a meme page + edit videos for side cash. HustleHack helped me figure out better scripts and even how to reply to clients. No cap, it’s like having an AI manager on the side.”\n— Imran, Freelance Editor, Lucknow' },
                { src: '', alt: 'Tanvi', text: '“Every day I was watching new AI hacks on YouTube but not using any of them. HustleHack was the first time something felt organised and ready to use. I saved hours while making my science projects.”\n— Tanvi, Class 11, Jaipur' },
                { src: '', alt: 'Ritwik', text: '“My brain feels scattered 90% of the time. HustleHack’s planners and AI shortcuts helped me actually use Notion and ChatGPT properly. I still get distracted, but now I get things done faster when I’m focused.”\n— Ritwik, 1st Year Design, Ahmedabad' },
                { src: '', alt: 'Megha', text: '“As someone who’s just getting into personal branding, I used the Startup Kit to make a landing page, write better bios, and even prep for Shark Tank college events. It’s not a course. It’s like a cheat code.”\n— Megha, 2nd Year BBA, Indore' },
              ]}
              autoplayDelay={8000}
              showPagination={true}
              showNavigation={true}
            />
          </Suspense>
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

