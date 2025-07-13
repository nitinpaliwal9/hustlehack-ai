'use client'

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'
import '../../legacy-styles.css'

export default function GDPR() {
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
            }}>🛡️ GDPR Compliance</h1>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.125rem',
              marginBottom: '0.5rem',
              lineHeight: '1.6'
            }}>HustleHack AI is committed to protecting your privacy and personal data in accordance with the General Data Protection Regulation (GDPR). This page outlines your rights and how we handle your personal information.</p>
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
              <p>HustleHack AI is committed to protecting your privacy and personal data in accordance with the General Data Protection Regulation (GDPR). This page outlines your rights and how we handle your personal information.</p>
            </section>

            <section>
              <h2>2. Data Controller Information</h2>
              <p>HustleHack AI acts as the data controller for personal data collected through our website and services.</p>
              <div className="contact-info">
                <p><strong>Contact:</strong> <a href="mailto:hustlehackai@gmail.com">hustlehackai@gmail.com</a></p>
              </div>
            </section>

            <section>
              <h2>3. Your Rights Under GDPR</h2>
              <p>Under GDPR, you have the following rights regarding your personal data:</p>
              
              <h3>Right to Access</h3>
              <p>You have the right to request access to your personal data and obtain information about how we process it.</p>

              <h3>Right to Rectification</h3>
              <p>You can request correction of inaccurate or incomplete personal data.</p>

              <h3>Right to Erasure ("Right to be Forgotten")</h3>
              <p>You may request deletion of your personal data in certain circumstances.</p>

              <h3>Right to Restrict Processing</h3>
              <p>You can request that we limit the processing of your personal data in specific situations.</p>

              <h3>Right to Data Portability</h3>
              <p>You have the right to receive your personal data in a structured, commonly used format and transfer it to another controller.</p>

              <h3>Right to Object</h3>
              <p>You may object to the processing of your personal data for direct marketing or other legitimate interests.</p>

              <h3>Right to Withdraw Consent</h3>
              <p>Where processing is based on consent, you can withdraw it at any time.</p>
            </section>

            <section>
              <h2>4. Legal Basis for Processing</h2>
              <p>We process your personal data based on:</p>
              <ul>
                <li><strong>Consent:</strong> When you explicitly agree to data processing</li>
                <li><strong>Contract:</strong> To provide our services and fulfill our obligations</li>
                <li><strong>Legal Obligation:</strong> To comply with legal requirements</li>
                <li><strong>Legitimate Interest:</strong> For business operations and service improvement</li>
              </ul>
            </section>

            <section>
              <h2>5. Data Protection Measures</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal data:</p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Access controls and authentication</li>
                <li>Regular security assessments</li>
                <li>Employee training on data protection</li>
                <li>Secure data backup and recovery procedures</li>
              </ul>
            </section>

            <section>
              <h2>6. Data Retention</h2>
              <p>We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, or establish, exercise, or defend legal claims.</p>
            </section>

            <section>
              <h2>7. International Data Transfers</h2>
              <p>If we transfer your data outside the European Economic Area (EEA), we ensure adequate protection through appropriate safeguards such as standard contractual clauses or adequacy decisions.</p>
            </section>

            <section>
              <h2>8. Automated Decision-Making</h2>
              <p>We may use automated decision-making processes for certain services. You have the right to request human intervention, express your point of view, and contest automated decisions.</p>
            </section>

            <section>
              <h2>9. Data Breach Notification</h2>
              <p>In case of a data breach that poses a high risk to your rights and freedoms, we will notify you without undue delay, typically within 72 hours of becoming aware of the breach.</p>
            </section>

            <section>
              <h2>10. Exercising Your Rights</h2>
              <p>To exercise any of your GDPR rights, please contact us at:</p>
              <div className="contact-info">
                <p>Email: <a href="mailto:hustlehackai@gmail.com">hustlehackai@gmail.com</a></p>
                <p>Website: <Link href="/">https://hustlehack.ai</Link></p>
              </div>
              <p>We will respond to your request within one month. In complex cases, we may extend this period by up to two months.</p>
            </section>

            <section>
              <h2>11. Complaints</h2>
              <p>If you believe we have not handled your personal data in accordance with GDPR, you have the right to lodge a complaint with your local supervisory authority.</p>
            </section>

            <section>
              <h2>12. Updates to This Notice</h2>
              <p>We may update this GDPR compliance notice from time to time. Any significant changes will be communicated to you through our website or other appropriate channels.</p>
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
