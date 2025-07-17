"use client";
import Link from 'next/link';
import { useState } from 'react';
import { HomeIcon, Squares2X2Icon, BookmarkIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const CATEGORY_EMOJIS = {
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
  'Yoga & Mindfulness': '🧘‍♂️',
  'Weight Loss': '⚖️',
  'Bodybuilding': '💪',
  'Healthy Recipes': '🥗',
  'Vegan Lifestyle': '🌱',
  'Luxury Travel': '🛫',
  'Solo Travel': '🧳',
  'Street Food': '🍢',
  'Baking & Desserts': '🍰',
  'Streetwear': '🧢',
  // ...add more as needed
};

function getCategoryDescription(name) {
  return `Explore top ${name} prompts for creators & brands.`;
}

function toKebabCase(str) {
  return encodeURIComponent(
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // remove special chars
      .replace(/\s+/g, '-')
  );
}

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[rgba(24,24,36,0.98)] border-t border-[#232946]/60 flex justify-around items-center py-2 z-50 md:hidden shadow-2xl backdrop-blur-xl">
      <button className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" onClick={() => {}} aria-label="Home">
        <HomeIcon className="w-7 h-7 mb-0.5" />
        Home
      </button>
      <button className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" onClick={() => {}} aria-label="Categories">
        <Squares2X2Icon className="w-7 h-7 mb-0.5" />
        Categories
      </button>
      <button className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" onClick={() => {}} aria-label="Saved">
        <BookmarkIcon className="w-7 h-7 mb-0.5" />
        Saved
      </button>
      <button className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" onClick={() => {}} aria-label="Profile">
        <UserCircleIcon className="w-7 h-7 mb-0.5" />
        Profile
      </button>
    </nav>
  );
}

export default function InstagramCategoryGrid({ categories }) {
  const [search, setSearch] = useState('');
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ fontFamily: 'Geist, sans-serif', color: 'var(--primary)' }}>
            🔥 Pick Your Insta Niche
          </h2>
          <p className="text-lg text-gray-300" style={{ fontFamily: 'Geist, sans-serif' }}>
            Unlock viral content ideas for every creator, founder, and side-hustler.
          </p>
          <div className="flex justify-center mt-6">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-600 bg-[#181824] text-white focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] placeholder-gray-400 shadow"
              style={{ fontFamily: 'Geist, sans-serif' }}
              aria-label="Search categories"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCategories.map(cat => (
            <Link
              key={cat.name}
              href={`/resources/toolkits-and-templates/social-media-prompt-pack/premium-content/category/${toKebabCase(cat.name)}`}
              className="group"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="flex flex-col items-center justify-between p-6 rounded-xl border border-[color:var(--primary)] shadow-xl bg-[rgba(36,38,58,0.92)] transition-all duration-200 hover:shadow-2xl hover:scale-105 space-y-4 cursor-pointer"
                style={{ fontFamily: 'Geist, sans-serif', minHeight: 320 }}
              >
                <span className="text-5xl mb-2">{CATEGORY_EMOJIS[cat.name] || '✨'}</span>
                <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>{cat.name}</h3>
                <p className="text-gray-300 text-base mb-2 text-center">{getCategoryDescription(cat.name)}</p>
                <button
                  className="mt-4 px-6 py-2 rounded-full bg-[color:var(--accent)] text-black font-bold shadow hover:bg-accent/80 transition"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                  tabIndex={-1}
                  type="button"
                  aria-hidden="true"
                >
                  Explore →
                </button>
              </div>
            </Link>
          ))}
          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center text-gray-400 text-lg py-12">No categories found.</div>
          )}
        </div>
      </div>
      <MobileBottomNav />
    </>
  );
} 