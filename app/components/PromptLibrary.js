// Social Media Prompt Pack PromptLibrary
'use client';

import { useState, useEffect } from 'react';
import { ClipboardDocumentIcon, CheckIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const CATEGORY_EMOJIS = {
  // Instagram
  'Fitness': '🏋️',
  'Travel': '✈️',
  'Food & Recipes': '🍲',
  'Fashion': '👗',
  'Education': '🎓',
  'Tech & AI': '🤖',
  'Finance': '💸',
  'Entrepreneurship': '🚀',
  'Motivation': '🔥',
  'Parenting': '👨‍👩‍👧‍👦',
  'Health & Wellness': '🧘',
  'Gaming': '🎮',
  'Beauty': '💄',
  'Real Estate': '🏠',
  'Photography': '📸',
  'Lifestyle': '🌿',
  'Personal Branding': '🪪',
  'Business Tips': '💼',
  'Meme Marketing': '😂',
  'Influencer Growth': '📈',
  'Productivity': '⏰',
  'Music': '🎵',
  'Books & Learning': '📚',
  'Digital Marketing': '💻',
  // LinkedIn
  'Career Growth Tips': '📈',
  'Networking Hacks': '🤝',
  'Industry Insights': '🔍',
  'Thought Leadership': '🧠',
  'Startup & Entrepreneurship': '🚀',
  'AI & Tech Trends': '🤖',
  'Leadership & Management': '🦸',
  'Remote Work Productivity': '🏡',
  'Freelancing & Consulting': '🧑‍💻',
  'Corporate Culture': '🏢',
  'Job Search & Resume Tips': '📝',
  'Workplace Motivation': '💪',
  'Business Development': '📊',
  'Sales & Outreach': '📞',
  'Marketing Strategies': '📣',
  'Finance & Investment': '💰',
  'Diversity & Inclusion': '🌈',
  'Employee Engagement': '🤗',
  'Recruitment & Hiring': '🧑‍💼',
  'Professional Learning & Upskilling': '📖',
  'Personal Growth & Mindset': '🌱',
  'Company Announcements': '📢',
  'Client Success Stories': '🏆',
  'Event & Webinar Promotions': '🎤',
};

function PromptCard({ prompt, locked }) {
  const [copied, setCopied] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <div className={`relative rounded-xl shadow-lg border hover:shadow-2xl transition-all duration-300 p-6 bg-[rgba(30,32,44,0.95)] mb-8 ${locked ? 'opacity-80' : ''}`}
      style={{ borderColor: 'var(--primary)' }}>
      {!locked ? null : (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl z-10">
          <LockClosedIcon className="w-8 h-8 text-[#FFD700]" />
        </div>
      )}
      <h4 className="text-lg font-bold mb-2 text-white">{prompt.title}</h4>
      <div className="flex items-center gap-2 mb-2">
        <button
          className="p-2 rounded hover:bg-gray-800 transition-colors"
          onClick={handleCopy}
          aria-label="Copy prompt"
          type="button"
          disabled={locked}
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-[#00FFC2]" />
          ) : (
            <ClipboardDocumentIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {prompt.recommended_cta && <span className="ml-2 text-xs text-[#FFD700]">{prompt.recommended_cta}</span>}
      </div>
      <div className="text-sm text-gray-300 mb-2">{prompt.prompt}</div>
      {showExample && prompt.example_outputs && (
        <div className="bg-[rgba(0,255,194,0.10)] rounded-lg p-4 text-gray-200 text-sm mb-2">
          <span className="font-semibold text-[#00FFC2]">Example Output:</span>
          <ul className="list-disc pl-5 mt-2">
            {prompt.example_outputs.map((ex, i) => (
              <li key={i} style={{ whiteSpace: 'pre-line' }}>{ex}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="p-2 rounded hover:bg-gray-800 transition-colors ml-2"
        onClick={() => setShowExample((v) => !v)}
        aria-label={showExample ? 'Hide Example' : 'Show Example'}
        type="button"
      >
        {showExample ? (
          <EyeSlashIcon className="w-5 h-5 text-[#7F5AF0]" />
        ) : (
          <EyeIcon className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
}

export default function PromptLibrary({ platformData, bonusVault, userPlan = 'starter' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(platformData.name || 'Instagram');
  const categories = platformData.categories || [];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset selectedCategory when platform changes
  useEffect(() => {
    setSelectedCategory('');
  }, [selectedPlatform]);

  // Get prompts for selected category
  const currentCategory = categories.find(cat => cat.name === selectedCategory);
  let prompts = currentCategory?.prompts || [];
  if (searchTerm) {
    prompts = prompts.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  const unlockedCount = userPlan === 'pro' ? prompts.length : 3;

  // Bonus Vault Section (unchanged, but use bonusVault prop)
  const BonusVault = () => (
    <div className="mt-16 max-w-5xl mx-auto">
      <div className="rounded-2xl shadow-lg bg-gradient-to-br from-[#232946] to-[#181824] p-8">
        <h3 className="text-2xl font-bold mb-6 text-accent">💡 Bonus Vault</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-2 text-accent">Hooks</h4>
            <ul className="list-disc pl-5 space-y-1">
              {bonusVault.hooks.map((hook, idx) => (
                <li key={idx} className="text-sm text-gray-300">{hook}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-accent">CTAs</h4>
            <ul className="list-disc pl-5 space-y-1">
              {bonusVault.ctas.map((cta, idx) => (
                <li key={idx} className="text-sm text-gray-300">{cta}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-accent">Caption Hacks</h4>
            <ul className="list-disc pl-5 space-y-1">
              {bonusVault.caption_hacks.map((hack, idx) => (
                <li key={idx} className="text-sm text-gray-300">{hack}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your prompt library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#7F5AF0]/10 to-[#00FFC2]/10 p-8 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-4xl font-extrabold mb-2 text-white tracking-tight">📚 Social Media Prompt Library</h2>
          <p className="text-lg text-accent font-medium">100+ ready-to-use prompts for Instagram, LinkedIn, Twitter, and more.</p>
        </div>
      </div>
      {/* Platform Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 relative z-50 justify-center">
        {platformData.platforms.map(platform => (
          <button
            key={platform.name}
            onClick={() => setSelectedPlatform(platform.name)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-lg shadow transition-all whitespace-nowrap border-2 ${selectedPlatform === platform.name ? 'bg-accent text-black border-accent scale-105' : 'bg-[#232946] text-gray-300 border-transparent hover:bg-[#2d3146]'}`}
            style={{ minWidth: 120 }}
          >
            {platform.name}
          </button>
        ))}
      </div>
      {/* Category Grid */}
      {!selectedCategory && (
        <div className="py-10">
          <h3 className="text-2xl font-bold mb-8 text-center text-accent">Choose a Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat.name}
                className="flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-transparent shadow-2xl hover:shadow-gold transition-all bg-[rgba(36,38,58,0.65)] backdrop-blur-xl hover:bg-[rgba(36,38,58,0.85)] text-white font-extrabold text-2xl hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold relative group lux-card"
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', minHeight: 180, letterSpacing: 0.5 }}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {CATEGORY_EMOJIS[cat.name] && (
                  <span className="mb-4 text-4xl drop-shadow-gold group-hover:scale-110 transition-transform" style={{ textShadow: '0 2px 12px #FFD70088, 0 1px 2px #fff8' }}>{CATEGORY_EMOJIS[cat.name]}</span>
                )}
                <span className="text-white" style={{textShadow: '0 2px 8px #FFD70044, 0 1px 2px #fff8', fontWeight: 800}}>{cat.name}</span>
                <span className="absolute inset-0 rounded-3xl pointer-events-none group-hover:ring-4 group-hover:ring-gold/40 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Prompts and Search */}
      {selectedCategory && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {/* Back to Categories button (top) */}
            <button
              className="mb-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-black font-semibold shadow hover:bg-white hover:text-accent border border-accent transition self-start"
              onClick={() => setSelectedCategory('')}
            >
              <span className="text-lg">←</span> Back to Categories
            </button>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-700 rounded-xl bg-[#181824] text-white focus:ring-2 focus:ring-accent focus:border-accent text-lg shadow"
                  />
                  <ClipboardDocumentIcon className="absolute left-4 top-3 w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prompts.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <span className="text-5xl">📭</span>
                  <p className="text-xl text-gray-400 mt-4">No prompts found</p>
                  <p className="text-gray-500">Try adjusting your search or category</p>
                </div>
              )}
              {prompts.map((prompt, idx) => (
                <PromptCard key={idx} prompt={prompt} locked={idx >= unlockedCount} />
              ))}
            </div>
            <button
              className="mt-6 text-base text-accent underline hover:text-white transition"
              onClick={() => setSelectedCategory('')}
            >
              ← Back to Categories
            </button>
          </div>
        </div>
      )}
      {/* Bonus Vault */}
      <BonusVault />
    </div>
  );
} 