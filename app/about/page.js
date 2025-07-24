import '../components/PageLayout';
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
      <main className="w-full min-h-screen bg-[#0A1020] text-white">
        {/* Hero Section */}
        <section className="py-20 sm:py-28 flex flex-col items-center text-center bg-[#0A1020] gap-6 relative overflow-hidden">
          {/* Animated Gradient Blob Behind Headline */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 w-[480px] h-[320px] bg-gradient-to-br from-[#7F5AF0]/40 via-[#00FFC2]/30 to-[#232946]/0 rounded-full blur-3xl opacity-70 animate-pulse z-0" />
          {/* Optional SVG Illustration */}
          <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-0 w-40 md:w-60 opacity-60 z-0 pointer-events-none">
            <ellipse cx="60" cy="60" rx="60" ry="60" fill="#7F5AF0" fillOpacity="0.18" />
            <ellipse cx="160" cy="80" rx="40" ry="40" fill="#00FFC2" fillOpacity="0.13" />
            <rect x="100" y="20" width="40" height="40" rx="20" fill="#fff" fillOpacity="0.08" />
            <circle cx="180" cy="30" r="12" fill="#7F5AF0" fillOpacity="0.22" />
            <circle cx="30" cy="100" r="10" fill="#00FFC2" fillOpacity="0.18" />
          </svg>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8 sm:mb-12 leading-tight">From Student to Founder: Our Story</h1>
          <p className="text-base sm:text-lg md:text-2xl text-[#cbd5e1] mb-6 sm:mb-10 max-w-2xl mx-auto">HustleHack AI is on a mission to make AI practical, accessible, and empowering for every young Indian ready to hustle smarter. Learn about our journey, our vision, and the people behind the movement.</p>
        </section>
        {/* No divider here to keep hero and founder visually unified */}

        {/* Founder Section - Modern Card Style */}
        <section className="py-20 flex flex-col items-center bg-[#0A1020] mt-24 mb-16">
          <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#181f36] to-[#151a28] border border-[#7F5AF0] rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto mb-8 md:mb-0">
              <div className="bg-white rounded-full shadow-2xl p-2 mb-4" style={{boxShadow: '0 8px 32px 0 rgba(127,90,240,0.18)'}}>
                <Image
                  src="/founder_img.webp"
                  alt="Founder of HustleHack AI"
                  width={180}
                  height={180}
                  className="rounded-full object-cover border-4 border-[#7F5AF0]"
                  priority
                />
              </div>
              {/* Removed Polaroid text label */}
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">Meet the Founder</h2>
              <h3 className="font-bold text-2xl sm:text-3xl text-[#7F5AF0] mb-4">Nitin Paliwal</h3>
              <p className="text-[#cbd5e1] text-lg sm:text-xl mb-4 max-w-2xl font-handwritten" style={{fontFamily: 'var(--font-handwritten, "Caveat", cursive)', fontSize: '1.5rem', lineHeight: '2.2rem'}}>“Building HustleHack AI to empower the next generation of creators, students, and solopreneurs with the best AI tools and resources. Let’s build, learn, and grow together!”</p>
              <div className="mb-2">
                <span className="text-gray-400 text-base sm:text-lg">Founder, HustleHack AI</span>
              </div>
            </div>
          </div>
        </section>
        {/* No divider - smooth transition */}

        {/* Mission Section */}
        <section className="flex flex-col items-center justify-center mt-16 px-4 bg-[#0A1020]">
          <div className="w-full max-w-4xl bg-[rgba(36,37,50,0.7)] backdrop-blur-xl rounded-3xl shadow-2xl border-l-4 border-[#00FFC2] p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(0,255,194,0.18)] relative overflow-hidden">
            <div className="flex-1 flex items-center justify-center mb-8 md:mb-0">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 md:w-40 md:h-40">
                <circle cx="70" cy="70" r="70" fill="#00FFC2" fillOpacity="0.13" />
                <circle cx="70" cy="70" r="50" fill="#7F5AF0" fillOpacity="0.18" />
                <rect x="40" y="40" width="60" height="60" rx="30" fill="#fff" fillOpacity="0.08" />
                <path d="M70 50 L90 90 L50 90 Z" fill="#00FFC2" fillOpacity="0.22" />
              </svg>
            </div>
            <div className="flex-1 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <IconBadge color="#00FFC2">
                <Rocket className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">Our Mission</h2>
              <p className="text-lg text-gray-200 mb-4">At HustleHack AI, we believe that the next generation of entrepreneurs and creators shouldn’t be limited by access, tools, or time.</p>
              <p className="text-lg text-gray-200 mb-4">Our mission is simple:<br /><span className="font-semibold text-[#00FFC2]">Make AI practical, accessible, and empowering</span> — for every young Indian who’s ready to hustle smarter.</p>
            </div>
          </div>
        </section>
        {/* No divider - smooth transition */}

        {/* Who We Are Section */}
        <section className="flex flex-col items-center justify-center mt-16 px-4 bg-[#0A1020]">
          <div className="w-full max-w-4xl bg-[rgba(24,24,35,0.7)] backdrop-blur-xl rounded-3xl shadow-xl border-t-4 border-[#7F5AF0] p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_0_rgba(127,90,240,0.18)] relative overflow-hidden">
            <div className="flex-1 flex items-center justify-center mb-8 md:mb-0">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 md:w-40 md:h-40">
                <circle cx="70" cy="70" r="70" fill="#7F5AF0" fillOpacity="0.13" />
                <circle cx="70" cy="70" r="50" fill="#00FFC2" fillOpacity="0.18" />
                <rect x="40" y="40" width="60" height="60" rx="30" fill="#fff" fillOpacity="0.08" />
                <path d="M70 50 L90 90 L50 90 Z" fill="#7F5AF0" fillOpacity="0.22" />
              </svg>
            </div>
            <div className="flex-1 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <IconBadge color="#7F5AF0">
                <User className="w-7 h-7 text-white" />
              </IconBadge>
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">Who We Are</h2>
              <p className="text-lg text-gray-200 mb-4">We’re not a big team. We’re not a VC-backed startup. We’re a passionate, independent initiative started by someone just like you —<br />A solo builder obsessed with productivity, creativity, and the power of AI.</p>
              <p className="text-lg text-gray-200 mb-4">HustleHack AI was born out of frustration with generic tools and slow systems. So we built something different: <span className="font-semibold text-[#00FFC2]">A sharp, fast-moving platform filled with plug-and-play AI toolkits, blueprints, and real resources you can actually use.</span></p>
            </div>
          </div>
        </section>
        {/* No divider - smooth transition */}

        {/* What We Offer Section */}
        <section className="flex flex-col items-center justify-center mt-16 px-4 bg-[#0A1020]">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12 flex items-center justify-center leading-tight">What We Offer</h2>
            <div className="flex flex-col gap-10">
              {/* Card 1 */}
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] shadow-lg mb-4 md:mb-0">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 bg-[rgba(36,37,50,0.7)] rounded-2xl shadow-xl p-6 md:ml-0">
                  <h3 className="text-xl font-bold text-white mb-2">Toolkits & Templates</h3>
                  <p className="text-gray-200 text-base">For content creators, students, and solopreneurs.</p>
                </div>
              </div>
              {/* Card 2 (zig-zag) */}
              <div className="flex flex-col md:flex-row-reverse items-center md:items-stretch gap-6 md:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FFC2] to-[#7F5AF0] shadow-lg mb-4 md:mb-0">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 bg-[rgba(36,37,50,0.7)] rounded-2xl shadow-xl p-6 md:mr-0">
                  <h3 className="text-xl font-bold text-white mb-2">Prompt Packs</h3>
                  <p className="text-gray-200 text-base">Supercharge your ChatGPT workflows.</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] shadow-lg mb-4 md:mb-0">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 bg-[rgba(36,37,50,0.7)] rounded-2xl shadow-xl p-6 md:ml-0">
                  <h3 className="text-xl font-bold text-white mb-2">AI-Powered Learning Systems</h3>
                  <p className="text-gray-200 text-base">Launch faster, learn smarter, and grow daily.</p>
                </div>
              </div>
              {/* Card 4 (zig-zag) */}
              <div className="flex flex-col md:flex-row-reverse items-center md:items-stretch gap-6 md:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FFC2] to-[#7F5AF0] shadow-lg mb-4 md:mb-0">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 bg-[rgba(36,37,50,0.7)] rounded-2xl shadow-xl p-6 md:mr-0">
                  <h3 className="text-xl font-bold text-white mb-2">Weekly AI Drops & Cheat Sheets</h3>
                  <p className="text-gray-200 text-base">Curated, not cluttered. Get the latest, every week.</p>
                </div>
              </div>
              {/* Card 5 */}
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] shadow-lg mb-4 md:mb-0">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 bg-[rgba(36,37,50,0.7)] rounded-2xl shadow-xl p-6 md:ml-0">
                  <h3 className="text-xl font-bold text-white mb-2">Unfair Advantage</h3>
                  <p className="text-gray-200 text-base">Everything is designed to help you win—without wasting time or burning out.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* No divider - smooth transition */}

        {/* Who We Built This For Section */}
        <section className="flex flex-col items-center justify-center mt-24 mb-16 px-4 bg-[#0A1020]">
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
        {/* No divider - smooth transition */}

        {/* Built With Grit Section */}
        <section className="flex flex-col items-center justify-center mt-16 px-4 bg-[#0A1020]">
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
        {/* No divider - smooth transition */}

        {/* Still Early Section */}
        <section className="flex flex-col items-center justify-center mt-16 px-4 bg-[#0A1020]">
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
        {/* No divider - smooth transition */}

        {/* Join Us Section */}
        <section className="relative flex justify-center mt-24 mb-16 px-4 bg-[#0A1020]">
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
