// Creator’s AI Toolkit Page
'use client';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { LightBulbIcon, CameraIcon, CalendarIcon, UserGroupIcon, BookOpenIcon, ChartBarIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const toolkitItems = [
  {
    id: 1,
    icon: CameraIcon,
    title: 'AI Video Script Generator',
    description: 'Drop your topic → Get 3 ready-to-use video scripts (YouTube, Reels, or Podcasts). Includes hooks, body, outro, and is optimized for Hindi-English delivery.',
    details: [
      'Hooks (3–5 seconds for retention)',
      'Body (with storytelling, facts, CTAs)',
      'Outro with call-to-follow',
      'Optimized for Hindi-English delivery',
      'Pro Plan Only',
      'Output: Copy-paste ready scripts via form + Notion database',
    ],
    badge: 'Pro',
    badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  },
  {
    id: 2,
    icon: CameraIcon,
    title: 'Thumbnail Hookboard',
    description: 'Upload your video idea → Get 5 killer thumbnail headline ideas with emojis, punch words & visual cues. Based on YouTube CTR data & proven hook psychology.',
    details: [
      'Font/style/color palette suggestions',
      'Free Version Available',
      'Output: Text prompts + visual mockup guide',
    ],
    badge: 'Free',
    badgeColor: 'bg-green-500 text-white',
  },
  {
    id: 3,
    icon: CalendarIcon,
    title: '30-Day AI Content Calendar Generator',
    description: 'Choose your niche → Instantly generate a full month of post ideas with themes, captions & CTAs. Bonus: Includes engagement forecast for algorithm-friendly distribution.',
    details: [
      'Pro Hacker Only',
      'Output: Google Sheet + Airtable + Notion template',
    ],
    badge: 'Pro',
    badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  },
  {
    id: 4,
    icon: UserGroupIcon,
    title: 'DM & Comment Engine',
    description: 'AI that generates 20 custom replies to comments or DMs → Grow engagement with authenticity. Use for giveaways, Q&A, polls, or just vibing with your followers.',
    details: [
      'Free up to 10 responses',
      'Output: JSON or table format + copy button',
    ],
    badge: 'Free',
    badgeColor: 'bg-green-500 text-white',
  },
  {
    id: 5,
    icon: BookOpenIcon,
    title: 'Niche Content Prompt Vault',
    description: '100+ viral post prompts categorized by platform. Each prompt is optimized for story arcs, hooks, and relatability.',
    details: [
      'Pro Plan Exclusive',
      'Output: Notion pack + exportable PDF',
    ],
    badge: 'Pro',
    badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  },
  {
    id: 6,
    icon: ChartBarIcon,
    title: 'Creator Metrics Tracker',
    description: 'Track your views, saves, shares, DMs, profile visits — week by week. Designed to help creators make decisions, not guesses.',
    details: [
      'Works with manual + API-fed input',
      'Free',
      'Output: Google Sheets + Notion version',
    ],
    badge: 'Free',
    badgeColor: 'bg-green-500 text-white',
  },
];

export default function CreatorsAIToolkit() {
  const [hoveredCard, setHoveredCard] = useState(null);
  return (
    <>
      <Navigation />
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {/* Header Section */}
        <div className="bg-zinc-900 shadow-sm border-b border-zinc-800 pt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--primary)] mb-4">
                Creator’s AI Toolkit 🎯
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Everything a digital creator needs — powered by AI, built for engagement, and designed for virality.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black px-4 py-2 rounded-full font-semibold mb-4">
            <LightBulbIcon className="w-5 h-5" /> What’s Inside the Toolkit
          </div>
          <p className="text-xl text-gray-300 mb-4">
            Real value for creators: AI does the hard thinking. You stay in flow.<br />
            Zero burnout. High output. No blank page syndrome.<br />
            Built for Indian creators — Hindi-English friendly.<br />
            Smart workflows, not just templates. Upgrade once → reuse forever.
          </p>
        </div>

        {/* Toolkit Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolkitItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1 ${
                    hoveredCard === item.id ? 'ring-2 ring-[#7F5AF0] ring-opacity-50' : ''
                  }`}
                  style={{ background: 'rgba(36,41,46,0.96)', border: '1px solid var(--border-color)' }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-4">
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
        <div className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock your creator flow.
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start with free templates → Upgrade to Pro when you’re ready to scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-[#7F5AF0] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Explore Toolkit
                <ChevronRightIcon className="w-5 h-5" />
              </button>
              <button
                className="border-2 border-white text-white hover:bg-white hover:text-[#7F5AF0] px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Upgrade to Creator Mode
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 