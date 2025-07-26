import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScmmgD6pKA4iccGC5DV0jcKnO5iYbo9Z_Pl9FlKPTkybUMuAQ/viewform?usp=sharing&ouid=109907734619376128482';

export default function StartupCommunityPage() {
  return (
    <div className="min-h-screen bg-[#0F0F1B]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 bg-gradient-to-b from-[#0F0F1B] via-[#181A2A] to-[#0F0F1B]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Image 
                src="/logo (2).webp" 
                alt="HustleHack AI Logo" 
                width={64} 
                height={64} 
                className="rounded-xl bg-white p-2"
              />
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] tracking-wide">HustleHack AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Join or Build a Startup with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2]">HustleHack AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Don't Build Alone.{' '}
              <span className="text-[#00FFC2] font-bold">Build with the Right People.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
                Thousands of students, creators, and indie hackers want to start something.
              </p>
              <div className="bg-[#FFE27A]/20 border border-[#FFE27A]/40 rounded-2xl p-8 mb-8">
                <p className="text-xl font-semibold text-white mb-3">But here's the real problem:</p>
                <p className="text-3xl font-bold text-[#FFE27A]">No team. No support. No one to build with.</p>
              </div>
              <p className="text-xl text-gray-200">
                At HustleHack AI, we're fixing that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MVP Community Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#00FFC2] mb-6">
              🚀 Introducing: MVP Community
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We're creating a space where founders, creators, and builders can connect and collaborate.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center hover:border-[#7F5AF0]/50 transition-all duration-300">
              <span className="text-4xl mb-4 block">🧠</span>
              <h3 className="font-semibold text-white mb-2 text-lg">Founders</h3>
              <p className="text-gray-300">Share your idea and find teammates</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center hover:border-[#00FFC2]/50 transition-all duration-300">
              <span className="text-4xl mb-4 block">🎨</span>
              <h3 className="font-semibold text-white mb-2 text-lg">Creators & Devs</h3>
              <p className="text-gray-300">Join startup teams</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center hover:border-[#7F5AF0]/50 transition-all duration-300">
              <span className="text-4xl mb-4 block">📈</span>
              <h3 className="font-semibold text-white mb-2 text-lg">Everyone</h3>
              <p className="text-gray-300">Learn, grow, and build real projects</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center hover:border-[#00FFC2]/50 transition-all duration-300">
              <span className="text-4xl mb-4 block">🤝</span>
              <h3 className="font-semibold text-white mb-2 text-lg">Collaboration</h3>
              <p className="text-gray-300">Work with like-minded Gen Z talent</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Whether you're building your first project or just want to join a real startup team — this is your shot to start.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ✅ What You'll Get (in the first cohort)
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Exclusive benefits for the first 100 members
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-r from-[#7F5AF0]/10 to-[#00FFC2]/10 rounded-2xl border border-[#7F5AF0]/20 p-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💬</span>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-xl">Founder Circle Access</h4>
                  <p className="text-gray-300">Access to the founder circle inside Telegram/Discord</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#00FFC2]/10 to-[#7F5AF0]/10 rounded-2xl border border-[#00FFC2]/20 p-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🤝</span>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-xl">Smart Matching</h4>
                  <p className="text-gray-300">Get matched with like-minded builders & creators</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#7F5AF0]/10 to-[#00FFC2]/10 rounded-2xl border border-[#7F5AF0]/20 p-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🔍</span>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-xl">Role Discovery</h4>
                  <p className="text-gray-300">Discover roles like design, tech, marketing, content</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#00FFC2]/10 to-[#7F5AF0]/10 rounded-2xl border border-[#00FFC2]/20 p-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📣</span>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-xl">Launch Stories</h4>
                  <p className="text-gray-300">Be featured in our launch stories (Instagram + website)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#FFE27A]/20 to-[#00FFC2]/10 rounded-2xl border border-[#FFE27A]/30 p-8 mb-12">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎁</span>
              <div>
                <h4 className="font-semibold text-white mb-3 text-xl">Early Access Perks</h4>
                <p className="text-gray-300 text-lg"><strong>Bonus:</strong> Early Access perks for first 100 people 🎉</p>
              </div>
            </div>
          </div>
          
          <div className="text-center p-8 bg-[#00FFC2]/10 rounded-3xl border border-[#00FFC2]/20">
            <p className="text-xl text-[#00FFC2] font-semibold">
              This is not just another group.<br />
              <span className="text-3xl font-bold">This is your launchpad.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl text-white mb-6">👇 Tell us who you are. We'll place you where you belong.</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-300">💬 "Want to join a startup?"</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-300">💬 "Already building something?"</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-300">💬 "Need a content creator, coder, or designer?"</p>
                </div>
              </div>
              <p className="text-[#00FFC2] text-xl">We'll help you find your team — and your role.</p>
            </div>
            
            <div className="text-center">
              <a 
                href={FORM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:shadow-[#00FFC2]/25 transition-all duration-300 transform hover:scale-105 border-2 border-[#00FFC2]"
              >
                📝 Apply Now — First 100 Get Early Access
              </a>
              <p className="text-gray-300 mt-4">(Takes less than 2 minutes)</p>
              <p className="text-gray-300">⏳ Applications open for a limited time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#7F5AF0]/20 to-[#00FFC2]/20 rounded-3xl p-8 md:p-12 border border-[#7F5AF0]/30">
            <h4 className="text-3xl font-bold text-white mb-8 text-center">🛡️ Why Trust HustleHack AI?</h4>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <span className="text-green-400 text-2xl">✅</span>
                <p className="text-gray-100 text-lg">Trusted by 3,000+ creators & students</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-400 text-2xl">✅</span>
                <p className="text-gray-100 text-lg">Already helped 100s launch tools, reels, and AI projects</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-400 text-2xl">✅</span>
                <p className="text-gray-100 text-lg">Run by real creators — no fluff, no spam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              🙌 Let's Build the Most Productive Youth Community in India.
            </h3>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Still scrolling?<br />
              This might just change your life.<br />
              Don't miss the first drop.
            </p>
            <a 
              href={FORM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:shadow-[#00FFC2]/25 transition-all duration-300 transform hover:scale-105 border-2 border-[#00FFC2]"
            >
              👉 Join the MVP Network Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F1B] border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image 
                  src="/logo (2).webp" 
                  alt="HustleHack AI Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-lg bg-white p-1"
                />
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2]">HustleHack AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering the next generation of Indian creators and entrepreneurs with AI.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[#00FFC2] hover:text-white transition">Instagram</a>
                <a href="#" className="text-[#00FFC2] hover:text-white transition">Telegram</a>
                <a href="#" className="text-[#00FFC2] hover:text-white transition">Twitter</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-white transition">Resources</Link></li>
                <li><Link href="/ai-products" className="text-gray-400 hover:text-white transition">AI Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link href="/startup-community" className="text-gray-400 hover:text-white transition">Startup Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/policies/privacy-policy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/policies/terms-and-conditions" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/policies/cookie-policy" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
                <li><Link href="/policies/gdpr" className="text-gray-400 hover:text-white transition">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-400">
              © 2024 HustleHack AI. All rights reserved. Made with ❤️ in India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 