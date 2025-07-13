import Link from 'next/link'
import PageLayout from '../../../components/PageLayout'

export const metadata = {
  title: 'Social Media Prompt Pack - HustleHack AI',
  description: 'Master Instagram, LinkedIn, Twitter with AI-generated content that works. 20+ plug-and-play prompts for students, creators, and solopreneurs.',
}

export default function Page() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-dark">
      {/* Breadcrumb */}
      <div className="bg-surface border-b" style={{borderColor: 'var(--border-color)'}}>
        <div className="container">
          <nav className="flex py-4 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-primary hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray mx-2">/</span>
              </li>
              <li>
                <Link href="/resources" className="text-primary hover:text-accent transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <span className="text-gray mx-2">/</span>
              </li>
              <li>
                <span className="text-gray">Toolkits</span>
              </li>
              <li>
                <span className="text-gray mx-2">/</span>
              </li>
              <li>
                <span className="text-white font-medium">Social Media Prompt Pack</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero bg-gradient" style={{padding: '5rem 0', background: 'linear-gradient(135deg, #7F5AF0, #00FFC2)', position: 'relative', overflow: 'hidden'}}>
        <div className="container text-center" style={{position: 'relative', zIndex: 1}}>
          <div className="inline-block bg-accent text-dark-bg px-6 py-3 rounded-full text-sm font-semibold mb-8" style={{boxShadow: 'var(--shadow-glow)'}}>
            🔥 MOST POPULAR
          </div>
          <h1 className="text-white mb-4" style={{fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem'}}>
            📱 Social Media Prompt Pack
          </h1>
          <p className="text-white mb-4" style={{fontSize: '1.5rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 2rem', opacity: '0.9'}}>
            Master Instagram, LinkedIn, Twitter with AI-generated content that works.
          </p>
          <p className="text-accent mb-4" style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '2rem'}}>
            Turn ChatGPT into your full-time content assistant
          </p>
          <button className="btn btn-primary btn-lg" style={{background: 'var(--accent)', color: 'var(--dark-bg)', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: '700', borderRadius: 'var(--radius-lg)', border: 'none', cursor: 'pointer', transition: 'var(--transition-normal)', boxShadow: 'var(--shadow-lg)'}}>
            🚀 Start Using This Pack
          </button>
        </div>
        <div style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'radial-gradient(circle at 30% 20%, rgba(127, 90, 240, 0.1) 0%, transparent 50%)', pointerEvents: 'none'}}></div>
      </section>

      {/* What's Inside Section */}
      <section className="section" style={{padding: '5rem 0', background: 'var(--bg-surface)'}}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="text-primary" style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>
              ✅ What's Inside the Pack
            </h2>
            <p className="text-gray" style={{fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
              A complete collection of AI prompts designed to transform your content creation process
            </p>
          </div>
          
          <div className="grid grid-4" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem'}}>
            <div className="feature-card" style={{background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-2xl)', padding: '2rem', transition: 'var(--transition-normal)', position: 'relative', overflow: 'hidden', cursor: 'pointer'}}>
              <div className="card-icon" style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>📝</div>
              <h3 className="card-title text-white" style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>50+ Viral Hooks</h3>
              <p className="card-description text-gray" style={{fontSize: '1rem', lineHeight: '1.6'}}>Never run out of ideas with our curated prompt collection for every platform</p>
            </div>
            
            <div className="feature-card" style={{background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-2xl)', padding: '2rem', transition: 'var(--transition-normal)', position: 'relative', overflow: 'hidden', cursor: 'pointer'}}>
              <div className="card-icon" style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>🎯</div>
              <h3 className="card-title text-white" style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Ready-to-Post Formats</h3>
              <p className="card-description text-gray" style={{fontSize: '1rem', lineHeight: '1.6'}}>Attention-grabbing opening lines that stop the scroll and drive engagement</p>
            </div>
            
            <div className="feature-card" style={{background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-2xl)', padding: '2rem', transition: 'var(--transition-normal)', position: 'relative', overflow: 'hidden', cursor: 'pointer'}}>
              <div className="card-icon" style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>🧠</div>
              <h3 className="card-title text-white" style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Built for Reels, Shorts & Threads</h3>
              <p className="card-description text-gray" style={{fontSize: '1rem', lineHeight: '1.6'}}>Tailored prompts for students, creators, entrepreneurs, and professionals</p>
            </div>
            
            <div className="feature-card" style={{background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-2xl)', padding: '2rem', transition: 'var(--transition-normal)', position: 'relative', overflow: 'hidden', cursor: 'pointer'}}>
              <div className="card-icon" style={{fontSize: '3rem', marginBottom: '1rem', display: 'block'}}>📅</div>
              <h3 className="card-title text-white" style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Weekly Posting Planner</h3>
              <p className="card-description text-gray" style={{fontSize: '1rem', lineHeight: '1.6'}}>Strategic content calendar prompts to maintain consistent posting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section" style={{padding: '5rem 0', background: 'var(--dark-bg)'}}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="text-accent" style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>💡 Perfect For</h2>
            <p className="text-gray" style={{fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>Whether you're just starting or scaling up, these prompts work for everyone</p>
          </div>
          
          <div className="grid grid-3" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem'}}>
            <div className="use-case-card" style={{background: 'rgba(127, 90, 240, 0.1)', border: '1px solid rgba(127, 90, 240, 0.3)', borderRadius: 'var(--radius-2xl)', padding: '2rem', textAlign: 'center', transition: 'var(--transition-normal)', position: 'relative', cursor: 'pointer'}}>
              <div className="card-icon" style={{fontSize: '4rem', marginBottom: '1.5rem', display: 'block'}}>🎓</div>
              <h3 className="card-title text-white" style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Instagram Reels</h3>
              <p className="card-description text-gray" style={{fontSize: '1rem', lineHeight: '1.6'}}>Build your personal brand and showcase your academic journey</p>
              <div className="badge" style={{position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: 'var(--dark-bg)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600'}}>Student Favorite</div>
            </div>
            
            <div className="use-case-card" style={{background: 'rgba(127, 90, 240, 0.1)', border: '1px solid rgba(127, 90, 240, 0.3)', borderRadius: 'var(--radius-2xl)', padding: '2rem', textAlign: 'center', transition: 'var(--transition-normal)', position: 'relative', cursor: 'pointer'}}>
              <div className="card-icon" style={{fontSize: '4rem', marginBottom: '1.5rem', display: 'block'}}>🎨</div>
              <h3 className="card-title text-white" style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>LinkedIn Carousels</h3>
              <p className="card-description text-gray" style={{fontSize: '1rem', lineHeight: '1.6'}}>Grow your audience and monetize your content effectively</p>
            </div>
            
            <div className="use-case-card" style={{background: 'rgba(127, 90, 240, 0.1)', border: '1px solid rgba(127, 90, 240, 0.3)', borderRadius: 'var(--radius-2xl)', padding: '2rem', textAlign: 'center', transition: 'var(--transition-normal)', position: 'relative', cursor: 'pointer'}}>
              <div className="card-icon" style={{fontSize: '4rem', marginBottom: '1.5rem', display: 'block'}}>💼</div>
              <h3 className="card-title text-white" style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem'}}>Twitter Threads</h3>
              <p className="card-description text-gray" style={{fontSize: '1rem', lineHeight: '1.6'}}>Establish thought leadership and attract your ideal clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Prompt Showcase */}
      <section className="py-20" style={{background: 'var(--bg-surface)', marginTop: '2rem', marginBottom: '2rem'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">🧪 Sample Prompt Showcase</h2>
            <p className="text-xl text-gray-400">See how our prompts work in real-time</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8" style={{background: 'rgba(255, 255, 255, 0.98)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '3rem'}}>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4" style={{color: 'var(--dark-bg)', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem'}}>LinkedIn Post Prompt</h3>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4" style={{background: 'rgba(127, 90, 240, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--accent)', marginBottom: '2rem'}}>
                  <p className="font-mono text-sm leading-relaxed" style={{color: 'var(--dark-bg)', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6'}}>
                    "I want to write a relatable LinkedIn post about burnout and productivity. Make it personal, with a strong hook and a subtle CTA at the end. Target audience: Young professionals in India."
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-8" style={{borderTop: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: '2rem'}}>
                <h4 className="text-lg font-semibold mb-4" style={{color: 'var(--dark-bg)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem'}}>🤖 AI Generated Output:</h4>
                <div className="p-6 rounded-lg" style={{background: 'rgba(127, 90, 240, 0.1)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(127, 90, 240, 0.2)'}}>
                  <p className="leading-relaxed" style={{color: 'var(--dark-bg)', fontSize: '1rem', lineHeight: '1.7'}}>
                    "I used to think working 12-hour days made me productive. 😴<br/><br/>
                    Last month, I burned out completely. Couldn't focus, felt overwhelmed, and my work quality suffered.<br/><br/>
                    Here's what I learned: Productivity isn't about working longer. It's about working smarter.<br/><br/>
                    Now I:<br/>
                    ✅ Take breaks every 90 minutes<br/>
                    ✅ Set 3 priorities per day (not 10)<br/>
                    ✅ Say no to non-essential meetings<br/><br/>
                    Result? I'm getting more done in 6 hours than I used to in 12.<br/><br/>
                    What's your best productivity tip? Share below! 👇"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Rules Section */}
      <section className="py-20" style={{background: 'var(--bg-surface)', marginTop: '5rem', marginBottom: '2rem'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-primary" style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem'}}>🔓 Plan Access</h2>
            <p className="text-gray" style={{fontSize: '1.2rem', lineHeight: '1.6'}}>Choose the right plan to unlock this resource</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{background: 'rgba(255, 255, 255, 0.98)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden'}}>
              <table className="w-full" style={{width: '100%'}}>
                <thead style={{background: 'rgba(127, 90, 240, 0.05)'}}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{padding: '1.5rem', textAlign: 'left', fontSize: '1rem', fontWeight: '600', color: 'var(--dark-bg)'}}>Plan</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold" style={{padding: '1.5rem', textAlign: 'center', fontSize: '1rem', fontWeight: '600', color: 'var(--dark-bg)'}}>Access</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold" style={{padding: '1.5rem', textAlign: 'center', fontSize: '1rem', fontWeight: '600', color: 'var(--dark-bg)'}}>Features</th>
                  </tr>
                </thead>
                <tbody style={{background: 'rgba(255, 255, 255, 0.95)'}}>
                  <tr style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
                    <td className="px-6 py-4 text-sm font-medium" style={{padding: '1.5rem', fontSize: '0.95rem', fontWeight: '500', color: 'var(--dark-bg)'}}>Starter Hustle</td>
                    <td className="px-6 py-4 text-center" style={{padding: '1.5rem', textAlign: 'center'}}>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600', background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626'}}>
                        ❌ Locked
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center" style={{padding: '1.5rem', fontSize: '0.95rem', color: 'var(--text-gray)', textAlign: 'center'}}>Basic tools only</td>
                  </tr>
                  <tr style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
                    <td className="px-6 py-4 text-sm font-medium" style={{padding: '1.5rem', fontSize: '0.95rem', fontWeight: '500', color: 'var(--dark-bg)'}}>Creator Mode</td>
                    <td className="px-6 py-4 text-center" style={{padding: '1.5rem', textAlign: 'center'}}>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a'}}>
                        ✅ Unlocked
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center" style={{padding: '1.5rem', fontSize: '0.95rem', color: 'var(--text-gray)', textAlign: 'center'}}>Full access + Premium templates</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium" style={{padding: '1.5rem', fontSize: '0.95rem', fontWeight: '500', color: 'var(--dark-bg)'}}>Pro Hacker</td>
                    <td className="px-6 py-4 text-center" style={{padding: '1.5rem', textAlign: 'center'}}>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a'}}>
                        ✅ Unlocked
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center" style={{padding: '1.5rem', fontSize: '0.95rem', color: 'var(--text-gray)', textAlign: 'center'}}>Everything + Custom prompts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #7F5AF0, #00FFC2)', padding: '5rem 0'}}>
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4" style={{color: 'white', fontSize: '3rem', fontWeight: '800', marginBottom: '1rem'}}>🚀 Ready to Transform Your Content?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{color: 'white', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2rem', opacity: '0.9'}}>
            Join thousands of students and creators who are already using AI to accelerate their social media growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center'}}>
            <Link href="/#pricing" className="btn btn-primary" style={{background: '#00FFC2', color: '#0F0F1B', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: '700', borderRadius: 'var(--radius-lg)', textDecoration: 'none', transition: 'var(--transition-normal)', boxShadow: 'var(--shadow-lg)', marginRight: '1rem'}}>
              Upgrade to Creator Mode
            </Link>
            <Link href="/dashboard" className="btn btn-secondary" style={{background: 'rgba(255, 255, 255, 0.2)', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: '700', borderRadius: 'var(--radius-lg)', textDecoration: 'none', transition: 'var(--transition-normal)', border: '1px solid rgba(255, 255, 255, 0.3)'}}>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
    </PageLayout>
  )
}
