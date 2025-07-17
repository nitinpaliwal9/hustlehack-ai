"use client";
import { useState, useMemo } from 'react';

function GoldRibbon() {
  return (
    <div className="absolute top-0 right-0 w-12 h-12 z-10">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="pointer-events-none">
        <polygon points="0,0 48,0 48,48" fill="url(#gold)" />
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD700" />
            <stop offset="1" stopColor="#FFB300" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const BG_EMOJIS = [
  '💡', '🔥', '✨', '🎯', '⚡', '🏆', '🚀', '💪', '🎉', '🧠', '🌟', '📈', '📝', '🎵', '🍰', '🥇', '🏋️', '🧁', '🍫', '🥗', '🍎', '🧘', '🎬', '📸', '🎤', '🎨', '🕺', '👑'
];
const CARD_ACCENTS = [
  'from-[#FFD700]/30 to-[#7F5AF0]/20',
  'from-[#00FFC2]/30 to-[#FFD700]/10',
  'from-[#7F5AF0]/25 to-[#00FFC2]/15',
  'from-[#FFD700]/20 to-[#232946]/10',
  'from-[#00FFC2]/20 to-[#FFD700]/20',
];

function getRandomEmoji(idx) {
  // Deterministic for SSR/CSR match
  return BG_EMOJIS[idx % BG_EMOJIS.length];
}
function getAccent(idx) {
  return CARD_ACCENTS[idx % CARD_ACCENTS.length];
}

function seededRandom(seed) {
  // Simple LCG for deterministic pseudo-random
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function getSavedCount(idx, prompt) {
  // Use prompt title hash for more variety
  let hash = 0;
  for (let i = 0; i < prompt.title.length; i++) {
    hash = ((hash << 5) - hash) + prompt.title.charCodeAt(i);
    hash |= 0;
  }
  const seed = idx * 999 + Math.abs(hash);
  if (idx < 3) {
    // Trending: 80,000–100,000
    return Math.floor(80000 + seededRandom(seed) * 20000).toLocaleString();
  } else {
    // Others: 1,000–60,000
    return Math.floor(1000 + seededRandom(seed) * 59000).toLocaleString();
  }
}

export default function PromptGridClient({ prompts }) {
  const [search, setSearch] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [saved, setSaved] = useState({}); // { idx: true }
  const filtered = useMemo(() => {
    if (!search) return prompts;
    return prompts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, prompts]);

  return (
    <>
      <div className="max-w-2xl mx-auto mb-8 px-2 sm:px-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search prompts..."
          className="w-full px-5 py-3 rounded-xl border-2 border-[color:var(--primary)] bg-[#181824]/80 text-white text-base sm:text-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none shadow"
          style={{ fontFamily: 'Geist, sans-serif', backdropFilter: 'blur(6px)' }}
        />
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-base sm:text-lg py-12">No prompts found.</div>
        )}
        {filtered.map((prompt, idx) => {
          const hasTrending = idx < 3;
          const isSaved = !!saved[idx];
          return (
            <div
              key={idx}
              className={`relative bg-[rgba(35,41,70,0.85)] backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-transparent bg-clip-padding flex flex-col gap-3 sm:gap-4 px-4 py-5 sm:px-7 sm:py-8 transition-all duration-150 active:scale-[0.98] active:shadow-lg hover:scale-[1.025] hover:shadow-gold-xl hover:border-[color:var(--accent)] group animate-fade-in overflow-hidden ${hasTrending ? 'pt-16' : ''}`}
              style={{
                borderImage: 'linear-gradient(120deg, #FFD700 0%, #7F5AF0 60%, #00FFC2 100%) 1',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.22), 0 2px 16px #FFD70033',
                minHeight: 180,
                position: 'relative',
                background: `linear-gradient(120deg, var(--tw-gradient-stops)), rgba(35,41,70,0.85)`
              }}
              tabIndex={0}
              role="region"
              aria-label={prompt.title}
            >
              <GoldRibbon />
              {/* Trending badge for top 3, now above content */}
              {hasTrending && (
                <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg z-30 animate-pulse" style={{ letterSpacing: 1, minWidth: 80, textAlign: 'center' }}>Trending</span>
              )}
              {/* Subtle random emoji watermark */}
              <span className="absolute bottom-2 right-3 text-4xl sm:text-6xl opacity-10 pointer-events-none select-none" aria-hidden>{getRandomEmoji(idx)}</span>
              {/* Subtle accent gradient overlay */}
              <div className={`absolute inset-0 z-0 rounded-2xl pointer-events-none`} style={{ background: `linear-gradient(120deg, ${getAccent(idx).replace('from-', '').replace('to-', '').replace(/\//g, '')})`, opacity: 0.18 }} />
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 relative z-10" style={{ fontFamily: 'Geist, sans-serif', letterSpacing: '-0.01em', textShadow: '0 1px 8px #0006', marginTop: hasTrending ? '0.5rem' : 0 }}>{prompt.title}</h3>
              <p className="text-base sm:text-lg text-gray-100 mb-2 relative z-10" style={{ fontFamily: 'Geist, sans-serif', lineHeight: 1.6 }}>
                {prompt.prompt ? (
                  <>
                    {prompt.prompt}
                    {prompt.prompt.match(/#[\w]+/g) && (
                      <>
                        {' '}
                        {prompt.prompt.match(/#[\w]+/g).map((tag, i) => (
                          <span key={i} className="text-green-400">{tag} </span>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {prompt.content && <span>{prompt.content}<br/></span>}
                    {prompt.caption && <span>{prompt.caption}<br/></span>}
                    {prompt.hashtags && <span className="text-green-400">{prompt.hashtags}</span>}
                  </>
                )}
              </p>
              {/* Elegant separator */}
              <div className="w-full h-1 my-2 rounded-full bg-gradient-to-r from-[#FFD700]/40 via-[#7F5AF0]/20 to-[#00FFC2]/40 opacity-70" />
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-2 relative z-10 gap-2 sm:gap-2">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-full font-bold shadow transition focus:outline-none focus:ring-2 focus:ring-accent text-base sm:text-base ${isSaved ? 'bg-gradient-to-r from-[#FFD700] to-[#00FFC2] text-black' : 'bg-[#232946]/80 text-white hover:bg-gradient-to-r hover:from-[#FFD700] hover:to-[#00FFC2] hover:text-black'}`}
                  onClick={() => setSaved(s => ({ ...s, [idx]: !isSaved }))}
                  aria-label={isSaved ? 'Unsave prompt' : 'Save prompt'}
                  style={{ minHeight: 44 }}
                >
                  {isSaved ? (
                    <>
                      <svg width="20" height="20" fill="#FFD700" viewBox="0 0 20 20"><path d="M5 2a2 2 0 0 0-2 2v14l7-5.5L17 18V4a2 2 0 0 0-2-2H5z" /></svg>
                      Saved!
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><path d="M5 2a2 2 0 0 0-2 2v14l7-5.5L17 18V4a2 2 0 0 0-2-2H5z" /></svg>
                      Save
                    </>
                  )}
                </button>
                <span className="text-xs text-gray-300 font-medium ml-0 sm:ml-2 mt-2 sm:mt-0" style={{ fontFamily: 'Geist, sans-serif', minHeight: 20 }}>
                  Saved by {getSavedCount(idx, prompt)} users
                </span>
                <button
                  className="flex-1 flex items-center justify-center ml-0 sm:ml-auto px-4 py-3 sm:py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#00FFC2] text-black font-bold shadow hover:from-[#FFB300] hover:to-[#7F5AF0] transition group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent text-base sm:text-base"
                  onClick={() => {
                    navigator.clipboard.writeText(prompt.prompt);
                    setCopiedIdx(idx);
                    setTimeout(() => setCopiedIdx(null), 1200);
                  }}
                  aria-label="Copy prompt"
                  style={{ minHeight: 44 }}
                >
                  {copiedIdx === idx ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
} 