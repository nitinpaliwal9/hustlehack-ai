"use client"

import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default function GlobalLoadingProvider({ children }) {
  // Global loading state
  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    // Listen for custom events to show/hide global loading spinner
    const show = () => setGlobalLoading(true);
    const hide = () => setGlobalLoading(false);
    window.addEventListener('show-global-loading', show);
    window.addEventListener('hide-global-loading', hide);
    return () => {
      window.removeEventListener('show-global-loading', show);
      window.removeEventListener('hide-global-loading', hide);
    };
  }, []);

  return (
    <>
      {globalLoading && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
          <LoadingSpinner message="Loading..." size="lg" />
        </div>
      )}
      {children}
    </>
  );
} 