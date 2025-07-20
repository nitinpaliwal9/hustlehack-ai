'use client';

import { usePlanGating } from './PlanGatingProvider';

export default function UsageMeter() {
  const { userPlan, remainingGenerations, maxGenerations, upgradePlan } = usePlanGating();

  if (userPlan.plan === 'creator' || userPlan.plan === 'pro') {
    return null; // Don't show for premium users
  }

  const usagePercentage = ((maxGenerations - remainingGenerations) / maxGenerations) * 100;
  const isNearLimit = usagePercentage >= 80;

  return (
    <div className="bg-gradient-to-r from-[#7F5AF0]/10 to-[#00FFC2]/10 border border-[#7F5AF0]/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#7F5AF0] rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">
            AI Generations Used
          </span>
        </div>
        <span className="text-sm font-semibold text-[#7F5AF0]">
          {remainingGenerations}/{maxGenerations}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isNearLimit ? 'bg-red-500' : 'bg-[#7F5AF0]'
          }`}
          style={{ width: `${usagePercentage}%` }}
        ></div>
      </div>
      
      {isNearLimit && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-red-600 font-medium">
            ⚠️ Running low on generations
          </span>
          <button
            onClick={upgradePlan}
            className="text-xs bg-[#7F5AF0] text-white px-3 py-1 rounded-full hover:bg-[#6B46C1] transition-colors"
          >
            Upgrade Now
          </button>
        </div>
      )}
      
      {!isNearLimit && (
        <div className="text-xs text-gray-500">
          Upgrade to Creator for unlimited AI generations
        </div>
      )}
    </div>
  );
} 