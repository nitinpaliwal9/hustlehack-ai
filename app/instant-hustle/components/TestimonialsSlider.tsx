'use client';

import { useState, useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Content Creator",
    avatar: "👩‍💻",
    text: "Instant Hustle Lite helped me grow my Instagram from 1K to 50K followers in just 3 months! The AI hooks are pure gold.",
    platform: "Instagram"
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "Tech YouTuber",
    avatar: "👨‍💼",
    text: "The thumbnail templates and AI captions saved me hours every week. My engagement rate increased by 300%!",
    platform: "YouTube"
  },
  {
    id: 3,
    name: "Anjali Desai",
    role: "Fitness Influencer",
    avatar: "💪",
    text: "Finally found a tool that understands my niche! The fitness hooks are incredibly engaging and authentic.",
    platform: "Instagram"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Startup Founder",
    avatar: "🚀",
    text: "Used Instant Hustle for our LinkedIn content strategy. Our posts now get 5x more engagement and leads.",
    platform: "LinkedIn"
  },
  {
    id: 5,
    name: "Meera Kapoor",
    role: "Digital Marketer",
    avatar: "🎯",
    text: "The AI-generated content outperforms my manual posts by 200%. This tool is a game-changer for my agency.",
    platform: "LinkedIn"
  },
  {
    id: 6,
    name: "Arjun Reddy",
    role: "Student Creator",
    avatar: "📚",
    text: "As a student, this tool helped me build my personal brand while studying. The templates are perfect for beginners!",
    platform: "Instagram"
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate every 5s
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Premium hover effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * -6;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  // Golden gradient stars component
  const StarRating = () => (
    <div className="flex justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className="w-4 h-4" 
          fill="url(#golden-gradient)" 
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="golden-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFB400" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
        </svg>
      ))}
    </div>
  );

  return (
    <section className="relative py-16 px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 animate-pulse" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Premium header with gradient underline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Loved by 10,000+ creators
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-teal-500 mx-auto rounded-full shadow-lg" />
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="group relative"
              onMouseMove={e => handleMouseMove(e, idx)}
              onMouseLeave={e => handleMouseLeave(e, idx)}
            >
              {/* Glassmorphism card */}
              <div 
                className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 ease-out cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
                  willChange: 'transform'
                }}
              >
                {/* Avatar with gradient glow */}
                <div className="relative mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative z-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(127, 90, 240, 0.8), rgba(0, 255, 194, 0.8))',
                      boxShadow: '0 8px 32px rgba(127, 90, 240, 0.3), 0 2px 8px rgba(0, 255, 194, 0.3)'
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  {/* Gradient glow behind avatar */}
                  <div 
                    className="absolute inset-0 w-16 h-16 rounded-full blur-xl opacity-60"
                    style={{
                      background: 'linear-gradient(135deg, rgba(127, 90, 240, 0.4), rgba(0, 255, 194, 0.4))'
                    }}
                  />
                </div>

                {/* Star rating */}
                <StarRating />

                {/* Testimonial text */}
                <p className="text-gray-200 text-base leading-relaxed mb-4 italic font-medium">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="border-t border-white/10 pt-4">
                  <div className="font-bold text-white text-sm mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.role} • {testimonial.platform}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(127, 90, 240, 0.1), rgba(0, 255, 194, 0.1))',
                    boxShadow: '0 0 40px rgba(127, 90, 240, 0.2), 0 0 20px rgba(0, 255, 194, 0.2)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Slider */}
        <div className="lg:hidden relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                <div
                  className="group relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 ease-out cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
                    willChange: 'transform'
                  }}
                  onMouseMove={e => handleMouseMove(e, idx)}
                  onMouseLeave={e => handleMouseLeave(e, idx)}
                >
                  {/* Avatar with gradient glow */}
                  <div className="relative mb-4 flex justify-center">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(127, 90, 240, 0.8), rgba(0, 255, 194, 0.8))',
                        boxShadow: '0 8px 32px rgba(127, 90, 240, 0.3), 0 2px 8px rgba(0, 255, 194, 0.3)'
                      }}
                    >
                      {testimonial.avatar}
                    </div>
                    {/* Gradient glow behind avatar */}
                    <div 
                      className="absolute inset-0 w-16 h-16 rounded-full blur-xl opacity-60"
                      style={{
                        background: 'linear-gradient(135deg, rgba(127, 90, 240, 0.4), rgba(0, 255, 194, 0.4))'
                      }}
                    />
                  </div>

                  {/* Star rating */}
                  <StarRating />

                  {/* Testimonial text */}
                  <p className="text-gray-200 text-base leading-relaxed mb-4 italic font-medium text-center">
                    "{testimonial.text}"
                  </p>

                  {/* Author info */}
                  <div className="border-t border-white/10 pt-4 text-center">
                    <div className="font-bold text-white text-sm mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {testimonial.role} • {testimonial.platform}
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(127, 90, 240, 0.1), rgba(0, 255, 194, 0.1))',
                      boxShadow: '0 0 40px rgba(127, 90, 240, 0.2), 0 0 20px rgba(0, 255, 194, 0.2)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Premium dots indicator */}
          <div className="flex justify-center mt-6 space-x-3">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-500 to-teal-500 shadow-lg scale-110' 
                    : 'bg-gray-400/50 hover:bg-gray-300/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 