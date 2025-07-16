'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import './resources.css'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../components/LoadingSpinner'

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
      <a href="#main-content" className="skip-link" tabIndex="0">Skip to main content</a>
      <Navigation />

      {/* Resources Content */}
      <main id="main-content" className="section" style={{paddingTop: '140px'}} role="main" aria-label="Resources main content">
        <div className="resources-content">
          {/* Hero Section */}
          <div className="resources-hero" role="region" aria-label="Premium Resources">
            <h1 tabIndex="0"><span className="rocket-icon" aria-hidden="true">🚀</span> Premium Resources</h1>
            <p tabIndex="0">Everything you need to accelerate your AI journey — handpicked tools, templates, guides, and exclusive content for the next-gen hustlers.</p>
          </div>

          {/* Toolkits & Templates Section */}
          <section className="resources-section" role="region" aria-label="Toolkits and Templates" style={{marginTop: '5rem'}}>
            <div className="section-header">
              <h2 tabIndex="0">🧰 Toolkits & Templates</h2>
              <p tabIndex="0">Handpicked AI-ready templates for creators, students, and solopreneurs</p>
            </div>
            <div className="resource-cards" role="list" style={{gap: '2rem'}}>
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
                  <div className="resource-card featured-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                    <div className="card-badge">Popular</div>
                    <span className="card-icon" aria-hidden="true">📱</span>
                    <h3 className="card-title">Social Media Prompt Pack</h3>
                    <p className="card-description">50+ AI-ready prompts to automate your content calendar. Generate viral posts, engaging captions, trending hashtags, and strategic content plans across all platforms effortlessly.</p>
                    <Link href="/resources/toolkits-and-templates/social-media-prompt-pack" className="btn btn-primary" aria-label="Explore Social Media Prompt Pack">Explore Pack →</Link>
                  </div>
                  
                  <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                    <span className="card-icon" aria-hidden="true">💼</span>
                    <h3 className="card-title">Student Productivity Suite</h3>
                    <p className="card-description">Complete toolkit for academic success. Note-taking templates, study planners, and AI study assistants.</p>
                    <Link href="/resources/toolkits-and-templates/student-productivity-suite" className="card-link" aria-label="Explore Student Productivity Suite">Explore Suite →</Link>
                  </div>
                  
                  <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                    <span className="card-icon" aria-hidden="true">🎨</span>
                    <h3 className="card-title">Creator's AI Toolkit</h3>
                    <p className="card-description">Everything creators need: video scripts, thumbnail ideas, content calendars, and engagement strategies.</p>
                    <Link href="/resources/toolkits-and-templates/creators-ai-toolkit" className="card-link" aria-label="Explore Creator's AI Toolkit">Explore Toolkit →</Link>
                  </div>
                  
                  <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                    <span className="card-icon" aria-hidden="true">🚀</span>
                    <h3 className="card-title">Startup Launch Kit</h3>
                    <p className="card-description">From idea to launch: business plan templates, pitch decks, marketing strategies, and growth hacks.</p>
                    <Link href="/resources/toolkits-and-templates/startup-launch-kit" className="card-link" aria-label="Launch Startup Launch Kit">Launch Now →</Link>
                  </div>
                  
                  <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                    <span className="card-icon" aria-hidden="true">💰</span>
                    <h3 className="card-title">Freelancer's Arsenal</h3>
                    <p className="card-description">Client proposals, project templates, pricing calculators, and automated workflow setups.</p>
                    <Link href="#" className="card-link" aria-label="Boost Income with Freelancer's Arsenal">Boost Income →</Link>
                  </div>
                  
                  <div className="resource-card coming-soon-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                    <div className="card-badge">Coming Soon</div>
                    <span className="card-icon" aria-hidden="true">🤖</span>
                    <h3 className="card-title">AI Automation Scripts</h3>
                    <p className="card-description">Ready-to-use automation scripts for common tasks. No coding required, just copy and customize.</p>
                    <Link href="#" className="card-link" style={{color: 'var(--gray-500)'}} aria-label="Notify me when AI Automation Scripts are available">Notify Me →</Link>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Free Guides & Blueprints Section */}
          <section className="resources-section" role="region" aria-label="Free Guides and Blueprints" style={{marginTop: '5rem'}}>
            <div className="section-header">
              <h2 tabIndex="0">📘 Free Guides & Blueprints</h2>
              <p tabIndex="0">Step-by-step guides to master AI tools and grow your skills</p>
            </div>
            <div className="resource-cards" role="list" style={{gap: '2rem'}}>
              <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                <span className="card-icon" aria-hidden="true">🎯</span>
                <h3 className="card-title">AI for Beginners</h3>
                <p className="card-description">Complete beginner's guide to AI. From ChatGPT basics to advanced prompting techniques in 30 days.</p>
                <Link href="#" className="card-link" aria-label="Start Learning AI for Beginners">Start Learning →</Link>
              </div>
              
              <div className="resource-card featured-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                <div className="card-badge">Most Downloaded</div>
                <span className="card-icon" aria-hidden="true">📈</span>
                <h3 className="card-title">Growth Hacking with AI</h3>
                <p className="card-description">10 proven strategies to grow your audience using AI tools. Real case studies and actionable tactics.</p>
                <Link href="#" className="card-link" aria-label="Download Growth Hacking with AI Guide">Download Guide →</Link>
              </div>
              
              <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                <span className="card-icon" aria-hidden="true">🎓</span>
                <h3 className="card-title">Student Success Blueprint</h3>
                <p className="card-description">How to use AI for studying, research, assignments, and career preparation. Academic edge unlocked.</p>
                <Link href="#" className="card-link" aria-label="Get Student Success Blueprint">Get Blueprint →</Link>
              </div>
              
              <div className="resource-card" role="listitem" tabIndex="0" style={{padding: '2.5rem'}}>
                <span className="card-icon" aria-hidden="true">💡</span>
                <h3 className="card-title">AI Side Hustle Ideas</h3>
                <p className="card-description">50+ profitable side hustle ideas using AI. Start earning while learning, step-by-step execution guide.</p>
                <Link href="#" className="card-link" aria-label="Explore AI Side Hustle Ideas">Explore Ideas →</Link>
              </div>
            </div>
          </section>

          {/* Weekly Drop Archive Section */}
          <section className="resources-section" role="region" aria-label="Weekly Drop Archive" style={{marginTop: '5rem'}}>
            <div className="section-header">
              <h2 tabIndex="0">📅 Weekly Drop Archive</h2>
              <p tabIndex="0">Access our previous weekly drops - fresh AI resources delivered every week</p>
            </div>
            <div className="weekly-drops" role="list" style={{gap: '2rem'}}>
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="drop-week">Week 15 • Jan 2025</div>
                <h3 className="drop-title">AI Content Calendar Mastery</h3>
                <p className="drop-description">Complete system to plan, create, and schedule content using AI. Includes 30-day content ideas and automation workflows.</p>
                <Link href="#" className="drop-link" aria-label="View AI Content Calendar Mastery Drop">View Drop →</Link>
              </div>
              
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="drop-week">Week 14 • Jan 2025</div>
                <h3 className="drop-title">Student Research Assistant</h3>
                <p className="drop-description">AI prompts and tools for academic research. Find sources, summarize papers, and generate citations automatically.</p>
                <Link href="#" className="drop-link" aria-label="Access Student Research Assistant Drop">Access Drop →</Link>
              </div>
              
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="drop-week">Week 13 • Jan 2025</div>
                <h3 className="drop-title">Viral Video Scripts Pack</h3>
                <p className="drop-description">25 proven video script templates for social media. Hooks, storytelling frameworks, and CTAs that convert.</p>
                <Link href="#" className="drop-link" aria-label="Get Viral Video Scripts Pack">Get Scripts →</Link>
              </div>
              
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="drop-week">Week 12 • Dec 2024</div>
                <h3 className="drop-title">AI Email Marketing Suite</h3>
                <p className="drop-description">Subject lines, email sequences, and newsletter templates powered by AI. Boost open rates and conversions.</p>
                <Link href="#" className="drop-link" aria-label="Download AI Email Marketing Suite">Download Suite →</Link>
              </div>
              
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="drop-week">Week 11 • Dec 2024</div>
                <h3 className="drop-title">Freelancer Proposal Generator</h3>
                <p className="drop-description">AI-powered proposal templates that win clients. Pricing strategies and negotiation tactics included.</p>
                <Link href="#" className="drop-link" aria-label="View Freelancer Proposal Generator Drop">View Drop →</Link>
              </div>
              
              <div className="drop-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <div className="drop-week">Week 10 • Dec 2024</div>
                <h3 className="drop-title">Social Media Automation</h3>
                <p className="drop-description">Set up automated posting, engagement, and growth systems. Complete setup guide and tool recommendations.</p>
                <Link href="#" className="drop-link" aria-label="Automate Social Media with AI">Automate Now →</Link>
              </div>
            </div>
          </section>

          {/* AI Tools Stack Section */}
          <section className="resources-section" role="region" aria-label="AI Tools Stack" style={{marginTop: '5rem'}}>
            <div className="section-header">
              <h2 tabIndex="0">🛠️ AI Tools Stack</h2>
              <p tabIndex="0">Curated collection of the best AI tools for productivity and creativity</p>
            </div>
            <div className="tools-grid" role="list" style={{gap: '2rem'}}>
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">🤖</span>
                <h3 className="tool-name">ChatGPT</h3>
                <p className="tool-description">Conversational AI for writing, coding, and problem-solving</p>
              </div>
              
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">🎨</span>
                <h3 className="tool-name">Midjourney</h3>
                <p className="tool-description">AI image generation for creative projects and content</p>
              </div>
              
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">✍️</span>
                <h3 className="tool-name">Notion AI</h3>
                <p className="tool-description">AI-powered workspace for notes, docs, and project management</p>
              </div>
              
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">🎥</span>
                <h3 className="tool-name">Runway ML</h3>
                <p className="tool-description">AI video editing and generation for content creators</p>
              </div>
              
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">📊</span>
                <h3 className="tool-name">Beautiful.AI</h3>
                <p className="tool-description">AI presentation maker for stunning slides and pitches</p>
              </div>
              
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">🔍</span>
                <h3 className="tool-name">Perplexity AI</h3>
                <p className="tool-description">AI search engine for research and information gathering</p>
              </div>
              
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">🎵</span>
                <h3 className="tool-name">Mubert</h3>
                <p className="tool-description">AI music generation for videos and content</p>
              </div>
              
              <div className="tool-card" role="listitem" tabIndex="0" style={{padding: '2rem'}}>
                <span className="tool-icon" aria-hidden="true">💬</span>
                <h3 className="tool-name">Copy.ai</h3>
                <p className="tool-description">AI copywriting for marketing and sales content</p>
              </div>
            </div>
          </section>

          {/* Reels & Video Shorts Section */}
          <section className="resources-section" role="region" aria-label="Reels and Video Shorts">
            <div className="section-header">
              <h2 tabIndex="0">🎥 Reels & Video Shorts</h2>
              <p tabIndex="0">Quick video tutorials and tips to master AI tools on the go</p>
            </div>
            <div className="resource-cards" role="list">
              <div className="resource-card" role="listitem" tabIndex="0">
                <span className="card-icon" aria-hidden="true">⚡</span>
                <h3 className="card-title">60-Second AI Tips</h3>
                <p className="card-description">Quick daily tips to improve your AI workflow. Bite-sized knowledge for busy hustlers.</p>
                <Link href="#" className="card-link" aria-label="Watch 60-Second AI Tips Series">Watch Series →</Link>
              </div>
              
              <div className="resource-card" role="listitem" tabIndex="0">
                <span className="card-icon" aria-hidden="true">🎬</span>
                <h3 className="card-title">Tool Tutorials</h3>
                <p className="card-description">Step-by-step video guides for popular AI tools. Learn by watching, practice by doing.</p>
                <Link href="#" className="card-link" aria-label="Start Watching Tool Tutorials">Start Watching →</Link>
              </div>
              
              <div className="resource-card" role="listitem" tabIndex="0">
                <span className="card-icon" aria-hidden="true">🔥</span>
                <h3 className="card-title">Success Stories</h3>
                <p className="card-description">Real stories from our community. See how others are using AI to transform their work and life.</p>
                <Link href="#" className="card-link" aria-label="Get Inspired by Success Stories">Get Inspired →</Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="cta-section" role="region" aria-label="Call to action">
            <h2 tabIndex="0">🚀 Ready to Level Up?</h2>
            <p tabIndex="0">Join thousands of students, creators, and entrepreneurs who are already using AI to accelerate their success. Get access to all premium resources.</p>
            <Link href="/#pricing" className="btn btn-primary btn-lg" aria-label="Get Full Access to Premium Resources">Get Full Access</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
