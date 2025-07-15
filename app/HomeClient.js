'use client';

import React from "react";
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useRouter } from 'next/navigation';
import Footer from './components/Footer';

// Animated Neural Network SVG Background
const NeuralNetworkBG = () => (
  <svg
    className="absolute inset-0 w-full h-full z-0 animate-pulse"
    viewBox="0 0 1440 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="aiGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00F0FF" />
        <stop offset="100%" stopColor="#A259FF" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="16" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Neural lines */}
    <path d="M0 300 Q360 100 720 300 T1440 300" stroke="url(#aiGradient)" strokeWidth="4" fill="none" filter="url(#glow)"/>
    <path d="M0 400 Q360 200 720 400 T1440 400" stroke="url(#aiGradient)" strokeWidth="2" fill="none" opacity="0.7"/>
    <circle cx="360" cy="200" r="8" fill="#00F0FF" filter="url(#glow)"/>
    <circle cx="1080" cy="400" r="10" fill="#A259FF" filter="url(#glow)"/>
    {/* Add more nodes/lines for effect */}
  </svg>
);

// Glitch/Scanline Headline
const GlitchText = ({ children }) => (
  <span className="relative inline-block font-extrabold" style={{ color: '#fff', textShadow: '0 0 8px #00F0FF, 0 0 24px #A259FF, 0 1px 0 #fff' }}>
    <span className="absolute left-0 top-0 w-full h-full animate-glitch opacity-80 select-none pointer-events-none" aria-hidden="true" style={{ color: '#00F0FF', filter: 'blur(1.5px) brightness(1.5)' }}>
      {children}
    </span>
    <span className="relative z-10 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent" style={{ WebkitTextStroke: '1px #fff', textShadow: '0 0 8px #00F0FF, 0 0 24px #A259FF' }}>{children}</span>
  </span>
);

// Floating AI Hologram SVG
const AIHologram = () => (
  <div className="absolute right-8 top-8 md:right-24 md:top-16 z-10 animate-float">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="40" cy="60" rx="24" ry="8" fill="#A259FF" opacity="0.2" />
      <circle cx="40" cy="36" r="24" fill="url(#aiGradient)" filter="url(#glow)" />
      <path d="M32 36c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="#fff" opacity="0.7" />
      <circle cx="40" cy="36" r="4" fill="#00F0FF" />
      <defs>
        <linearGradient id="aiGradient" x1="16" y1="12" x2="64" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#A259FF" />
        </linearGradient>
        <filter id="glow" x="-20" y="-20" width="120" height="120">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  </div>
);

// Add keyframes for glitch and float
const style = `
@keyframes glitch {
  0% { transform: translate(0,0); opacity: 0.7; }
  20% { transform: translate(-2px,1px); opacity: 0.8; }
  40% { transform: translate(2px,-1px); opacity: 0.6; }
  60% { transform: translate(-1px,2px); opacity: 0.8; }
  80% { transform: translate(1px,-2px); opacity: 0.7; }
  100% { transform: translate(0,0); opacity: 0.7; }
}
.animate-glitch { animation: glitch 1.2s infinite linear alternate-reverse; }
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
}
.animate-float { animation: float 3s ease-in-out infinite; }
`;

// --- Navigation Bar Redesign ---
import Link from 'next/link';
import Image from 'next/image';

function PremiumNavigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_32px_0_rgba(0,255,255,0.08)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/assets/images/logo (2).png" alt="HustleHack AI Logo" width={40} height={40} className="drop-shadow-[0_2px_8px_rgba(0,255,255,0.5)]" />
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">HustleHack AI</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-lg font-semibold">
          <li><Link href="/" className="nav-link-premium">Home</Link></li>
          <li><Link href="/#features" className="nav-link-premium">Features</Link></li>
          <li><Link href="/#pricing" className="nav-link-premium">Pricing</Link></li>
          <li><Link href="/resources" className="nav-link-premium">Resources</Link></li>
          <li><Link href="/about" className="nav-link-premium">About</Link></li>
          <li><Link href="/contact" className="nav-link-premium">Contact</Link></li>
        </ul>
        <div className="flex items-center gap-4">
          <a href="/resources" className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 animate-glow text-base">Explore Toolkits</a>
          <a href="/about" className="px-5 py-2 rounded-full border-2 border-cyan-400 text-cyan-300 font-bold bg-black/60 backdrop-blur hover:bg-cyan-900/30 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base">Why Us?</a>
        </div>
      </div>
      <style>{`
        .nav-link-premium {
          position: relative;
          color: #fff;
          transition: color 0.2s;
        }
        .nav-link-premium:after {
          content: '';
          display: block;
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 2px;
          background: linear-gradient(90deg, #00F0FF 0%, #A259FF 100%);
          opacity: 0;
          transform: scaleX(0.6);
          transition: opacity 0.2s, transform 0.2s;
        }
        .nav-link-premium:hover, .nav-link-premium:focus {
          color: #00F0FF;
        }
        .nav-link-premium:hover:after, .nav-link-premium:focus:after {
          opacity: 1;
          transform: scaleX(1);
        }
      `}</style>
    </nav>
  );
}

export default function HomeClient() {
  const { signInWithGoogle, user, isLoading } = useAuth();
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState(Array(6).fill(false));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const existingScript = document.querySelector('script[src="/js/client-utils.js"]');
    if (existingScript) {
      console.log('Client utils script already loaded');
      return;
    }
    const script = document.createElement('script');
    script.src = '/js/client-utils.js';
    script.async = true;
    script.onload = () => {
      console.log('Client utils loaded successfully');
    };
    script.onerror = (error) => {
      console.error('Error loading client utils:', error);
    };
    document.head.appendChild(script);
    return () => {
      const scriptToRemove = document.querySelector('script[src="/js/client-utils.js"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      console.log('🚀 Starting Google sign-in...');
      if (typeof window !== 'undefined' && window.showNotification) {
        window.showNotification('🔄 Redirecting to Google...', 'info', 2000);
      }
      await signInWithGoogle();
      console.log('✅ Google sign-in initiated successfully');
    } catch (error) {
      console.error('❌ Google sign-in failed:', error);
      if (typeof window !== 'undefined' && window.showNotification) {
        let errorMessage = 'Google sign-in failed. Please try again.';
        if (error.message.includes('not configured')) {
          errorMessage = 'Google OAuth not configured. Please check setup guide.';
        } else if (error.message.includes('popup')) {
          errorMessage = 'Please allow popups and try again.';
        }
        window.showNotification(`❌ ${errorMessage}`, 'error', 5000);
      }
    }
  };

  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <PremiumNavigation />
      <style>{style}</style>
      <NeuralNetworkBG />
      <AIHologram />
      <section className="relative z-10 flex flex-col items-center justify-center pt-40 pb-20 px-4 w-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white">
          Step Into the <GlitchText>Future</GlitchText> of <GlitchText>AI-Powered Hustle</GlitchText>
        </h1>
        <p className="text-lg md:text-2xl font-medium mb-10 text-slate-200 max-w-2xl mx-auto">
          Unlock your potential with <span className="text-cyan-400 font-bold">AI toolkits</span>, <span className="text-purple-400 font-bold">Notion templates</span>, and <span className="text-blue-400 font-bold">next-gen resources</span>—built for Gen Z creators, students, and founders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/resources" className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 animate-glow">
            Explore Toolkits
          </a>
          <a href="/about" className="px-8 py-3 rounded-xl border-2 border-cyan-400 text-cyan-300 font-bold text-lg bg-black/60 backdrop-blur hover:bg-cyan-900/30 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400">
            Why HustleHack AI?
          </a>
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
            <div className="feature-card card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">✨</span>
              <h3 className="card-title">Weekly AI Drops</h3>
              <p className="card-description">Fresh AI tools, prompts, and resources delivered weekly to keep you ahead of the curve.</p>
            </div>
            <div className="feature-card card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🛠️</span>
              <h3 className="card-title">Tools & Templates</h3>
              <p className="card-description">Ready-to-use templates, blueprints, and automation tools for instant productivity boost.</p>
            </div>
            <div className="feature-card card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">📚</span>
              <h3 className="card-title">Study & Creator Resources</h3>
              <p className="card-description">Comprehensive guides, tutorials, and resources for students and content creators.</p>
            </div>
            <div className="feature-card card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🧠</span>
              <h3 className="card-title">Learn AI on the Go</h3>
              <p className="card-description">Mobile-friendly platform with bite-sized learning modules that fit your schedule.</p>
            </div>
            <div className="feature-card card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🎯</span>
              <h3 className="card-title">Personalized Learning</h3>
              <p className="card-description">AI-powered recommendations based on your interests and learning goals.</p>
            </div>
            <div className="feature-card card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">🌟</span>
              <h3 className="card-title">Community Access</h3>
              <p className="card-description">Connect with like-minded hustlers, get feedback, and collaborate on projects.</p>
            </div>
            <div className="feature-card card" role="listitem" tabIndex="0">
              <span className="card-icon" aria-hidden="true">💡</span>
              <h3 className="card-title">Innovation Hub</h3>
              <p className="card-description">Access to cutting-edge AI tools and beta features before they go mainstream.</p>
            </div>
            <div className="feature-card card" role="listitem" tabIndex="0">
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
          <div className="pricing-container grid grid-3 gap-8">
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
              <div className="pricing-original">₹499</div>
              <div className="pricing-current">₹99<span className="pricing-period">/month</span></div>
              <div className="pricing-discount">80% OFF</div>
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
              <div className="pricing-original">₹799</div>
              <div className="pricing-current">₹199<span className="pricing-period">/month</span></div>
              <div className="pricing-discount">75% OFF</div>
              <ul className="pricing-features">
                <li>Everything in Starter +</li>
                <li>Advanced AI workflows</li>
                <li>Premium templates library</li>
                <li>Priority support</li>
              </ul>
              <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Get Started with Creator Mode">Get Started Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
            <div className="pricing-card" role="listitem" tabIndex="0">
              <div className="pricing-rating">
                <div className="rating-stars" aria-label="4.5 out of 5 stars">
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star filled" aria-hidden="true">★</span>
                  <span className="star partial" aria-hidden="true">★</span>
                </div>
                <span className="rating-text">4.5/5 (1,234 reviews)</span>
              </div>
              <h3 className="pricing-title">Pro Hustler</h3>
              <p className="pricing-subtitle">For teams & power users</p>
              <div className="pricing-original">₹1,499</div>
              <div className="pricing-current">₹399<span className="pricing-period">/month</span></div>
              <div className="pricing-discount">73% OFF</div>
              <ul className="pricing-features">
                <li>All Creator features +</li>
                <li>Team collaboration tools</li>
                <li>Custom integrations</li>
                <li>Dedicated support</li>
              </ul>
              <a href="https://rzp.io/rzp/ppw09ED" className="btn btn-outline" target="_blank" rel="noopener noreferrer" aria-label="Get Started with Pro Hustler">Get Started Now</a>
              <p className="pricing-note">One-month access, renew anytime manually</p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="section" role="region" aria-label="User testimonials">
        <div className="container">
          <h2 className="section-title" tabIndex="0">What Our Users Say</h2>
          <p className="section-subtitle" tabIndex="0">Don't just take our word for it. See what others are saying about HustleHack AI.</p>
          <div className="grid grid-2 gap-8">
            <div className="testimonial-card card" role="listitem" tabIndex="0">
              <p className="testimonial-quote">"HustleHack AI has transformed my productivity. The AI tools and templates are incredibly useful and easy to use."</p>
              <p className="testimonial-author">- John Doe, Student</p>
            </div>
            <div className="testimonial-card card" role="listitem" tabIndex="0">
              <p className="testimonial-quote">"The weekly AI drops are a game-changer. I'm always excited to see what's new and how I can apply it."</p>
              <p className="testimonial-author">- Jane Smith, Creator</p>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="section" role="region" aria-label="Frequently asked questions">
        <div className="container">
          <h2 className="section-title" tabIndex="0">Frequently Asked Questions</h2>
          <p className="section-subtitle" tabIndex="0">Got questions? We've got answers.</p>
          <div className="faq-container">
            <div className="faq-item" role="listitem" tabIndex="0">
              <button className="faq-question" onClick={() => toggleFAQ(0)} aria-expanded={openFAQ[0]} aria-controls="faq-answer-0">
                What is HustleHack AI?
                <span className="faq-icon" aria-hidden="true">{openFAQ[0] ? '▲' : '▼'}</span>
              </button>
              <div id="faq-answer-0" className={`faq-answer${openFAQ[0] ? ' show' : ''}`} role="region">
                HustleHack AI is a comprehensive toolkit designed to help young Indian students, creators, and solopreneurs leverage AI to grow faster. It offers AI tools, templates, prompts, and guides to enhance productivity and creativity.
              </div>
            </div>
            <div className="faq-item" role="listitem" tabIndex="0">
              <button className="faq-question" onClick={() => toggleFAQ(1)} aria-expanded={openFAQ[1]} aria-controls="faq-answer-1">
                How do I get started?
                <span className="faq-icon" aria-hidden="true">{openFAQ[1] ? '▲' : '▼'}</span>
              </button>
              <div id="faq-answer-1" className={`faq-answer${openFAQ[1] ? ' show' : ''}`} role="region">
                Simply click the "Continue with Google" button on the homepage or sign up with your email. Once logged in, you'll have access to all our AI tools, templates, and resources.
              </div>
            </div>
            <div className="faq-item" role="listitem" tabIndex="0">
              <button className="faq-question" onClick={() => toggleFAQ(2)} aria-expanded={openFAQ[2]} aria-controls="faq-answer-2">
                Is my data secure?
                <span className="faq-icon" aria-hidden="true">{openFAQ[2] ? '▲' : '▼'}</span>
              </button>
              <div id="faq-answer-2" className={`faq-answer${openFAQ[2] ? ' show' : ''}`} role="region">
                Absolutely. We prioritize your privacy and data security. All user data is encrypted and stored securely.
              </div>
            </div>
            <div className="faq-item" role="listitem" tabIndex="0">
              <button className="faq-question" onClick={() => toggleFAQ(3)} aria-expanded={openFAQ[3]} aria-controls="faq-answer-3">
                Can I cancel my subscription?
                <span className="faq-icon" aria-hidden="true">{openFAQ[3] ? '▲' : '▼'}</span>
              </button>
              <div id="faq-answer-3" className={`faq-answer${openFAQ[3] ? ' show' : ''}`} role="region">
                Yes, you can cancel your subscription at any time. We offer a flexible billing cycle that allows you to manage your plan as your needs evolve.
              </div>
            </div>
            <div className="faq-item" role="listitem" tabIndex="0">
              <button className="faq-question" onClick={() => toggleFAQ(4)} aria-expanded={openFAQ[4]} aria-controls="faq-answer-4">
                How often are new features added?
                <span className="faq-icon" aria-hidden="true">{openFAQ[4] ? '▲' : '▼'}</span>
              </button>
              <div id="faq-answer-4" className={`faq-answer${openFAQ[4] ? ' show' : ''}`} role="region">
                We continuously work to improve HustleHack AI. New features are added based on user feedback and technological advancements.
              </div>
            </div>
            <div className="faq-item" role="listitem" tabIndex="0">
              <button className="faq-question" onClick={() => toggleFAQ(5)} aria-expanded={openFAQ[5]} aria-controls="faq-answer-5">
                How do I get support?
                <span className="faq-icon" aria-hidden="true">{openFAQ[5] ? '▲' : '▼'}</span>
              </button>
              <div id="faq-answer-5" className={`faq-answer${openFAQ[5] ? ' show' : ''}`} role="region">
                Our support team is available 24/7. You can reach out via email, chat, or our community forums.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Community Section */}
      <section id="community" className="section" role="region" aria-label="Join our community">
        <div className="container">
          <h2 className="section-title" tabIndex="0">Join Our Community</h2>
          <p className="section-subtitle" tabIndex="0">Connect with like-minded hustlers, get feedback, and collaborate on projects.</p>
          <div className="community-links flex gap-4 justify-center mt-6">
            <a href="#" className="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Join Discord Community">
              <svg className="social-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-3V5h3v6zm0 4h-3V8h3v11z"/>
              </svg>
              Discord
            </a>
            <a href="#" className="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Join Twitter Community">
              <svg className="social-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="M22.5 12c0-6.3-5.2-11.5-11.5-11.5S0 5.7 0 12c0 5.1 3.3 9.5 8 11.5V14.5H7V12h3V9.5H7V7h3V4.5C12.7 6.5 16 10.9 16 16.5V19h-3v-2.5h3z"/>
              </svg>
              Twitter
            </a>
            <a href="#" className="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Join LinkedIn Community">
              <svg className="social-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="M21 12c0-4.5-3.5-8-8-8s-8 3.5-8 8c0 3.9 2.9 7.2 6.6 7.9V16H10v-2.1c-3.7-.7-6.6-4-6.6-7.9 0-4.5 3.5-8 8-8s8 3.5 8 8v1.1c3.7.7 6.6 4 6.6 7.9zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 