'use client';
import { useState, useEffect } from 'react';
import { Loader, Copy, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../../lib/supabaseClient';
import { useUserPlan } from '../../hooks/useAuth';
import { getPlanDisplayName, isPlanAtLeast } from '../../planUtils';

export default function AIContentGenerator() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
      All imports present. If you see this, the error is NOT in the import statements themselves.
    </div>
  );
}