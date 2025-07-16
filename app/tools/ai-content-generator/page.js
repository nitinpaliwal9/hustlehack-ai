'use client';
import { useState, useEffect } from 'react';
import { Loader, Copy, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../../lib/supabaseClient';
import { useUserPlan } from '../../hooks/useAuth';
import { getPlanDisplayName, isPlanAtLeast } from '../../planUtils';

export default function AIContentGenerator() {
  const { user, isLoading } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
      Step 3: useAuth hook used. If you see this, useAuth is safe.<br/>
      user: {user ? JSON.stringify(user) : 'null'}, isLoading: {String(isLoading)}
    </div>
  );
}