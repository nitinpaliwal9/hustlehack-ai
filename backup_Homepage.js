'use client'

import Navigation from './components/Navigation'
import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'
import Footer from './components/Footer'

export default function HomePage() {
  const { signInWithGoogle, user, isLoading } = useAuth()
  const router = useRouter()
  const [openFAQ, setOpenFAQ] = useState(Array(6).fill(false));
  
  // Load client utilities on component mount
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   // Check if script is already loaded
  //   const existingScript = document.querySelector('script[src="/js/client-utils.js"]')
  //   if (existingScript) {
  //     console.log('Client utils script already loaded')
  //     return
  //   }
    
  //   const script = document.createElement('script')
  //   script.src = '/js/client-utils.js'
  //   script.async = true
  //   script.onload = () => {
  //     console.log('Client utils loaded successfully')
  //   }
  //   script.onerror = (error) => {
  //     console.error('Error loading client utils:', error)
  //   }
  //   document.head.appendChild(script)
    
  //   return () => {
  //     // Cleanup script on unmount
  //     const scriptToRemove = document.querySelector('script[src="/js/client-utils.js"]')
  //     if (scriptToRemove) {
  //       document.head.removeChild(scriptToRemove)
  //     }
  //   }
  // }, [])
  
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

  return (
    <div>
      <a href="#home" className="skip-link" tabIndex="0">Skip to main content</a>
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="hero" role="region" aria-label="Homepage hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" tabIndex="0">Unleash AI. Build Faster. Learn Smarter.</h1>
            <p className="hero-subtitle" tabIndex="0">AI tools, templates, prompts & guides to help you grow faster — all in one toolkit designed for young Indian students, creators, and solopreneurs.</p>
            <div className="hero-actions" role="group" aria-label="Primary actions">
            {user ? (
              <button className="btn btn-google btn-lg" onClick={() => router.push('/dashboard')} aria-label="Go to Dashboard">
                <span>Go to Dashboard</span>
              </button>
            ) : ( <>
              <button id="google-login-btn-hero" className="btn btn-google btn-lg" onClick={handleGoogleSignIn} aria-label="Continue with Google">
                <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>🚀 Continue with Google</span>
                <div className="btn-loading" style={{display: 'none'}}>
                  <div className="spinner"></div>
                </div>
              </button>
              <a href="#" className="btn btn-primary btn-lg" data-modal="signup-modal" tabIndex="0" aria-label="Sign Up with Email">📧 Sign Up with Email</a>
              </>)
            }
              <a href="#features" className="btn btn-ghost btn-lg" tabIndex="0" aria-label="Explore Features">✨ Explore Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section" role="region" aria-label="How HustleHack AI works">
        <div className="container">
          <h2 className="section-title" tabIndex="0">How It Works</h2>
          <p className="section-subtitle" tabIndex="0">Get started with HustleHack AI in three simple steps</p>
          <div className="grid grid-3" role="list">
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🔍</span>
              <h3 className="card-title">Pick Your Plan</h3>
              <p className="card-description">Choose from our flexible plans designed for different needs and budgets. Start with basics or go pro.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🎁</span>
              <h3 className="card-title">Unlock Tools & Resources</h3>
              <p className="card-description">Access AI tools, templates, prompts, and exclusive content to supercharge your productivity.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🚀</span>
              <h3 className="card-title">Grow & Scale</h3>
              <p className="card-description">Apply your newfound skills to grow your studies, side hustles, and creative projects faster than ever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section" role="region" aria-label="Platform features">
        <div className="container">
          <h2 className="section-title" tabIndex="0">Why Choose HustleHack AI?</h2>
          <p className="section-subtitle" tabIndex="0">Everything you need to succeed in the AI-driven world</p>
          <div className="grid grid-4" role="list">
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">✨</span>
              <h3 className="card-title">Weekly AI Drops</h3>
              <p className="card-description">Fresh AI tools, prompts, and resources delivered weekly to keep you ahead of the curve.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🛠️</span>
              <h3 className="card-title">Tools & Templates</h3>
              <p className="card-description">Ready-to-use templates, blueprints, and automation tools for instant productivity boost.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">📚</span>
              <h3 className="card-title">Study & Creator Resources</h3>
              <p className="card-description">Comprehensive guides, tutorials, and resources for students and content creators.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🧠</span>
              <h3 className="card-title">Learn AI on the Go</h3>
              <p className="card-description">Mobile-friendly platform with bite-sized learning modules that fit your schedule.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🎯</span>
              <h3 className="card-title">Personalized Learning</h3>
              <p className="card-description">AI-powered recommendations based on your interests and learning goals.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🌟</span>
              <h3 className="card-title">Community Access</h3>
              <p className="card-description">Connect with like-minded hustlers, get feedback, and collaborate on projects.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">💡</span>
              <h3 className="card-title">Innovation Hub</h3>
              <p className="card-description">Access to cutting-edge AI tools and beta features before they go mainstream.</p>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🏆</span>
              <h3 className="card-title">Success Tracking</h3>
              <p className="card-description">Track your progress, achievements, and growth with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section" role="region" aria-label="Pricing plans">
        <div className="container">
          <h2 className="section-title" tabIndex="0">Choose Your Plan</h2>
          <p className="section-subtitle" tabIndex="0">Flexible pricing that grows with your ambitions</p>
          <div className="grid grid-3" role="list">
            <div className="pricing-card" role="listitem" tabIndex="0">
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
              <h3 className="pricing-title">Starter Hustle</h3>
              <p className="pricing-subtitle">Perfect for getting started</p>
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
              <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-outline" target="_blank" rel="noopener noreferrer" aria-label="Get Started with Starter Hustle">Get Started Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
            <div className="pricing-card featured" role="listitem" tabIndex="0">
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
              <h3 className="pricing-title">Creator Mode</h3>
              <p className="pricing-subtitle">For serious creators</p>
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
              <a href="https://rzp.io/rzp/atTfuqqZ" className="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Level Up with Creator Mode">Level Up Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
            <div className="pricing-card" role="listitem" tabIndex="0">
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
              <h3 className="pricing-title">Pro Hacker</h3>
              <p className="pricing-subtitle">Maximum firepower</p>
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
              <a href="https://rzp.io/rzp/nraUuNBx" className="btn btn-outline" target="_blank" rel="noopener noreferrer" aria-label="Go Pro with Pro Hacker">Go Pro Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section" role="region" aria-label="User testimonials">
        <div className="container">
          <h2 className="section-title" tabIndex="0">What Our Users Say</h2>
          <p className="section-subtitle" tabIndex="0">Join thousands of students and creators who are already winning with AI</p>
          <div className="grid grid-3" role="list">
            <div className="card" role="listitem" tabIndex="0">
              <p className="card-description">"HustleHack AI transformed my content creation workflow. I'm now producing 3x more content with better quality!"</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Priya Sharma</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Content Creator, Mumbai</p>
              </div>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <p className="card-description">"The AI study tools helped me crack my engineering entrance exam. The personalized learning path was a game-changer!"</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Arjun Patel</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Student, Delhi</p>
              </div>
            </div>
            <div className="card" role="listitem" tabIndex="0">
              <p className="card-description">"My freelance business grew 5x after using HustleHack's automation tools. The ROI was incredible!"</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Sneha Reddy</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Freelancer, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section" role="region" aria-label="Frequently asked questions">
        <div className="container">
          <h2 className="section-title" tabIndex="0">Frequently Asked Questions</h2>
          <p className="section-subtitle" tabIndex="0">Everything you need to know about HustleHack AI</p>
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
                a: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. You\'ll continue to have access to your account until the end of your current billing cycle.'
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
      <section className="section" style={{background: 'linear-gradient(135deg, #7F5AF0, #00FFC2)', color: 'white'}} role="region" aria-label="Final call to action">
        <div className="container text-center">
          <h2 className="section-title" style={{color: 'white'}} tabIndex="0">Ready to Unlock Your AI Superpowers?</h2>
          <p className="section-subtitle" style={{color: 'white', opacity: 0.9}} tabIndex="0">Join thousands of students and creators who are already building their future with AI</p>
          <div className="hero-actions" role="group" aria-label="Final actions">
            <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-lg" style={{background: 'white', color: '#7F5AF0'}} target="_blank" rel="noopener noreferrer" aria-label="Start with Starter Hustle - ₹99">🚀 Start with Starter Hustle - ₹99</a>
            <a href="#pricing" className="btn btn-lg" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white'}} aria-label="Compare Plans">Compare Plans</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

