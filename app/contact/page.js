'use client'

import PageLayout from '../components/PageLayout';
import { Mail, Phone, MessageCircle, Users, Star, Instagram, Linkedin, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

// Icon Badge for colored backgrounds
const IconBadge = ({ children, color }) => (
  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg mb-4`} style={{ background: color, boxShadow: `0 4px 24px 0 ${color}44` }}>
    {children}
  </span>
);

// Abstract illustration for hero/feedback
const AbstractContact = ({ className = "" }) => (
  <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute right-0 top-0 w-40 md:w-60 opacity-60 z-0 ${className}`} style={{ pointerEvents: 'none' }}>
    <ellipse cx="60" cy="60" rx="60" ry="60" fill="#7F5AF0" fillOpacity="0.18" />
    <ellipse cx="160" cy="80" rx="40" ry="40" fill="#00FFC2" fillOpacity="0.13" />
    <rect x="100" y="20" width="40" height="40" rx="20" fill="#fff" fillOpacity="0.08" />
    <circle cx="180" cy="30" r="12" fill="#7F5AF0" fillOpacity="0.22" />
    <circle cx="30" cy="100" r="10" fill="#00FFC2" fillOpacity="0.18" />
  </svg>
);

export default function ContactPage() {
  return (
    <PageLayout>
      <main className="about-main bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen py-16">
        {/* Hero Section */}
        <section className="relative pt-36 pb-20 px-4 flex justify-center">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-gradient-to-br from-[#7F5AF0]/30 via-[#00FFC2]/20 to-[#232946]/0 rounded-full blur-3xl opacity-70 animate-pulse z-0" />
          <AbstractContact className="hidden md:block" />
          <div className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl bg-[rgba(30,32,44,0.85)] backdrop-blur-xl border-4 border-[#7F5AF0] relative overflow-hidden p-12 md:p-20 flex flex-col items-center">
            <div className="flex flex-col items-center relative z-10 w-full">
              <IconBadge color="#7F5AF0">
                <MessageCircle className="w-7 h-7 text-white" />
              </IconBadge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight text-center">📬 Contact Us</h1>
              <p className="text-lg text-gray-200 mb-4 font-medium text-center max-w-xl">We’re here to help, guide, and support you through every step of your AI journey.</p>
              <p className="text-base text-gray-400 mb-4 text-center">Whether you have a question, feedback, partnership idea, or just want to say hi — we’d love to hear from you.</p>
            </div>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="flex justify-center mt-20">
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Email Card */}
            <div className="bg-[rgba(36,37,50,0.85)] backdrop-blur-xl rounded-3xl shadow-xl border-l-4 border-[#00FFC2] p-10 flex flex-col items-start">
              <IconBadge color="#00FFC2">
                <Mail className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-2xl font-bold text-white mb-4">📧 Email</h2>
              <p className="text-gray-200 mb-3">Got a query, suggestion, or just something on your mind?</p>
              <p className="text-gray-300 mb-3">Drop us a message anytime at:</p>
              <a href="mailto:hustlehackai@gmail.com" className="text-[#7F5AF0] font-semibold text-lg mb-3 hover:underline">hustlehackai@gmail.com</a>
              <p className="text-gray-400 text-sm mt-3">We usually reply within 24 hours.</p>
            </div>
            {/* Phone/WhatsApp Card */}
            <div className="bg-[rgba(36,37,50,0.85)] backdrop-blur-xl rounded-3xl shadow-xl border-r-4 border-[#7F5AF0] p-10 flex flex-col items-start">
              <IconBadge color="#7F5AF0">
                <Phone className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-2xl font-bold text-white mb-4">📞 Phone / WhatsApp</h2>
              <p className="text-gray-200 mb-3">Prefer a quick call or message?</p>
              <a href="tel:+919540581090" className="text-[#00FFC2] font-semibold text-lg mb-3 hover:underline">+91 95405 81090</a>
              <a href="https://wa.me/919540581090" target="_blank" rel="noopener noreferrer" className="text-[#00FFC2] font-semibold text-base mb-3 hover:underline">WhatsApp Us</a>
              <p className="text-gray-400 text-sm mt-3">You can WhatsApp us too — we’re friendly!</p>
            </div>
          </div>
        </section>

        {/* Social Media & Partnerships Section */}
        <section className="flex justify-center mt-20">
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Social Media Card */}
            <div className="bg-[rgba(36,37,50,0.85)] backdrop-blur-xl rounded-3xl shadow-xl border-t-4 border-[#7F5AF0] p-10 flex flex-col items-start">
              <IconBadge color="#7F5AF0">
                <Users className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-2xl font-bold text-white mb-4">📱 Social Media <span className="text-sm text-gray-400">(Coming Soon)</span></h2>
              <p className="text-gray-200 mb-3">We’ll soon be live on Instagram and LinkedIn — stay tuned for community updates, creator stories, and AI drops.</p>
              <div className="flex gap-6 mt-3">
                <span className="inline-flex items-center gap-1 text-gray-400"><Instagram className="w-6 h-6" /> Instagram</span>
                <span className="inline-flex items-center gap-1 text-gray-400"><Linkedin className="w-6 h-6" /> LinkedIn</span>
              </div>
            </div>
            {/* Partnerships Card */}
            <div className="bg-[rgba(36,37,50,0.85)] backdrop-blur-xl rounded-3xl shadow-xl border-b-4 border-[#00FFC2] p-10 flex flex-col items-start">
              <IconBadge color="#00FFC2">
                <HeartHandshake className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-2xl font-bold text-white mb-4">🤝 Business / Partnerships</h2>
              <p className="text-gray-200 mb-3">If you're looking to collaborate, pitch an idea, or discuss something exciting, shoot an email with the subject line:</p>
              <span className="bg-[#7F5AF0]/10 text-[#7F5AF0] px-4 py-2 rounded-lg font-mono text-sm mb-3">“Partnership Inquiry – HustleHack AI”</span>
              <a href="mailto:hustlehackai@gmail.com?subject=Partnership%20Inquiry%20–%20HustleHack%20AI" className="text-[#7F5AF0] font-semibold text-lg mb-3 hover:underline">hustlehackai@gmail.com</a>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="relative flex justify-center mt-20">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[340px] h-[140px] bg-gradient-to-br from-[#00FFC2]/30 via-[#7F5AF0]/20 to-[#232946]/0 rounded-full blur-2xl opacity-60 animate-pulse z-0" />
          <div className="w-full max-w-2xl bg-[rgba(36,37,50,0.85)] backdrop-blur-xl rounded-3xl shadow-xl border-l-4 border-[#7F5AF0] p-12 flex flex-col items-center text-center relative z-10">
            <IconBadge color="#7F5AF0">
              <Star className="w-7 h-7 text-white" />
            </IconBadge>
            <h2 className="text-2xl font-bold text-white mb-4">🔁 Feedback Is Everything</h2>
            <p className="text-gray-200 mb-4">We’re in early stages — your feedback directly shapes what we build next.<br />Don’t hesitate to reach out. Seriously.</p>
            <p className="text-lg text-[#00FFC2] font-semibold mt-4">✨ Let’s Build Smarter, Together.</p>
            <p className="text-gray-400 text-base mt-6">See you in your inbox 📩<br />– Team HustleHack AI</p>
            {/* Friendly illustration */}
            <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-12 w-32 h-16 opacity-80">
              <ellipse cx="60" cy="50" rx="50" ry="8" fill="#7F5AF0" fillOpacity="0.12" />
              <circle cx="40" cy="30" r="14" fill="#00FFC2" fillOpacity="0.18" />
              <circle cx="80" cy="30" r="14" fill="#7F5AF0" fillOpacity="0.18" />
              <rect x="54" y="18" width="12" height="24" rx="6" fill="#fff" fillOpacity="0.10" />
              <circle cx="60" cy="30" r="4" fill="#fff" fillOpacity="0.18" />
            </svg>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
