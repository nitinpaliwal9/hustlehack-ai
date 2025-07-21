'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

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
      <Navigation active="blog" />
      <main className="min-h-screen bg-gradient-to-b from-[#232946] via-[#181A2A] to-[#232946] pb-12">
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 text-center">Explore Our Blogs</h1>
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search blogs by title or tag..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 border border-[#7F5AF0]/20 focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredCategories.length === 0 && (
              <div className="text-gray-400 col-span-full text-center">No categories found.</div>
            )}
            {filteredCategories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(127,90,240,0.18)' }}
                className="bg-white/10 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-[#7F5AF0]/10 hover:shadow-2xl transition cursor-pointer"
              >
                <Link href={`/blog/${cat.slug}`} className="flex flex-col items-center w-full h-full">
                  <Image src={cat.image} alt={cat.name} width={120} height={120} className="rounded-xl object-cover mb-4 shadow" />
                  <h2 className="font-bold text-xl text-white mb-2 text-center">{cat.name}</h2>
                  <p className="text-gray-300 text-base mb-3 text-center">{cat.description}</p>
                  <span className="inline-block bg-accent/10 text-accent font-semibold text-xs px-3 py-1 rounded-full mb-2">{cat.count} blog{cat.count === 1 ? '' : 's'}</span>
                  <span className="btn btn-sm premium-btn rounded-full font-bold px-4 py-2 text-sm shadow hover:scale-105 transition mt-2">Explore →</span>
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