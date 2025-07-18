'use client';

import { useMemo } from 'react';
import ComingSoon from '../../../components/ComingSoon.js';

export default function Page() {
  const expectedDate = useMemo(() => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }, []);
  return (
    <ComingSoon 
      title="Beautiful Ai"
      description="We're crafting amazing ai tool content just for you. Get ready for exclusive templates, tools, and strategies that will supercharge your productivity!"
      category="AI Tool"
      expectedDate={expectedDate}
      showNotificationSignup={true}
    />
  );
}