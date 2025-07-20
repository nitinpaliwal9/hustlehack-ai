'use client';

import { useState, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'creator' | 'pro') => void;
};

const PLANS = [
  {
    name: 'Starter',
    price: 'FREE',
    period: '',
    features: [
      '3 AI generations',
      '5 template previews',
      'Basic hooks & captions',
      'Community support'
    ],
    current: true,
    popular: false,
    badge: 'FREE'
  },
  {
    name: 'Creator',
    price: '₹199',
    period: '/month',
    features: [
      'Unlimited AI generations',
      '50+ premium templates',
      'Advanced hooks & captions',
      'Priority support',
      'Custom branding'
    ],
    current: false,
    popular: true,
    badge: 'MOST POPULAR'
  },
  {
    name: 'Pro',
    price: '₹299',
    period: '/month',
    features: [
      'Everything in Creator',
      '100+ premium templates',
      'AI-powered templates',
      'White-label options',
      'Dedicated support',
      'API access'
    ],
    current: false,
    popular: false,
    badge: 'PREMIUM'
  }
];

export default function EnhancedUpgradeModal({ isOpen, onClose, onUpgrade }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#7F5AF0]/5 to-[#00FFC2]/5">
          <h2 className="text-2xl font-bold text-gray-800">
            Upgrade Your Plan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Plans */}
        <div className="p-6">
          <p className="text-gray-600 mb-8 text-center">
            Choose the perfect plan for your content creation needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative border-2 rounded-lg p-6 transition-all duration-300 hover:shadow-lg ${
                  plan.popular 
                    ? 'border-[#7F5AF0] bg-gradient-to-br from-[#7F5AF0]/5 to-[#00FFC2]/5 shadow-lg' 
                    : plan.current
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 hover:border-[#7F5AF0]'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: isAnimating ? 'slideInUp 0.5s ease-out forwards' : 'none'
                }}
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    plan.badge === 'FREE' 
                      ? 'bg-green-500 text-white'
                      : plan.badge === 'MOST POPULAR'
                      ? 'bg-[#7F5AF0] text-white animate-pulse'
                      : 'bg-[#00FFC2] text-black'
                  }`}>
                    {plan.badge}
                  </span>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-3xl font-bold ${
                      plan.price === 'FREE' ? 'text-green-600' : 'text-gray-800'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className={`mr-2 ${
                        plan.popular ? 'text-[#7F5AF0]' : 'text-[#00FFC2]'
                      }`}>✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                      {plan.popular && featureIndex < 2 && (
                        <span className="ml-2 text-xs bg-[#7F5AF0] text-white px-1 rounded animate-pulse">
                          NEW
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {!plan.current && (
                  <button
                    onClick={() => {
                      if (plan.name === 'Creator') {
                        onUpgrade('creator');
                      } else if (plan.name === 'Pro') {
                        onUpgrade('pro');
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#7F5AF0] to-[#6B46C1] text-white hover:shadow-lg'
                        : 'bg-[#00FFC2] text-black hover:bg-[#00E6B8]'
                    }`}
                  >
                    {plan.price === 'FREE' ? 'Get Started' : `Upgrade to ${plan.name}`}
                  </button>
                )}

                {plan.current && (
                  <div className="text-center text-gray-500 text-sm">
                    Current Plan
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-[#7F5AF0]/10 to-[#00FFC2]/10 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                ✨ All plans include a 7-day free trial
              </p>
              <p className="text-xs text-gray-500">
                Cancel anytime • No setup fees • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 