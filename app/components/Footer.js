'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer-section py-12 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-accent mb-3">HustleHack AI</h3>
            <p className="text-[var(--text-secondary)] mb-4">Empowering the next generation of Indian creators and entrepreneurs with AI.</p>
            <div className="flex gap-4 mt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-accent text-2xl hover:opacity-80 transition-opacity"><span aria-hidden="true">📸</span></a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-accent text-2xl hover:opacity-80 transition-opacity"><span aria-hidden="true">✈️</span></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-accent text-2xl hover:opacity-80 transition-opacity"><span aria-hidden="true">🐦</span></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="footer-link">Features</Link></li>
              <li><Link href="/#pricing" className="footer-link">Pricing</Link></li>
              <li><Link href="/resources" className="footer-link">Resources</Link></li>
              <li><a href="/contact" className="footer-link">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><a href="/contact" className="footer-link">Careers</a></li>
              <li><a href="/contact" className="footer-link">Press</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/policies/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/policies/terms-and-conditions" className="footer-link">Terms of Service</Link></li>
              <li><Link href="/policies/cookie-policy" className="footer-link">Cookie Policy</Link></li>
              <li><Link href="/policies/gdpr" className="footer-link">GDPR</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-[var(--border-color)]">
          <p className="text-[var(--text-secondary)] text-sm">© 2024 HustleHack AI. All rights reserved. <span className="text-accent">Made with ❤️ in India.</span></p>
        </div>
      </div>
    </footer>
  )
}
