'use client';

import { useState } from 'react';
import PlatformSelector from './PlatformSelector';
import NicheSelector from './NicheSelector';
import HookGenerator from './HookGenerator';
import TemplateGrid from './TemplateGrid';
import CTASection from './CTASection';
import UsageMeter from './UsageMeter';
import EnhancedUpgradeModal from './EnhancedUpgradeModal';
import MobileNavigation from './MobileNavigation';
import Toast from './Toast';
import { usePlanGating } from './PlanGatingProvider';

type Step = 'platform' | 'niche' | 'hooks' | 'templates';

export default function InstantHustleLite() {
  const [currentStep, setCurrentStep] = useState<Step>('platform');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedNiche, setSelectedNiche] = useState<string>('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  
  const { userPlan, canAccessFullContent, upgradePlan } = usePlanGating();

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setCurrentStep('niche');
    showToast('Platform selected!', 'success');
  };

  const handleNicheSelect = (niche: string) => {
    setSelectedNiche(niche);
    setCurrentStep('hooks');
    showToast('Niche selected!', 'success');
  };

  const handleNextStep = () => {
    if (currentStep === 'hooks') {
      setCurrentStep('templates');
      showToast('Moving to templates!', 'info');
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'niche') {
      setCurrentStep('platform');
    } else if (currentStep === 'hooks') {
      setCurrentStep('niche');
    } else if (currentStep === 'templates') {
      setCurrentStep('hooks');
    }
  };

  const handleUpgradeModal = (plan: 'creator' | 'pro') => {
    console.log('Upgrading to:', plan);
    setShowUpgradeModal(false);
    showToast(`Upgrading to ${plan} plan!`, 'success');
    // TODO: Implement actual upgrade flow
    upgradePlan();
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const canProceed = () => {
    if (currentStep === 'platform') return selectedPlatform !== '';
    if (currentStep === 'niche') return selectedNiche !== '';
    if (currentStep === 'hooks') return true;
    if (currentStep === 'templates') return true;
    return false;
  };

  const getStepIndex = (step: Step) => {
    const steps = ['platform', 'niche', 'hooks', 'templates'];
    return steps.indexOf(step);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-32 md:pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Instant Hustle <span className="text-[#00FFC2]">Lite</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            AI-powered content creation tools for creators, students, and solopreneurs
          </p>
          {userPlan.plan === 'starter' && (
            <div className="mt-4 inline-flex items-center bg-[#7F5AF0]/20 text-[#7F5AF0] px-4 py-2 rounded-full text-sm animate-pulse">
              <span className="mr-2">⭐</span>
              Starter Plan - Upgrade for unlimited access
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 md:space-x-4">
            {['platform', 'niche', 'hooks', 'templates'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep === step 
                    ? 'bg-[#7F5AF0] text-white scale-110' 
                    : index < getStepIndex(currentStep)
                    ? 'bg-[#00FFC2] text-black'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-8 md:w-12 h-1 mx-2 transition-all duration-300 ${
                    index < getStepIndex(currentStep)
                      ? 'bg-[#00FFC2]'
                      : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Usage Meter for Starter Users */}
        {(currentStep === 'hooks' || currentStep === 'templates') && <UsageMeter />}

        {/* Step Content */}
        <div className="bg-[#232136]/90 backdrop-blur-sm rounded-lg shadow-xl p-6 min-h-[500px] transition-all duration-300">
          {currentStep === 'platform' && (
            <PlatformSelector onSelect={handlePlatformSelect} />
          )}
          
          {currentStep === 'niche' && (
            <NicheSelector 
              platform={selectedPlatform}
              onSelect={handleNicheSelect}
              onBack={() => setCurrentStep('platform')}
            />
          )}
          
          {currentStep === 'hooks' && (
            <HookGenerator 
              platform={selectedPlatform}
              niche={selectedNiche}
              onNext={handleNextStep}
              onBack={() => setCurrentStep('niche')}
            />
          )}
          
          {currentStep === 'templates' && (
            <TemplateGrid 
              platform={selectedPlatform}
              niche={selectedNiche}
              onBack={() => setCurrentStep('hooks')}
            />
          )}
        </div>

        {/* CTA Section */}
        <CTASection />

        {/* Enhanced Upgrade Modal */}
        <EnhancedUpgradeModal 
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={handleUpgradeModal}
        />

        {/* Toast */}
        <Toast 
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={closeToast}
        />

        {/* Mobile Navigation */}
        <MobileNavigation
          currentStep={getStepIndex(currentStep)}
          totalSteps={4}
          onBack={handleBackStep}
          onNext={handleNextStep}
          canProceed={canProceed()}
        />
      </div>
      {/* Sticky Upgrade Bar for Free Users */}
      {userPlan.plan === 'starter' && (
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
    </div>
  );
} 