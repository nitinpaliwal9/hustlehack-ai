'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Copy, 
  Edit, 
  Trash2, 
  Share2, 
  Heart, 
  Tag, 
  User, 
  Calendar,
  BookOpen,
  Brain
} from 'lucide-react'
import { useRef, useEffect, useState } from 'react';

export default function PromptLibrary({ platformData, bonusVault, userPlan: propUserPlan = 'starter' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(platformData.name || 'Instagram');
  const categories = platformData.categories || [];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // For demo, mock user plan. In real use, fetch from user profile or subscription.
  const userPlan = propUserPlan || 'starter';

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

  const PromptCard = ({ prompt, locked }) => (
    <div className={`relative rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${locked ? 'opacity-60' : ''}`} style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{prompt.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs rounded-full" style={{ background: prompt.type === 'free' ? 'rgba(0,255,194,0.12)' : 'var(--bg-surface)', color: prompt.type === 'free' ? '#00FFC2' : 'var(--text-primary)' }}>
            {prompt.type === 'free' ? 'Free' : 'Pro'}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <div className="rounded-lg p-3 max-h-32 overflow-y-auto" style={{ background: 'var(--bg-surface)' }}>
          <p className="text-sm font-mono leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{prompt.prompt}</p>
        </div>
      </div>
      <button
        onClick={() => !locked && navigator.clipboard.writeText(prompt.prompt)}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${locked ? 'bg-gray-400 cursor-not-allowed' : ''}`}
        style={{ background: locked ? '#ccc' : 'var(--accent)', color: locked ? '#888' : '#000' }}
        disabled={locked}
      >
        <Copy className="w-4 h-4" />
        {locked ? 'Locked' : 'Copy'}
      </button>
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl z-10">
          <span className="text-lg font-bold text-[#7F5AF0] mb-2">Premium</span>
          <button className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black px-4 py-2 rounded font-semibold shadow hover:from-[#6e4ae2] hover:to-[#00e6b2] transition">Upgrade to Unlock</button>
        </div>
      )}
    </div>
  );

  // Bonus Vault Section (unchanged, but use bonusVault prop)
  const BonusVault = () => (
    <div className="space-y-6 mt-10">
      <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>💡 Bonus Vault</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Hooks</h4>
          <ul className="list-disc pl-5 space-y-1">
            {bonusVault.hooks.map((hook, idx) => (
              <li key={idx} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{hook}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>CTAs</h4>
          <ul className="list-disc pl-5 space-y-1">
            {bonusVault.ctas.map((cta, idx) => (
              <li key={idx} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cta}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>Caption Hacks</h4>
          <ul className="list-disc pl-5 space-y-1">
            {bonusVault.caption_hacks.map((hack, idx) => (
              <li key={idx} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{hack}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading your prompt library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>📚 Social Media Prompt Library</h2>
          <p style={{ color: 'var(--text-secondary)' }}>100+ ready-to-use prompts for Instagram, LinkedIn, Twitter, and more.</p>
        </div>
      </div>
      {/* Platform Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 relative z-50">
        {platformData.platforms.map(platform => (
          <button
            key={platform.name}
            onClick={() => setSelectedPlatform(platform.name)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${selectedPlatform === platform.name ? 'bg-accent text-black' : ''}`}
            style={
              selectedPlatform === platform.name
                ? { background: 'var(--accent)', color: '#000' }
                : { background: 'var(--bg-surface)', color: 'var(--text-secondary)' }
            }
          >
            {platform.name}
          </button>
        ))}
      </div>
      {/* Category Grid */}
      {!selectedCategory && (
        <div className="py-8">
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--accent)' }}>Choose a Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat.name}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition bg-gradient-to-br from-[#f8f8ff] to-[#e6e6fa] hover:from-[#e6e6fa] hover:to-[#f8f8ff] text-[#232946] font-semibold text-lg"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span className="mb-2 text-2xl">🏷️</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Prompts and Search */}
      {selectedCategory && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-16 h-16" style={{ color: 'var(--text-secondary)' }} />
                  <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>No prompts found</p>
                  <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or category</p>
                </div>
              )}
              {prompts.map((prompt, idx) => (
                <PromptCard key={idx} prompt={prompt} locked={idx >= unlockedCount} />
              ))}
            </div>
            <button
              className="mt-4 text-sm text-[#7F5AF0] underline"
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
