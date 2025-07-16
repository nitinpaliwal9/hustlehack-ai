'use client'

import Navigation from './components/Navigation'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Link from 'next/link'

export default function HomePage() {
  const { signInWithGoogle, user, isLoading } = useAuth()
  const router = useRouter()
  const [openFAQ, setOpenFAQ] = useState(Array(6).fill(false));
  
  // Load client utilities on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="/js/client-utils.js"]')
    if (existingScript) {
      console.log('Client utils script already loaded')
      return
    }
    
    const script = document.createElement('script')
    script.src = '/js/client-utils.js'
    script.async = true
    script.onload = () => {
      console.log('Client utils loaded successfully')
    }
    script.onerror = (error) => {
      console.error('Error loading client utils:', error)
    }
    document.head.appendChild(script)
    
    return () => {
      // Cleanup script on unmount
      const scriptToRemove = document.querySelector('script[src="/js/client-utils.js"]')
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove)
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

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message="Loading..." />
      </div>
    );
  }
  
  return (
    <div>
      <Link href="#home" className="skip-link" tabIndex="0">Skip to main content</Link>
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="hero-section relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-44" style={{ position: 'relative', paddingTop: '10rem' }}>
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 w-full h-full z-0 hero-bg-zoom" style={{ backgroundImage: 'url(/hero_section.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        {/* Dark Overlay for Depth and Text Clarity */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{ background: 'rgba(0,0,0,0.48)' }} />
        {/* Golden Badge */}
        <div className="absolute right-10 z-30 flex items-center gap-2 animate-badge-fade-in" style={{ top: '7.5rem' }}>
          <span className="hero-badge px-3 py-1 rounded-full font-semibold text-sm tracking-wide uppercase" style={{ background: 'linear-gradient(90deg, #FFD700 0%, #FFB300 100%)', color: '#232946', boxShadow: '0 1px 6px #FFD70044', letterSpacing: 1, border: '1px solid #FFD700' }}>
            <span style={{ fontSize: 13, marginRight: 5 }}>🏆</span>India’s #1 AI Learning Platform
          </span>
        </div>
        {/* Hero Content */}
        <div className="relative z-40 w-full flex flex-col items-center justify-center text-center px-4" style={{ marginTop: '0' }}>
          <div className="max-w-5xl mx-auto">
            {/* Headline with fast swipe animations */}
            <div className="overflow-hidden">
              <h1 className="hero-title premium-heading mb-2" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '0.04em', color: '#fff', marginBottom: 0, background: 'none', WebkitTextFillColor: '#fff', WebkitBackgroundClip: 'unset', backgroundClip: 'unset' }}>
                <span className="block hero-line hero-line-1 animate-hero-swipe-left">AI Isn’t the Future.</span>
                <span className="block hero-line hero-line-2 animate-hero-swipe-right" style={{ marginTop: 0 }}>It’s Your Shortcut.</span>
              </h1>
            </div>
            <p className="hero-subtitle text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium" tabIndex="0" style={{ textShadow: '0 2px 8px #23294688' }}>
              Access ready-to-use blueprints, prompt packs, and automation stacks built for people who actually build.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
              <button className="btn btn-lg premium-btn glow-cta rounded-full font-bold flex items-center gap-2" style={{ fontSize: '1.15rem', minWidth: 220 }} onClick={handleGoogleSignIn}>
                🚀 Start Your AI Journey
              </button>
              <button className="btn btn-lg premium-btn glow-cta rounded-full font-bold flex items-center gap-2" style={{ fontSize: '1.15rem', minWidth: 220 }} onClick={() => {
                const el = document.getElementById('features');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                📁 Explore the Toolkit
              </button>
              <button className="btn btn-lg premium-btn glow-cta rounded-full font-bold flex items-center gap-2" style={{ fontSize: '1.15rem', minWidth: 220 }} onClick={() => {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                ⚡ Unlock Resources Now
              </button>
            </div>
          </div>
        </div>
        {/* Animations and styles for hero */}
        <style jsx>{`
          .hero-bg-zoom {
            animation: heroZoom 18s ease-in-out infinite alternate;
          }
          @keyframes heroZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.08); }
          }
          .animate-badge-fade-in {
            animation: badgeFadeIn 1.2s cubic-bezier(0.7,0,0.3,1) 0.2s both;
          }
          @keyframes badgeFadeIn {
            0% { opacity: 0; transform: translateY(-40px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .hero-line {
            opacity: 0;
            transform: translateX(-80vw);
            will-change: transform, opacity;
          }
          .hero-line-2 {
            transform: translateX(80vw);
          }
          .animate-hero-swipe-left {
            animation: heroSwipeLeft 0.55s cubic-bezier(0.7,0,0.3,1) 0.2s forwards;
          }
          .animate-hero-swipe-right {
            animation: heroSwipeRight 0.55s cubic-bezier(0.7,0,0.3,1) 0.8s forwards;
          }
          @keyframes heroSwipeLeft {
            0% { opacity: 0; transform: translateX(-80vw); }
            80% { opacity: 1; transform: translateX(2vw); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes heroSwipeRight {
            0% { opacity: 0; transform: translateX(80vw); }
            80% { opacity: 1; transform: translateX(-2vw); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `}</style>
        {/* Gradient Fade Overlay for smooth transition */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: '70px', width: '100%', height: '80px', zIndex: 19, pointerEvents: 'none' }} aria-hidden="true">
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(35,36,58,0) 0%, #23243a 100%)' }} />
        </div>
        {/* Wave SVG Divider for smooth transition */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-1px', width: '100%', zIndex: 20, pointerEvents: 'none', lineHeight: 0 }} aria-hidden="true">
          <svg viewBox="0 0 1440 120" width="100%" height="80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
            <path fill="#23243a" d="M0,32 C360,120 1080,0 1440,80 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

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
              <span className="card-icon text-3xl mb-4 block">🎁</span>
              <h3 className="card-title premium-heading mb-2">Unlock Tools & Resources</h3>
              <p className="card-description text-gray-200">Access AI tools, templates, prompts, and exclusive content to supercharge your productivity.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">🚀</span>
              <h3 className="card-title premium-heading mb-2">Grow & Scale</h3>
              <p className="card-description text-gray-200">Apply your newfound skills to grow your studies, side hustles, and creative projects faster than ever.</p>
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
              <span className="card-icon text-3xl mb-4 block">✨</span>
              <h3 className="card-title premium-heading mb-2">Weekly AI Drops</h3>
              <p className="card-description text-gray-200">Fresh AI tools, prompts, and resources delivered weekly to keep you ahead of the curve.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">🛠️</span>
              <h3 className="card-title premium-heading mb-2">Tools & Templates</h3>
              <p className="card-description text-gray-200">Ready-to-use templates, blueprints, and automation tools for instant productivity boost.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">📚</span>
              <h3 className="card-title premium-heading mb-2">Study & Creator Resources</h3>
              <p className="card-description text-gray-200">Comprehensive guides, tutorials, and resources for students and content creators.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">🧠</span>
              <h3 className="card-title premium-heading mb-2">Learn AI on the Go</h3>
              <p className="card-description text-gray-200">Mobile-friendly platform with bite-sized learning modules that fit your schedule.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">🎯</span>
              <h3 className="card-title premium-heading mb-2">Personalized Learning</h3>
              <p className="card-description text-gray-200">AI-powered recommendations based on your interests and learning goals.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">🌟</span>
              <h3 className="card-title premium-heading mb-2">Community Access</h3>
              <p className="card-description text-gray-200">Connect with like-minded hustlers, get feedback, and collaborate on projects.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">💡</span>
              <h3 className="card-title premium-heading mb-2">Innovation Hub</h3>
              <p className="card-description text-gray-200">Access to cutting-edge AI tools and beta features before they go mainstream.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <span className="card-icon text-3xl mb-4 block">🏆</span>
              <h3 className="card-title premium-heading mb-2">Success Tracking</h3>
              <p className="card-description text-gray-200">Track your progress, achievements, and growth with detailed analytics.</p>
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
              <a href="https://rzp.io/rzp/WnoiZtJH" className="btn btn-primary premium-btn glow-cta" target="_blank" rel="noopener noreferrer" aria-label="Level Up with Creator Mode">Level Up Now</a>
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

      {/* Footer */}
      <Footer />
      {/* Animations for gradient and confetti */}
    </div>
  )
}

