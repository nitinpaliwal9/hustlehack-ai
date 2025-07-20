'use client';
import { useState } from 'react';
import Navigation from '../../../../components/NavigationClient';
import InstagramCategoryGrid from './InstagramCategoryGrid';
// Import icons for nav bar
import { HomeIcon, Squares2X2Icon, BookmarkIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const PLATFORMS = [
  { name: 'Instagram', icon: '📸', color: '#E1306C' },
  { name: 'LinkedIn', icon: '💼', color: '#0077B5' },
  { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
  // Add more platforms here
];

function PlaceholderGrid({ platform }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-16">
      <span className="text-6xl mb-4">{PLATFORMS.find(p => p.name === platform)?.icon || '✨'}</span>
      <h2 className="text-3xl font-bold mb-2" style={{ color: PLATFORMS.find(p => p.name === platform)?.color }}>{platform} Niche Library</h2>
      <p className="text-lg text-gray-400">Coming soon! We’re curating the best {platform} content categories for you.</p>
    </div>
  );
}

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[rgba(24,24,36,0.98)] border-t border-[#232946]/60 flex justify-around items-center py-2 z-50 md:hidden shadow-2xl backdrop-blur-xl">
      <Link href="/" className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" aria-label="Home">
        <HomeIcon className="w-7 h-7 mb-0.5" />
        Home
      </Link>
      <Link href="/resources/toolkits-and-templates/social-media-prompt-pack" className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" aria-label="Categories">
        <Squares2X2Icon className="w-7 h-7 mb-0.5" />
        Categories
      </Link>
      <Link href="/saved" className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" aria-label="Saved">
        <BookmarkIcon className="w-7 h-7 mb-0.5" />
        Saved
      </Link>
      <Link href="/profile" className="flex flex-col items-center text-xs text-gray-200 hover:text-accent focus:text-accent focus:outline-none" aria-label="Profile">
        <UserCircleIcon className="w-7 h-7 mb-0.5" />
        Profile
      </Link>
    </nav>
  );
}

export default function PremiumContentClient({ platformData }) {
  const [selected, setSelected] = useState('Instagram');
  const instagram = platformData.platforms.find(p => p.name === 'Instagram');
  const categories = instagram?.categories || [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181824] via-[#232946] to-[#1a1a2e] pb-24">
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-32 mb-12">
        <div className="bg-[#232946] border-2 border-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-3xl shadow-2xl px-10 py-12 max-w-3xl w-full text-center relative">
          <h1 className="text-5xl font-extrabold mb-4 text-white tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>Social Media Niche Library</h1>
          <div className="mx-auto w-24 h-1 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #7F5AF0 0%, #00FFC2 100%)' }} />
          <p className="text-2xl text-accent font-medium mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>Browse high-performing content categories for every platform.</p>
        </div>
        {/* Platform Tabs */}
        <div className="flex gap-4 mt-10 mb-2">
          {PLATFORMS.map(p => (
            <button
              key={p.name}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition border-2 ${selected === p.name ? 'bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black border-transparent shadow-lg' : 'bg-[#181824] text-white border-[#232946] hover:bg-[#232946]'}`}
              style={{ fontFamily: 'Geist, sans-serif', color: selected === p.name ? '#232946' : p.color, boxShadow: selected === p.name ? '0 2px 16px #00FFC244' : undefined }}
              onClick={() => setSelected(p.name)}
            >
              <span className="text-2xl">{p.icon}</span> {p.name}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto w-full">
        {selected === 'Instagram' && <InstagramCategoryGrid categories={categories} />}
        {selected !== 'Instagram' && <PlaceholderGrid platform={selected} />}
      </div>
      <MobileBottomNav />
    </div>
  );
} 