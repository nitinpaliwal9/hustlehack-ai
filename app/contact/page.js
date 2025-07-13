'use client'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from 'next/link'
import { Mail, Clock, Users, MessageCircle, Phone, MapPin, Calendar, Zap } from 'lucide-react'
import '../legacy-styles.css'

export default function ContactPage() {
  return (
    <div>
      <Navigation />
      
      {/* Contact Hero Section */}
      <section className="hero" style={{ 
        background: 'var(--bg-primary)',
        paddingTop: '140px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh'
      }}>
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-title" style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              marginBottom: '2rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.1'
            }}>
              🚀 Let's Connect
            </h1>
            <p className="hero-subtitle" style={{
              fontSize: '1.375rem',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '500',
              marginBottom: '3rem'
            }}>
              Ready to supercharge your AI journey? We're here to help you unlock your potential with cutting-edge tools and personalized support.
            </p>
            
            {/* Quick Stats */}
            <div className="contact-stats" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div className="stat-item" style={{
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                minWidth: '150px',
                transition: 'var(--transition-normal)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
                <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: '700' }}>{'< 24h'}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Response Time</div>
              </div>
              <div className="stat-item" style={{
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                minWidth: '150px',
                transition: 'var(--transition-normal)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌟</div>
                <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: '700' }}>10k+</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Happy Users</div>
              </div>
              <div className="stat-item" style={{
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                minWidth: '150px',
                transition: 'var(--transition-normal)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: '700' }}>24/7</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title" style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'white',
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)'
            }}>Get in Touch</h2>
            <p className="section-subtitle" style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>Choose your preferred way to connect with us</p>
          </div>
          
          <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '4rem' }}>
            {/* Email Card */}
            <div className="card" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'var(--gradient)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>📧</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0,
                  fontFamily: 'var(--font-display)'
                }}>Email Support</h3>
              </div>
              
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>Get personalized assistance from our team. Perfect for detailed questions, technical support, or partnership inquiries.</p>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <Clock size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem' }}>Response Time: Within 24 hours</span>
                </div>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>💡 Pro tip: Add "URGENT" to your subject line for priority support</p>
              </div>
              
              <a 
                href="mailto:hustlehackai@gmail.com" 
                className="btn btn-primary" 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                <Mail size={20} />
                Send Email
              </a>
            </div>

            {/* Quick Help Card */}
            <div className="card" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'var(--gradient)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>⚡</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0,
                  fontFamily: 'var(--font-display)'
                }}>Quick Help</h3>
              </div>
              
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>Need instant answers? Check out our most popular resources and find solutions in seconds.</p>
              
              <div className="help-links" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <Link href="/#faq" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  transition: 'var(--transition-fast)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>❓</span>
                  <span style={{ fontWeight: '500' }}>Frequently Asked Questions</span>
                </Link>
                <Link href="/resources" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  transition: 'var(--transition-fast)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📚</span>
                  <span style={{ fontWeight: '500' }}>Help Center & Guides</span>
                </Link>
                <Link href="/#pricing" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  transition: 'var(--transition-fast)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🚀</span>
                  <span style={{ fontWeight: '500' }}>Latest Tools & Features</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="social-connect text-center" style={{ marginTop: '5rem' }}>
            <div className="card" style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-2xl)',
              padding: '3rem',
              maxWidth: '700px',
              margin: '0 auto',
              boxShadow: 'var(--shadow-xl)',
              backdropFilter: 'blur(20px)'
            }}>
              <h2 style={{
                color: 'var(--primary)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1rem',
                fontFamily: 'var(--font-display)'
              }}>
                🧠 Stay Connected
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1.125rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Follow us on social media for the latest updates and AI insights:
              </p>
              <div className="social-icons" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <a href="#" className="btn" style={{
                  background: 'linear-gradient(45deg, #E4405F, #833AB4)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'var(--transition-normal)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📸 Instagram
                </a>
                <a href="#" className="btn" style={{
                  background: 'linear-gradient(45deg, #1DA1F2, #0066CC)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'var(--transition-normal)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🐦 Twitter
                </a>
                <a href="#" className="btn" style={{
                  background: 'linear-gradient(45deg, #0088cc, #229ED9)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'var(--transition-normal)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📱 Telegram
                </a>
              </div>
              <p style={{
                color: 'var(--accent)',
                fontSize: '1.125rem',
                fontWeight: '600',
                margin: '0',
                textShadow: '0 2px 4px rgba(0, 255, 194, 0.3)'
              }}>
                🚀 Together, let's innovate the future of work!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(127, 90, 240, 0.2);
          border-color: var(--primary);
        }
        
        .stat-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(127, 90, 240, 0.3);
          border-color: var(--accent);
        }
        
        .help-links a:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: var(--primary) !important;
          color: var(--primary) !important;
          transform: translateX(4px);
        }
        
        .social-icons a:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .contact-stats {
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          
          .contact-stats {
            flex-direction: column;
            gap: 1.5rem !important;
            align-items: center;
          }
          
          .social-icons {
            flex-direction: column;
            align-items: center;
          }
          
          .hero-title {
            font-size: 2.75rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.25rem !important;
          }
          
          .hero {
            padding-top: 140px !important;
            padding-bottom: 80px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.25rem !important;
            margin-bottom: 1rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.125rem !important;
          }
          
          .hero {
            padding-top: 120px !important;
            padding-bottom: 60px !important;
          }
          
          .card {
            padding: 1.5rem !important;
          }
          
          .stat-item {
            min-width: 120px !important;
            padding: 1rem !important;
          }
          
          .contact-stats {
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}
