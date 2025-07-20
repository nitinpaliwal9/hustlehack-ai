// Startup Launch Kit (AI-Mode) Page
'use client';

import Navigation from '../../../components/NavigationClient';
import Footer from '../../../components/FooterClient';
import { useState } from 'react';
import { LightBulbIcon, DocumentTextIcon, CameraIcon, ChartBarIcon, UserGroupIcon, CalendarIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/solid';

const kitItems = [
  {
    id: 1,
    icon: LightBulbIcon,
    title: 'AI Idea Validator (No VC BS)',
    description: 'Paste your idea → Get instant breakdowns: Monetization strategy GPT would invest in, 3 better niche pivots, hook line + elevator pitch, MVP launch suggestion under ₹0 budget.',
    details: [
      'Uses custom prompt chaining + startup data models',
      'Pro Plan Only',
      'Output: GPT-powered launch memo + 3-day MVP flow',
    ],
    badge: 'Pro',
    badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  },
  {
    id: 2,
    icon: DocumentTextIcon,
    title: 'One-Pager Builder (AI x Notion)',
    description: 'You answer 6 simple prompts → AI fills your: Problem + solution, target market, unique edge, how to make ₹1L in 30 days.',
    details: [
      'Free Version Available',
      'Output: Auto-filled Notion template',
    ],
    badge: 'Free',
    badgeColor: 'bg-green-500 text-white',
  },
  {
    id: 3,
    icon: CameraIcon,
    title: 'Pitch Deck Generator (GPT-Designed Slides)',
    description: 'GPT builds your investor deck. You just give 5 bullet points. Output includes slide titles + content, design layout, even optional roast-mode feedback.',
    details: [
      'Pro Hacker Only',
      'Output: Google Slides link + JSON export',
    ],
    badge: 'Pro',
    badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  },
  {
    id: 4,
    icon: ChartBarIcon,
    title: 'Zero-Budget Growth Hacks (AI Curated)',
    description: '25+ strategies used by lean Indian founders — reverse-engineered and auto-ranked by GPT for your niche. Twitter thread blueprint, cold DM drip scripts, meme funnel with AI image prompts.',
    details: [
      'Free Sampler',
      'Full Playbook in Pro Plan',
      'Output: AI-driven strategy matrix + swipe file',
    ],
    badge: 'Free',
    badgeColor: 'bg-green-500 text-white',
  },
  {
    id: 5,
    icon: UserGroupIcon,
    title: 'Auto Docs Pack (Legal + Invoice + Calculator)',
    description: 'You give the business name → AI writes: Freelancer NDAs, simple invoice formats, co-founder agreement, first-year expense calculator.',
    details: [
      'Free',
      'Output: Editable Google Docs + Sheets',
    ],
    badge: 'Free',
    badgeColor: 'bg-green-500 text-white',
  },
  {
    id: 6,
    icon: CalendarIcon,
    title: 'Launch Day Automation Checklist',
    description: 'This checklist has every launch asset — and every one is GPT-backed or prebuilt. Hook line? GPT-generated. Instagram post? AI captioned. DM list? Auto-built.',
    details: [
      'Pro Hacker Only',
      'Output: Notion checklist + copy pack',
    ],
    badge: 'Pro',
    badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  },
];

export default function StartupLaunchKit() {
  const [hoveredCard, setHoveredCard] = useState(null);
  return (
    <>
      <Navigation />
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {/* Header Section */}
        <div className="bg-zinc-900 shadow-sm border-b border-zinc-800 pt-48">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--primary)] mb-4">
                Startup Launch Kit (AI-Mode) 🤖
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Build like a founder. Hack like an AI.<br />
                Go from “just an idea” to “just launched” — with blueprints built by GPT and systems scaled by you.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-20 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black px-4 py-2 rounded-full font-semibold mb-4">
            <LightBulbIcon className="w-5 h-5" /> What’s Inside (AI-Enhanced, Action-Packed)
          </div>
          <p className="text-xl text-gray-300 mb-4">
            No theory. Just launch assets built by AI and cleaned by real hustlers.<br />
            Works for solo founders, students, and creators launching D2C, SaaS, services.<br />
            Hindi-English friendly, minimal learning curve.<br />
            You don’t plan your startup. You build it by filling out prompts. That’s the vibe.
          </p>
        </div>

        {/* Kit Cards */}
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {kitItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-10 cursor-pointer transform hover:-translate-y-1 ${
                    hoveredCard === item.id ? 'ring-2 ring-[#7F5AF0] ring-opacity-50' : ''
                  }`}
                  style={{ background: 'rgba(36,41,46,0.96)', border: '1px solid var(--border-color)' }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Darkness Overlay */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[1.5px] rounded-xl z-0 pointer-events-none"></div>
                  {/* Coming Soon Badge with Lock Icon */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1">
                    <LockClosedIcon className="w-4 h-4 text-yellow-400 drop-shadow" style={{filter: 'drop-shadow(0 1px 2px #bfa100)'}} />
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase" style={{letterSpacing: '0.08em', boxShadow: '0 2px 8px 0 rgba(255, 215, 0, 0.18)'}}>Coming Soon</span>
                  </div>
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-4 z-10 relative">
                    <div className={`${item.badgeColor} px-3 py-1 rounded-full text-sm font-semibold`}>{item.badge}</div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                  <ul className="mb-4 pl-5 list-disc text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black py-24 mt-20">
          <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tired of “how to start a startup” books? Just build it.
            </h2>
            <p className="text-xl mb-8 opacity-90">
              This kit gives you tools, not talk. GPT does the boring work, you make the first sale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-[#7F5AF0] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Launch with AI
                <ChevronRightIcon className="w-5 h-5" />
              </button>
              <button
                className="border-2 border-white text-white hover:bg-white hover:text-[#7F5AF0] px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Unlock Full Kit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 