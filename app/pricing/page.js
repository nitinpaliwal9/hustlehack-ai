// Pricing Page for HustleHack AI
'use client'

import Link from 'next/link';
import Navigation from '../components/Navigation';
import PoweredByBar from '../components/PoweredByBar';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PricingPage() {
  // Dummy data for mini chart
  const miniChartData = {
    labels: ['Starter', 'Creator', 'Pro'],
    datasets: [
      {
        label: 'Hours Saved/Month',
        data: [20, 35, 50],
        backgroundColor: ['#00FFC2', '#7F5AF0', '#2563eb'],
        borderRadius: 8,
      },
    ],
  };
  return (
    <div className="w-full min-h-screen bg-[#0A1020] text-white">
      <Navigation />
      <main className="max-w-6xl mx-auto px-2 sm:px-4 mt-24 pb-16 md:scale-105 md:transform">
        {/* 1. Hero Section */}
        <section className="py-12 sm:py-20 flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Choose Your Hustle Plan – Start Building Your Future with AI.</h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] mb-2">Affordable plans for students, creators, and future founders — starting at just ₹3/day!</p>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-lg sm:text-2xl font-bold">
              <span className="line-through text-gray-400">₹199/month</span>
              <span className="text-[#00FFC2]">Now ₹99/month</span>
            </div>
            <span className="inline-block bg-[#151a28] text-[#00FFC2] rounded-full px-4 py-1 text-xs font-semibold mt-1">7-Day Risk-Free Trial</span>
          </div>
        </section>

        {/* 2. Pricing Table */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter Hustle */}
            <div className="bg-[#151a28] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-[#232946]">
              <h3 className="text-xl font-bold mb-2">Starter Hustle</h3>
              <div className="text-3xl font-extrabold text-[#00FFC2] mb-1">₹99<span className="text-base font-medium">/month</span></div>
              <div className="text-xs text-gray-400 mb-4">Best for students starting their AI journey</div>
              <ul className="text-sm text-gray-200 mb-4 space-y-2 text-left">
                <li>• AI productivity templates (study planners, notes)</li>
                <li>• 2 Weekly Hustle Drops/month</li>
                <li>• Access to student community group</li>
              </ul>
              <div className="text-xs text-[#00FFC2] mb-4">Just ₹3/day — cheaper than a coffee!</div>
              <a href="https://rzp.io/rzp/ppw09ED" target="_blank" rel="noopener noreferrer" className="w-full inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-150">Start with Starter</a>
            </div>
            {/* Creator Mode (Most Popular) */}
            <div className="bg-[#181f36] rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl border-2 border-[#7F5AF0] relative scale-105 z-10">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white text-xs font-bold px-4 py-1 rounded-full shadow">Most Popular</span>
              <h3 className="text-xl font-bold mb-2">Creator Mode</h3>
              <div className="text-3xl font-extrabold text-[#7F5AF0] mb-1">₹199<span className="text-base font-medium">/month</span></div>
              <div className="text-xs text-gray-400 mb-4">Best for students + creators who want to grow faster</div>
              <ul className="text-sm text-gray-200 mb-4 space-y-2 text-left">
                <li>• Everything in Starter Hustle</li>
                <li>• 4 Weekly Hustle Drops/month</li>
                <li>• Social Media Prompt Packs (Instagram, YouTube, LinkedIn)</li>
                <li>• AI Content Idea Generator</li>
                <li>• Access to “Creator Tips” Telegram Channel</li>
              </ul>
              <div className="text-xs text-[#7F5AF0] mb-4">Launch your creator brand for less than ₹7/day!</div>
              <a href="https://rzp.io/rzp/atTfuqqZ" target="_blank" rel="noopener noreferrer" className="w-full inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] hover:from-[#6D4DC6] hover:to-[#00E6B3] text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-150 text-lg">Upgrade to Creator Mode</a>
            </div>
            {/* Pro Hacker */}
            <div className="bg-[#151a28] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-[#232946]">
              <h3 className="text-xl font-bold mb-2">Pro Hacker</h3>
              <div className="text-3xl font-extrabold text-[#00FFC2] mb-1">₹299<span className="text-base font-medium">/month</span></div>
              <div className="text-xs text-gray-400 mb-4">Best for side hustlers & future founders</div>
              <ul className="text-sm text-gray-200 mb-4 space-y-2 text-left">
                <li>• Everything in Creator Mode</li>
                <li>• Startup Launch Kit (MVP blueprint, pitch deck templates)</li>
                <li>• Monthly exclusive growth guides</li>
                <li>• Advanced AI automation tips</li>
              </ul>
              <div className="text-xs text-[#00FFC2] mb-4">Just ₹10/day — invest in your dream.</div>
              <a href="https://rzp.io/rzp/nraUuNBx" target="_blank" rel="noopener noreferrer" className="w-full inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-150">Go Pro Hacker</a>
            </div>
          </div>
        </section>

        {/* 3. Price Anchoring / Scratch Pricing + Trust-Building Elements (Professional Card) */}
        <section className="py-12 flex flex-col items-center text-center">
          <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-[#181f36] to-[#151a28] border border-[#232946] rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
                <span className="line-through text-gray-400 text-lg">₹149</span>
                <span className="text-[#00FFC2]">₹99 for Starter</span>
              </div>
              <span className="inline-block bg-[#151a28] text-[#00FFC2] rounded-full px-5 py-2 text-sm font-semibold mt-2 mb-1 shadow">Limited Time Launch Offer – Save 33%!</span>
            </div>
            <hr className="w-3/4 border-t border-[#232946] my-4 opacity-60" />
            <blockquote className="bg-[#151a28] border-l-4 border-[#00FFC2] rounded-xl p-6 max-w-xl mx-auto text-lg text-gray-200 italic mb-4 shadow-md">“HustleHack AI helped me save 15 hours a week and grow my Instagram from 0 to 5k followers!” <span className="not-italic font-bold">— Ananya, Student Creator</span></blockquote>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base mt-2">
              <span className="bg-[#151a28] text-[#00FFC2] rounded-full px-5 py-2 font-semibold shadow">100+ students and creators already on board</span>
              <span className="bg-[#151a28] text-[#7F5AF0] rounded-full px-5 py-2 font-semibold shadow">Try it risk-free for 7 days. Cancel anytime.</span>
              <span className="bg-[#151a28] text-[#2563eb] rounded-full px-5 py-2 font-semibold shadow">Join 1,000+ young hustlers in our private Telegram group</span>
            </div>
          </div>
        </section>

        {/* 5. Value Visualization */}
        <section className="py-12 flex flex-col items-center text-center gap-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Mini chart: Hours Saved per Plan */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-96 h-72 bg-[#151a28] rounded-2xl p-8 flex items-center justify-center shadow-lg">
                <Bar data={miniChartData} options={{
                  plugins: { legend: { display: false } },
                  scales: { x: { grid: { color: '#232946' }, ticks: { color: '#fff' } }, y: { grid: { color: '#232946' }, ticks: { color: '#fff' } } },
                  responsive: true,
                  maintainAspectRatio: false,
                }} height={270} />
              </div>
            </div>
            {/* Real-life price comparison statements */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 items-center md:items-start mt-8 md:mt-0">
              <div className="bg-[#151a28] rounded-2xl px-8 py-6 text-base md:text-lg text-gray-200 shadow w-full max-w-md text-left">₹99/month = less than one Uber ride or 3 coffees.</div>
              <div className="bg-[#151a28] rounded-2xl px-8 py-6 text-base md:text-lg text-gray-200 shadow w-full max-w-md text-left">₹199/month = price of a movie ticket but with lifetime value for your career.</div>
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="py-10 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#151a28] rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-base">Can I cancel anytime?</h3>
              <p className="text-gray-300 text-base">Yes, you can cancel your subscription at any time from your dashboard.</p>
            </div>
            <div className="bg-[#151a28] rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-base">Will I get new content?</h3>
              <p className="text-gray-300 text-base">Yes, you’ll receive new weekly drops and updates as part of your plan.</p>
            </div>
            <div className="bg-[#151a28] rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-base">Is this worth it?</h3>
              <p className="text-gray-300 text-base">Even one good AI template can save you 10 hours — your ₹99 is recovered in one day.</p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-12 flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-bold mb-4">Stop wasting hours. Start building your dream. HustleHack AI plans start at just ₹3/day.</h2>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-150"
          >
            Start Your Hustle Today
          </button>
        </section>
      </main>
      <PoweredByBar />
      <Footer />
    </div>
  );
} 