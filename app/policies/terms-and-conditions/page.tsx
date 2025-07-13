'use client'

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import '../../legacy-styles.css'

export default function TermsAndConditions() {
  return (
    <div>
      <Navigation />
      
      <main style={{ 
        paddingTop: '140px', 
        paddingBottom: '80px',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div className="container">
          {/* Header Section */}
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h1 style={{ 
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              fontSize: '2.5rem',
              fontWeight: '700',
              fontFamily: 'var(--font-display)'
            }}>📄 Terms and Conditions</h1>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.125rem',
              marginBottom: '0.5rem',
              lineHeight: '1.6'
            }}>Welcome to HustleHack AI! These Terms govern your access to and use of our platform, services, and any digital products or resources we provide. By subscribing or using our services, you agree to these Terms.</p>
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
            padding: '3rem',
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
              <h2>1. Introduction</h2>
              <p>Welcome to HustleHack AI! These Terms govern your access to and use of our platform, services, and any digital products or resources we provide. By subscribing or using our services, you agree to these Terms.</p>
            </section>

            <section>
              <h2>2. Eligibility</h2>
              <p>You must be at least 13 years old (or the legal age in your country) and have permission to use this service if under 18. By using our services, you represent that you meet these criteria.</p>
            </section>

            <section>
              <h2>3. Subscriptions & Billing</h2>
              <p>HustleHack AI offers monthly access plans (Starter ₹99, Creator ₹199, Pro ₹299). All payments are processed securely via Razorpay. Subscriptions are non-refundable and do not auto-renew. Access is granted for 30 days from the date of purchase.</p>
            </section>

            <section>
              <h2>4. Use of Content</h2>
              <p>The content provided (AI tools, prompt packs, templates, PDFs, and weekly drops) is for personal use only. Redistribution, resale, or automated scraping is strictly prohibited.</p>
            </section>

            <section>
              <h2>5. User Conduct</h2>
              <p>You agree not to misuse, reverse engineer, hack, or interfere with our systems or content. Violating these rules may result in suspension of access.</p>
            </section>

            <section>
              <h2>6. Intellectual Property</h2>
              <p>All HustleHack AI branding, designs, content, and digital assets are the intellectual property of HustleHack AI and may not be copied or distributed without permission.</p>
            </section>

            <section>
              <h2>7. Account Termination</h2>
              <p>We may suspend or terminate access if we detect abuse, fraud, or breach of these terms. Access will also expire automatically after your subscription period ends.</p>
            </section>

            <section>
              <h2>8. Limitation of Liability</h2>
              <p>HustleHack AI is provided "as is." We do not guarantee specific results. We are not liable for any damages resulting from the use or inability to use our services.</p>
            </section>

            <section>
              <h2>9. Changes to Terms</h2>
              <p>We may update these Terms at any time. Continued use of HustleHack AI after changes are posted constitutes acceptance of the revised Terms.</p>
            </section>

            <section>
              <h2>10. Contact Information</h2>
              <p>For questions, feedback, or support, email us at:</p>
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
            <Link href="/policies/cookie-policy" style={{
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
              🍪 Cookie Policy
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
