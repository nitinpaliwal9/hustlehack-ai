'use client';

type Props = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  isGenerating?: boolean;
};

export default function MobileNavigation({ 
  currentStep, 
  totalSteps, 
  onBack, 
  onNext, 
  canProceed, 
  isGenerating = false 
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex items-center justify-between p-4 pb-6">
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-[#7F5AF0] hover:bg-[#7F5AF0]/10'
          }`}
        >
          <span className="mr-2">←</span>
          Back
        </button>

        {/* Progress indicator */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentStep
                  ? 'bg-[#00FFC2]'
                  : index === currentStep
                  ? 'bg-[#7F5AF0]'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={!canProceed || isGenerating}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
            !canProceed || isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#7F5AF0] text-white hover:bg-[#6B46C1] shadow-lg'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              Next
              <span className="ml-2">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 