'use client';

import { useMemo } from 'react';
import ComingSoon from '../../components/ComingSoon.js';

export default function Page() {
  const expectedDate = useMemo(() => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }, []);
  return (
    <ComingSoon 
      title="Reels And Video Shorts"
      description="We're crafting amazing video content content just for you. Get ready for exclusive templates, tools, and strategies that will supercharge your productivity!"
      category="Video Content"
      expectedDate={expectedDate}
      showNotificationSignup={true}
    />
  );
}