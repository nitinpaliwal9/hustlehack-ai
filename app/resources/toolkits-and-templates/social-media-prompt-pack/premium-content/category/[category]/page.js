import fs from 'fs/promises';
import path from 'path';
import Navigation from '../../../../../../components/Navigation';
import PromptGridClient from '../PromptGridClient';

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

function toKebabCase(str) {
  return encodeURIComponent(
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // remove special chars
      .replace(/\s+/g, '-')
  );
}

function fromKebabCase(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export async function generateMetadata({ params }) {
  const category = fromKebabCase(decodeURIComponent(params.category));
  return {
    title: `${category} Prompts – HustleHack AI`,
    description: `Explore top ${category} prompts for Instagram creators.`
  };
}

export default async function Page({ params }) {
  const kebab = params.category;
  // Find the actual file by matching kebab-case of the 'category' field inside each JSON
  const dir = path.join(process.cwd(), 'app/data/social-media-prompt-pack/instagram');
  const files = await fs.readdir(dir);
  let data = null;
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dir, file);
      try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        if (toKebabCase(json.category) === kebab) {
          data = json;
          break;
        }
      } catch {}
    }
  }
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#181824] text-white">
        <Navigation />
        <div className="mt-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-lg text-gray-400 mb-8">Sorry, we couldn't find prompts for this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181824] via-[#232946] to-[#1a1a2e] pb-24">
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-32 mb-12">
        {/* Floating Emoji and Heading */}
        <div className="flex flex-col items-center mb-0 z-20 relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#7F5AF0]/30 via-[#00FFC2]/20 to-[#FFD700]/10 flex items-center justify-center mb-2 shadow-lg animate-pulse">
            <span className="text-7xl drop-shadow-xl" style={{ filter: 'drop-shadow(0 2px 16px #7F5AF0AA)' }}>{CATEGORY_EMOJIS[data.category] || '✨'}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-2 mt-2" style={{ fontFamily: 'Geist, sans-serif', letterSpacing: '-0.01em', textShadow: '0 2px 24px #0008, 0 1px 0 #FFD70088' }}>
            {data.category} Prompts
          </h1>
          <div className="w-32 h-1 rounded-full mb-2" style={{ background: 'linear-gradient(90deg, #FFD700 0%, #7F5AF0 100%)', boxShadow: '0 2px 12px #FFD70044' }} />
        </div>
        {/* Subtitle and Stats as Simple Text (no box) */}
        <div className="flex flex-col items-center w-full mt-6 mb-2">
          <p className="text-xl md:text-2xl text-accent font-medium mb-2 text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
            {data.prompts.length} ready-to-use ideas for Instagram creators.<br />
            <span className="text-base md:text-lg text-gray-300 font-normal block mt-2" style={{ fontFamily: 'Geist, sans-serif' }}>
              Elevate your content. Stand out in your niche. Grow your brand with premium, high-performing prompts.
            </span>
          </p>
        </div>
      </div>
      <PromptGridClient prompts={data.prompts} />
    </div>
  );
} 