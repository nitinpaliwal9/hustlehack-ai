'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Mail, Clock, Users, MessageCircle, Phone, MapPin, Calendar, Zap, Send, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import '../legacy-styles.css';

// Contact Form Component
function ContactForm() {
  // ...full ContactForm code from page.js...
}

export default function ContactClient() {
  const { user, isAuthenticated } = useAuth();
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
            {isAuthenticated && user && (
              <div style={{
                background: 'rgba(127, 90, 240, 0.1)',
                border: '2px solid rgba(127, 90, 240, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto'
              }}>
                <p style={{
                  fontSize: '1.125rem',
                  color: 'var(--accent)',
                  fontWeight: '600',
                  margin: '0'
                }}>
                  👋 Welcome back, {user.user_metadata?.name || user.email?.split('@')[0] || 'Hustler'}!
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  margin: '0.5rem 0 0 0'
                }}>
                  We're excited to hear from you. Share your thoughts, questions, or project ideas below.
                </p>
              </div>
            )}
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
              {isAuthenticated 
                ? "Thanks for signing in! We're here to help you with any questions or support you need."
                : "Ready to supercharge your AI journey? We're here to help you unlock your potential with cutting-edge tools and personalized support."
              }
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
            </div>
            {/* Contact Form Section */}
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 