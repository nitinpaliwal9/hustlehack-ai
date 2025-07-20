'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// @ts-ignore
import { supabase as _supabase } from '../../../lib/supabaseClient';
const supabase: any = _supabase;

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
    const checkUserPlan = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setUserPlan({ plan: 'starter', isAuthenticated: false });
          setIsLoading(false);
          return;
        }
        // Fetch subscription for this user
        const { data: subscription, error } = await supabase
          .from('subscriptions')
          .select('plan_name')
          .eq('user_id', user.id)
          .single();
        let plan: Plan = 'starter';
        if (subscription && subscription.plan_name && subscription.plan_name !== 'Not Active') {
          plan = subscription.plan_name;
        }
        setUserPlan({ plan, userId: user.id, isAuthenticated: true });
      } catch (error) {
        setUserPlan({ plan: 'starter', isAuthenticated: false });
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