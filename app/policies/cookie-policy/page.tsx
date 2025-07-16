'use client'

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import '../../legacy-styles.css'

export default function CookiePolicy() {
  return (
    <div>
      <Navigation />
      
      <main style={{ 
        paddingTop: '8rem',
        paddingBottom: '8rem',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div className="container">
          {/* Header Section */}
          <div className="text-center" style={{ marginBottom: '6rem' }}>
            <h1 style={{ 
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              fontSize: '2.5rem',
              fontWeight: '700',
              fontFamily: 'var(--font-display)'
            }}>🍪 Cookie Policy</h1>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.125rem',
              marginBottom: '0.5rem',
              lineHeight: '1.6'
            }}>Learn how we use cookies to improve your experience on our platform.</p>
            <p style={{ 
              color: 'var(--accent)',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>Last updated: December 2024</p>
          </div>
          
          {/* Content Card */}
          <div className="card" style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-2xl)',
            padding: '4rem',
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-xl)',
            backdropFilter: 'blur(20px)'
          }}>
            <style jsx>{`
              .card h2 {
                color: var(--text-primary);
                font-size: 1.75rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
                margin-top: 3rem;
                padding-bottom: 0.75rem;
                border-bottom: 2px solid var(--primary);
                font-family: var(--font-display);
              }
              .card h2:first-child {
                margin-top: 0;
              }
              .card h3 {
                color: var(--text-primary);
                font-size: 1.375rem;
                font-weight: 600;
                margin-bottom: 1rem;
                margin-top: 2rem;
                font-family: var(--font-display);
              }
              .card p {
                color: var(--text-secondary);
                font-size: 1.125rem;
                line-height: 1.8;
                margin-bottom: 1.5rem;
                font-family: var(--font-primary);
              }
              .card ul {
                margin-bottom: 2rem;
                padding-left: 2rem;
              }
              .card li {
                color: var(--text-secondary);
                font-size: 1.125rem;
                line-height: 1.8;
                margin-bottom: 0.75rem;
                font-family: var(--font-primary);
              }
              .card section {
                margin-bottom: 2.5rem;
              }
              .card section:last-child {
                margin-bottom: 0;
              }
              .contact-info {
                background: rgba(127, 90, 240, 0.1);
                border: 1px solid rgba(127, 90, 240, 0.2);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                margin-top: 1.5rem;
                border-left: 4px solid var(--primary);
              }
              .contact-info p {
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary);
              }
              .contact-info p:last-child {
                margin-bottom: 0;
              }
              .contact-info a {
                color: var(--primary);
                text-decoration: none;
                font-weight: 500;
                transition: var(--transition-fast);
              }
              .contact-info a:hover {
                color: var(--accent);
                text-decoration: underline;
              }
            `}</style>
            <section>
              <h2>1. What Are Cookies?</h2>
              <p>Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>
            </section>

            <section>
              <h2>2. How We Use Cookies</h2>
              <p>HustleHack AI uses cookies to:</p>
              <ul>
                <li>Remember your login status and preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve our services and user experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
            </section>

            <section>
              <h2>3. Types of Cookies We Use</h2>
              
              <h3>Essential Cookies</h3>
              <p>These are necessary for the website to function properly and cannot be disabled. They include authentication tokens and session management.</p>
              
              <h3>Analytics Cookies</h3>
              <p>We use Google Analytics to understand how visitors use our website. These cookies help us improve our services.</p>
              
              <h3>Functional Cookies</h3>
              <p>These enhance your experience by remembering your preferences and settings.</p>
            </section>

            <section>
              <h2>4. Third-Party Cookies</h2>
              <p>We may use third-party services that set their own cookies, including:</p>
              <ul>
                <li>Google Analytics for website analytics</li>
                <li>Razorpay for payment processing</li>
                <li>Social media platforms for sharing features</li>
              </ul>
            </section>

            <section>
              <h2>5. Managing Cookies</h2>
              <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
              <ul>
                <li>View what cookies are stored</li>
                <li>Delete cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Set preferences for cookie handling</li>
              </ul>
              <p>Note that disabling cookies may affect the functionality of our website.</p>
            </section>

            <section>
              <h2>6. Cookie Consent</h2>
              <p>By using our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings.</p>
            </section>

            <section>
              <h2>7. Updates to This Policy</h2>
              <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
            </section>

            <section>
              <h2>8. Contact Us</h2>
              <p>If you have any questions about our Cookie Policy, please contact us at:</p>
              <div className="contact-info">
                <p>Email: <a href="mailto:hustlehackai@gmail.com">hustlehackai@gmail.com</a></p>
                <p>Website: <Link href="/">https://hustlehack.ai</Link></p>
              </div>
            </section>
          </div>
          
          {/* Navigation Section */}
          <div className="card" style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-2xl)',
            padding: '2rem',
            maxWidth: '900px',
            margin: '2rem auto 0',
            boxShadow: 'var(--shadow-lg)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link href="/policies/privacy-policy" style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255, 255, 255, 0.05)',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🔒 Privacy Policy
            </Link>
            <Link href="/policies/terms-and-conditions" style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255, 255, 255, 0.05)',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📄 Terms of Service
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
