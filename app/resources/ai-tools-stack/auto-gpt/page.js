'use client';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import PoweredByBar from '@/app/components/PoweredByBar';

export default function AutoGPTBlueprint() {
  // Parallax for hero illustration
  const heroRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrollY * 0.08}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Confetti burst
  const fireConfetti = (e) => {
    // Center on button
    const rect = e.target.getBoundingClientRect();
    confetti({
      particleCount: 36,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#FFD700', '#7F5AF0', '#00FFC2', '#fff'],
      scalar: 1.1,
      zIndex: 9999,
    });
  };

  return (
    <>
      <Navigation />
      {/* Animated SVG background for hero */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#1a1333] via-[#232946] to-[#00FFC2]/10 animate-gradient-x" />
      <main className="relative min-h-screen pt-32 pb-20 px-2 sm:px-0 overflow-x-hidden">
        {/* Hero Section with SVG, illustration, and animated text */}
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] mb-24 px-4">
          {/* Animated SVG wave background */}
          <svg className="absolute top-0 left-0 w-full h-[320px] -z-10" viewBox="0 0 1440 320" fill="none">
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7F5AF0" />
                <stop offset="1" stopColor="#00FFC2" />
              </linearGradient>
            </defs>
            <path d="M0,160L80,186.7C160,213,320,267,480,266.7C640,267,800,213,960,186.7C1120,160,1280,160,1360,160L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" fill="url(#heroGradient)" fillOpacity="0.18">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0,160L80,186.7C160,213,320,267,480,266.7C640,267,800,213,960,186.7C1120,160,1280,160,1360,160L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z;M0,120L80,146.7C160,173,320,227,480,226.7C640,227,800,173,960,146.7C1120,120,1280,120,1360,120L1440,120L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z;M0,160L80,186.7C160,213,320,267,480,266.7C640,267,800,213,960,186.7C1120,160,1280,160,1360,160L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
            </path>
          </svg>
          {/* Floating AI illustration with parallax */}
          <div className="mb-8 animate-float-slow will-change-transform" ref={heroRef} style={{transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)'}}>
            <Image src="/ai-hero-illustration.webp" alt="Futuristic AI agent illustration for AutoGPT hero section" width={180} height={180} className="drop-shadow-2xl" priority />
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-xl premium-heading" style={{letterSpacing: '-0.02em'}}>
            <span className="bg-gradient-to-r from-[#FFD700] to-[#00FFC2] bg-clip-text text-transparent">AutoGPT</span> Starter Blueprint
          </h1>
          <p className="text-2xl text-gray-200 mb-8 max-w-2xl font-medium">
            <span className="text-[#FFD700] font-bold">Build your own AI agent</span> that works for you, 24/7 — no code required.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Link href="#get-started" className="btn btn-lg premium-btn rounded-full font-bold px-8 py-3 text-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FFD700] hover:to-[#00FFC2] transition-transform duration-200">Get Started</Link>
            <Link href="/resources" className="btn btn-lg border-2 border-accent text-accent bg-transparent rounded-full font-bold px-8 py-3 text-lg hover:bg-accent hover:text-[#232946] hover:scale-105 hover:shadow-2xl transition-transform duration-200">Explore More</Link>
          </div>
        </section>

        {/* Interactive Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-semibold shadow hover:scale-110 hover:shadow-2xl hover:from-[#FFD700] hover:to-[#00FFC2] transition-transform duration-200"
            onClick={e => fireConfetti(e)}
          >
            <span aria-hidden="true">👍</span> Like
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#00FFC2] to-[#7F5AF0] text-white font-semibold shadow hover:scale-110 hover:shadow-2xl hover:from-[#FFD700] hover:to-[#7F5AF0] transition-transform duration-200"
            onClick={e => {
              fireConfetti(e);
              if (navigator.share) {
                navigator.share({ title: 'AutoGPT Starter Blueprint', url: window.location.href });
              } else {
                window.open(`https://twitter.com/intent/tweet?text=Check%20out%20this%20AutoGPT%20Blueprint!%20${encodeURIComponent(window.location.href)}`);
              }
            }}
          >
            <span aria-hidden="true">🔗</span> Share
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#232946] to-[#7F5AF0] text-white font-semibold shadow hover:scale-110 hover:shadow-2xl hover:from-[#FFD700] hover:to-[#7F5AF0] transition-transform duration-200"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied!');
            }}
          >
            <span aria-hidden="true">📋</span> Copy Link
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#181A2A] to-[#232946] text-white font-semibold shadow hover:scale-110 hover:shadow-2xl hover:from-[#FFD700] hover:to-[#232946] transition-transform duration-200">
              <span aria-hidden="true">⋯</span> More
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-[#232946] text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-20">
              <a href="mailto:?subject=AutoGPT%20Blueprint&body=Check%20out%20this%20AutoGPT%20Blueprint:%20" className="block px-4 py-2 hover:bg-[#181A2A] rounded-t-xl">Email</a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-[#181A2A]">Share on LinkedIn</a>
              <a href="https://t.me/share/url?url=" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-[#181A2A] rounded-b-xl">Share on Telegram</a>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full flex justify-center mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] via-[#7F5AF0] to-[#00FFC2] rounded-full blur-sm opacity-70 animate-pulse" />
        </div>

        {/* What is AutoGPT - with split layout and icon */}
        <section className="max-w-5xl mx-auto mb-12 px-4 flex flex-col md:flex-row items-center gap-10" id="get-started">
          <div className="flex-1 bg-gradient-to-br from-[#232946] to-[#181A2A] rounded-2xl shadow-xl p-8 border border-[#7F5AF0]/30 flex flex-col justify-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">🎯 What is AutoGPT?</h2>
            <ul className="list-disc pl-6 text-gray-200 mb-2 text-lg space-y-1">
              <li>Accept a goal from the user</li>
              <li>Break it down into tasks</li>
              <li>Execute them one by one</li>
              <li>Analyze results</li>
              <li>Refine itself</li>
            </ul>
            <p className="text-accent font-semibold mt-4 text-lg">It’s like hiring a virtual assistant that never gets tired.</p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Image src="/ai-flow-illustration.webp" alt="AutoGPT workflow diagram: goal breakdown and task execution" width={260} height={260} className="rounded-2xl shadow-2xl bg-black/10 p-4" />
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full flex justify-center mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] via-[#7F5AF0] to-[#00FFC2] rounded-full blur-sm opacity-70 animate-pulse" />
        </div>

        {/* Tools Table - glassmorphism card */}
        <section className="max-w-3xl mx-auto mb-12 px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#00FFC2]/30 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">🛠️ Tools You’ll Use (No-Code Version)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 text-base">
                <thead>
                  <tr className="text-sm text-accent/80">
                    <th className="pr-4">Purpose</th>
                    <th className="pr-4">Tool/Platform</th>
                    <th>Why Use It?</th>
                  </tr>
                </thead>
                <tbody className="text-gray-100">
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>AI Brain</td>
                    <td>ChatGPT / GPT-4-o</td>
                    <td>Best LLM for logic</td>
                  </tr>
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>Memory / Task Storage</td>
                    <td>Notion / Supabase</td>
                    <td>Store goals, steps</td>
                  </tr>
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>Automation Execution</td>
                    <td>Make.com / Zapier</td>
                    <td>Execute tasks</td>
                  </tr>
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>Frontend (optional)</td>
                    <td>Framer / Typedream</td>
                    <td>Public interface</td>
                  </tr>
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>Backend Logic (no-code)</td>
                    <td>ChatGPT + Prompts</td>
                    <td>No programming needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full flex justify-center mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] via-[#7F5AF0] to-[#00FFC2] rounded-full blur-sm opacity-70 animate-pulse" />
        </div>

        {/* Architecture Blueprint - with SVG illustration */}
        <section className="max-w-5xl mx-auto mb-12 px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 bg-gradient-to-br from-[#232946] to-[#181A2A] rounded-2xl shadow-xl p-8 border border-[#7F5AF0]/30 flex flex-col justify-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">🧩 Architecture Blueprint</h2>
            <div className="text-sm text-gray-300 leading-7 font-mono bg-black/30 rounded-lg p-4">
              <span className="block">[User gives <b>GOAL</b>]</span>
              <span className="block ml-4">→ [Prompt Parser: ChatGPT breaks it into steps]</span>
              <span className="block ml-8">→ [Task Queue: Stored in Notion or memory system]</span>
              <span className="block ml-12">→ [Executor: Runs steps via Zapier or manual review]</span>
              <span className="block ml-16">→ [Output stored and analyzed]</span>
              <span className="block ml-20">→ [Repeat/refine]</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Image src="/ai-blueprint-illustration.webp" alt="AutoGPT architecture blueprint: system flow and automation" width={260} height={260} className="rounded-2xl shadow-2xl bg-black/10 p-4" />
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full flex justify-center mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] via-[#7F5AF0] to-[#00FFC2] rounded-full blur-sm opacity-70 animate-pulse" />
        </div>

        {/* Use Cases - glassmorphism cards */}
        <section className="max-w-5xl mx-auto mb-12 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">💡 Real-World Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-[#7F5AF0]/30 flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
              <h3 className="font-bold text-lg mb-2">1. ✍️ Auto Content Machine</h3>
              <p className="mb-1"><b>Input:</b> “Create content on Instagram growth”</p>
              <p className="mb-1"><b>Output:</b> AI writes carousel + tweet + caption + SEO blog</p>
              <p><b>Execution:</b> Use ChatGPT + Notion templates</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-[#7F5AF0]/30 flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
              <h3 className="font-bold text-lg mb-2">2. 📩 Auto DM Agent</h3>
              <p className="mb-1"><b>Input:</b> Incoming DM → AI reads it</p>
              <p className="mb-1"><b>Action:</b> Matches keywords → replies with right offer</p>
              <p><b>Execution:</b> GPT + Zapier + Google Sheets</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-[#00FFC2]/30 flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
              <h3 className="font-bold text-lg mb-2">3. 🧠 Auto Startup Planner</h3>
              <p className="mb-1"><b>Input:</b> “I want to build a meditation app”</p>
              <p className="mb-1"><b>Output:</b> AI generates business plan + launch plan + MVP structure</p>
              <p><b>Execution:</b> Prompt chain + Notion + ChatGPT</p>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full flex justify-center mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] via-[#7F5AF0] to-[#00FFC2] rounded-full blur-sm opacity-70 animate-pulse" />
        </div>

        {/* Monetization Ideas - glassmorphism card */}
        <section className="max-w-2xl mx-auto mb-12 px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#00FFC2]/30 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">💰 Monetization Ideas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 text-base">
                <thead>
                  <tr className="text-sm text-accent/80">
                    <th className="pr-4">Method</th>
                    <th>Execution</th>
                  </tr>
                </thead>
                <tbody className="text-gray-100">
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>Sell Notion-based AutoGPT kits</td>
                    <td>₹399–₹999</td>
                  </tr>
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>Freelance: offer AutoGPT agents</td>
                    <td>For creators/startups</td>
                  </tr>
                  <tr className="hover:bg-[#232946]/40 transition">
                    <td>Build AI tool + sell via Gumroad</td>
                    <td>Use ChatGPT API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full flex justify-center mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] via-[#7F5AF0] to-[#00FFC2] rounded-full blur-sm opacity-70 animate-pulse" />
        </div>

        {/* Prompts Section - glassmorphism card */}
        <section className="max-w-2xl mx-auto mb-12 px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#7F5AF0]/30 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">🧠 Prompt That Starts It All</h2>
            <div className="bg-black/30 rounded-lg p-4 text-gray-200 text-base mb-4 font-mono">
              “You are a startup founder building a system where AI takes a user goal and automatically creates a step-by-step plan, completes each task, refines outputs based on results, and stores everything. Suggest tools, logic, and flow.”
            </div>
            <h3 className="text-xl font-bold mb-2">⚡ Bonus Prompt Chain You Can Try</h3>
            <div className="bg-black/30 rounded-lg p-4 text-gray-200 text-base font-mono">
              <b>Goal Breakdown Prompt:</b><br />
              “Break down this goal into smaller executable steps with logical order and expected outcome: [Your Goal]”<br /><br />
              <b>Step Executor Prompt:</b><br />
              “Act on Step 1: [Step Description]. Give me the best output with actionable results.”<br /><br />
              <b>Reflection Prompt:</b><br />
              “Evaluate if this step output is good enough to move forward. If not, what should I revise?”
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full flex justify-center mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] via-[#7F5AF0] to-[#00FFC2] rounded-full blur-sm opacity-70 animate-pulse" />
        </div>

        {/* Instant Action Plan - glassmorphism card */}
        <section className="max-w-2xl mx-auto mb-12 px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#00FFC2]/30 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#00FFC2]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">✨ Instant Action Plan For You</h2>
            <ol className="list-decimal pl-6 text-gray-200 space-y-1 text-lg">
              <li>Open ChatGPT</li>
              <li>Copy the Bonus Prompt Chain</li>
              <li>Pick 1 use case</li>
              <li>Build → Screenshot → Post → Get Feedback</li>
            </ol>
          </div>
        </section>

        {/* Social Proof/Testimonial Section */}
        <section className="max-w-2xl mx-auto mb-20 px-4">
          <div className="bg-gradient-to-br from-[#FFD700]/30 to-[#7F5AF0]/20 rounded-2xl shadow-2xl p-8 border border-[#FFD700]/40 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#FFD700]/20 hover:to-[#7F5AF0]/10">
            <div className="text-4xl mb-2">🌟</div>
            <blockquote className="italic text-lg text-white mb-2 text-center">“This blueprint made building my first AI agent feel like magic. I shipped a working prototype in a weekend!”</blockquote>
            <div className="text-accent font-bold">— Priya S., Indie Hacker</div>
          </div>
        </section>

        <footer className="text-center mt-12 text-gray-400">
          <p>Want more blueprints? <Link href="/resources" className="text-accent underline">Explore all AI toolkits</Link></p>
        </footer>
      </main>
      <PoweredByBar />
      <Footer />
    </>
  );
} 