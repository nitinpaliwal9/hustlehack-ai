import React from 'react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Link from 'next/link';

const SocialMediaPromptPack = () => {
  return (
    <>
      <Navigation />

      {/* Prompt Pack Content */}
      <main className="section pt-32">
        <div className="container">
          <div className="prompt-pack-content mx-auto leading-relaxed">
            {/* Breadcrumb */}
            <div className="breadcrumb-wrapper">
              <div className="breadcrumb flex flex-wrap gap-2 align-center mb-8 text-gray-400 text-sm">
                <Link href="/" className="text-primary hover:underline">Home</Link>
                <span>/</span>
                <Link href="/resources" className="text-primary hover:underline">Resources</Link>
                <span>/</span>
                <span>Social Media Prompt Pack</span>
              </div>
            </div>

            {/* Hero Section */}
            <div className="pack-hero text-center py-16 mb-16 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="pack-badge inline-block bg-accent text-dark-bg py-2 px-5 mb-8 rounded-full shadow-md">🔥 MOST POPULAR</div>
              <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">🧰 Social Media Prompt Pack</h1>
              <p className="subtitle text-xl text-gray-300 mx-auto my-8 max-w-lg">20+ plug-and-play AI prompts crafted to help you create consistent, high-quality, and engaging content across Instagram, LinkedIn, Twitter, and YouTube — without writer's block.</p>
              <p className="font-semibold text-accent">Turn ChatGPT into your full-time content assistant</p>
            </div>

            {/* What's Inside Section */}
            <div className="section-card bg-white bg-opacity-5 border border-white border-opacity-10 p-10 mb-12 rounded-2xl transition-all duration-300 hover:bg-opacity-10">
              <div className="section-header mb-8">
                <h2 className="text-4xl font-bold text-accent mb-2">✅ What's Inside</h2>
                <p className="text-gray-300 text-lg leading-relaxed">A complete collection of AI prompts designed to transform your content creation process</p>
              </div>
              <div className="prompts-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Prompt Items */}
                <div className="prompt-item bg-white bg-opacity-5 border border-white border-opacity-10 p-6 rounded-lg transition-all duration-300 hover:bg-opacity-10">
                  <span className="prompt-icon text-4xl mb-4">🎯</span>
                  <h3 className="prompt-title text-white text-lg font-semibold mb-2">Niche Introduction Prompt</h3>
                  <p className="prompt-description text-gray-400 text-sm">Perfect elevator pitch prompts to introduce yourself and your expertise</p>
                </div>
                <div className="prompt-item">{/** More prompts */}</div>
              </div>
            </div>

            {/* Sample Prompts Section */}
            <div className="sample-prompt bg-green-100 border border-green-300 p-8 my-8 rounded-lg">
              <h3 className="text-accent text-xl font-semibold mb-4">💬 Sample Prompts</h3>
              <p className="text-gray-300 mb-6">Here's what you can expect from our professionally crafted prompts:</p>
              <div className="prompt-example italic text-gray-200 bg-white bg-opacity-10 border-l-4 border-accent p-4 mb-4">"I want to write a relatable LinkedIn post about burnout and productivity. Make it personal, with a strong hook and a subtle CTA at the end."</div>
              <div className="prompt-example">{/** More examples */}</div>
            </div>

            {/* Additional Sections */}
            {/** Further sections similar to above */}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SocialMediaPromptPack;

