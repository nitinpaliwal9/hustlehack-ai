'use client';

import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'), { ssr: false });

export default function FooterClient(props: any) {
  return <Footer {...props} />;
} 