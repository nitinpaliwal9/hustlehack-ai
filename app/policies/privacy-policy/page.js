'use client'

import Navigation from '../../components/NavigationClient'
import Footer from '../../components/FooterClient'
import Link from 'next/link'
// Removed: import '../../legacy-styles.css'

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Navigation />
      <main className="pt-32 pb-32 min-h-screen bg-[#0A1020]">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-24">
            <h1 className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] bg-clip-text text-transparent mb-4 text-4xl sm:text-5xl font-extrabold font-display">🔒 Privacy Policy</h1>
            <p className="text-[#9CA3AF] text-lg mb-2 leading-relaxed">Your privacy is important to us. Here's how we protect it.</p>
            <p className="text-[#00FFC2] text-base font-semibold">Last updated: July 2025</p>
          </div>
          {/* Content Card */}
          <div className="bg-[#181f36]/80 border border-[#7F5AF0] rounded-2xl shadow-2xl p-8 sm:p-12 text-white text-base leading-7">
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
              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
              
              <h3>Personal Information</h3>
              <ul>
                <li>Name and email address</li>
                <li>Payment information (processed securely by our payment partners)</li>
                <li>Profile information and preferences</li>
                <li>Communication records with our support team</li>
              </ul>
              
              <h3>Usage Information</h3>
              <ul>
                <li>Information about how you use our services</li>
                <li>Log data and device information</li>
                <li>Analytics and performance data</li>
              </ul>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Personalize your experience and provide relevant content</li>
                <li>Monitor and analyze trends and usage patterns</li>
              </ul>
            </section>

            <section>
              <h2>3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following cases:</p>
              <ul>
                <li>With service providers who assist us in operating our platform</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
              
              <h3>Security Measures</h3>
              <ul>
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2>6. Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies to collect and track information about your use of our service. You can control cookies through your browser settings.</p>
              
              <p>For more information about our use of cookies, please see our <Link href="/policies/cookie-policy">Cookie Policy</Link>.</p>
            </section>

            <section>
              <h2>7. Data Retention</h2>
              <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.</p>
            </section>

            <section>
              <h2>8. International Data Transfers</h2>
              <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information.</p>
            </section>

            <section>
              <h2>9. Children's Privacy</h2>
              <p>Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will delete it immediately.</p>
            </section>

            <section>
              <h2>10. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.</p>
            </section>

            <section>
              <h2>11. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at:</p>
              <div className="contact-info">
                <p>Email: privacy@hustlehack.ai</p>
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
