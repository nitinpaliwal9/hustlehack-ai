'use client';

import { useEffect, useState } from 'react';
import React from 'react';

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(127, 90, 240, 0.1) 0%, rgba(0, 255, 194, 0.05) 50%, transparent 100%)`,
          transition: 'all 0.3s ease-out'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#7F5AF0] rounded-full opacity-20 animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(127, 90, 240, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127, 90, 240, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        <style jsx>{`
          .particle {
            position: absolute;
            border-radius: 9999px;
            opacity: 0.18;
            background: radial-gradient(circle, #7F5AF0 60%, #00FFC2 100%);
            pointer-events: none;
            animation: float 12s linear infinite;
          }
          .particle-1 { width: 32px; height: 32px; left: 10%; top: 20%; animation-delay: 0s; }
          .particle-2 { width: 20px; height: 20px; left: 70%; top: 30%; animation-delay: 2s; }
          .particle-3 { width: 24px; height: 24px; left: 40%; top: 70%; animation-delay: 4s; }
          .particle-4 { width: 16px; height: 16px; left: 80%; top: 80%; animation-delay: 6s; }
          .particle-5 { width: 28px; height: 28px; left: 25%; top: 60%; animation-delay: 8s; }
          @keyframes float {
            0% { transform: translateY(0) scale(1); opacity: 0.18; }
            50% { transform: translateY(-30px) scale(1.1); opacity: 0.28; }
            100% { transform: translateY(0) scale(1); opacity: 0.18; }
          }
        `}</style>
      </div>
    </div>
  );
} 