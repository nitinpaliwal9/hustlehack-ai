'use client';
import { useState, useEffect } from 'react';
import { Loader, Copy, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../../lib/supabaseClient';
import { useUserPlan } from '../../hooks/useAuth';
import { getPlanDisplayName, isPlanAtLeast } from '../../planUtils';

export default function AIContentGenerator() {
  const { user, isLoading } = useAuth();
  const { plan, loading: planLoading } = useUserPlan(user?.id);

  const allowed = isPlanAtLeast(plan, 'creator');
  const planDisplay = getPlanDisplayName(plan);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
      Step 5: Utility functions used.<br/>
      user: {user ? JSON.stringify(user) : 'null'}, isLoading: {String(isLoading)}<br/>
      plan: {plan}, planLoading: {String(planLoading)}<br/>
      allowed: {String(allowed)}, planDisplay: {planDisplay}
    </div>
  );
}