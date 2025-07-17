// Social Media Prompt Pack Page
'use client';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, BoltIcon, BookOpenIcon, UserGroupIcon, ArrowTrendingUpIcon, ChatBubbleLeftRightIcon, ClipboardDocumentCheckIcon, SparklesIcon, AcademicCapIcon, RocketLaunchIcon, BriefcaseIcon, PencilIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: '50+ Plug-and-Play Prompt Templates',
    description: 'Instagram Reels ideas, LinkedIn frameworks, Twitter threads, hooks, CTAs, and more. Just copy, tweak, and post.'
  },
  {
    icon: SparklesIcon,
    title: 'AI-Optimized for Entrepreneurs & Creators',
    description: 'Prompt blueprints reverse-engineered from top-performing content. Converts followers into fans.'
  },
  {
    icon: BoltIcon, // was LightningBoltIcon
    title: '10 Viral Caption Hacks',
    description: 'Bonus: AI + human psychology-backed caption formulas for instant engagement.'
  },
];

const categories = [
  {
    icon: ArrowTrendingUpIcon,
    title: 'Authority Boosters',
    description: 'Thought-leadership posts for LinkedIn.'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Engagement Magnets',
    description: 'Instagram & X hooks designed to spark comments.'
  },
  {
    icon: BookOpenIcon,
    title: 'Storytelling Frameworks',
    description: 'Hero’s journey prompts for personal branding.'
  },
  {
    icon: BoltIcon, // was LightningBoltIcon
    title: 'Trending Ideas',
    description: 'Reel & short video concepts based on AI-analyzed trends.'
  },
  {
    icon: UserGroupIcon,
    title: 'Community Builders',
    description: 'Q&A, polls, and engagement-driving post formats.'
  },
];

const perfectFor = [
  {
    icon: AcademicCapIcon,
    title: 'Students',
    description: 'Build your personal brand without wasting hours on captions.'
  },
  {
    icon: PencilIcon, // was PaintBrushIcon
    title: 'Creators',
    description: 'Stay consistent with AI as your creative partner.'
  },
  {
    icon: RocketLaunchIcon, // was RocketLaunchIcon
    title: 'Entrepreneurs',
    description: 'Launch your ideas without hiring a content team.'
  },
  {
    icon: BriefcaseIcon,
    title: 'Solopreneurs',
    description: 'Scale presence and credibility without burning out.'
  },
];

const planAccess = [
  { plan: 'Starter Hustle', access: '❌ Locked' },
  { plan: 'Creator Mode', access: '✅ Full Access' },
  { plan: 'Pro Hacker', access: '✅ Full Access + Custom Prompt Requests' },
];

export default function SocialMediaPromptPack() {
  const [showFeatures, setShowFeatures] = useState(false);
  const router = useRouter();
  const whatsInsideRef = useRef(null);

  // Helper to scroll with offset for nav bar
  const scrollToWhatsInside = () => {
    if (whatsInsideRef.current) {
      const navHeight = 80; // Adjust if your nav bar is taller
      const top = whatsInsideRef.current.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-4 flex flex-col items-center text-center">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[320px] bg-gradient-to-br from-[#7F5AF0]/40 via-[#00FFC2]/30 to-[#232946]/0 rounded-full blur-3xl opacity-70 animate-pulse z-0" />
          <div className="relative z-10 w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-[rgba(30,32,44,0.85)] backdrop-blur-xl border-4 border-[#7F5AF0] overflow-hidden p-10 md:p-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-black px-4 py-2 rounded-full font-semibold mb-4 text-base shadow-md border border-yellow-400 animate-bounceIn">
              ✅ India’s #1 AI-Driven Content System for Creators & Solopreneurs
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Turn ChatGPT Into Your Social Media Growth Engine 🚀</h1>
            <p className="text-lg text-gray-200 mb-8 font-medium max-w-2xl mx-auto">50+ AI-powered prompt frameworks to create viral content, build authority, and stay consistent across Instagram, LinkedIn, Twitter, and more.<br />No guesswork. Just type, tweak, and post.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
              <button className="btn btn-lg premium-btn glow-cta rounded-full font-bold flex items-center gap-2 px-8 py-3 text-lg" style={{ minWidth: 200 }} onClick={() => router.push('/resources/toolkits-and-templates/social-media-prompt-pack/premium-content')}>Start Using Prompts →</button>
              <button className="btn btn-lg premium-btn glow-cta rounded-full font-bold flex items-center gap-2 px-8 py-3 text-lg" style={{ minWidth: 200 }} onClick={scrollToWhatsInside}>See What&apos;s Inside →</button>
            </div>
          </div>
        </section>

        {/* Intro Paragraph */}
        <section className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[color:var(--primary)]">Why It Exists</h2>
          <p className="text-lg text-gray-300 mb-4">Creating consistent, engaging content is hard when you have ideas to execute, businesses to build, and zero time to write posts.<br />We fixed that.</p>
          <p className="text-base text-gray-400 mb-2">This prompt pack transforms ChatGPT into your personal content strategist—giving you high-converting social media posts in minutes, not hours.</p>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-6 py-12" id="features" ref={whatsInsideRef}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--primary)]">What’s Inside</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass-card p-8 rounded-2xl shadow-xl text-center flex flex-col items-center bg-[rgba(127,90,240,0.08)] hover:shadow-2xl hover:scale-105 transition-all">
                  {Icon ? (
                    <Icon className="w-10 h-10 mb-4 text-[#7F5AF0]" />
                  ) : (
                    <span className="w-10 h-10 mb-4 text-3xl">✨</span>
                  )}
                  <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-200">{f.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Content Categories */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--primary)]">Content Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="glass-card p-8 rounded-2xl shadow-xl text-center flex flex-col items-center bg-[rgba(0,255,194,0.08)] hover:shadow-2xl hover:scale-105 transition-all">
                  {Icon ? (
                    <Icon className="w-10 h-10 mb-4 text-[#00FFC2]" />
                  ) : (
                    <span className="w-10 h-10 mb-4 text-3xl">✨</span>
                  )}
                  <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-gray-200">{cat.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--primary)]">How It Works</h2>
          <ol className="space-y-6 text-lg text-gray-200">
            <li><span className="font-bold text-[#7F5AF0]">1. Pick a prompt:</span> Choose the category—viral hooks, story posts, or engagement boosters.</li>
            <li><span className="font-bold text-[#7F5AF0]">2. Plug in your context:</span> Your product, niche, or personal experience.</li>
            <li><span className="font-bold text-[#7F5AF0]">3. Copy-paste magic:</span> Use the output on Instagram, LinkedIn, or Twitter—done.</li>
          </ol>
        </section>

        {/* Perfect For */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--primary)]">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {perfectFor.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="glass-card p-8 rounded-2xl shadow-xl text-center flex flex-col items-center bg-[rgba(127,90,240,0.08)] hover:shadow-2xl hover:scale-105 transition-all">
                  {Icon ? (
                    <Icon className="w-10 h-10 mb-4 text-[#7F5AF0]" />
                  ) : (
                    <span className="w-10 h-10 mb-4 text-3xl">✨</span>
                  )}
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-gray-200">{p.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI-Backed Advantage */}
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[color:var(--primary)]">AI-Backed Advantage</h2>
          <p className="text-lg text-gray-200 mb-2">These prompts are powered by proven content psychology + AI adaptability.<br />You’ll never run out of ideas. You’ll never stare at a blank screen again.</p>
        </section>

        {/* Sample Prompts */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--primary)]">Sample Prompts</h2>
          <div className="space-y-8">
            <div className="bg-[rgba(127,90,240,0.10)] rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-2 text-[#7F5AF0]">LinkedIn Post Prompt</h3>
              <p className="mb-2">"Write a LinkedIn post where I share my biggest productivity hack for early-stage founders. Make it personal, with a hook that grabs attention and a clear CTA for engagement."</p>
              <div className="bg-[rgba(0,255,194,0.10)] rounded-lg p-4 mt-2 text-gray-200">
                <span className="font-semibold text-[#00FFC2]">AI Output Example:</span> "Working 12-hour days doesn’t make you productive. I learned this the hard way when burnout hit… (continues with a practical, shareable framework)."
              </div>
            </div>
            <div className="bg-[rgba(127,90,240,0.10)] rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-2 text-[#7F5AF0]">Instagram Carousel Prompt</h3>
              <p className="mb-2">"Create an Instagram carousel about '5 AI Tools Every Student Must Use in 2025.' Make it fun, bold, and swipe-worthy."</p>
              <div className="bg-[rgba(0,255,194,0.10)] rounded-lg p-4 mt-2 text-gray-200">
                <span className="font-semibold text-[#00FFC2]">Output:</span> 5-slide concept with captions + design idea.
              </div>
            </div>
          </div>
        </section>

        {/* Bonus Section */}
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[color:var(--primary)]">🔥 Free Resources Included</h2>
          <ul className="text-lg text-gray-200 space-y-2">
            <li>30 Viral Hooks Swipe File</li>
            <li>Content Calendar Template (Notion)</li>
            <li>Hashtag Research Prompt Pack</li>
          </ul>
        </section>

        {/* Plan Access Table */}
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--primary)]">Plan Access</h2>
          <table className="w-full text-lg text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="py-2 px-4 font-bold">Plan</th>
                <th className="py-2 px-4 font-bold">Access</th>
              </tr>
            </thead>
            <tbody>
              {planAccess.map((row, i) => (
                <tr key={i} className="bg-[rgba(127,90,240,0.08)] rounded-lg">
                  <td className="py-2 px-4 font-semibold">{row.plan}</td>
                  <td className="py-2 px-4">{row.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">Your next 100 posts are just 3 clicks away.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
            <button className="btn btn-lg premium-btn glow-cta rounded-full font-bold flex items-center gap-2 px-8 py-3 text-lg" style={{ minWidth: 200 }}>Unlock Now</button>
            <button className="btn btn-lg premium-btn glow-cta rounded-full font-bold flex items-center gap-2 px-8 py-3 text-lg" style={{ minWidth: 200 }}>Upgrade to Creator Mode →</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}