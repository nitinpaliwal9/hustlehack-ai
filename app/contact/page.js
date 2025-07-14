'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Link from 'next/link'
import { Mail, Clock, Users, MessageCircle, Phone, MapPin, Calendar, Zap, Send, User, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import '../legacy-styles.css'

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [focusedField, setFocusedField] = useState(null)
  
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (value.trim().length < 2) return 'Name must be at least 2 characters long'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        return ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        if (value.length > 100) return 'Email must be less than 100 characters'
        return ''
      case 'subject':
        if (value.trim().length < 5) return 'Subject must be at least 5 characters long'
        if (value.trim().length > 100) return 'Subject must be less than 100 characters'
        return ''
      case 'message':
        if (value.trim().length < 10) return 'Message must be at least 10 characters long'
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
        return ''
      default:
        return ''
    }
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Enforce character limits
    let limitedValue = value
    if (name === 'name' && value.length > 50) limitedValue = value.slice(0, 50)
    if (name === 'email' && value.length > 100) limitedValue = value.slice(0, 100)
    if (name === 'subject' && value.length > 100) limitedValue = value.slice(0, 100)
    if (name === 'message' && value.length > 1000) limitedValue = value.slice(0, 1000)
    
    setFormData(prev => ({ ...prev, [name]: limitedValue }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Clear submission error when user makes changes
    if (submissionError) {
      setSubmissionError('')
    }
  }
  
  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
    setFocusedField(null)
  }
  
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
    // Clear error when field is focused
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }
  }
  
  // Check if form is valid
  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'subject', 'message']
    return requiredFields.every(field => {
      const value = formData[field]
      return value.trim().length > 0 && !validateField(field, value)
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous submission error
    setSubmissionError('')
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(field => {
      if (field !== 'priority') {
        const error = validateField(field, formData[field])
        if (error) newErrors[field] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Focus on first error field
      const firstErrorField = Object.keys(newErrors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      if (element) {
        element.focus()
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData)
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'normal'
      })
      setErrors({})
    } catch (error) {
      console.error('Submission error:', error)
      setSubmissionError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isSubmitted) {
    return (
      <div className="success-message" style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '2px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '24px',
        padding: '3rem',
        textAlign: 'center',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #10B981, #059669)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          animation: 'bounce 1s ease-in-out'
        }}>
          <CheckCircle size={40} color="white" />
        </div>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#10B981',
          marginBottom: '1rem',
          fontFamily: 'var(--font-display)'
        }}>Message Sent Successfully!</h3>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>Thank you for reaching out! We've received your message and will get back to you within 24 hours.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, var(--primary), #6B46C1)',
            border: 'none',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Send Another Message
        </button>
      </div>
    )
  }
  
  return (
    <div className="contact-form-container" style={{
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative'
    }}>
      <form onSubmit={handleSubmit} className="contact-form" style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '3rem',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Form Header */}
        <div className="form-header" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'var(--gradient)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>💬</div>
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 0.25rem 0',
              fontFamily: 'var(--font-display)'
            }}>Get in Touch</h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              margin: '0'
            }}>We'll respond within 24 hours</p>
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="form-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              transition: 'color 0.3s ease'
            }}>Full Name *</label>
            <div className="input-wrapper" style={{
              position: 'relative'
            }}>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                className={`form-input ${errors.name ? 'error' : ''} ${focusedField === 'name' ? 'focused' : ''}`}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                maxLength={50}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${errors.name ? '#EF4444' : focusedField === 'name' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(127, 90, 240, 0.1)' : 'none'
                }}
              />
              <User size={18} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: focusedField === 'name' ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'color 0.3s ease'
              }} />
              {errors.name && (
                <div id="name-error" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#EF4444',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem'
                }}>
                  <AlertCircle size={16} />
                  {errors.name}
                </div>
              )}
            </div>
          </div>
          
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>Email Address *</label>
            <div className="input-wrapper" style={{
              position: 'relative'
            }}>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                placeholder="your.email@example.com"
                className={`form-input ${errors.email ? 'error' : ''} ${focusedField === 'email' ? 'focused' : ''}`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                maxLength={100}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${errors.email ? '#EF4444' : focusedField === 'email' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(127, 90, 240, 0.1)' : 'none'
                }}
              />
              <Mail size={18} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: focusedField === 'email' ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'color 0.3s ease'
              }} />
              {errors.email && (
                <div id="email-error" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#EF4444',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem'
                }}>
                  <AlertCircle size={16} />
                  {errors.email}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Subject and Priority Row */}
        <div className="form-row" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="subject" style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>Subject *</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
              onFocus={() => handleFocus('subject')}
              onBlur={handleBlur}
              placeholder="What's this about?"
              className={`form-input ${errors.subject ? 'error' : ''} ${focusedField === 'subject' ? 'focused' : ''}`}
              aria-invalid={errors.subject ? 'true' : 'false'}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              maxLength={100}
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${errors.subject ? '#EF4444' : focusedField === 'subject' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxShadow: focusedField === 'subject' ? '0 0 0 4px rgba(127, 90, 240, 0.1)' : 'none'
              }}
            />
            {errors.subject && (
              <div id="subject-error" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#EF4444',
                fontSize: '0.875rem',
                marginTop: '0.5rem'
              }}>
                <AlertCircle size={16} />
                {errors.subject}
              </div>
            )}
          </div>
          
          {/* Priority Field */}
          <div className="form-group">
            <label htmlFor="priority" style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>Priority</label>
            <select
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={handleInputChange}
              onFocus={() => handleFocus('priority')}
              onBlur={handleBlur}
              className={`form-input ${focusedField === 'priority' ? 'focused' : ''}`}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${focusedField === 'priority' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.3s ease',
                outline: 'none',
                cursor: 'pointer',
                boxShadow: focusedField === 'priority' ? '0 0 0 4px rgba(127, 90, 240, 0.1)' : 'none'
              }}
            >
              <option value="low" style={{ background: 'var(--bg-primary)', color: 'white' }}>💚 Low Priority</option>
              <option value="normal" style={{ background: 'var(--bg-primary)', color: 'white' }}>💛 Normal Priority</option>
              <option value="high" style={{ background: 'var(--bg-primary)', color: 'white' }}>🔥 High Priority</option>
              <option value="urgent" style={{ background: 'var(--bg-primary)', color: 'white' }}>🚨 Urgent</option>
            </select>
          </div>
        </div>
        
        {/* Message Field */}
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label htmlFor="message" style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>Message *</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            placeholder="Tell us about your project, question, or how we can help you..."
            rows={6}
            className={`form-input ${errors.message ? 'error' : ''} ${focusedField === 'message' ? 'focused' : ''}`}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            maxLength={1000}
            required
            style={{
              width: '100%',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: `2px solid ${errors.message ? '#EF4444' : focusedField === 'message' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              fontFamily: 'var(--font-primary)',
              transition: 'all 0.3s ease',
              outline: 'none',
              resize: 'vertical',
              minHeight: '140px',
              boxShadow: focusedField === 'message' ? '0 0 0 4px rgba(127, 90, 240, 0.1)' : 'none'
            }}
          />
          {errors.message && (
            <div id="message-error" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#EF4444',
              fontSize: '0.875rem',
              marginTop: '0.5rem'
            }}>
              <AlertCircle size={16} />
              {errors.message}
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.5rem'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              {formData.message.length}/1000 characters
            </span>
            <span style={{
              fontSize: '0.875rem',
              color: formData.message.length >= 10 ? 'var(--accent)' : 'var(--text-secondary)'
            }}>
              {formData.message.length >= 10 ? '✓ Good length' : 'Minimum 10 characters'}
            </span>
          </div>
        </div>
        
        {/* Submission Error */}
        {submissionError && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            marginBottom: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#EF4444',
            fontSize: '0.9rem',
            fontWeight: '500',
            textAlign: 'center',
            justifyContent: 'center'
          }}>
            <AlertCircle size={18} />
            {submissionError}
          </div>
        )}
        
        {/* Submit Button */}
        <div className="form-actions" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid()}
            className="btn btn-primary"
            style={{
              background: isSubmitting ? 'rgba(127, 90, 240, 0.5)' : !isFormValid() ? 'rgba(127, 90, 240, 0.4)' : 'linear-gradient(135deg, var(--primary), #6B46C1)',
              border: 'none',
              color: 'white',
              padding: '1.25rem 2.5rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: isSubmitting || !isFormValid() ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'relative',
              minWidth: '180px',
              justifyContent: 'center',
              boxShadow: isFormValid() ? '0 8px 25px rgba(127, 90, 240, 0.3)' : 'none',
              transform: isSubmitting ? 'translateY(0)' : 'translateY(0)',
              opacity: isSubmitting || !isFormValid() ? 0.6 : 1
            }}
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>
        </div>
        
        {/* Form Footer */}
        <div className="form-footer" style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            margin: '0 0 0.5rem 0',
            lineHeight: '1.5'
          }}>
            ⚡ <strong style={{ color: 'var(--accent)' }}>Quick Response Guarantee:</strong> We respond to all messages within 24 hours
          </p>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            margin: '0'
          }}>
            🔒 Your information is secure and will never be shared with third parties
          </p>
        </div>
      </form>
    </div>
  )
}

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
                <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: '700' }}>{"< 24h"}</div>
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
          
          <div className="grid grid-2" style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem', 
            marginBottom: '4rem' 
          }}>
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
          
          {/* Contact Form Section */}
          <div className="contact-form-section" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
              <h2 className="section-title" style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'white',
                marginBottom: '1rem',
                fontFamily: 'var(--font-display)'
              }}>💬 Send Us a Message</h2>
              <p className="section-subtitle" style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>Have a specific question or want to discuss your project? Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            
            <ContactForm />
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
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        /* Contact Form Styles */
        .contact-form {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .contact-form:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(127, 90, 240, 0.15) !important;
          border-color: rgba(127, 90, 240, 0.3) !important;
        }
        
        .form-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .form-input:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(127, 90, 240, 0.2) !important;
        }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }
        
        .form-input:focus::placeholder {
          color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }
        
        .form-group {
          position: relative;
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .form-group:focus-within label {
          color: var(--primary) !important;
          transform: translateY(-2px);
        }
        
        .input-wrapper {
          position: relative;
          overflow: hidden;
        }
        
        .input-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(127, 90, 240, 0.1), transparent);
          transition: left 0.6s ease;
          z-index: 1;
          pointer-events: none;
        }
        
        .input-wrapper:focus-within::before {
          left: 100%;
        }
        
        .btn:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 30px rgba(127, 90, 240, 0.4) !important;
        }
        
        .btn:active {
          transform: translateY(-1px) !important;
        }
        
        .success-message {
          position: relative;
          overflow: hidden;
        }
        
        .success-message::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10B981, #059669, #10B981);
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .form-header {
          position: relative;
        }
        
        .form-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient);
          transition: width 0.6s ease;
        }
        
        .contact-form:hover .form-header::after {
          width: 100%;
        }
        
        .form-footer {
          position: relative;
          overflow: hidden;
        }
        
        .form-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 194, 0.05), transparent);
          transition: left 0.8s ease;
          pointer-events: none;
        }
        
        .form-footer:hover::before {
          left: 100%;
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
            padding-top: 120px !important;
            padding-bottom: 60px !important;
          }
          
          .container {
            padding: 0 1.5rem !important;
          }
          
          .card {
            padding: 2rem !important;
          }
          
          /* Contact Form Mobile Styles */
          .contact-form {
            padding: 2rem !important;
            margin: 0 0.5rem !important;
            border-radius: 20px !important;
          }
          
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          
          .form-input {
            padding: 0.875rem !important;
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
          
          .form-input[name="name"],
          .form-input[name="email"] {
            padding: 0.875rem 0.875rem 0.875rem 2.5rem !important;
          }
          
          .form-header {
            margin-bottom: 2rem !important;
            padding-bottom: 1rem !important;
          }
          
          .form-header h3 {
            font-size: 1.25rem !important;
          }
          
          .form-header div:first-child {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.25rem !important;
          }
          
          .form-actions button {
            padding: 1rem 1.5rem !important;
            font-size: 1rem !important;
            min-width: 100% !important;
          }
          
          .form-footer {
            padding: 1.25rem !important;
            margin-top: 1.5rem !important;
          }
          
          .success-message {
            padding: 2rem !important;
            margin: 0 1rem !important;
            border-radius: 20px !important;
          }
          
          .success-message div:first-child {
            width: 60px !important;
            height: 60px !important;
            margin-bottom: 1.5rem !important;
          }
          
          .success-message h3 {
            font-size: 1.5rem !important;
          }
          
          .success-message p {
            font-size: 1rem !important;
          }
          
          .contact-form:hover {
            transform: none !important;
          }
          
          .form-input:focus {
            transform: none !important;
          }
          
          .btn:hover {
            transform: none !important;
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
          
          /* Contact Form Extra Small Mobile Styles */
          .contact-form {
            padding: 1.5rem !important;
            margin: 0 0.5rem !important;
            border-radius: 16px !important;
          }
          
          .form-input {
            padding: 0.75rem !important;
            font-size: 16px !important;
          }
          
          .form-input[name="name"],
          .form-input[name="email"] {
            padding: 0.75rem 0.75rem 0.75rem 2.25rem !important;
          }
          
          .form-header {
            margin-bottom: 1.5rem !important;
            padding-bottom: 1rem !important;
          }
          
          .form-header h3 {
            font-size: 1.125rem !important;
          }
          
          .form-header div:first-child {
            width: 35px !important;
            height: 35px !important;
            font-size: 1.125rem !important;
          }
          
          .form-actions button {
            padding: 0.875rem 1.25rem !important;
            font-size: 0.95rem !important;
            min-width: 100% !important;
          }
          
          .form-footer {
            padding: 1rem !important;
            margin-top: 1.25rem !important;
          }
          
          .form-footer p {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
          
          .success-message {
            padding: 1.5rem !important;
            margin: 0 0.5rem !important;
            border-radius: 16px !important;
          }
          
          .success-message div:first-child {
            width: 50px !important;
            height: 50px !important;
            margin-bottom: 1.25rem !important;
          }
          
          .success-message h3 {
            font-size: 1.25rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .success-message p {
            font-size: 0.9rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .form-group {
            margin-bottom: 1.25rem !important;
          }
          
          .form-group label {
            font-size: 0.85rem !important;
          }
          
          .input-wrapper svg {
            width: 16px !important;
            height: 16px !important;
            left: 0.75rem !important;
          }
          
          .contact-form-section {
            margin-top: 3rem !important;
            margin-bottom: 3rem !important;
          }
          
          .section-title {
            font-size: 1.875rem !important;
          }
          
          .section-subtitle {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}
