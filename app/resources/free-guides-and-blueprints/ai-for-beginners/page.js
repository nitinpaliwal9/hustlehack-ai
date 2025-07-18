'use client';

import { useMemo } from 'react';
import ComingSoon from '../../../components/ComingSoon.js';

export default function Page() {
  const expectedDate = useMemo(() => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }, []);
  return (
    <ComingSoon 
      title="Ai For Beginners"
      description="We're crafting amazing guide content just for you. Get ready for exclusive templates, tools, and strategies that will supercharge your productivity!"
      category="Guide"
      expectedDate={expectedDate}
      showNotificationSignup={true}
    />
  );
}