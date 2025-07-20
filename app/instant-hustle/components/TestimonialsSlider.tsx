'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Loved by 10,000+ creators
      </h3>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="text-center">
                <div className="text-4xl mb-3">{testimonial.avatar}</div>
                <p className="text-gray-300 text-sm mb-3 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-white font-medium">{testimonial.name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400 text-sm">{testimonial.role}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-[#00FFC2] text-sm">{testimonial.platform}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
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