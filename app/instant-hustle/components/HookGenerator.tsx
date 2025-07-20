'use client';

import { useEffect, useState, useRef } from 'react';
import hooksData from '../../../data/hooks.json';
import { usePlanGating } from './PlanGatingProvider';

type Props = {
  platform: string;
  niche: string;
  onNext: () => void;
  onBack: () => void;
};

const AI_LOADING_STEPS = [
  'Analyzing platform trends…',
  'Finding viral hook patterns…',
  'Generating fresh captions…',
];

function AILoader({ stepIndex, tip }: { stepIndex: number; tip: string }) {
  // Animated dots
  const [dotCount, setDotCount] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  // Fun micro-texts
  const microTexts = [
    'Our AI is cooking 🔥...',
    'Analyzing top trends for you...',
    'Finding viral patterns...',
    'Optimizing your content magic...',
    'Scanning 1,000+ hooks...'
  ];
  const microText = microTexts[stepIndex % microTexts.length];
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* AI Avatar with rotating icon */}
      <div className="mb-4 animate-spin-slow">
        <span className="inline-block w-12 h-12 rounded-full bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] flex items-center justify-center shadow-lg">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#18181b"/><text x="50%" y="55%" textAnchor="middle" fill="#7F5AF0" fontSize="18" fontWeight="bold" dy=".3em">🤖</text></svg>
        </span>
      </div>
      {/* Progress Steps */}
      <div className="w-full max-w-xs mb-4">
        <div className="flex items-center justify-between mb-2">
          {AI_LOADING_STEPS.map((msg, idx) => (
            <div key={msg} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx <= stepIndex ? 'bg-[#7F5AF0]' : 'bg-gray-700'}`}></div>
          ))}
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] transition-all duration-500" style={{ width: `${((stepIndex+1)/AI_LOADING_STEPS.length)*100}%` }} />
        </div>
      </div>
      {/* Animated dots and micro-text */}
      <div className="text-lg font-semibold text-gray-100 mb-2 min-h-[32px] flex items-center gap-2">
        AI is thinking{'.'.repeat(dotCount)}
        <span className="ml-2 animate-pulse text-[#00FFC2]">●</span>
      </div>
      <div className="text-sm text-gray-400 mt-2 italic">{microText}</div>
      {/* AI Tip */}
      <div className="text-xs text-gray-500 mt-1">{tip}</div>
      <div className="mt-4 text-[#00FFC2] text-xs font-mono animate-pulse">AI Generating…</div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const AI_TIPS = [
  'Did you know? Hooks with numbers perform 33% better on Instagram!',
  'Analyzing 1,000+ viral Reels…',
  'Short hooks boost engagement by 27%!',
  'Emojis can increase click-through rates.',
  'Questions in hooks drive curiosity.',
];

function streamText(fullText: string, onUpdate: (partial: string) => void, onDone: () => void, speed = 18) {
  let i = 0;
  function type() {
    if (i <= fullText.length) {
      onUpdate(fullText.slice(0, i));
      i++;
      setTimeout(type, speed);
    } else {
      onDone();
    }
  }
  type();
}

const AI_STATS = [
  'Analyzed 200 trending captions in your niche.',
  'Selected top 10 hooks for best engagement.',
  'Benchmarked against 1,000+ viral posts.',
  'Using latest trends for {platform} in {niche}.',
];

export default function HookGenerator({ platform, niche, onNext, onBack }: Props) {
  const [hooks, setHooks] = useState<string[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCaptionIndex, setCopiedCaptionIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'hooks' | 'captions'>('hooks');
  const [aiStep, setAiStep] = useState(0);
  const [aiTip, setAiTip] = useState(AI_TIPS[0]);
  const aiStepRef = useRef(0);
  const [aiStat, setAiStat] = useState('');
  
  const { userPlan, canGenerateAI, remainingGenerations, upgradePlan } = usePlanGating();

  const [streamedHooks, setStreamedHooks] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [allStreamed, setAllStreamed] = useState(false);
  const [streamedCaptions, setStreamedCaptions] = useState<string[]>([]);
  const [streamingCaptions, setStreamingCaptions] = useState(false);
  const [allCaptionsStreamed, setAllCaptionsStreamed] = useState(false);
  const [aiCaptionStat, setAiCaptionStat] = useState('');

  useEffect(() => {
    // Load initial static data
    const platformHooks = hooksData[platform as keyof typeof hooksData];
    if (platformHooks && platformHooks[niche as keyof typeof platformHooks]) {
      const allHooks = platformHooks[niche as keyof typeof platformHooks] as string[];
      // For Starter users, only show first 2 hooks
      const limitedHooks = userPlan.plan === 'starter' ? allHooks.slice(0, 2) : allHooks;
      setHooks(limitedHooks);
    } else {
      const fallbackHooks = [
        "This {topic} will change your life!",
        "Can you believe this {trend}?",
        "The secret to {goal} that nobody talks about",
        "Why {platform} creators are obsessed with this",
        "This {niche} hack will blow your mind!"
      ];
      const limitedHooks = userPlan.plan === 'starter' ? fallbackHooks.slice(0, 2) : fallbackHooks;
      setHooks(limitedHooks);
    }
  }, [platform, niche, userPlan.plan]);

  // Streaming effect after AI loading
  useEffect(() => {
    if (!isGenerating && hooks.length > 0 && streamedHooks.length === 0 && !streaming) {
      setStreaming(true);
      setAllStreamed(false);
      let idx = 0;
      const next = () => {
        if (idx < hooks.length) {
          streamText(hooks[idx] || '', (partial) => {
            setStreamedHooks((prev) => {
              const arr = [...prev];
              arr[idx] = partial;
              return arr;
            });
          }, () => {
            idx++;
            next();
          });
        } else {
          setAllStreamed(true);
          setStreaming(false);
        }
      };
      setStreamedHooks(Array(hooks.length).fill(''));
      next();
    }
  }, [isGenerating, hooks]);

  // Reset streaming state when new generation starts
  useEffect(() => {
    if (isGenerating) {
      setStreamedHooks([]);
      setAllStreamed(false);
      setStreaming(false);
    }
  }, [isGenerating]);

  // Show AI stat just before hooks appear
  useEffect(() => {
    if (!isGenerating && hooks.length > 0 && streamedHooks.length === 0 && !streaming) {
      // Pick a random stat and interpolate platform/niche
      let stat =
        AI_STATS && AI_STATS.length > 0
          ? (AI_STATS[Math.floor(Math.random() * AI_STATS.length)] || '')
              .replace('{platform}', platform)
              .replace('{niche}', niche)
          : 'Analyzing your niche...';
      setAiStat(stat);
    }
  }, [isGenerating, hooks, streamedHooks.length, streaming, platform, niche]);

  // Streaming effect for captions after AI loading
  useEffect(() => {
    if (!isGenerating && captions.length > 0 && streamedCaptions.length === 0 && !streamingCaptions && activeTab === 'captions') {
      setStreamingCaptions(true);
      setAllCaptionsStreamed(false);
      let idx = 0;
      const next = () => {
        if (idx < captions.length) {
          streamText(captions[idx] || '', (partial) => {
            setStreamedCaptions((prev) => {
              const arr = [...prev];
              arr[idx] = partial;
              return arr;
            });
          }, () => {
            idx++;
            next();
          });
        } else {
          setAllCaptionsStreamed(true);
          setStreamingCaptions(false);
        }
      };
      setStreamedCaptions(Array(captions.length).fill(''));
      next();
    }
  }, [isGenerating, captions, activeTab]);

  // Reset streaming state for captions when new generation starts or tab switches
  useEffect(() => {
    if (isGenerating || activeTab !== 'captions') {
      setStreamedCaptions([]);
      setAllCaptionsStreamed(false);
      setStreamingCaptions(false);
    }
  }, [isGenerating, activeTab]);

  // Show AI stat just before captions appear
  useEffect(() => {
    if (!isGenerating && captions.length > 0 && streamedCaptions.length === 0 && !streamingCaptions && activeTab === 'captions') {
      // Pick a random stat and interpolate platform/niche
      let stat =
        AI_STATS && AI_STATS.length > 0
          ? (AI_STATS[Math.floor(Math.random() * AI_STATS.length)] || '')
              .replace('{platform}', platform)
              .replace('{niche}', niche)
          : 'Analyzing your niche...';
      setAiCaptionStat(stat);
    }
  }, [isGenerating, captions, streamedCaptions.length, streamingCaptions, platform, niche, activeTab]);

  const handleCopy = async (text: string, index: number, type: 'hook' | 'caption') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'hook') {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        setCopiedCaptionIndex(index);
        setTimeout(() => setCopiedCaptionIndex(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const startAILoading = () => {
    setIsGenerating(true);
    setAiStep(0);
    setAiTip(AI_TIPS[Math.floor(Math.random()*AI_TIPS.length)]);
    aiStepRef.current = 0;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < AI_LOADING_STEPS.length) {
        setAiStep(step);
        aiStepRef.current = step;
      } else {
        clearInterval(interval);
      }
    }, 700);
    // End loading after all steps
    setTimeout(() => {
      setIsGenerating(false);
      setAiStep(0);
    }, 700 * AI_LOADING_STEPS.length + 200);
  };

  const generateContent = async (type: 'hooks' | 'captions') => {
    if (!canGenerateAI) {
      upgradePlan();
      return;
    }

    // Patch: Only fetch if tab is visible
    if (typeof document !== 'undefined' && document.visibilityState !== 'visible') {
      console.log('Tab not visible, skipping AI fetch');
      return;
    }

    startAILoading();
    let controller: AbortController | null = null;
    let timeout: NodeJS.Timeout | null = null;
    try {
      controller = new AbortController();
      timeout = setTimeout(() => {
        controller?.abort();
        console.log('AI fetch aborted due to timeout');
      }, 20000); // 20s timeout
      const endpoint = type === 'hooks' ? '/api/generate-hooks' : '/api/generate-captions';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          niche,
          count: 5
        }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (data.success) {
        if (type === 'hooks') {
          setHooks(data.hooks);
        } else {
          setCaptions(data.captions);
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('AI fetch request timed out/aborted');
      } else {
        console.error(`Error generating ${type}:`, error);
      }
    } finally {
      setIsGenerating(false);
      if (timeout) clearTimeout(timeout);
    }
  };

  const LoadingShimmer = () => (
    <div className="space-y-4 max-w-2xl mx-auto">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const LockedContentOverlay = ({ type }: { type: 'hooks' | 'captions' }) => (
    <div className="space-y-4 max-w-2xl mx-auto">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="blur-sm">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-lg p-4 text-center shadow-lg">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Upgrade to unlock more {type}
              </p>
              <button
                onClick={upgradePlan}
                className="bg-[#7F5AF0] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#6B46C1] transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="text-center">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-[#7F5AF0] hover:text-[#6B46C1] transition-colors"
        >
          <span className="mr-2">←</span>
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          AI Content Generator
        </h2>
        <div className="w-16"></div>
      </div>
      
      <p className="text-gray-600 mb-8">
        Generate viral hooks and captions for your {niche} content
      </p>

      {/* Plan Status */}
      {userPlan.plan === 'starter' && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⭐ Starter Plan: {remainingGenerations} AI generations remaining
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('hooks')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'hooks' 
                ? 'bg-[#7F5AF0] text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Viral Hooks
          </button>
          <button
            onClick={() => setActiveTab('captions')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'captions' 
                ? 'bg-[#7F5AF0] text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Captions
          </button>
        </div>
      </div>
      
      {isGenerating ? (
        <AILoader stepIndex={aiStep} tip={aiTip ?? ""} />
      ) : userPlan.plan === 'starter' && activeTab === 'hooks' ? (
        <>
          {/* Show limited content for Starter */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {hooks.map((item, index) => (
              <div
                key={index}
                className="bg-[#18181b] border-2 border-[#232136] rounded-xl p-4 text-left text-gray-100 shadow-md transition-all duration-300"
              >
                {item}
              </div>
            ))}
          </div>
          
          {/* Show locked content overlay */}
          <LockedContentOverlay type="hooks" />
        </>
      ) : activeTab === 'hooks' ? (
        <>
          {aiStat && (
            <div className="mb-4 text-sm text-[#00FFC2] font-mono animate-fadein" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>{aiStat}</div>
          )}
          <div className="space-y-4 max-w-2xl mx-auto">
            {streamedHooks.map((item, index) => (
              <div
                key={index}
                className={`bg-[#18181b] border-2 border-[#232136] rounded-xl p-4 text-left text-gray-100 shadow-md transition-all duration-300 opacity-0 animate-fadein relative`}
                style={{ animationDelay: `${index * 0.12 + 0.2}s`, animationFillMode: 'forwards' }}
              >
                {item}
                {allStreamed && index === 0 && (
                  <>
                    <span className="ml-3 px-2 py-1 bg-[#00FFC2] text-black text-xs rounded-full font-semibold animate-pulse">Ready to Copy</span>
                    {/* Micro-confetti or spark animation */}
                    <span className="absolute top-2 right-2 animate-sparkle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#00FFC2" opacity="0.3"/><circle cx="12" cy="12" r="4" fill="#7F5AF0" opacity="0.7"/><circle cx="12" cy="12" r="2" fill="#fff"/></svg>
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : activeTab === 'captions' ? (
        <>
          {aiCaptionStat && (
            <div className="mb-4 text-sm text-[#00FFC2] font-mono animate-fadein" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>{aiCaptionStat}</div>
          )}
          <div className="space-y-4 max-w-2xl mx-auto">
            {streamedCaptions.map((item, index) => (
              <div
                key={index}
                className={`bg-[#18181b] border-2 border-[#232136] rounded-xl p-4 text-left text-gray-100 shadow-md transition-all duration-300 opacity-0 animate-fadein relative`}
                style={{ animationDelay: `${index * 0.12 + 0.2}s`, animationFillMode: 'forwards' }}
              >
                {item}
                {allCaptionsStreamed && index === 0 && (
                  <>
                    <span className="ml-3 px-2 py-1 bg-[#00FFC2] text-black text-xs rounded-full font-semibold animate-pulse">Ready to Copy</span>
                    {/* Micro-confetti or spark animation */}
                    <span className="absolute top-2 right-2 animate-sparkle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#00FFC2" opacity="0.3"/><circle cx="12" cy="12" r="4" fill="#7F5AF0" opacity="0.7"/><circle cx="12" cy="12" r="2" fill="#fff"/></svg>
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}