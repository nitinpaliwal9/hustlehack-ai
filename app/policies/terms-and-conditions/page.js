'use client'

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import '../../legacy-styles.css'

export default function TermsAndConditionsPage() {
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
            }}>📄 Terms and Conditions</h1>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.125rem',
              marginBottom: '0.5rem',
              lineHeight: '1.6'
            }}>Please read these terms carefully before using our services.</p>
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
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using HustleHack AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section>
              <h2>2. Description of Service</h2>
              <p>HustleHack AI is an AI-powered platform that provides tools and services for business optimization, content creation, and workflow automation. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.</p>
              
              <h3>Service Features</h3>
              <ul>
                <li>AI-powered business tools and automation</li>
                <li>Content generation and optimization</li>
                <li>Workflow management and analytics</li>
                <li>Integration with third-party platforms</li>
                <li>Customer support and documentation</li>
              </ul>
            </section>

            <section>
              <h2>3. User Accounts</h2>
              <p>To access certain features of our service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              
              <h3>Account Responsibilities</h3>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your login credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use the service only for lawful purposes</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2>4. Acceptable Use</h2>
              <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You may not use the service:</p>
              <ul>
                <li>To violate any local, state, national, or international law</li>
                <li>To transmit harmful, offensive, or inappropriate content</li>
                <li>To infringe upon the rights of others</li>
                <li>To interfere with or disrupt the service</li>
                <li>To attempt to gain unauthorized access to our systems</li>
                <li>To use the service for commercial purposes without authorization</li>
              </ul>
            </section>

            <section>
              <h2>5. Intellectual Property</h2>
              <p>The service and its original content, features, and functionality are and will remain the exclusive property of HustleHack AI and its licensors. The service is protected by copyright, trademark, and other laws.</p>
              
              <h3>Your Content</h3>
              <p>You retain ownership of any content you submit to our service. However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content for the purpose of providing the service.</p>
            </section>

            <section>
              <h2>6. Payment Terms</h2>
              <p>Certain features of our service may be offered on a paid subscription basis. Payment terms are as follows:</p>
              <ul>
                <li>Subscription fees are billed in advance</li>
                <li>All payments are non-refundable unless otherwise stated</li>
                <li>Prices may change with 30 days' notice</li>
                <li>Failure to pay may result in service suspension</li>
                <li>Cancellation policies apply as stated in your subscription agreement</li>
              </ul>
            </section>

            <section>
              <h2>7. Privacy Policy</h2>
              <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.</p>
              <p>By using our service, you consent to the collection and use of information in accordance with our <Link href="/policies/privacy-policy">Privacy Policy</Link>.</p>
            </section>

            <section>
              <h2>8. Disclaimers</h2>
              <p>The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, this company:</p>
              <ul>
                <li>Excludes all representations and warranties relating to this service</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this service</li>
                <li>Does not guarantee the accuracy, completeness, or availability of the service</li>
                <li>Reserves the right to modify or discontinue the service at any time</li>
              </ul>
            </section>

            <section>
              <h2>9. Limitation of Liability</h2>
              <p>In no event shall HustleHack AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
            </section>

            <section>
              <h2>10. Termination</h2>
              <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
              
              <h3>Effect of Termination</h3>
              <p>Upon termination, your right to use the service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive termination.</p>
            </section>

            <section>
              <h2>11. Governing Law</h2>
              <p>These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company is incorporated, without regard to its conflict of law provisions.</p>
            </section>

            <section>
              <h2>12. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
            </section>

            <section>
              <h2>13. Contact Information</h2>
              <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
              <div className="contact-info">
                <p>Email: legal@hustlehack.ai</p>
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
            <Link href="/policies/gdpr" style={{
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
              🇪🇺 GDPR Compliance
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
