'use client';

import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'creator' | 'pro') => void;
};

const PLANS = [
  {
    name: 'Starter',
    price: '₹99',
    period: '/month',
    features: [
      '3 AI generations',
      '5 template previews',
      'Basic hooks & captions',
      'Community support'
    ],
    current: true,
    popular: false
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
    popular: true
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
    popular: false
  }
];

export default function UpgradeModal({ isOpen, onClose, onUpgrade }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<'creator' | 'pro'>('creator');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Upgrade Your Plan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Plans */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Choose the perfect plan for your content creation needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative border-2 rounded-lg p-6 ${
                  plan.popular 
                    ? 'border-[#7F5AF0] bg-[#7F5AF0]/5' 
                    : plan.current
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 hover:border-[#7F5AF0]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#7F5AF0] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-800">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#00FFC2] mr-2">✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
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
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-[#7F5AF0] text-white hover:bg-[#6B46C1]'
                        : 'bg-[#00FFC2] text-black hover:bg-[#00E6B8]'
                    }`}
                  >
                    Upgrade to {plan.name}
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
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>All plans include a 7-day free trial</p>
            <p>Cancel anytime • No setup fees</p>
          </div>
        </div>
      </div>
    </div>
  );
} 