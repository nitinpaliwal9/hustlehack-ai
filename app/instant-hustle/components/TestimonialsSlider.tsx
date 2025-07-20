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
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate every 4s
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Parallax hover effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  // 3D floating avatar style
  const avatarClass = "relative z-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-br from-[#7F5AF0]/80 to-[#00FFC2]/80 border-2 border-white/20 mb-2";

  // Optional: Add star rating (all 5 stars for demo)
  const StarRow = () => (
    <div className="flex justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-8">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-center">
        Loved by 10,000+ creators
      </h3>
      {/* Grid on md+, slider on mobile */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((testimonial, idx) => (
          <div
            key={testimonial.id}
            className="flex flex-col items-center bg-white/5 border border-white/10 rounded-lg p-4 transition-transform duration-300 ease-out cursor-pointer group"
            onMouseMove={e => handleMouseMove(e, idx)}
            onMouseLeave={e => handleMouseLeave(e, idx)}
            style={{ willChange: 'transform' }}
          >
            <div className={avatarClass} style={{ boxShadow: '0 8px 32px 0 #7F5AF055, 0 2px 8px 0 #00FFC255' }}>
              <span className="text-3xl sm:text-4xl select-none" style={{ filter: 'drop-shadow(0 2px 8px #00FFC2)' }}>{testimonial.avatar}</span>
            </div>
            <StarRow />
            <p className="text-gray-200 text-sm mb-2 italic text-center">
              "{testimonial.text}"
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <span className="text-white font-medium">{testimonial.name}</span>
              <span>•</span>
              <span>{testimonial.role}</span>
              <span>•</span>
              <span className="text-[#00FFC2]">{testimonial.platform}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile slider */}
      <div className="md:hidden relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
              <div
                className="flex flex-col items-center bg-white/5 border border-white/10 rounded-lg p-4 transition-transform duration-300 ease-out cursor-pointer group"
                onMouseMove={e => handleMouseMove(e, idx)}
                onMouseLeave={e => handleMouseLeave(e, idx)}
                style={{ willChange: 'transform' }}
              >
                <div className={avatarClass} style={{ boxShadow: '0 8px 32px 0 #7F5AF055, 0 2px 8px 0 #00FFC255' }}>
                  <span className="text-3xl sm:text-4xl select-none" style={{ filter: 'drop-shadow(0 2px 8px #00FFC2)' }}>{testimonial.avatar}</span>
                </div>
                <StarRow />
                <p className="text-gray-200 text-sm mb-2 italic text-center">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <span className="text-white font-medium">{testimonial.name}</span>
                  <span>•</span>
                  <span>{testimonial.role}</span>
                  <span>•</span>
                  <span className="text-[#00FFC2]">{testimonial.platform}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dots indicator */}
        <div className="flex justify-center mt-3 space-x-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#00FFC2]' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 