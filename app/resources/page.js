'use client'

import Link from 'next/link'
import Navigation from '../components/NavigationClient'
import Footer from '../components/FooterClient'
import './resources.css'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../components/LoadingSpinner'
import Image from 'next/image'

// --- Semantic Structure & Headings Suggestion ---
// Use this as a template for your main content:
/*
<main>
  <section>
    <h1>Explore Free AI Tools & Notion Templates</h1>
    <p>Discover toolkits, templates, and resources for Gen Z students, creators, and founders.</p>
  </section>
  <section>
    <h2>Student Productivity Suite</h2>
    <article>...</article>
    <a href="/resources/toolkits-and-templates/student-productivity-suite" className="cta">See all study tools</a>
  </section>
  <section>
    <h2>Startup Launch Kit</h2>
    <article>...</article>
    <a href="/resources/toolkits-and-templates/startup-launch-kit" className="cta">Explore Startup Launch Kit</a>
  </section>
  <section>
    <h2>Social Media Prompt Pack</h2>
    <article>...</article>
    <a href="/resources/toolkits-and-templates/social-media-prompt-pack" className="cta">Get Social Media Prompts</a>
  </section>
  <section>
    <h2>Creators’ AI Toolkit</h2>
    <article>...</article>
    <a href="/resources/toolkits-and-templates/creators-ai-toolkit" className="cta">Unlock Creators’ Toolkit</a>
  </section>
  <nav>
    <a href="/pricing">Upgrade for Pro features</a>
    <a href="/">Back to Home</a>
  </nav>
</main>
*/
// Add alt text to all images and CTAs as shown above.
// Use Next.js <Image /> for all images for performance.
// Add internal links to /pricing, /, and between toolkits.

export default function ResourcesPage() {
  // Skeleton loading state for perceived performance
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 1s load
    return () => clearTimeout(timer);
  }, []);

  // Skeleton card component
  const SkeletonCard = () => (
    <div className="resource-card skeleton-card" style={{padding: '2.5rem', minHeight: 220, borderRadius: 18, background: 'rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{width: 60, height: 60, borderRadius: '50%', background: 'rgba(127,90,240,0.10)', marginBottom: 16}}></div>
      <div style={{width: '60%', height: 24, borderRadius: 6, background: 'rgba(127,90,240,0.15)', marginBottom: 10}}></div>
      <div style={{width: '90%', height: 16, borderRadius: 6, background: 'rgba(127,90,240,0.10)', marginBottom: 8}}></div>
      <div style={{width: '80%', height: 16, borderRadius: 6, background: 'rgba(127,90,240,0.10)', marginBottom: 8}}></div>
      <div style={{width: 120, height: 36, borderRadius: 8, background: 'rgba(127,90,240,0.12)', marginTop: 'auto'}}></div>
    </div>
  );

  // const { user, isLoading, checkUserProfile } = useAuth()
  // const router = useRouter()
  // const [profileChecked, setProfileChecked] = useState(false)

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     checkUserProfile(user).then(status => {
  //       if (status !== 'complete') {
  //         router.push('/complete-profile')
  //       } else {
  //         setProfileChecked(true)
  //       }
  //     })
  //   }
  // }, [isLoading, user, checkUserProfile, router])

  // if (isLoading || !user || !profileChecked) {
  //   return <LoadingSpinner message="Loading..." />
  // }

  return (
    <div>
      <Navigation />

      {/* Resources Content */}
      <main id="main-content" className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36" role="main" aria-label="Resources main content">
        {/* Hero Section */}
        <div
          className="text-center mb-20 py-16 px-4 sm:px-8 bg-gradient-to-br from-[#0F0F1B]/90 via-[#1F2937]/80 to-[#232946]/80 rounded-3xl border border-[#7F5AF0]/20 relative overflow-hidden max-w-4xl mx-auto"
          role="region"
          aria-label="Premium Resources"
        >
          <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(circle at 30% 20%, rgba(127,90,240,0.10) 0%, transparent 50%)'}} />
          <h1 tabIndex="0" className="relative z-10 text-blue-400 text-4xl sm:text-5xl font-extrabold mb-6 leading-tight flex items-center justify-center gap-2">
            <span aria-hidden="true" className="text-5xl sm:text-6xl mr-2">🚀</span> Premium Resources
          </h1>
          <p tabIndex="0" className="relative z-10 text-blue-200 text-lg sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Everything you need to accelerate your AI journey — handpicked tools, templates, guides, and exclusive content for the next-gen hustlers.
          </p>
        </div>

        {/* Toolkits & Templates Section */}
        <section className="mt-20 mb-12" role="region" aria-label="Toolkits and Templates">
          <div className="mb-10 text-center">
            <h2 tabIndex="0" className="text-2xl sm:text-3xl font-extrabold text-white mb-2">🧰 Toolkits & Templates</h2>
            <p tabIndex="0" className="text-blue-200 text-base sm:text-lg">Handpicked AI-ready templates for creators, students, and solopreneurs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {loading ? (
                // Show 4 skeleton cards while loading
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                <>
                  <div className="relative bg-gradient-to-br from-[#7F5AF0]/10 to-[#00FFC2]/5 border border-[#00FFC2] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                    <div className="absolute top-4 right-4 bg-[#00FFC2] text-black px-3 py-1 rounded-full text-xs font-bold shadow">Popular</div>
                    <span aria-hidden="true" className="text-4xl mb-4">📱</span>
                    <h3 className="text-white text-xl font-bold mb-2 text-center">Social Media Prompt Pack</h3>
                    <p className="text-blue-100 text-base mb-6 text-center">50+ AI-ready prompts to automate your content calendar. Generate viral posts, engaging captions, trending hashtags, and strategic content plans across all platforms effortlessly.</p>
                    <Link href="/resources/toolkits-and-templates/social-media-prompt-pack" className="inline-block bg-[#7F5AF0] hover:bg-[#6D4DC6] text-white font-semibold px-6 py-2 rounded-xl shadow transition-all duration-150" aria-label="Explore Social Media Prompt Pack">Explore Pack →</Link>
                  </div>
                  
                  <div className="bg-[#181f36]/60 border border-[#232946] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                    <span aria-hidden="true" className="text-4xl mb-4">💼</span>
                    <h3 className="text-white text-xl font-bold mb-2 text-center">Student Productivity Suite</h3>
                    <p className="text-blue-100 text-base mb-6 text-center">Complete toolkit for academic success. Note-taking templates, study planners, and AI study assistants.</p>
                    <Link href="/resources/toolkits-and-templates/student-productivity-suite" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Explore Student Productivity Suite">Explore Suite →</Link>
                  </div>
                  
                  <div className="bg-[#181f36]/60 border border-[#232946] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                    <span aria-hidden="true" className="text-4xl mb-4">🎨</span>
                    <h3 className="text-white text-xl font-bold mb-2 text-center">Creator's AI Toolkit</h3>
                    <p className="text-blue-100 text-base mb-6 text-center">Everything creators need: video scripts, thumbnail ideas, content calendars, and engagement strategies.</p>
                    <Link href="/resources/toolkits-and-templates/creators-ai-toolkit" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Explore Creator's AI Toolkit">Explore Toolkit →</Link>
                  </div>
                  
                  <div className="bg-[#181f36]/60 border border-[#232946] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                    <span aria-hidden="true" className="text-4xl mb-4">🚀</span>
                    <h3 className="text-white text-xl font-bold mb-2 text-center">Startup Launch Kit</h3>
                    <p className="text-blue-100 text-base mb-6 text-center">From idea to launch: business plan templates, pitch decks, marketing strategies, and growth hacks.</p>
                    <Link href="/resources/toolkits-and-templates/startup-launch-kit" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Launch Startup Launch Kit">Launch Now →</Link>
                  </div>
                  
                  <div className="bg-[#181f36]/60 border border-[#232946] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                    <span aria-hidden="true" className="text-4xl mb-4">💰</span>
                    <h3 className="text-white text-xl font-bold mb-2 text-center">Freelancer's Arsenal</h3>
                    <p className="text-blue-100 text-base mb-6 text-center">Client proposals, project templates, pricing calculators, and automated workflow setups.</p>
                    <Link href="/resources/toolkits-and-templates/freelancers-arsenal" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Boost Income with Freelancer's Arsenal">Boost Income →</Link>
                  </div>
                  
                  <div className="relative bg-[#181f36]/40 border border-[#232946] rounded-2xl p-10 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                    <div className="absolute top-4 right-4 bg-[#7F5AF0] text-white px-3 py-1 rounded-full text-xs font-bold shadow">Coming Soon</div>
                    <span aria-hidden="true" className="text-4xl mb-4">🤖</span>
                    <h3 className="text-white text-xl font-bold mb-2 text-center">AI Automation Scripts</h3>
                    <p className="text-blue-100 text-base mb-6 text-center">Ready-to-use automation scripts for common tasks. No coding required, just copy and customize.</p>
                    <Link href="/resources/toolkits-and-templates/ai-automation-scripts" className="inline-block text-gray-400 font-semibold px-4 py-2 rounded-xl border border-gray-400 cursor-not-allowed" aria-label="Notify me when AI Automation Scripts are available">Notify Me →</Link>
                  </div>
                </>
              )}
            </div>
        </section>

        {/* Free Guides & Blueprints Section */}
        <section className="mt-20 mb-12" role="region" aria-label="Free Guides and Blueprints">
          <div className="mb-10 text-center">
            <h2 tabIndex="0" className="text-2xl sm:text-3xl font-extrabold text-white mb-2">📘 Free Guides & Blueprints</h2>
            <p tabIndex="0" className="text-blue-200 text-base sm:text-lg">Step-by-step guides to master AI tools and grow your skills</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                <span aria-hidden="true" className="text-4xl mb-4">🎯</span>
                <h3 className="text-white text-xl font-bold mb-2 text-center">AI for Beginners</h3>
                <p className="text-blue-100 text-base mb-6 text-center">Complete beginner's guide to AI. From ChatGPT basics to advanced prompting techniques in 30 days.</p>
                <Link href="/resources/free-guides-and-blueprints/ai-for-beginners" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Start Learning AI for Beginners">Start Learning →</Link>
              </div>
              
              <div className="relative bg-gradient-to-br from-[#7F5AF0]/10 to-[#00FFC2]/5 border border-[#00FFC2] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                <div className="absolute top-4 right-4 bg-[#00FFC2] text-black px-3 py-1 rounded-full text-xs font-bold shadow">Most Downloaded</div>
                <span aria-hidden="true" className="text-4xl mb-4">📈</span>
                <h3 className="text-white text-xl font-bold mb-2 text-center">Growth Hacking with AI</h3>
                <p className="text-blue-100 text-base mb-6 text-center">10 proven strategies to grow your audience using AI tools. Real case studies and actionable tactics.</p>
                <Link href="/resources/free-guides-and-blueprints/growth-hacking-with-ai" className="inline-block bg-[#7F5AF0] hover:bg-[#6D4DC6] text-white font-semibold px-6 py-2 rounded-xl shadow transition-all duration-150" aria-label="Download Growth Hacking with AI Guide">Download Guide →</Link>
              </div>
              
              <div className="bg-[#181f36]/60 border border-[#232946] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                <span aria-hidden="true" className="text-4xl mb-4">🎓</span>
                <h3 className="text-white text-xl font-bold mb-2 text-center">Student Success Blueprint</h3>
                <p className="text-blue-100 text-base mb-6 text-center">How to use AI for studying, research, assignments, and career preparation. Academic edge unlocked.</p>
                <Link href="/resources/free-guides-and-blueprints/student-success-blueprint" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Get Student Success Blueprint">Get Blueprint →</Link>
              </div>
              
              <div className="bg-[#181f36]/60 border border-[#232946] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                <span aria-hidden="true" className="text-4xl mb-4">💡</span>
                <h3 className="text-white text-xl font-bold mb-2 text-center">AI Side Hustle Ideas</h3>
                <p className="text-blue-100 text-base mb-6 text-center">50+ profitable side hustle ideas using AI. Start earning while learning, step-by-step execution guide.</p>
                <Link href="/resources/free-guides-and-blueprints/ai-side-hustle-ideas" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Explore AI Side Hustle Ideas">Explore Ideas →</Link>
              </div>
            </div>
        </section>

        {/* Weekly Drop Archive Section */}
        <section className="mt-20 mb-12" role="region" aria-label="Weekly Drop Archive">
          <div className="mb-10 text-center">
            <h2 tabIndex="0" className="text-2xl sm:text-3xl font-extrabold text-white mb-2">📅 Weekly Drop Archive</h2>
            <p tabIndex="0" className="text-blue-200 text-base sm:text-lg">Access our previous weekly drops - fresh AI resources delivered every week</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="text-[#00FFC2] text-sm font-bold mb-2">Week 1 • July 2025</div>
                <h3 className="text-white text-lg font-bold mb-2">AI Content Calendar Mastery</h3>
                <p className="text-blue-100 text-base mb-4">Complete system to plan, create, and schedule content using AI. Includes 30-day content ideas and automation workflows.</p>
                <Link href="/resources/weekly-drop-archive/week-1-july-2025" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-3 py-1 rounded-lg border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="View AI Content Calendar Mastery Drop">View Drop →</Link>
              </div>
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="text-[#00FFC2] text-sm font-bold mb-2">Week 2 • July 2025</div>
                <h3 className="text-white text-lg font-bold mb-2">Student Research Assistant</h3>
                <p className="text-blue-100 text-base mb-4">AI prompts and tools for academic research. Find sources, summarize papers, and generate citations automatically.</p>
                <Link href="/resources/weekly-drop-archive/week-2-july-2025" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-3 py-1 rounded-lg border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Access Student Research Assistant Drop">Access Drop →</Link>
              </div>
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="text-[#00FFC2] text-sm font-bold mb-2">Week 3 • July 2025</div>
                <h3 className="text-white text-lg font-bold mb-2">Viral Video Scripts Pack</h3>
                <p className="text-blue-100 text-base mb-4">25 proven video script templates for social media. Hooks, storytelling frameworks, and CTAs that convert.</p>
                <Link href="/resources/weekly-drop-archive/week-3-july-2025" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-3 py-1 rounded-lg border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Get Viral Video Scripts Pack">Get Scripts →</Link>
              </div>
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="text-[#00FFC2] text-sm font-bold mb-2">Week 4 • July 2025</div>
                <h3 className="text-white text-lg font-bold mb-2">AI Email Marketing Suite</h3>
                <p className="text-blue-100 text-base mb-4">Subject lines, email sequences, and newsletter templates powered by AI. Boost open rates and conversions.</p>
                <Link href="/resources/weekly-drop-archive/week-4-july-2025" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-3 py-1 rounded-lg border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Download AI Email Marketing Suite">Download Suite →</Link>
              </div>
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="text-[#00FFC2] text-sm font-bold mb-2">Week 5 • July 2025</div>
                <h3 className="text-white text-lg font-bold mb-2">Freelancer Proposal Generator</h3>
                <p className="text-blue-100 text-base mb-4">AI-powered proposal templates that win clients. Pricing strategies and negotiation tactics included.</p>
                <Link href="/resources/weekly-drop-archive/week-5-july-2025" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-3 py-1 rounded-lg border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="View Freelancer Proposal Generator Drop">View Drop →</Link>
              </div>
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="text-[#00FFC2] text-sm font-bold mb-2">Week 6 • July 2025</div>
                <h3 className="text-white text-lg font-bold mb-2">Social Media Automation</h3>
                <p className="text-blue-100 text-base mb-4">Set up automated posting, engagement, and growth systems. Complete setup guide and tool recommendations.</p>
                <Link href="/resources/weekly-drop-archive/week-6-july-2025" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-3 py-1 rounded-lg border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Automate Social Media with AI">Automate Now →</Link>
              </div>
            </div>
        </section>

        {/* AI Tools Stack Section */}
        <section className="mt-20 mb-12" role="region" aria-label="AI Tools Stack">
          <div className="mb-10 text-center">
            <h2 tabIndex="0" className="text-2xl sm:text-3xl font-extrabold text-white mb-2">🛠️ AI Tools Stack</h2>
            <p tabIndex="0" className="text-blue-200 text-base sm:text-lg">Curated collection of the best AI tools for productivity and creativity</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="relative bg-gradient-to-br from-[#7F5AF0]/10 to-[#00FFC2]/5 border border-[#00FFC2] rounded-2xl p-10 shadow-xl flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl" role="listitem" tabIndex="0">
                <span aria-hidden="true" className="text-3xl mb-3">🤖</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">AutoGPT</h3>
                <p className="text-blue-100 text-base mb-4 text-center">No-code AI agent that breaks down goals, executes tasks, and refines results. Build your own AutoGPT system!</p>
                <Link href="/resources/ai-tools-stack/auto-gpt" className="inline-block bg-[#7F5AF0] hover:bg-[#6D4DC6] text-white font-semibold px-6 py-2 rounded-xl shadow transition-all duration-150 w-full mt-4 text-center" aria-label="Explore AutoGPT">Explore</Link>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">🤖</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">ChatGPT</h3>
                <p className="text-blue-100 text-base mb-4 text-center">Conversational AI for writing, coding, and problem-solving</p>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">🎨</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Midjourney</h3>
                <p className="text-blue-100 text-base mb-4 text-center">AI image generation for creative projects and content</p>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">✍️</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Notion AI</h3>
                <p className="text-blue-100 text-base mb-4 text-center">AI-powered workspace for notes, docs, and project management</p>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">🎥</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Runway ML</h3>
                <p className="text-blue-100 text-base mb-4 text-center">AI video editing and generation for content creators</p>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">📊</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Beautiful.AI</h3>
                <p className="text-blue-100 text-base mb-4 text-center">AI presentation maker for stunning slides and pitches</p>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">🔍</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Perplexity AI</h3>
                <p className="text-blue-100 text-base mb-4 text-center">AI search engine for research and information gathering</p>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">🎵</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Mubert</h3>
                <p className="text-blue-100 text-base mb-4 text-center">AI music generation for videos and content</p>
              </div>
              
              <div className="relative bg-[#181f36]/60 border border-[#232946] rounded-2xl p-8 shadow-xl flex flex-col items-center opacity-60 cursor-not-allowed" role="listitem" tabIndex="0">
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-3xl mb-3">💬</span>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Copy.ai</h3>
                <p className="text-blue-100 text-base mb-4 text-center">AI copywriting for marketing and sales content</p>
              </div>
            </div>
        </section>

        {/* Reels & Video Shorts Section */}
        <section className="mt-20 mb-12" role="region" aria-label="Reels and Video Shorts">
          <div className="mb-10 text-center">
            <h2 tabIndex="0" className="text-2xl sm:text-3xl font-extrabold text-white mb-2">🎥 Reels & Video Shorts</h2>
            <p tabIndex="0" className="text-blue-200 text-base sm:text-lg">Quick video tutorials and tips to master AI tools on the go</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="resource-card" role="listitem" tabIndex="0" style={{position: 'relative'}}>
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-4xl mb-4">⚡</span>
                <h3 className="text-white text-xl font-bold mb-2 text-center">60-Second AI Tips</h3>
                <p className="text-blue-100 text-base mb-6 text-center">Quick daily tips to improve your AI workflow. Bite-sized knowledge for busy hustlers.</p>
                <Link href="/resources/reels-and-video-shorts/60-second-ai-tips" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Watch 60-Second AI Tips Series">Watch Series →</Link>
              </div>
              
              <div className="resource-card" role="listitem" tabIndex="0" style={{position: 'relative'}}>
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-4xl mb-4">🎬</span>
                <h3 className="text-white text-xl font-bold mb-2 text-center">Tool Tutorials</h3>
                <p className="text-blue-100 text-base mb-6 text-center">Step-by-step video guides for popular AI tools. Learn by watching, practice by doing.</p>
                <Link href="/resources/reels-and-video-shorts/tool-tutorials" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Start Watching Tool Tutorials">Start Watching →</Link>
              </div>
              
              <div className="resource-card" role="listitem" tabIndex="0" style={{position: 'relative'}}>
                <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-yellow-200/60 uppercase z-10">Coming Soon</span>
                <span aria-hidden="true" className="text-4xl mb-4">🔥</span>
                <h3 className="text-white text-xl font-bold mb-2 text-center">Success Stories</h3>
                <p className="text-blue-100 text-base mb-6 text-center">Real stories from our community. See how others are using AI to transform their work and life.</p>
                <Link href="/resources/reels-and-video-shorts/success-stories" className="inline-block text-[#7F5AF0] hover:text-[#00FFC2] font-semibold px-4 py-2 rounded-xl border border-[#7F5AF0] hover:border-[#00FFC2] transition-all duration-150" aria-label="Get Inspired by Success Stories">Get Inspired →</Link>
              </div>
            </div>
        </section>

        {/* CTA Section */}
        <div
          className="mt-20 mb-16 bg-gradient-to-br from-[#7F5AF0]/10 to-[#232946]/60 border border-[#7F5AF0]/30 rounded-3xl py-16 px-4 sm:px-8 text-center shadow-xl max-w-3xl mx-auto"
          role="region"
          aria-label="Call to action"
        >
          <h2 tabIndex="0" className="text-3xl sm:text-4xl font-extrabold text-[#00FFC2] mb-4">🚀 Ready to Level Up?</h2>
          <p tabIndex="0" className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-8">Join thousands of students, creators, and entrepreneurs who are already using AI to accelerate their success. Get access to all premium resources.</p>
          <Link
            href="/#pricing"
            className="inline-block bg-[#7F5AF0] hover:bg-[#6D4DC6] text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-150"
            aria-label="Get Full Access to Premium Resources"
          >
            Get Full Access
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
