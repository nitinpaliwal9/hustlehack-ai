'use client';

import { useState, useEffect } from 'react';
import { Loader, Copy, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../../lib/supabaseClient';
import { useUserPlan } from '../../hooks/useAuth';
import { getPlanDisplayName, isPlanAtLeast } from '../../planUtils';

const outputTypes = [
  { value: 'caption', label: 'Caption' },
  { value: 'blog-intro', label: 'Blog Intro' },
  { value: 'tweet', label: 'Tweet' },
];

export default function AIContentGenerator() {
  console.log('[AIContentGenerator] Render start');
  const { user, isLoading } = useAuth();
  console.log('[AIContentGenerator] After useAuth', { user, isLoading });
  // Always call useUserPlan unconditionally
  const { plan, loading: planLoading } = useUserPlan(user?.id);
  const allowed = isPlanAtLeast(plan, 'creator');
  console.log('[AIContentGenerator] After plan/allowed calc', { plan, planLoading, allowed });

  if (!isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center animate-fade-in">
          <p className="text-2xl text-white font-bold mb-4">Please log in to use the AI Content Generator.</p>
          <a href="/auth/callback" className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl hover:from-[#6D4DC6] hover:to-[#00E6B3] transition-all duration-300 hover:scale-105">Log In</a>
        </div>
      </div>
    );
  }

  if (isLoading || planLoading || !user) {
    console.log('[AIContentGenerator] Loading state', { isLoading, planLoading, user });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center animate-fade-in">
          <Loader className="w-12 h-12 text-[#7F5AF0] animate-spin mx-auto mb-6" />
          <p className="text-xl text-white font-bold mb-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    console.log('[AIContentGenerator] Not allowed', { plan });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 p-12 max-w-lg mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-full mb-8 animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Upgrade Required</h2>
          <p className="text-lg text-gray-300 mb-6">The AI Content Generator is available for <span className="text-[#00FFC2] font-semibold">{getPlanDisplayName(plan)}</span> plan members only.</p>
          <a href="/upgrade" className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl hover:from-[#6D4DC6] hover:to-[#00E6B3] transition-all duration-300 hover:scale-105">Upgrade Now</a>
          <p className="mt-6 text-gray-400 text-sm">Already upgraded? <a href="/dashboard" className="text-[#7F5AF0] hover:underline">Go to Dashboard</a></p>
        </div>
      </div>
    );
  }

  const [topic, setTopic] = useState('');
  const [outputType, setOutputType] = useState('caption');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  console.log('[AIContentGenerator] State initialized', { topic, outputType, loading, error, result, copied });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    setCopied(false);
    if (!topic.trim()) {
      setError('Please enter a topic or idea.');
      console.log('[AIContentGenerator] handleGenerate: empty topic');
      return;
    }
    setLoading(true);
    console.log('[AIContentGenerator] handleGenerate: sending request', { topic, outputType });
    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic, outputType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate content.');
      setResult(data.content);
      console.log('[AIContentGenerator] handleGenerate: success', { content: data.content });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      console.log('[AIContentGenerator] handleGenerate: error', err);
    } finally {
      setLoading(false);
      console.log('[AIContentGenerator] handleGenerate: done');
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log('[AIContentGenerator] handleCopy: copied', { result });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-full mb-8 animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            AI Content Generator
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Instantly generate high-quality captions, blog intros, and tweets with LLaMA 3. Enter your topic and let AI do the magic!
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden animate-slide-up">
          <form onSubmit={handleGenerate} className="p-8 md:p-12 space-y-8">
            {/* Topic Input */}
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-200 mb-3">
                Enter your topic or idea
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={e => { setTopic(e.target.value); console.log('[AIContentGenerator] topic changed', e.target.value); }}
                className="w-full px-5 py-4 rounded-xl text-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-[#7F5AF0] focus:ring-0 focus:outline-none placeholder-gray-400 transition-all duration-300 shadow-sm"
                placeholder="e.g. How to stay productive as a student"
                required
                autoFocus
              />
            </div>
            {/* Output Type Dropdown */}
            <div>
              <label htmlFor="outputType" className="block text-sm font-semibold text-gray-200 mb-3">
                Choose output type
              </label>
              <select
                id="outputType"
                value={outputType}
                onChange={e => { setOutputType(e.target.value); console.log('[AIContentGenerator] outputType changed', e.target.value); }}
                className="w-full px-5 py-4 rounded-xl text-lg bg-gray-700 text-white border-2 border-gray-600 focus:border-[#00FFC2] focus:ring-0 focus:outline-none transition-all duration-300 shadow-sm cursor-pointer"
              >
                {outputTypes.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* Generate Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 px-8 rounded-2xl text-white font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-500 shadow-xl ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] hover:from-[#6D4DC6] hover:to-[#00E6B3] hover:scale-105'}`}
              >
                {loading ? (
                  <>
                    <Loader className="w-6 h-6 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate</span>
                    <Sparkles className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
            {/* Error Message */}
            {error && (
              <div className="flex items-center text-red-500 text-sm mt-2 animate-fade-in">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
          </form>

          {/* Result Area */}
          {result && (
            <div className="border-t border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 md:p-12 animate-fade-in">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-lg font-bold text-white">AI Output</span>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 text-white text-lg font-mono whitespace-pre-line shadow-inner transition-all duration-300">
                {result}
              </div>
              <button
                onClick={handleCopy}
                className={`mt-6 flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${copied ? 'bg-green-500' : 'bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] hover:from-[#6D4DC6] hover:to-[#00E6B3]'}`}
              >
                <Copy className="w-5 h-5" />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 