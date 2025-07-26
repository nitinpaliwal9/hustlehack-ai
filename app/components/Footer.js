'use client'

import Link from 'next/link'
import { FaInstagram, FaTelegramPlane, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#0F0F1B] border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-[#00FFC2] mb-3">HustleHack AI</h3>
            <p className="text-gray-400 mb-4">Empowering the next generation of Indian creators and entrepreneurs with AI.</p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.instagram.com/hustlehackai" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#00FFC2] text-2xl hover:opacity-80 transition-opacity"><FaInstagram aria-hidden="true" /></a>
              <a href="https://t.me/hustlehackai" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-[#00FFC2] text-2xl hover:opacity-80 transition-opacity"><FaTelegramPlane aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/company/hustlehackai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#00FFC2] text-2xl hover:opacity-80 transition-opacity"><FaLinkedin aria-hidden="true" /></a>
              <a href="https://www.youtube.com/@HustleHackAI" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#00FFC2] text-2xl hover:opacity-80 transition-opacity"><FaYoutube aria-hidden="true" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Pricing</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#00FFC2] transition-colors">API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-[#00FFC2] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Press</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/policies/privacy-policy" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms-and-conditions" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Terms of Service</Link></li>
              <li><Link href="/policies/cookie-policy" className="text-gray-400 hover:text-[#00FFC2] transition-colors">Cookie Policy</Link></li>
              <li><Link href="/policies/gdpr" className="text-gray-400 hover:text-[#00FFC2] transition-colors">GDPR</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-white/10">
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-[#151a28] border border-[#7F5AF0] text-[#7F5AF0] font-semibold text-base shadow-md">
            <span role="img" aria-label="heart" className="mr-2">❤️</span>
            Loved by Students & Creators
          </div>
          <p className="text-gray-400 text-sm">© 2024 HustleHack AI. All rights reserved.<br /><span className="block mt-2 text-[#00FFC2]">Made with ❤️ in India.</span></p>
        </div>
      </div>
    </footer>
  )
}
