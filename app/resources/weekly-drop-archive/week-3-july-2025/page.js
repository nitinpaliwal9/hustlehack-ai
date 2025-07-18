'use client';

import { useMemo } from 'react';
import ComingSoon from '../../../components/ComingSoon.js';

export default function Page() {
  const expectedDate = useMemo(() => {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }, []);
  return (
    <ComingSoon 
      title="Week 3 July 2025"
      description="We're crafting amazing weekly drop content just for you. Get ready for exclusive templates, tools, and strategies that will supercharge your productivity!"
      category="Weekly Drop"
      expectedDate={expectedDate}
      showNotificationSignup={true}
    />
  );
}