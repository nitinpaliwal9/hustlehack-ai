import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import './resources.css'

export const metadata = {
  title: 'Resources - HustleHack AI',
  description: 'Premium AI resources, toolkits, templates, and guides for students, creators, and entrepreneurs.'
}

export default function ResourcesPage() {
  return (
    <div>
      <Navigation />

      {/* Resources Content */}
      <main className="section" style={{paddingTop: '120px'}}>
        <div className="resources-content">
          {/* Hero Section */}
          <div className="resources-hero">
            <h1><span className="rocket-icon">🚀</span> Premium Resources</h1>
            <p>Everything you need to accelerate your AI journey — handpicked tools, templates, guides, and exclusive content for the next-gen hustlers.</p>
          </div>

          {/* Toolkits & Templates Section */}
          <section className="resources-section">
            <div className="section-header">
              <h2>🧰 Toolkits & Templates</h2>
              <p>Handpicked AI-ready templates for creators, students, and solopreneurs</p>
            </div>
            <div className="resource-cards">
              <div className="resource-card featured-card">
                <div className="card-badge">Popular</div>
                <span className="card-icon">📱</span>
                <h3 className="card-title">Social Media Prompt Pack</h3>
                <p className="card-description">50+ AI-ready prompts to automate your content calendar. Generate viral posts, engaging captions, trending hashtags, and strategic content plans across all platforms effortlessly.</p>
                <Link href="/resources/toolkits-and-templates/social-media-prompt-pack" className="btn btn-primary">Explore Pack →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">💼</span>
                <h3 className="card-title">Student Productivity Suite</h3>
                <p className="card-description">Complete toolkit for academic success. Note-taking templates, study planners, and AI study assistants.</p>
                <Link href="/resources/toolkits-and-templates/student-productivity-suite" className="card-link">Explore Suite →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">🎨</span>
                <h3 className="card-title">Creator's AI Toolkit</h3>
                <p className="card-description">Everything creators need: video scripts, thumbnail ideas, content calendars, and engagement strategies.</p>
                <Link href="/resources/toolkits-and-templates/creators-ai-toolkit" className="card-link">Explore Toolkit →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">🚀</span>
                <h3 className="card-title">Startup Launch Kit</h3>
                <p className="card-description">From idea to launch: business plan templates, pitch decks, marketing strategies, and growth hacks.</p>
                <Link href="#" className="card-link">Launch Now →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">💰</span>
                <h3 className="card-title">Freelancer's Arsenal</h3>
                <p className="card-description">Client proposals, project templates, pricing calculators, and automated workflow setups.</p>
                <Link href="#" className="card-link">Boost Income →</Link>
              </div>
              
              <div className="resource-card coming-soon-card">
                <div className="card-badge">Coming Soon</div>
                <span className="card-icon">🤖</span>
                <h3 className="card-title">AI Automation Scripts</h3>
                <p className="card-description">Ready-to-use automation scripts for common tasks. No coding required, just copy and customize.</p>
                <Link href="#" className="card-link" style={{color: 'var(--gray-500)'}}>Notify Me →</Link>
              </div>
            </div>
          </section>

          {/* Free Guides & Blueprints Section */}
          <section className="resources-section">
            <div className="section-header">
              <h2>📘 Free Guides & Blueprints</h2>
              <p>Step-by-step guides to master AI tools and grow your skills</p>
            </div>
            <div className="resource-cards">
              <div className="resource-card">
                <span className="card-icon">🎯</span>
                <h3 className="card-title">AI for Beginners</h3>
                <p className="card-description">Complete beginner's guide to AI. From ChatGPT basics to advanced prompting techniques in 30 days.</p>
                <Link href="#" className="card-link">Start Learning →</Link>
              </div>
              
              <div className="resource-card featured-card">
                <div className="card-badge">Most Downloaded</div>
                <span className="card-icon">📈</span>
                <h3 className="card-title">Growth Hacking with AI</h3>
                <p className="card-description">10 proven strategies to grow your audience using AI tools. Real case studies and actionable tactics.</p>
                <Link href="#" className="card-link">Download Guide →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">🎓</span>
                <h3 className="card-title">Student Success Blueprint</h3>
                <p className="card-description">How to use AI for studying, research, assignments, and career preparation. Academic edge unlocked.</p>
                <Link href="#" className="card-link">Get Blueprint →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">💡</span>
                <h3 className="card-title">AI Side Hustle Ideas</h3>
                <p className="card-description">50+ profitable side hustle ideas using AI. Start earning while learning, step-by-step execution guide.</p>
                <Link href="#" className="card-link">Explore Ideas →</Link>
              </div>
            </div>
          </section>

          {/* Weekly Drop Archive Section */}
          <section className="resources-section">
            <div className="section-header">
              <h2>📅 Weekly Drop Archive</h2>
              <p>Access our previous weekly drops - fresh AI resources delivered every week</p>
            </div>
            <div className="weekly-drops">
              <div className="drop-card">
                <div className="drop-week">Week 15 • Jan 2025</div>
                <h3 className="drop-title">AI Content Calendar Mastery</h3>
                <p className="drop-description">Complete system to plan, create, and schedule content using AI. Includes 30-day content ideas and automation workflows.</p>
                <Link href="#" className="drop-link">View Drop →</Link>
              </div>
              
              <div className="drop-card">
                <div className="drop-week">Week 14 • Jan 2025</div>
                <h3 className="drop-title">Student Research Assistant</h3>
                <p className="drop-description">AI prompts and tools for academic research. Find sources, summarize papers, and generate citations automatically.</p>
                <Link href="#" className="drop-link">Access Drop →</Link>
              </div>
              
              <div className="drop-card">
                <div className="drop-week">Week 13 • Jan 2025</div>
                <h3 className="drop-title">Viral Video Scripts Pack</h3>
                <p className="drop-description">25 proven video script templates for social media. Hooks, storytelling frameworks, and CTAs that convert.</p>
                <Link href="#" className="drop-link">Get Scripts →</Link>
              </div>
              
              <div className="drop-card">
                <div className="drop-week">Week 12 • Dec 2024</div>
                <h3 className="drop-title">AI Email Marketing Suite</h3>
                <p className="drop-description">Subject lines, email sequences, and newsletter templates powered by AI. Boost open rates and conversions.</p>
                <Link href="#" className="drop-link">Download Suite →</Link>
              </div>
              
              <div className="drop-card">
                <div className="drop-week">Week 11 • Dec 2024</div>
                <h3 className="drop-title">Freelancer Proposal Generator</h3>
                <p className="drop-description">AI-powered proposal templates that win clients. Pricing strategies and negotiation tactics included.</p>
                <Link href="#" className="drop-link">View Drop →</Link>
              </div>
              
              <div className="drop-card">
                <div className="drop-week">Week 10 • Dec 2024</div>
                <h3 className="drop-title">Social Media Automation</h3>
                <p className="drop-description">Set up automated posting, engagement, and growth systems. Complete setup guide and tool recommendations.</p>
                <Link href="#" className="drop-link">Automate Now →</Link>
              </div>
            </div>
          </section>

          {/* AI Tools Stack Section */}
          <section className="resources-section">
            <div className="section-header">
              <h2>🛠️ AI Tools Stack</h2>
              <p>Curated collection of the best AI tools for productivity and creativity</p>
            </div>
            <div className="tools-grid">
              <div className="tool-card">
                <span className="tool-icon">🤖</span>
                <h3 className="tool-name">ChatGPT</h3>
                <p className="tool-description">Conversational AI for writing, coding, and problem-solving</p>
              </div>
              
              <div className="tool-card">
                <span className="tool-icon">🎨</span>
                <h3 className="tool-name">Midjourney</h3>
                <p className="tool-description">AI image generation for creative projects and content</p>
              </div>
              
              <div className="tool-card">
                <span className="tool-icon">✍️</span>
                <h3 className="tool-name">Notion AI</h3>
                <p className="tool-description">AI-powered workspace for notes, docs, and project management</p>
              </div>
              
              <div className="tool-card">
                <span className="tool-icon">🎥</span>
                <h3 className="tool-name">Runway ML</h3>
                <p className="tool-description">AI video editing and generation for content creators</p>
              </div>
              
              <div className="tool-card">
                <span className="tool-icon">📊</span>
                <h3 className="tool-name">Beautiful.AI</h3>
                <p className="tool-description">AI presentation maker for stunning slides and pitches</p>
              </div>
              
              <div className="tool-card">
                <span className="tool-icon">🔍</span>
                <h3 className="tool-name">Perplexity AI</h3>
                <p className="tool-description">AI search engine for research and information gathering</p>
              </div>
              
              <div className="tool-card">
                <span className="tool-icon">🎵</span>
                <h3 className="tool-name">Mubert</h3>
                <p className="tool-description">AI music generation for videos and content</p>
              </div>
              
              <div className="tool-card">
                <span className="tool-icon">💬</span>
                <h3 className="tool-name">Copy.ai</h3>
                <p className="tool-description">AI copywriting for marketing and sales content</p>
              </div>
            </div>
          </section>

          {/* Reels & Video Shorts Section */}
          <section className="resources-section">
            <div className="section-header">
              <h2>🎥 Reels & Video Shorts</h2>
              <p>Quick video tutorials and tips to master AI tools on the go</p>
            </div>
            <div className="resource-cards">
              <div className="resource-card">
                <span className="card-icon">⚡</span>
                <h3 className="card-title">60-Second AI Tips</h3>
                <p className="card-description">Quick daily tips to improve your AI workflow. Bite-sized knowledge for busy hustlers.</p>
                <Link href="#" className="card-link">Watch Series →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">🎬</span>
                <h3 className="card-title">Tool Tutorials</h3>
                <p className="card-description">Step-by-step video guides for popular AI tools. Learn by watching, practice by doing.</p>
                <Link href="#" className="card-link">Start Watching →</Link>
              </div>
              
              <div className="resource-card">
                <span className="card-icon">🔥</span>
                <h3 className="card-title">Success Stories</h3>
                <p className="card-description">Real stories from our community. See how others are using AI to transform their work and life.</p>
                <Link href="#" className="card-link">Get Inspired →</Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="cta-section">
            <h2>🚀 Ready to Level Up?</h2>
            <p>Join thousands of students, creators, and entrepreneurs who are already using AI to accelerate their success. Get access to all premium resources.</p>
            <Link href="/#pricing" className="btn btn-primary btn-lg">Get Full Access</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="section" style={{background: '#0F0F1B', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="container">
          <div className="grid grid-4">
            <div>
              <h3 style={{color: 'white', marginBottom: '1rem'}}>HustleHack AI</h3>
              <p style={{color: 'var(--gray-400)', marginBottom: '1rem'}}>Empowering the next generation of Indian creators and entrepreneurs with AI.</p>
              <div style={{display: 'flex', gap: '1rem'}}>
                <Link href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Instagram</Link>
                <Link href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Telegram</Link>
                <Link href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Twitter</Link>
              </div>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Product</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><Link href="/#features" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Features</Link></li>
                <li><Link href="/#pricing" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Pricing</Link></li>
                <li><Link href="/resources" style={{color: 'var(--accent)', textDecoration: 'none', fontWeight: '600'}}>Resources</Link></li>
                <li><Link href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Company</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><Link href="/about" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>About</Link></li>
                <li><Link href="#" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Careers</Link></li>
                <li><Link href="/press" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Press</Link></li>
                <li><Link href="/contact" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{color: 'white', marginBottom: '1rem'}}>Legal</h4>
              <ul style={{listStyle: 'none', color: 'var(--gray-400)'}}>
                <li><Link href="/policies/privacy-policy" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Privacy Policy</Link></li>
                <li><Link href="/policies/terms-and-conditions" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Terms of Service</Link></li>
                <li><Link href="/policies/cookie-policy" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>Cookie Policy</Link></li>
                <li><Link href="/policies/gdpr" style={{color: 'var(--gray-400)', textDecoration: 'none'}}>GDPR</Link></li>
              </ul>
            </div>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
            <p style={{color: 'var(--gray-400)'}}>© 2024 HustleHack AI. All rights reserved. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
