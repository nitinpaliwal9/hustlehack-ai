'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'
import './about.css'

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    tools: 0,
    success: 0
  })
  const [visibleElements, setVisibleElements] = useState(new Set())

  // Animate numbers on scroll
  const animateNumber = (target, duration = 2000) => {
    const targetNumber = parseInt(target.replace(/[^0-9]/g, ''))
    const increment = targetNumber / (duration / 16)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= targetNumber) {
        current = targetNumber
        clearInterval(timer)
      }
      return Math.floor(current)
    }, 16)
    
    return timer
  }

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.id || entry.target.className
          setVisibleElements(prev => new Set([...prev, elementId]))
          
          // Animate stats numbers
          if (entry.target.classList.contains('hero-stats')) {
            setTimeout(() => {
              let studentsCount = 0
              let toolsCount = 0
              let successCount = 0
              
              const studentsTimer = setInterval(() => {
                studentsCount += 167
                if (studentsCount >= 10000) {
                  studentsCount = 10000
                  clearInterval(studentsTimer)
                }
                setAnimatedStats(prev => ({ ...prev, students: studentsCount }))
              }, 16)
              
              const toolsTimer = setInterval(() => {
                toolsCount += 8
                if (toolsCount >= 500) {
                  toolsCount = 500
                  clearInterval(toolsTimer)
                }
                setAnimatedStats(prev => ({ ...prev, tools: toolsCount }))
              }, 16)
              
              const successTimer = setInterval(() => {
                successCount += 2
                if (successCount >= 98) {
                  successCount = 98
                  clearInterval(successTimer)
                }
                setAnimatedStats(prev => ({ ...prev, success: successCount }))
              }, 16)
            }, 300)
          }
          
          // Add animation classes
          if (entry.target.classList.contains('timeline-item')) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
          
          if (entry.target.classList.contains('testimonial-card')) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
          
          if (entry.target.classList.contains('impact-stat')) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        }
      })
    }, observerOptions)

    // Observe elements
    const elementsToObserve = document.querySelectorAll(
      '.hero-stats, .timeline-item, .testimonial-card, .impact-stat, .value-card, .mission-card, .vision-card'
    )
    
    elementsToObserve.forEach(el => {
      if (el.classList.contains('timeline-item') || 
          el.classList.contains('testimonial-card') || 
          el.classList.contains('impact-stat')) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
      }
      observer.observe(el)
    })

    // Parallax effect for hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector('.about-hero')
      if (hero) {
        const rate = scrolled * -0.5
        hero.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    setIsLoaded(true)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Add click handlers for interactive elements
  const handleContactClick = (method) => {
    if (typeof window !== 'undefined' && window.showNotification) {
      window.showNotification(`📧 Opening ${method}...`, 'info', 2000)
    }
  }

  const handleTimelineClick = (year) => {
    if (typeof window !== 'undefined' && window.showNotification) {
      window.showNotification(`🗓️ Viewing roadmap for ${year}`, 'info', 2000)
    }
  }

  // Add scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.pageYOffset
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxHeight) * 100
      
      const progressBar = document.querySelector('.scroll-indicator')
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress / 100})`
      }
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const targetId = target.getAttribute('href').substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])
  return (
    <div>
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator"></div>
      
      <Navigation />

      {/* Hero Section */}
      <section className="hero about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Empowering India's Future Innovators</h1>
            <p className="hero-subtitle">We're on a mission to democratize AI education and tools for the next generation of Indian students, creators, and entrepreneurs.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{animatedStats.students.toLocaleString()}+</span>
                <span className="stat-label">Students Empowered</span>
              </div>
              <div className="stat">
                <span className="stat-number">{animatedStats.tools.toLocaleString()}+</span>
                <span className="stat-label">AI Tools & Templates</span>
              </div>
              <div className="stat">
                <span className="stat-number">{animatedStats.success}%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="section">
        <div className="container">
          <div className="section-content">
            <div className="content-grid">
              <div className="content-text">
                <h2 className="section-title">Our Story</h2>
                <p>HustleHack AI was born from a simple observation: while AI is transforming industries globally, young Indian talent often lacks access to the right tools and guidance to leverage this technology effectively.</p>
                <p>Founded in 2023 by a team of passionate AI researchers and educators, we recognized the immense potential of India's youth in the digital economy. Our founders, having experienced the challenges of navigating the AI landscape firsthand, decided to create a platform that would bridge this gap.</p>
                <p>What started as a small initiative to help college students understand AI has now grown into a comprehensive ecosystem that serves students, content creators, entrepreneurs, and freelancers across India.</p>
              </div>
              <div className="content-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon">🚀</span>
                  <p>Our Journey Begins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="section bg-surface">
        <div className="container">
          <div className="grid grid-2">
            <div className="card mission-card">
              <span className="card-icon">🎯</span>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-description">To democratize AI education and tools, making cutting-edge technology accessible to every Indian student, creator, and entrepreneur, regardless of their background or location.</p>
            </div>
            <div className="card vision-card">
              <span className="card-icon">🌟</span>
              <h3 className="card-title">Our Vision</h3>
              <p className="card-description">To create a generation of AI-literate Indians who can compete globally, innovate locally, and contribute meaningfully to India's digital transformation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">The principles that guide everything we do</p>
          
          <div className="grid grid-4">
            <div className="card value-card">
              <span className="card-icon">🤝</span>
              <h3 className="card-title">Accessibility</h3>
              <p className="card-description">AI tools and education should be accessible to everyone, regardless of economic background or geographic location.</p>
            </div>
            <div className="card value-card">
              <span className="card-icon">💡</span>
              <h3 className="card-title">Innovation</h3>
              <p className="card-description">We constantly innovate to provide the latest AI tools and methodologies to our community.</p>
            </div>
            <div className="card value-card">
              <span className="card-icon">🌱</span>
              <h3 className="card-title">Growth</h3>
              <p className="card-description">We're committed to the continuous growth and development of our users and community.</p>
            </div>
            <div className="card value-card">
              <span className="card-icon">🇮🇳</span>
              <h3 className="card-title">India First</h3>
              <p className="card-description">Built by Indians, for Indians, with a deep understanding of our unique challenges and opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Maker Section */}
      <section id="maker" className="section bg-surface">
        <div className="container">
          <h2 className="section-title">Meet the Maker</h2>
          <p className="section-subtitle">One founder. One mission. Real hustle.</p>
          
          <div className="maker-showcase">
            <div className="maker-card">
              <div className="maker-avatar">
                <span className="avatar-icon">👨‍💻</span>
              </div>
              <div className="maker-content">
                <h3 className="maker-name">Nitin Paliwal</h3>
                <p className="maker-role">Founder, Builder & Everything in Between</p>
                
                <div className="maker-story">
                  <p>I'm the solo mind and maker behind HustleHack AI — building powerful AI tools, templates, and systems for young hustlers across India.</p>
                  
                  <p>From automating workflows to designing dashboards and writing every email — I do it all myself. This brand isn't funded, outsourced, or diluted. It's handcrafted with clarity, obsession, and hustle.</p>
                  
                  <p>While most "Meet the Team" sections showcase a big crew, in my case, it's just me building everything: product, code, automation, marketing, and design. And honestly? That's exactly how I like it.</p>
                </div>
                
                <div className="maker-quote">
                  <blockquote>
                    <p>"Let's grow smarter — together. 🚀"</p>
                  </blockquote>
                </div>
                
                <div className="maker-contact">
                  <div className="contact-grid">
                    <div className="contact-item" onClick={() => handleContactClick('Email')}>
                      <span className="contact-icon">📧</span>
                      <div className="contact-info">
                        <span className="contact-label">Email</span>
                        <Link href="mailto:hustlehackai@gmail.com" className="contact-link">hustlehackai@gmail.com</Link>
                      </div>
                    </div>
                    <div className="contact-item" onClick={() => handleContactClick('LinkedIn')}>
                      <span className="contact-icon">💼</span>
                      <div className="contact-info">
                        <span className="contact-label">LinkedIn</span>
                        <Link href="#" className="contact-link">Connect with me</Link>
                      </div>
                    </div>
                    <div className="contact-item" onClick={() => handleContactClick('Twitter')}>
                      <span className="contact-icon">🐦</span>
                      <div className="contact-info">
                        <span className="contact-label">Twitter</span>
                        <Link href="#" className="contact-link">Follow my journey</Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="maker-stats">
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Solo Built</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Hustling</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Dedication</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="maker-journey">
              <h3 className="journey-title">Why I Built HustleHack AI</h3>
              <div className="journey-content">
                <div className="journey-item">
                  <span className="journey-icon">🔥</span>
                  <div className="journey-text">
                    <h4>The Problem I Saw</h4>
                    <p>Young Indians are incredibly talented but lack access to the right AI tools and systems to compete globally.</p>
                  </div>
                </div>
                <div className="journey-item">
                  <span className="journey-icon">💡</span>
                  <div className="journey-text">
                    <h4>The Solution I'm Building</h4>
                    <p>A comprehensive AI platform that's practical, affordable, and designed specifically for Indian students, creators, and solopreneurs.</p>
                  </div>
                </div>
                <div className="journey-item">
                  <span className="journey-icon">🎯</span>
                  <div className="journey-text">
                    <h4>The Mission That Drives Me</h4>
                    <p>To democratize AI education and tools, helping the next generation of Indian talent build, learn, and grow faster than ever before.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">Real results from our community</p>
          
          <div className="impact-grid">
            <div className="impact-stat">
              <span className="impact-number">10,000+</span>
              <span className="impact-label">Students Trained</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">500+</span>
              <span className="impact-label">AI Tools Created</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">1000+</span>
              <span className="impact-label">Projects Launched</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">50+</span>
              <span className="impact-label">Partner Institutions</span>
            </div>
          </div>
          
          <div className="testimonials-section">
            <h3 className="testimonials-title">What Our Community Says</h3>
            <div className="grid grid-3">
              <div className="testimonial-card">
                <p className="testimonial-text">"HustleHack AI transformed my understanding of AI. From a confused student to launching my own AI startup!"</p>
                <div className="testimonial-author">
                  <span className="author-name">Sneha Reddy</span>
                  <span className="author-role">Startup Founder, Bangalore</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">"The practical approach and Indian context made all the difference. I'm now an AI consultant for multiple companies."</p>
                <div className="testimonial-author">
                  <span className="author-name">Vikram Singh</span>
                  <span className="author-role">AI Consultant, Delhi</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">"As a content creator, HustleHack AI's tools have 10x'd my productivity. The community is incredibly supportive!"</p>
                <div className="testimonial-author">
                  <span className="author-name">Meera Joshi</span>
                  <span className="author-role">Content Creator, Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section id="future" className="section bg-surface">
        <div className="container">
          <h2 className="section-title">The Road Ahead</h2>
          <p className="section-subtitle">Our vision for the future of AI education in India</p>
          
          <div className="timeline">
            <div className="timeline-item" onClick={() => handleTimelineClick('2024')}>
              <div className="timeline-marker">2024</div>
              <div className="timeline-content">
                <h3>AI for Everyone</h3>
                <p>Launch vernacular language support and offline-first mobile app to reach tier 2 and tier 3 cities.</p>
              </div>
            </div>
            <div className="timeline-item" onClick={() => handleTimelineClick('2025')}>
              <div className="timeline-marker">2025</div>
              <div className="timeline-content">
                <h3>Industry Partnerships</h3>
                <p>Collaborate with 100+ companies to provide direct job placements and internships for our community.</p>
              </div>
            </div>
            <div className="timeline-item" onClick={() => handleTimelineClick('2026')}>
              <div className="timeline-marker">2026</div>
              <div className="timeline-content">
                <h3>Global Expansion</h3>
                <p>Expand to other developing countries while maintaining our India-first approach and values.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{background: 'linear-gradient(135deg, #7F5AF0, #00FFC2)', color: 'white'}}>
        <div className="container text-center">
          <h2 className="section-title" style={{color: 'white'}}>Ready to Join Our Mission?</h2>
          <p className="section-subtitle" style={{color: 'white', opacity: 0.9}}>Be part of India's AI revolution. Whether you're a student, creator, or entrepreneur, we have the tools and community to help you succeed.</p>
          
          <div className="hero-actions">
            <Link href="#" className="btn btn-lg" style={{background: 'white', color: '#7F5AF0'}}>🚀 Start Your Journey</Link>
            <Link href="/#contact" className="btn btn-lg" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white'}}>📞 Get In Touch</Link>
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
                <Link href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Instagram</Link>
                <Link href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Telegram</Link>
                <Link href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Twitter</Link>
              </div>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Product</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><Link href="/#features" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Features</Link></li>
                <li><Link href="/#pricing" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Pricing</Link></li>
                <li><Link href="/resources" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Resources</Link></li>
                <li><Link href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Company</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><Link href="/about" style={{color: 'var(--accent)', textDecoration: 'none', fontWeight: '600'}}>About</Link></li>
                <li><Link href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Careers</Link></li>
                <li><Link href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Press</Link></li>
                <li><Link href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Legal</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><Link href="/policies/privacy-policy" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Privacy Policy</Link></li>
                <li><Link href="/policies/terms-and-conditions" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Terms of Service</Link></li>
                <li><Link href="/policies/cookie-policy" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Cookie Policy</Link></li>
                <li><Link href="/policies/gdpr" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>GDPR</Link></li>
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
