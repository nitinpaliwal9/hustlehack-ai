"use client";
import { useState } from "react";
import type { FinderState } from "../../../types/client-finder";
import StepWelcome from "./steps/StepWelcome";
import StepNiche from "./steps/StepNiche";
import StepChannelSize from "./steps/StepChannelSize";
import StepActivity from "./steps/StepActivity";
import StepOpportunity from "./steps/StepOpportunity";
import StepReview from "./steps/StepReview";
import EnhancedUpgradeModal from '../../instant-hustle/components/EnhancedUpgradeModal';
import { usePlanGating } from '../../instant-hustle/components/PlanGatingProvider';

const steps = [
  StepWelcome,
  StepNiche,
  StepChannelSize,
  StepActivity,
  StepOpportunity,
  StepReview,
];

const stepLabels = [
  "Welcome",
  "Niche",
  "Channel Size",
  "Activity",
  "Opportunity",
  "Review"
];

export default function FinderWizard() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FinderState>({
    platform: "youtube",
    niches: [],
    subsMin: 10000,
    subsMax: 200000,
    recentDays: 60,
    regions: [],
    needThumbnailHelp: true,
    maxResults: 25,
    status: "idle",
    progress: 0,
  });
  const { userPlan } = usePlanGating();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const StepComponent = steps[step];

  return (
    <>
      {/* Sticky Progress Timeline */}
      <div className="sticky top-0 z-30 w-full flex justify-center mb-6" style={{background: 'rgba(14,14,17,0.92)', backdropFilter: 'blur(8px)'}}>
        <nav aria-label="Wizard Progress" className="w-full max-w-xl px-2 py-3">
          <ol className="flex items-center justify-between gap-2 sm:gap-4">
            {stepLabels.map((label, idx) => (
              <li key={label} className="flex-1 flex flex-col items-center">
                <div className={`w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all duration-200
                  ${step === idx ? 'bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] border-[#7F5AF0] shadow-lg scale-110' : 'bg-white/10 border-white/20'}
                `}>
                  <span className={`text-xs font-bold ${step === idx ? 'text-black' : 'text-[#F9FAFB]'}`}>{idx + 1}</span>
                </div>
                <span className={`mt-1 text-[10px] sm:text-xs font-medium ${step === idx ? 'text-[#7F5AF0]' : 'text-[#9CA3AF]'} hidden sm:block`}>{label}</span>
              </li>
            ))}
          </ol>
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#232946]/0 via-[#7F5AF0]/40 to-[#00FFC2]/30 z-0" style={{maxWidth: '100%', margin: '0 auto'}} />
        </nav>
      </div>
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-xl shadow-lg p-6 relative">
        {StepComponent ? (
          <StepComponent
            state={state}
            setState={setState}
            step={step}
            setStep={setStep}
            totalSteps={steps.length}
          />
        ) : (
          <div className="text-red-500 font-bold text-center">Step not found.</div>
        )}
        {/* Sticky Upgrade Bar for Free Users */}
        {userPlan.plan !== 'creator' && userPlan.plan !== 'pro' && (
          <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center pointer-events-none">
            <div className="pointer-events-auto w-full max-w-2xl mx-auto px-4">
              <div className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white rounded-t-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 py-4 px-6 animate-slideup">
                <span className="font-semibold text-base sm:text-lg drop-shadow">Upgrade to <span className="text-black font-bold">Creator</span> for unlimited AI hooks & captions – starting at <span className="text-black font-bold">₹199!</span></span>
                <button
                  className="mt-2 sm:mt-0 bg-black text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-[#232136] transition-all border-2 border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFC2] focus:ring-offset-2 animate-glow"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Upgrade Now
                </button>
              </div>
            </div>
            <style jsx global>{`
              @keyframes slideup {
                0% { transform: translateY(100%); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
              }
              .animate-slideup {
                animation: slideup 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
              }
              @keyframes glow {
                0%,100% { box-shadow: 0 0 16px 2px #00FFC2, 0 0 0 #7F5AF0; }
                50% { box-shadow: 0 0 32px 8px #7F5AF0, 0 0 16px 2px #00FFC2; }
              }
              .animate-glow {
                animation: glow 2s ease-in-out infinite;
              }
            `}</style>
          </div>
        )}
        <EnhancedUpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={() => setShowUpgradeModal(false)}
        />
      </div>
    </>
  );
} 