'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const CATEGORIES = [
  {
    name: 'Content Creation',
    slug: 'content-creation',
    description: 'Tips, tools, and workflows to create content faster and better with AI.',
    image: '/ai-hero-illustration.webp',
  },
  {
    name: 'AI Tools',
    slug: 'ai-tools',
    description: 'Discover the latest AI tools for creators, solopreneurs, and students.',
    image: '/ai-blueprint-illustration.webp',
  },
  {
    name: 'Social Media Growth',
    slug: 'social-media-growth',
    description: 'Grow your audience and engagement with smart AI-powered strategies.',
    image: '/ai-flow-illustration.webp',
  },
  {
    name: 'Hustle Strategies',
    slug: 'hustle-strategies',
    description: 'Actionable guides for side hustles, productivity, and scaling up.',
    image: '/hero_section.webp',
  },
  {
    name: 'Personal Branding',
    slug: 'personal-branding',
    description: 'Build your personal brand and stand out online using AI.',
    image: '/logo (2).webp',
  },
  // Add more categories as needed
];

const BLOGS = [
  {
    title: 'How AI Tools Can 10x Your Content Creation Speed',
    slug: 'how-ai-tools-10x-content-speed',
    category: 'content-creation',
    tags: ['ai', 'content', 'automation'],
  },
  // Add more blog objects here
];

export default function BlogLandingPage() {
  const [search, setSearch] = useState('');
  const filteredCategories = CATEGORIES.map(cat => {
    const count = BLOGS.filter(b => b.category === cat.slug && (!search || b.title.toLowerCase().includes(search.toLowerCase()) || (b.tags && b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))))).length;
    return { ...cat, count };
  }).filter(cat => cat.count > 0 || !search);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-[#0F0F1B] via-[#181A2A] to-[#0F0F1B] pb-12">
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 text-center">Explore Our Blogs</h1>
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search blogs by title or tag..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 border border-[#7F5AF0]/20 focus:outline-none focus:ring-2 focus:ring-[#00FFC2] transition"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.length === 0 && (
              <div className="text-gray-400 col-span-full text-center">No categories found.</div>
            )}
            {filteredCategories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(127,90,240,0.18)' }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col items-center border border-white/10 hover:border-[#7F5AF0]/50 transition-all duration-300 cursor-pointer"
              >
                <Link href={`/blog/${cat.slug}`} className="flex flex-col items-center w-full h-full">
                  <div className="relative w-24 h-24 mb-4">
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill
                      className="rounded-xl object-cover shadow"
                    />
                  </div>
                  <h2 className="font-bold text-xl text-white mb-2 text-center">{cat.name}</h2>
                  <p className="text-gray-300 text-base mb-3 text-center">{cat.description}</p>
                  <span className="inline-block bg-[#00FFC2]/10 text-[#00FFC2] font-semibold text-xs px-3 py-1 rounded-full mb-2">{cat.count} blog{cat.count === 1 ? '' : 's'}</span>
                  <span className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-[#00FFC2]/25 transition-all duration-300 transform hover:scale-105 mt-2">Explore →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 