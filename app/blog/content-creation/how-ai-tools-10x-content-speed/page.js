'use client';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import PoweredByBar from '@/app/components/PoweredByBar';
import { Sparkles, Zap, TrendingUp, DollarSign, Target, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const BLOG_META = {
  title: 'How AI Tools Can 10x Your Content Creation Speed',
  slug: 'how-ai-tools-10x-content-speed',
  author: 'Nitin Paliwal',
  date: 'July 18, 2025',
  readTime: '6 min read',
  banner: '/ai-hero-illustration.webp',
  bannerAlt: 'AI tools for content creation speed illustration',
  description: 'Discover how AI tools like HustleHack AI can help you create content 10x faster, save money, and scale your brand—even if you have zero team.',
};

// Remove direct use of typeof window for shareUrl
// Instead, use a state and set it in useEffect

function ShareButtons() {
  const [shareUrl, setShareUrl] = useState('https://hustlehackai.in/blog/' + BLOG_META.slug);
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);
  const url = shareUrl;
  const text = encodeURIComponent(BLOG_META.title + ' via HustleHack AI');
  return (
    <div className="flex gap-2 mt-6 mb-2">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn" title="Share on LinkedIn">
        <span className="text-[#0077b5]">in</span>
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn" title="Share on Twitter">
        <span className="text-[#1da1f2]">X</span>
      </a>
      <a href={`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn" title="Share on WhatsApp">
        <span className="text-[#25d366]">WA</span>
      </a>
      <button className="share-btn" title="Copy link" onClick={() => {navigator.clipboard.writeText(url)}}>
        <span className="text-gray-500">🔗</span>
      </button>
    </div>
  );
}

function StickyCTA() {
  // Show sticky CTA after scrolling past hero
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`fixed bottom-4 left-0 w-full flex justify-center z-40 pointer-events-none transition-opacity ${show ? 'opacity-100' : 'opacity-0'}`} style={{maxWidth:'100vw'}}>
      <div className="pointer-events-auto bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] shadow-xl rounded-full px-6 py-3 flex items-center gap-3 animate-pulse">
        <span className="font-bold text-white text-base sm:text-lg">Try HustleHack AI for ₹99</span>
        <Link href="/plans" className="btn btn-sm bg-white text-[#7F5AF0] font-bold rounded-full px-4 py-2 ml-2 shadow hover:scale-105 transition">Start Now</Link>
      </div>
    </div>
  );
}

// Accent SVG for background
function AccentSVG({ className }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="url(#paint0_radial)" fillOpacity="0.18" />
      <defs>
        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(60 60) scale(60)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7F5AF0" />
          <stop offset="1" stopColor="#00FFC2" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// Illustration assets for cards
const CARD_IMAGES = [
  '/ai-hero-illustration.webp',
  '/ai-flow-illustration.webp',
  '/ai-blueprint-illustration.webp',
  '/hero_section.webp',
  '/founder_img.webp',
];

// Data for Bar Chart (Manual vs AI Time)
const barData = {
  labels: ['Research', 'Drafting', 'Designing', 'Finalizing + Export'],
  datasets: [
    {
      label: 'Manual (hrs)',
      data: [2, 4, 3, 2],
      backgroundColor: '#7F5AF0',
      borderRadius: 8,
    },
    {
      label: 'AI-Powered (hrs)',
      data: [0.2, 0.3, 0.3, 0.2],
      backgroundColor: '#00FFC2',
      borderRadius: 8,
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'top', labels: { color: '#fff', font: { weight: 'bold' } } },
    title: { display: false },
  },
  scales: {
    x: { ticks: { color: '#fff' }, grid: { color: 'rgba(127,90,240,0.1)' } },
    y: { ticks: { color: '#fff' }, grid: { color: 'rgba(127,90,240,0.1)' } },
  },
};

// Data for Pie Chart (Cost Breakdown)
const pieData = {
  labels: ['Freelancer', 'Designer', 'AI Tool'],
  datasets: [
    {
      data: [7000, 2500, 99],
      backgroundColor: ['#FFD700', '#7F5AF0', '#00FFC2'],
      borderWidth: 2,
      borderColor: '#232946',
    },
  ],
};
const pieOptions = {
  plugins: {
    legend: { display: true, position: 'bottom', labels: { color: '#fff', font: { weight: 'bold' } } },
  },
};

export default function BlogPage() {
  return (
    <>
      <Navigation active="blog" />
      <main className="min-h-screen bg-gradient-to-b from-[#232946] via-[#181A2A] to-[#232946] pb-12">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center pt-24 pb-10 px-4 bg-gradient-to-b from-[#7F5AF0]/10 to-transparent">
          <div className="max-w-4xl w-full mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-xl premium-heading" style={{letterSpacing:'-0.01em'}}>{BLOG_META.title}</h1>
            <div className="flex flex-wrap justify-center items-center gap-3 text-gray-300 text-sm mb-4">
              <span>By <span className="font-semibold text-accent">{BLOG_META.author}</span></span>
              <span className="hidden sm:inline">•</span>
              <span>{BLOG_META.date}</span>
              <span className="hidden sm:inline">•</span>
              <span>{BLOG_META.readTime}</span>
            </div>
            <div className="w-full flex justify-center mb-6">
              <Image src={BLOG_META.banner} alt={BLOG_META.bannerAlt} width={700} height={320} className="rounded-2xl shadow-xl object-cover max-h-64 w-full" priority />
            </div>
            <ShareButtons />
            <Link href="/plans" className="inline-block mt-4 btn btn-lg premium-btn rounded-full font-bold px-8 py-3 text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition">Try HustleHack AI for ₹99</Link>
          </div>
        </section>

        {/* Sticky CTA */}
        <StickyCTA />

        {/* Blog Content as Cards */}
        <div className="max-w-4xl mx-auto flex flex-col gap-10 px-2 md:px-0 relative">
          {/* Vertical Progress Bar (desktop only) */}
          <div className="hidden md:block absolute left-0 top-0 h-full w-2 z-0">
            <div className="h-full w-1 mx-auto bg-gradient-to-b from-[#7F5AF0]/60 via-[#00FFC2]/40 to-transparent rounded-full animate-gradient-x" />
          </div>
          {/* Card 1: Intro */}
          <div className="relative bg-gradient-to-br from-[#232946]/80 to-[#181A2A]/80 rounded-2xl shadow-2xl border-l-4 border-[#7F5AF0] px-0 py-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
              <div className="order-2 px-6 py-10">
                <AccentSVG className="absolute -top-8 -right-8 w-32 h-32 opacity-30 blur-lg z-0" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <Sparkles className="text-accent w-8 h-8" />
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gradient mb-0">How AI Tools Can 10x Your Content Creation Speed</h2>
                </div>
                <span className="block text-base font-normal text-gray-300 mb-4 relative z-10">(Even if You're a Busy Solopreneur with Zero Team)</span>
                <p className="text-gray-200 mb-2 font-medium relative z-10">In today’s content-hungry world, <span className="text-accent font-bold">speed is everything</span>. Whether you're building a personal brand, growing your Instagram page, or launching digital products — staying consistent is the hardest part.</p>
                <p className="text-gray-200 mb-2 font-semibold relative z-10">But what if you could create <span className="text-gradient font-bold">10x faster</span>, without burning out or hiring a team?</p>
                <p className="text-gray-200 mb-2 relative z-10">That’s where <span className="text-gradient font-bold">AI content tools</span> come in — and they’re not just hype. They're your new creative co-pilot.</p>
                <p className="text-gray-200 relative z-10">Let’s break down how they work, why they save time, and how you can start using <Link href="https://hustlehackai.in/plans" className="text-accent underline">HustleHack AI</Link> to simplify content forever.</p>
              </div>
              <div className="order-1 flex justify-center items-center py-8 md:py-0">
                <Image src="/ai-hero-illustration.webp" alt="AI content creation hero illustration" width={220} height={220} className="rounded-xl shadow-xl object-contain max-w-[180px] md:max-w-[220px]" />
              </div>
            </div>
          </div>
          <div className="h-4 md:h-6" />

          {/* Card 2: What is AI Content Automation */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border-l-4 border-[#00FFC2] px-0 py-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
              <div className="order-2 px-6 py-10">
                <AccentSVG className="absolute -bottom-8 -left-8 w-28 h-28 opacity-20 blur-lg z-0" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <Zap className="text-[#00FFC2] w-7 h-7" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00FFC2] mb-0">What Is AI Content Automation?</h2>
                </div>
                <p className="text-gray-200 mb-2 relative z-10">AI content automation means using artificial intelligence tools to ideate, draft, design, and deliver content with minimal human input.</p>
                <ul className="list-disc pl-6 text-gray-200 mb-2 relative z-10">
                  <li>✅ Instead of staring at a blank page…</li>
                  <li>✅ Instead of hiring expensive freelancers…</li>
                  <li>✅ Instead of wasting hours on Canva…</li>
                </ul>
                <p className="text-gray-200 mb-2 relative z-10">AI tools generate:</p>
                <ul className="list-disc pl-6 text-gray-200 mb-2 relative z-10">
                  <li>Social media carousels</li>
                  <li>Blog posts (like this one)</li>
                  <li>eBooks, lead magnets, and sales copies</li>
                  <li>LinkedIn posts, reels scripts, captions</li>
                  <li>...in minutes.</li>
                </ul>
                <blockquote className="bg-black/20 border-l-4 border-accent pl-4 py-2 text-accent font-semibold rounded relative z-10">🧠 <b>HustleHack AI does exactly that</b> — enter your niche, content type & goal, and get done-for-you content delivered beautifully.</blockquote>
              </div>
              <div className="order-1 flex justify-center items-center py-8 md:py-0">
                <Image src="/ai-flow-illustration.webp" alt="AI content automation workflow illustration" width={200} height={200} className="rounded-xl shadow-xl object-contain max-w-[160px] md:max-w-[200px]" />
              </div>
            </div>
          </div>
          <div className="h-4 md:h-6" />

          {/* Card 3: Time-Saving Workflows */}
          <div className="relative bg-gradient-to-br from-[#181A2A]/90 to-[#FFD700]/10 rounded-2xl shadow-2xl border-l-4 border-[#FFD700] px-0 py-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
              <div className="order-2 px-6 py-10">
                <AccentSVG className="absolute -top-8 -right-8 w-24 h-24 opacity-20 blur-lg z-0" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <TrendingUp className="text-[#FFD700] w-7 h-7" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-0">Time-Saving Workflows You’ll Wish You Knew Sooner</h2>
                </div>
                <p className="text-gray-200 mb-2 relative z-10">Let’s compare a traditional content creation process vs. an AI-powered one:</p>
                <div className="overflow-x-auto my-4 relative z-10">
                  <table className="w-full text-left border-separate border-spacing-y-2 text-base">
                    <thead>
                      <tr className="text-sm text-accent/80">
                        <th className="pr-4">Task</th>
                        <th className="pr-4">Manual Way</th>
                        <th>With HustleHack AI</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-100">
                      <tr className="hover:bg-[#232946]/40 transition">
                        <td>Research</td>
                        <td>1–2 hrs</td>
                        <td>Auto-generated</td>
                      </tr>
                      <tr className="hover:bg-[#232946]/40 transition">
                        <td>Drafting</td>
                        <td>2–4 hrs</td>
                        <td>Auto-generated</td>
                      </tr>
                      <tr className="hover:bg-[#232946]/40 transition">
                        <td>Designing</td>
                        <td>2–3 hrs (Canva etc.)</td>
                        <td>AI-designed</td>
                      </tr>
                      <tr className="hover:bg-[#232946]/40 transition">
                        <td>Finalizing + Export</td>
                        <td>1–2 hrs</td>
                        <td>One-click export</td>
                      </tr>
                      <tr className="font-bold">
                        <td>Total Time</td>
                        <td>~8–10 hrs/post</td>
                        <td>15–30 minutes/post ✅</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-200 relative z-10">This is how creators are saving 10+ hours per week, building faster, launching faster, and staying consistent even with college, job, or side hustle pressure.</p>
                <div className="w-full flex justify-center mt-8">
                  <div className="w-full max-w-md bg-black/10 rounded-xl p-4 shadow-lg">
                    <Bar data={barData} options={barOptions} />
                  </div>
                </div>
              </div>
              <div className="order-1 flex justify-center items-center py-8 md:py-0">
                <Image src="/ai-blueprint-illustration.webp" alt="AI workflow comparison illustration" width={200} height={200} className="rounded-xl shadow-xl object-contain max-w-[160px] md:max-w-[200px]" />
              </div>
            </div>
          </div>
          <div className="h-4 md:h-6" />

          {/* Card 4: Cost-Effectiveness */}
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border-l-4 border-[#00FFC2] px-0 py-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
              <div className="order-2 md:order-1 px-6 py-10">
                <AccentSVG className="absolute -bottom-8 -left-8 w-24 h-24 opacity-20 blur-lg z-0" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <DollarSign className="text-[#00FFC2] w-7 h-7" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00FFC2] mb-0">Why AI Is Crazy Cost-Effective</h2>
                </div>
                <ul className="list-disc pl-6 text-gray-200 mb-2 relative z-10">
                  <li>Hiring a freelance content creator: ₹3000–₹10,000 per project</li>
                  <li>Hiring a designer: ₹1000–₹4000 per carousel</li>
                  <li>Time spent: Priceless 😓</li>
                </ul>
                <p className="text-gray-200 mb-2 relative z-10">Now compare that with:</p>
                <ul className="list-disc pl-6 text-gray-200 mb-2 relative z-10">
                  <li>✅ HustleHack AI’s Creator Mode: ₹99 only</li>
                  <li>✅ Get beautiful PDFs, decks, carousels, and blogs</li>
                  <li>✅ Use it for your clients, brand, YouTube, or startup</li>
                </ul>
                <p className="text-gray-200 font-semibold mb-2 relative z-10">It’s like having an entire content team…<br />for less than your daily coffee spend ☕.</p>
                <p className="text-accent font-bold relative z-10"><Link href="https://hustlehackai.in/plans" className="underline">👉 Explore all plans</Link></p>
                <div className="w-full flex justify-center mt-8">
                  <div className="w-full max-w-xs bg-black/10 rounded-xl p-4 shadow-lg">
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center items-center py-8 md:py-0">
                <Image src="/founder_img.webp" alt="AI cost-effectiveness illustration" width={180} height={180} className="rounded-xl shadow-xl object-contain max-w-[140px] md:max-w-[180px]" />
              </div>
            </div>
          </div>
          <div className="h-4 md:h-6" />

          {/* Card 5: Real Talk */}
          <div className="relative bg-gradient-to-br from-[#232946]/90 to-[#FFD700]/10 rounded-2xl shadow-2xl border-l-4 border-[#FFD700] px-0 py-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
              <div className="order-2 px-6 py-10">
                <AccentSVG className="absolute -top-8 -right-8 w-24 h-24 opacity-20 blur-lg z-0" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <Target className="text-[#FFD700] w-7 h-7" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-0">Real Talk: You Don't Need to Be "Creative" Anymore</h2>
                </div>
                <p className="text-gray-200 mb-2 relative z-10">The old advice of “be consistent” and “create daily” doesn’t work if you’re overwhelmed.<br />Let AI handle the heavy lifting, while you focus on strategy and growth.</p>
                <p className="text-gray-200 mb-2 relative z-10">Here’s what creators are doing with HustleHack AI:</p>
                <ul className="list-disc pl-6 text-gray-200 mb-2 relative z-10">
                  <li>Selling digital products made with AI</li>
                  <li>Building personal brands on autopilot</li>
                  <li>Launching service pages and landing pages overnight</li>
                  <li>Closing ₹5000–₹15,000 clients with ready-made carousels</li>
                </ul>
              </div>
              <div className="order-1 flex justify-center items-center py-8 md:py-0">
                <Image src="/ai-hero-illustration.webp" alt="AI real talk illustration" width={180} height={180} className="rounded-xl shadow-xl object-contain max-w-[140px] md:max-w-[180px]" />
              </div>
            </div>
          </div>
          <div className="h-4 md:h-6" />

          {/* Card 6: Final Thoughts & CTA */}
          <div className="relative bg-gradient-to-br from-[#232946]/90 to-[#7F5AF0]/10 rounded-2xl shadow-2xl border-l-4 border-[#7F5AF0] px-0 py-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
              <div className="order-2 md:order-1 px-6 py-10">
                <AccentSVG className="absolute -bottom-8 -left-8 w-24 h-24 opacity-20 blur-lg z-0" />
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <Star className="text-[#7F5AF0] w-7 h-7" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#7F5AF0] mb-0">Final Thoughts: The Smartest Creators Use AI. Why Aren’t You?</h2>
                </div>
                <p className="text-gray-200 mb-2 relative z-10">Content isn’t king anymore — speed and scale are.</p>
                <ul className="list-disc pl-6 text-gray-200 mb-2 relative z-10">
                  <li>Don’t let ideas sit in your Notion forever.</li>
                  <li>Don’t let design delays kill your momentum.</li>
                  <li>Don’t overthink — just use HustleHack AI.</li>
                </ul>
                <blockquote className="bg-black/20 border-l-4 border-accent pl-4 py-2 text-accent font-semibold rounded mt-4 relative z-10">🎁 <b>Try HustleHack AI for Just ₹99</b><br />✅ Build like a creator.<br />✅ Sell like a founder.<br />✅ Scale like a startup.<br /><br /><Link href="/plans" className="text-accent underline">👉 Claim your Creator Mode now →</Link></blockquote>
              </div>
              <div className="order-1 md:order-2 flex justify-center items-center py-8 md:py-0">
                <Image src="/ai-flow-illustration.webp" alt="AI final thoughts illustration" width={180} height={180} className="rounded-xl shadow-xl object-contain max-w-[140px] md:max-w-[180px]" />
              </div>
            </div>
          </div>
        </div>

        {/* End of Blog Section */}
        <div className="max-w-2xl mx-auto px-4 mt-12 mb-8">
          <hr className="border-t border-[#7F5AF0]/30 mb-8" />
          <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-[#232946] to-[#181A2A] rounded-2xl p-6 shadow-xl border border-[#7F5AF0]/20">
            <Image src="/logo (2).webp" alt="HustleHack AI Logo" width={56} height={56} className="rounded-full bg-white/10 shadow" />
            <div>
              <h3 className="font-bold text-lg text-white mb-1">About HustleHack AI</h3>
              <p className="text-gray-300 text-base">HustleHack AI helps creators, students, and solopreneurs build, launch, and earn faster with AI-powered tools, templates, and resources. Join 10,000+ users building smarter!</p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <h4 className="text-xl font-bold text-white mb-2">Liked this blog?</h4>
            <p className="text-gray-300 mb-4">Start creating faster with HustleHack AI – Plans start at just ₹99</p>
            <Link href="/plans" className="btn btn-lg premium-btn rounded-full font-bold px-8 py-3 text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition">See Plans</Link>
          </div>
        </div>

        {/* Related Blogs (optional, placeholder) */}
        {/* <section className="max-w-4xl mx-auto px-4 mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">Related Blogs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-4 shadow flex flex-col">
              <div className="h-32 bg-gradient-to-br from-[#FFD700]/20 to-[#7F5AF0]/10 rounded-lg mb-3" />
              <h4 className="font-bold text-lg mb-1">How to Build a Personal Brand with AI</h4>
              <p className="text-gray-300 text-sm mb-2">Learn how AI can help you grow your brand, automate content, and stand out online.</p>
              <Link href="/blog/personal-brand-ai" className="text-accent underline font-semibold">Read More →</Link>
            </div>
            <div className="bg-white/10 rounded-xl p-4 shadow flex flex-col">
              <div className="h-32 bg-gradient-to-br from-[#00FFC2]/20 to-[#7F5AF0]/10 rounded-lg mb-3" />
              <h4 className="font-bold text-lg mb-1">Top 5 AI Tools for Solopreneurs in 2025</h4>
              <p className="text-gray-300 text-sm mb-2">Discover the best AI tools to save time, boost productivity, and grow your business.</p>
              <Link href="/blog/top-5-ai-tools-2025" className="text-accent underline font-semibold">Read More →</Link>
            </div>
          </div>
        </section> */}

        {/* Powered By Bar */}
        <div className="mt-16">
          <PoweredByBar />
        </div>
      </main>
      <Footer />
    </>
  );
}

// Tailwind CSS: .share-btn { @apply bg-white/10 rounded-full px-3 py-2 text-base font-bold hover:bg-accent/20 hover:scale-110 transition; } 