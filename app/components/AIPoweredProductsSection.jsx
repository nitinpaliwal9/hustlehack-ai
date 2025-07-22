import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTS = [
  {
    id: 'carousel',
    label: '🔥 Best Seller',
    title: 'Instagram Carousels',
    price: 99,
    nonMemberPrice: 149,
    description: 'Boost your engagement with scroll-stopping carousel posts tailored to your niche and audience.',
    cta: 'Get Yours for ₹99 → Save Hours Today',
    nonMemberCta: 'Get Yours for ₹149',
    thumbnail: '/5-hacks-to-save-time.webp',
    href: '/purchase/instagram-carousels',
  },
  {
    id: 'deck',
    title: 'AI-Powered Pitch Decks',
    price: 149,
    nonMemberPrice: 199,
    description: 'Close deals, get investors, or wow clients — all with AI-crafted pitch decks built for clarity and impact.',
    cta: 'Generate in 30 Seconds → Start Pitching',
    nonMemberCta: 'Order Now for ₹199',
    thumbnail: '/cbatgpt-and-canva.webp',
    href: '/purchase/ai-pitch-deck',
  },
  {
    id: 'pdf',
    title: 'Value PDFs / Ebooks',
    price: 149,
    nonMemberPrice: 199,
    description: 'Build trust and grow your email list with value-packed ebooks tailored to your niche.',
    cta: 'Start Now → Grow Your Audience',
    nonMemberCta: 'Start Now for ₹199',
    thumbnail: '/content-ready.webp',
    href: '/purchase/ai-ebook',
  },
];

const TESTIMONIALS = [
  {
    quote: 'I got 10K+ views on my first AI-made carousel. Totally worth ₹99!',
    author: 'Ria, Instagram Coach',
  },
  {
    quote: 'The deck helped me land my first investor meeting. The slides looked so pro!',
    author: 'Aman, Startup Founder',
  },
  {
    quote: 'I grew my email list by 200+ in a week with the ebook. Super easy and fast.',
    author: 'Priya, Marketing Consultant',
  },
  {
    quote: 'I got 3 carousels delivered in 24 hours. Super clean and aligned with my brand tone. Worth every rupee.',
    author: 'Priya S., Content Coach',
  },
  {
    quote: 'The deck helped me pitch my first client confidently. Worth every rupee.',
    author: 'Rahul, Freelance Marketer',
  },
  {
    quote: 'So simple, so powerful. I’ve already recommended HustleHack AI to 3 friends!',
    author: 'Sakshi, Instagram Creator',
  },
];

export default function AIPoweredProductsSection() {
  const [isMember, setIsMember] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [buttonAnimating, setButtonAnimating] = useState(null);

  // Testimonials slider logic
  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Auto-advance slider every 6s
  // eslint-disable-next-line
  React.useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  // Toast auto-hide
  React.useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 1800);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const handleCTA = (href, idx) => {
    setButtonAnimating(idx);
    setShowToast(true);
    setTimeout(() => {
      setButtonAnimating(null);
      window.location.href = href;
    }, 700);
  };

  return (
    <section className="py-16 px-4 bg-[#181A2A]">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">AI-Powered Content That Works While You Sleep</h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">Smart content solutions for solopreneurs, creators, and small brands. Just enter your niche and goals — we’ll do the rest.</p>
        <div className="flex justify-center items-center gap-2 mt-6">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full border transition-colors ${isMember ? 'bg-[#377DFF] text-white border-[#377DFF]' : 'bg-[#232946] text-[#377DFF] border-[#377DFF]'}`}>Member</span>
          <button
            className="relative w-12 h-6 bg-[#232946] rounded-full flex items-center transition-colors duration-300 mx-2"
            onClick={() => setIsMember((m) => !m)}
            aria-label="Toggle member pricing"
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${isMember ? 'translate-x-0' : 'translate-x-6'}`}
              style={{ boxShadow: '0 2px 8px rgba(55,125,255,0.15)' }}
            />
            <span className="sr-only">Toggle member/non-member pricing</span>
          </button>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full border transition-colors ${!isMember ? 'bg-[#377DFF] text-white border-[#377DFF]' : 'bg-[#232946] text-[#377DFF] border-[#377DFF]'}`}>Non-Member</span>
        </div>
        {/* Urgency/Scarcity Line */}
        <div className="mt-6">
          <span className="inline-block text-base font-semibold text-[#377DFF] bg-[#232946] rounded-full px-4 py-2 shadow-sm animate-pulse">🎁 Only 100 slots left for ₹99 Launch Offer!</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PRODUCTS.map((product, idx) => (
          <motion.div
            key={product.id}
            className="relative bg-[#232946] rounded-2xl shadow-md border border-[#232946] p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(55,125,255,0.10)' }}
            viewport={{ once: true }}
          >
            {product.label && (
              <span className="absolute top-4 left-4 bg-[#377DFF] text-white text-xs font-bold px-3 py-1 rounded-full shadow">{product.label}</span>
            )}
            <img
              src={product.thumbnail}
              alt={product.title + ' preview'}
              className="w-28 h-28 object-contain rounded-xl mb-4 border border-[#232946] bg-[#181A2A]"
              loading="lazy"
            />
            <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-extrabold text-white">
                ₹{isMember ? product.price : product.nonMemberPrice}
              </span>
              {!isMember && (
                <span className="text-base text-gray-400 line-through">₹{product.price}</span>
              )}
            </div>
            <p className="text-gray-200 mb-4 min-h-[56px]">{product.description}</p>
            <motion.button
              className="w-full md:w-auto bg-[#377DFF] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#0051b3] transition-all duration-200"
              whileTap={{ scale: 0.92 }}
              animate={buttonAnimating === idx ? { scale: [1, 0.92, 1.04, 1] } : {}}
              transition={{ duration: 0.5 }}
              onClick={() => handleCTA(product.href, idx)}
            >
              {isMember ? product.cta : product.nonMemberCta}
            </motion.button>
          </motion.div>
        ))}
      </div>
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed left-1/2 bottom-10 z-50 -translate-x-1/2 bg-[#232946] text-white px-6 py-3 rounded-full shadow-lg border border-[#377DFF] text-lg font-semibold flex items-center gap-2"
          >
            <span>🔄</span> Redirecting you to content wizard…
          </motion.div>
        )}
      </AnimatePresence>
      {/* Testimonials Slider */}
      <div className="max-w-3xl mx-auto mt-12">
        <h4 className="text-xl font-bold text-white mb-6 text-center">What Creators Are Saying</h4>
        <div className="flex flex-col items-center">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="bg-[#232946] rounded-xl shadow p-6 border border-[#232946] text-gray-200 text-base flex flex-col items-center w-full"
            style={{ minHeight: 120 }}
          >
            <p className="mb-3 text-lg">“{TESTIMONIALS[activeTestimonial].quote}”</p>
            <span className="text-sm font-semibold text-[#7F5AF0]">— {TESTIMONIALS[activeTestimonial].author}</span>
          </motion.div>
          <div className="flex gap-2 mt-4">
            <button
              className="w-8 h-8 rounded-full bg-[#232946] border border-[#377DFF] text-white flex items-center justify-center hover:bg-[#377DFF] hover:text-white transition"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              type="button"
            >
              ‹
            </button>
            <button
              className="w-8 h-8 rounded-full bg-[#232946] border border-[#377DFF] text-white flex items-center justify-center hover:bg-[#377DFF] hover:text-white transition"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              type="button"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 