'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Plan = 'starter' | 'creator' | 'pro';

type UserPlan = {
  plan: Plan;
  userId?: string;
  isAuthenticated: boolean;
};

type PlanGatingContextType = {
  userPlan: UserPlan;
  isLoading: boolean;
  canAccessFullContent: boolean;
  canGenerateAI: boolean;
  remainingGenerations: number;
  maxGenerations: number;
  upgradePlan: () => void;
};

const PlanGatingContext = createContext<PlanGatingContextType | undefined>(undefined);

export function usePlanGating() {
  const context = useContext(PlanGatingContext);
  if (!context) {
    throw new Error('usePlanGating must be used within PlanGatingProvider');
  }
  return context;
}

type Props = {
  children: ReactNode;
};

export default function PlanGatingProvider({ children }: Props) {
  const [userPlan, setUserPlan] = useState<UserPlan>({
    plan: 'starter',
    isAuthenticated: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual Supabase auth check
    const checkUserPlan = async () => {
      try {
        // Mock user plan check - replace with Supabase
        const mockPlan = 'starter' as Plan; // Change to 'creator' or 'pro' for testing
        setUserPlan({
          plan: mockPlan,
          userId: 'mock-user-id',
          isAuthenticated: true
        });
      } catch (error) {
        console.error('Error checking user plan:', error);
        setUserPlan({
          plan: 'starter',
          isAuthenticated: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkUserPlan();
  }, []);

  const canAccessFullContent = userPlan.plan === 'creator' || userPlan.plan === 'pro';
  const canGenerateAI = userPlan.plan === 'creator' || userPlan.plan === 'pro';
  
  const maxGenerations = userPlan.plan === 'starter' ? 5 : Infinity;
  const remainingGenerations = userPlan.plan === 'starter' ? 3 : Infinity; // Mock remaining count

  const upgradePlan = () => {
    // TODO: Implement upgrade flow
    console.log('Upgrade plan clicked');
    window.open('/billing', '_blank');
  };

  const value: PlanGatingContextType = {
    userPlan,
    isLoading,
    canAccessFullContent,
    canGenerateAI,
    remainingGenerations,
    maxGenerations,
    upgradePlan
  };

  return (
    <PlanGatingContext.Provider value={value}>
      {children}
    </PlanGatingContext.Provider>
  );
} 