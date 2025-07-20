'use client';

import dynamic from 'next/dynamic';

const TestimonialsSlider = dynamic(() => import('./TestimonialsSlider'), {
  ssr: false,
});

export default function TestimonialsSliderClient() {
  return <TestimonialsSlider />;
} 