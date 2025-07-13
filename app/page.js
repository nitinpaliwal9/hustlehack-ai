'use client'

import Navigation from './components/Navigation'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { signInWithGoogle, user, isLoading } = useAuth()
  const router = useRouter()
  
  // Load client utilities on component mount
  useEffect(() => {
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
  const toggleFAQ = (button) => {
    const answer = button.nextElementSibling
    const icon = button.querySelector('.faq-icon')
    
    if (answer.classList.contains('show')) {
      answer.classList.remove('show')
      icon.textContent = '+'
    } else {
      answer.classList.add('show')
      icon.textContent = '-'
    }
  }

  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Unleash AI. Build Faster. Learn Smarter.</h1>
            <p className="hero-subtitle">AI tools, templates, prompts & guides to help you grow faster — all in one toolkit designed for young Indian students, creators, and solopreneurs.</p>
            
            <div className="hero-actions">
            {user ? (
              <button className="btn btn-google btn-lg" onClick={() => router.push('/dashboard')}>
                <span>Go to Dashboard</span>
              </button>
            ) : (
              <button id="google-login-btn-hero" className="btn btn-google btn-lg" onClick={handleGoogleSignIn}>
                <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
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
            )}
              <a href="#" className="btn btn-primary btn-lg" data-modal="signup-modal">📧 Sign Up with Email</a>
              <a href="#features" className="btn btn-ghost btn-lg">✨ Explore Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started with HustleHack AI in three simple steps</p>
          
          <div className="grid grid-3">
            <div className="card">
              <span className="card-icon">🔍</span>
              <h3 className="card-title">Pick Your Plan</h3>
              <p className="card-description">Choose from our flexible plans designed for different needs and budgets. Start with basics or go pro.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">🎁</span>
              <h3 className="card-title">Unlock Tools & Resources</h3>
              <p className="card-description">Access AI tools, templates, prompts, and exclusive content to supercharge your productivity.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">🚀</span>
              <h3 className="card-title">Grow & Scale</h3>
              <p className="card-description">Apply your newfound skills to grow your studies, side hustles, and creative projects faster than ever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="section-title">Why Choose HustleHack AI?</h2>
          <p className="section-subtitle">Everything you need to succeed in the AI-driven world</p>
          
          <div className="grid grid-4">
            <div className="card">
              <span className="card-icon">✨</span>
              <h3 className="card-title">Weekly AI Drops</h3>
              <p className="card-description">Fresh AI tools, prompts, and resources delivered weekly to keep you ahead of the curve.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">🛠️</span>
              <h3 className="card-title">Tools & Templates</h3>
              <p className="card-description">Ready-to-use templates, blueprints, and automation tools for instant productivity boost.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">📚</span>
              <h3 className="card-title">Study & Creator Resources</h3>
              <p className="card-description">Comprehensive guides, tutorials, and resources for students and content creators.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">🧠</span>
              <h3 className="card-title">Learn AI on the Go</h3>
              <p className="card-description">Mobile-friendly platform with bite-sized learning modules that fit your schedule.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">🎯</span>
              <h3 className="card-title">Personalized Learning</h3>
              <p className="card-description">AI-powered recommendations based on your interests and learning goals.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">🌟</span>
              <h3 className="card-title">Community Access</h3>
              <p className="card-description">Connect with like-minded hustlers, get feedback, and collaborate on projects.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">💡</span>
              <h3 className="card-title">Innovation Hub</h3>
              <p className="card-description">Access to cutting-edge AI tools and beta features before they go mainstream.</p>
            </div>
            
            <div className="card">
              <span className="card-icon">🏆</span>
              <h3 className="card-title">Success Tracking</h3>
              <p className="card-description">Track your progress, achievements, and growth with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section">
        <div className="container">
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-subtitle">Flexible pricing that grows with your ambitions</p>
          
          <div className="grid grid-3">
            <div className="pricing-card">
              <div className="pricing-rating">
                <div className="rating-stars">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star partial">★</span>
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
              <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Get Started Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
            
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-rating">
                <div className="rating-stars">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
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
              <a href="https://rzp.io/rzp/atTfuqqZ" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Level Up Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-rating">
                <div className="rating-stars">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star half">★</span>
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
              <a href="https://rzp.io/rzp/nraUuNBx" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Go Pro Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">Join thousands of students and creators who are already winning with AI</p>
          
          <div className="grid grid-3">
            <div className="card">
              <p className="card-description">"HustleHack AI transformed my content creation workflow. I'm now producing 3x more content with better quality!"</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Priya Sharma</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Content Creator, Mumbai</p>
              </div>
            </div>
            
            <div className="card">
              <p className="card-description">"The AI study tools helped me crack my engineering entrance exam. The personalized learning path was a game-changer!"</p>
              <div style={{marginTop: '1rem'}}>
                <strong style={{color: 'var(--accent)'}}>Arjun Patel</strong>
                <p style={{color: 'var(--gray-400)', fontSize: '0.9rem', margin: 0}}>Student, Delhi</p>
              </div>
            </div>
            
            <div className="card">
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
      <section id="faq" className="section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about HustleHack AI</p>
          
          <div className="faq-container">
            <div className="faq-item">
              <button className="faq-question" onClick={(e) => toggleFAQ(e.target)}>
                What is HustleHack AI?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>HustleHack AI is a comprehensive platform designed for young Indian students, creators, and solopreneurs. We provide AI tools, templates, prompts, and resources to help you learn faster, create better content, and grow your ventures using artificial intelligence.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <button className="faq-question" onClick={(e) => toggleFAQ(e.target)}>
                How do I get started?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>Getting started is easy! Simply choose a plan that fits your needs, sign up for an account, and you'll get instant access to our platform. We also provide onboarding tutorials to help you make the most of our tools.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <button className="faq-question" onClick={(e) => toggleFAQ(e.target)}>
                Can I cancel my subscription anytime?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. You'll continue to have access to your account until the end of your current billing cycle.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <button className="faq-question" onClick={(e) => toggleFAQ(e.target)}>
                Do you offer student discounts?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>Yes! We offer special student pricing for verified students. Contact our support team with your student ID to learn more about available discounts and verification process.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <button className="faq-question" onClick={(e) => toggleFAQ(e.target)}>
                What payment methods do you accept?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <button className="faq-question" onClick={(e) => toggleFAQ(e.target)}>
                Is there a free trial available?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>Yes! We offer a 7-day free trial for new users. You can explore all features and decide which plan works best for you before committing to a subscription.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section" style={{background: 'linear-gradient(135deg, #7F5AF0, #00FFC2)', color: 'white'}}>
        <div className="container text-center">
          <h2 className="section-title" style={{color: 'white'}}>Ready to Unlock Your AI Superpowers?</h2>
          <p className="section-subtitle" style={{color: 'white', opacity: 0.9}}>Join thousands of students and creators who are already building their future with AI</p>
          
          <div className="hero-actions">
            <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-lg" style={{background: 'white', color: '#7F5AF0'}} target="_blank" rel="noopener noreferrer">🚀 Start with Starter Hustle - ₹99</a>
            <a href="#pricing" className="btn btn-lg" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white'}}>Compare Plans</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section" style={{background: '#0F0F1B', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="container">
          <div className="grid grid-4">
            <div>
              <h3 style={{color: 'white', marginBottom: '1rem'}}>HustleHack AI</h3>
              <p style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Empowering the next generation of Indian creators and entrepreneurs with AI.</p>
              <div style={{display: 'flex', gap: '1rem'}}>
                <a href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Instagram</a>
                <a href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Telegram</a>
                <a href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Twitter</a>
              </div>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Product</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><a href="#features" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Features</a></li>
                <li><a href="#pricing" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Pricing</a></li>
                <li><a href="/resources" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Resources</a></li>
                <li><a href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Company</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><a href="/about" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>About</a></li>
                <li><a href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Careers</a></li>
                <li><a href="/press" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Press</a></li>
                <li><a href="/contact" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Legal</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><a href="/policies/privacy-policy" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Privacy Policy</a></li>
                <li><a href="/policies/terms-and-conditions" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Terms of Service</a></li>
                <li><a href="/policies/cookie-policy" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Cookie Policy</a></li>
                <li><a href="/policies/gdpr" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
            <p style={{color: 'var(--gray-400)'}}>© 2024 HustleHack AI. All rights reserved. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

