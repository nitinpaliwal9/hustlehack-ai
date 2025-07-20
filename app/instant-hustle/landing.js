'use client';

import Link from 'next/link';
import { Sparkles, Zap, Users, TrendingUp } from 'lucide-react';

export default function InstantHustleLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1A] to-[#1A1A2E]">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7F5AF0]/20 to-[#00FFC2]/20 text-[#7F5AF0] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            New AI Tool
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Instant Hustle <span className="text-[#00FFC2]">Lite</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-powered content creation for creators, students, and solopreneurs. 
            Generate hooks, captions, and templates instantly!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/instant-hustle" 
              className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              🚀 Try Instant Hustle Lite
            </Link>
            
            <Link 
              href="/dashboard" 
              className="border border-[#7F5AF0] text-[#7F5AF0] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#7F5AF0]/10 transition-all duration-300"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Why Choose Instant Hustle Lite?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Zap className="w-12 h-12 text-[#00FFC2] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-300">
                Generate high-quality content in seconds, not hours. Perfect for busy creators and entrepreneurs.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Users className="w-12 h-12 text-[#7F5AF0] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Made for Everyone</h3>
              <p className="text-gray-300">
                Whether you're a student, creator, or solopreneur, our tools adapt to your needs.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <TrendingUp className="w-12 h-12 text-[#00FFC2] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Proven Results</h3>
              <p className="text-gray-300">
                Join thousands of users who've accelerated their content creation with our AI tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content Creation?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start creating engaging content in minutes, not hours.
          </p>
          <Link 
            href="/instant-hustle" 
            className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Start Creating Now
          </Link>
        </div>
      </section>
    </div>
  );
} 