import '../components/PageLayout';
import './about.css';
import Image from 'next/image';
import { Zap, User, Rocket, Users, Briefcase, BookOpen, Star, MessageCircle, CheckCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';

// SVG Wave Divider
const WaveDivider = ({ flip = false }) => (
  <div className="w-full overflow-hidden leading-none" style={{ lineHeight: 0 }}>
    <svg
      viewBox="0 0 1440 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-12 ${flip ? 'rotate-180' : ''}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 0C360 80 1080 0 1440 80V80H0V0Z"
        fill="url(#wave-gradient)"
        fillOpacity="0.12"
      />
      <defs>
        <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7F5AF0" />
          <stop offset="1" stopColor="#00FFC2" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Icon Badge
const IconBadge = ({ children, color }) => (
  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg mb-4`} style={{ background: color, boxShadow: `0 4px 24px 0 ${color}44` }}>
    {children}
  </span>
);

// Inline abstract illustration for hero/CTA
const AbstractAI = ({ className = "" }) => (
  <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute right-0 top-0 w-40 md:w-60 opacity-60 z-0 ${className}`} style={{ pointerEvents: 'none' }}>
    <ellipse cx="60" cy="60" rx="60" ry="60" fill="#7F5AF0" fillOpacity="0.18" />
    <ellipse cx="160" cy="80" rx="40" ry="40" fill="#00FFC2" fillOpacity="0.13" />
    <rect x="100" y="20" width="40" height="40" rx="20" fill="#fff" fillOpacity="0.08" />
    <circle cx="180" cy="30" r="12" fill="#7F5AF0" fillOpacity="0.22" />
    <circle cx="30" cy="100" r="10" fill="#00FFC2" fillOpacity="0.18" />
  </svg>
);

export default function AboutPage() {
  return (
    <PageLayout>
      <main className="about-main bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen pb-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 flex justify-center">
          {/* Animated Gradient Blob */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[320px] bg-gradient-to-br from-[#7F5AF0]/40 via-[#00FFC2]/30 to-[#232946]/0 rounded-full blur-3xl opacity-70 animate-pulse z-0" />
          <AbstractAI className="hidden md:block" />
          <div className="hero-content w-full max-w-3xl mx-auto rounded-3xl shadow-[0_8px_40px_0_rgba(127,90,240,0.25)] bg-[rgba(30,32,44,0.75)] backdrop-blur-xl border-4 border-[#7F5AF0] relative overflow-hidden p-10 md:p-16">
            <div className="flex flex-col items-center relative z-10">
              <IconBadge color="#7F5AF0">
                <Image src="/assets/images/logo (2).png" alt="HustleHack AI Logo" width={40} height={40} className="rounded-xl" />
              </IconBadge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight text-center">🔷 HustleHack AI — About Us</h1>
              <p className="text-xl text-gray-200 mb-6 font-medium text-center">Make AI practical, accessible, and empowering — for every young Indian who’s ready to hustle smarter.</p>
              <div className="hero-stats flex justify-center gap-8 mt-4">
                <div className="stat bg-gradient-to-br from-[#7F5AF0]/20 to-[#00FFC2]/10 rounded-xl px-6 py-4 shadow-md">
                  <span className="stat-number text-3xl font-bold text-[#7F5AF0]">1000+</span>
                  <span className="stat-label block text-xs text-gray-300 mt-1 uppercase tracking-wider">Early Users</span>
                </div>
                <div className="stat bg-gradient-to-br from-[#00FFC2]/20 to-[#7F5AF0]/10 rounded-xl px-6 py-4 shadow-md">
                  <span className="stat-number text-3xl font-bold text-[#00FFC2]">20+</span>
                  <span className="stat-label block text-xs text-gray-300 mt-1 uppercase tracking-wider">AI Toolkits</span>
                </div>
                <div className="stat bg-gradient-to-br from-[#7F5AF0]/20 to-[#00FFC2]/10 rounded-xl px-6 py-4 shadow-md">
                  <span className="stat-number text-3xl font-bold text-[#7F5AF0]">Weekly</span>
                  <span className="stat-label block text-xs text-gray-300 mt-1 uppercase tracking-wider">AI Drops</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <WaveDivider />

        {/* Mission Section */}
        <section className="flex justify-center mt-16">
          <div className="w-full max-w-4xl bg-[rgba(36,37,50,0.7)] backdrop-blur-xl rounded-3xl shadow-2xl border-l-4 border-[#00FFC2] p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(0,255,194,0.18)] relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#00FFC2]/30 to-[#7F5AF0]/10 rounded-full blur-2xl opacity-40 z-0" />
            <div className="flex-1 relative z-10">
              <IconBadge color="#00FFC2">
                <Rocket className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">Our Mission</h2>
              <p className="text-lg text-gray-200 mb-4">At HustleHack AI, we believe that the next generation of entrepreneurs and creators shouldn’t be limited by access, tools, or time.</p>
              <p className="text-lg text-gray-200 mb-4">Our mission is simple:<br /><span className="font-semibold text-[#00FFC2]">Make AI practical, accessible, and empowering</span> — for every young Indian who’s ready to hustle smarter.</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              <Image src="/globe.svg" alt="Global Impact" width={100} height={100} className="mb-4" />
              <Image src="/assets/images/logo (2).png" alt="HustleHack AI Logo" width={120} height={120} className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </section>
        <WaveDivider flip />

        {/* Who We Are Section */}
        <section className="flex justify-center mt-16">
          <div className="w-full max-w-4xl bg-[rgba(24,24,35,0.7)] backdrop-blur-xl rounded-3xl shadow-xl border-t-4 border-[#7F5AF0] p-8 md:p-14 transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(127,90,240,0.18)] relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#7F5AF0]/30 to-[#00FFC2]/10 rounded-full blur-2xl opacity-40 z-0" />
            <div className="relative z-10">
              <IconBadge color="#7F5AF0">
                <User className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">Who We Are</h2>
              <p className="text-lg text-gray-200 mb-4">We’re not a big team. We’re not a VC-backed startup. We’re a passionate, independent initiative started by someone just like you —<br />A solo builder obsessed with productivity, creativity, and the power of AI.</p>
              <p className="text-lg text-gray-200 mb-4">HustleHack AI was born out of frustration with generic tools and slow systems. So we built something different: <span className="font-semibold text-[#00FFC2]">A sharp, fast-moving platform filled with plug-and-play AI toolkits, blueprints, and real resources you can actually use.</span></p>
            </div>
          </div>
        </section>
        <WaveDivider />

        {/* What We Offer Section */}
        <section className="flex justify-center mt-16">
          <div className="w-full max-w-4xl bg-[rgba(36,37,50,0.7)] backdrop-blur-xl rounded-3xl shadow-2xl border-r-4 border-[#7F5AF0] p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(127,90,240,0.18)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#7F5AF0]/30 to-[#00FFC2]/10 rounded-full blur-2xl opacity-40 z-0" />
            <div className="flex-1 relative z-10">
              <IconBadge color="#7F5AF0">
                <Zap className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">What We Offer</h2>
              <ul className="list-disc ml-6 text-lg text-gray-200 space-y-2">
                <li>Toolkits & Templates for content creators, students, and solopreneurs</li>
                <li>Prompt Packs to supercharge your ChatGPT workflows</li>
                <li>AI-Powered Learning Systems built to help you launch faster, learn smarter, and grow daily</li>
                <li>Weekly AI drops, cheat sheets, and more — curated, not cluttered</li>
                <li>Everything is designed to give you an unfair advantage — without wasting time or burning out.</li>
              </ul>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              <Image src="/file.svg" alt="AI Resources" width={80} height={80} className="mb-4" />
              <div className="image-placeholder">
                <Star className="placeholder-icon text-[#00FFC2]" />
                <p>Plug-and-play AI resources<br />for real results</p>
              </div>
            </div>
          </div>
        </section>
        <WaveDivider flip />

        {/* Who We Built This For Section */}
        <section className="flex justify-center mt-16">
          <div className="w-full max-w-4xl bg-[rgba(24,24,35,0.7)] backdrop-blur-xl rounded-3xl shadow-xl border-b-4 border-[#00FFC2] p-8 md:p-14 transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(0,255,194,0.18)] relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#00FFC2]/30 to-[#7F5AF0]/10 rounded-full blur-2xl opacity-40 z-0" />
            <div className="relative z-10">
              <IconBadge color="#00FFC2">
                <Users className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">Who We Built This For</h2>
              <ul className="list-disc ml-6 text-lg text-gray-200 space-y-2">
                <li>College students trying to build their first startup</li>
                <li>Creators scaling content with limited time</li>
                <li>Freelancers, solopreneurs, and side-hustlers juggling a million things</li>
                <li>Anyone who’s ready to learn fast, build smart, and win with AI</li>
              </ul>
              <p className="text-lg text-[#00FFC2] mt-4 font-semibold">If that’s you — welcome to the tribe.<br />This isn’t just a product. It’s a movement.</p>
            </div>
          </div>
        </section>
        <WaveDivider />

        {/* Built With Grit Section */}
        <section className="flex justify-center mt-16">
          <div className="w-full max-w-4xl bg-[rgba(36,37,50,0.7)] backdrop-blur-xl rounded-3xl shadow-2xl border-l-4 border-[#7F5AF0] p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(127,90,240,0.18)] relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#7F5AF0]/30 to-[#00FFC2]/10 rounded-full blur-2xl opacity-40 z-0" />
            <div className="flex-1 relative z-10">
              <IconBadge color="#7F5AF0">
                <Briefcase className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">Built With Grit. Backed by Systems.</h2>
              <ul className="list-disc ml-6 text-lg text-gray-200 space-y-2">
                <li>Supabase to manage user data and access</li>
                <li>Razorpay to make payments seamless</li>
                <li>Next.js to keep the site blazing fast</li>
                <li>Tons of custom-built automations to keep the experience efficient and smooth</li>
              </ul>
              <p className="text-lg text-gray-200 mt-4">Everything is handcrafted, tested, and upgraded weekly.</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              <Image src="/window.svg" alt="Tech Stack" width={80} height={80} className="mb-4" />
              <div className="image-placeholder">
                <CheckCircle className="placeholder-icon text-[#7F5AF0]" />
                <p>Handcrafted. Fast. Reliable.</p>
              </div>
            </div>
          </div>
        </section>
        <WaveDivider flip />

        {/* Still Early Section */}
        <section className="flex justify-center mt-16">
          <div className="w-full max-w-4xl bg-[rgba(24,24,35,0.7)] backdrop-blur-xl rounded-3xl shadow-xl border-t-4 border-[#00FFC2] p-8 md:p-14 transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(0,255,194,0.18)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#00FFC2]/30 to-[#7F5AF0]/10 rounded-full blur-2xl opacity-40 z-0" />
            <div className="relative z-10">
              <IconBadge color="#00FFC2">
                <BookOpen className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">Still Early. Still Growing.</h2>
              <ul className="list-disc ml-6 text-lg text-gray-200 space-y-2">
                <li>You’ll get the first look at every new feature</li>
                <li>Your feedback will actually shape what we build next</li>
                <li>You’re not just using HustleHack AI — you’re helping create it</li>
              </ul>
            </div>
          </div>
        </section>
        <WaveDivider />

        {/* Join Us Section */}
        <section className="relative flex justify-center mt-16 mb-10">
          {/* Animated Gradient Blob */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-gradient-to-br from-[#00FFC2]/30 via-[#7F5AF0]/20 to-[#232946]/0 rounded-full blur-3xl opacity-70 animate-pulse z-0" />
          <AbstractAI className="hidden md:block left-0 top-0" />
          <div className="w-full max-w-3xl bg-gradient-to-br from-[#232946]/95 to-[#181823]/90 rounded-3xl shadow-2xl border-b-4 border-[#7F5AF0] p-8 md:p-14 text-center transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(127,90,240,0.18)] relative z-10">
            <IconBadge color="#7F5AF0">
              <MessageCircle className="w-7 h-7 text-white" />
            </IconBadge>
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">Join Us Early — Let’s Build Together</h2>
            <p className="text-lg text-gray-200 mb-4">We’re offering free access to early users, beta test drops, and live access to our founder (yes, real replies).<br />This isn’t corporate. This is community.</p>
            <p className="text-2xl font-bold text-[#00FFC2] mb-8">✨ Welcome to HustleHack AI.<br />AI isn’t the future.<br />It’s your edge — right now.<br /><span className="text-white">Let’s hustle smarter.</span></p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="/resources" className="cta bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:from-[#6D4DC6] hover:to-[#00E6B3] transition-all">Explore Free AI Tools</a>
              <a href="/contact" className="cta bg-gray-800 border border-[#7F5AF0] text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:bg-[#232946] transition-all">Contact Us</a>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
