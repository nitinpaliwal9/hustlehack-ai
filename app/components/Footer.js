'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="section" style={{background: '#0F0F1B', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
      <div className="container">
        <div className="grid grid-4">
          <div>
            <h3 style={{color: 'white', marginBottom: '1rem'}}>HustleHack AI</h3>
            <p style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Empowering the next generation of Indian creators and entrepreneurs with AI.</p>
            <div style={{display: 'flex', gap: '1rem'}}>
              <Link href="/contact" style={{color: 'var(--primary)', textDecoration: 'none'}}>Instagram</Link>
              <Link href="/contact" style={{color: 'var(--primary)', textDecoration: 'none'}}>Telegram</Link>
              <Link href="/contact" style={{color: 'var(--primary)', textDecoration: 'none'}}>Twitter</Link>
            </div>
          </div>
          
          <div>
            <h4 style={{color: 'white', marginBottom: '1rem'}}>Product</h4>
            <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
              <li><Link href="/#features" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Features</Link></li>
              <li><Link href="/#pricing" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Pricing</Link></li>
              <li><Link href="/resources" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Resources</Link></li>
              <li><Link href="/contact" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{color: 'white', marginBottom: '1rem'}}>Company</h4>
            <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
              <li><Link href="/about" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>About</Link></li>
              <li><Link href="/contact" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Careers</Link></li>
              <li><Link href="/contact" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Press</Link></li>
              <li><Link href="/contact" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Contact</Link></li>
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
  )
}
