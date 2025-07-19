"use client"

import { Suspense, lazy } from 'react'

// Lazy loading wrapper component
export function LazyComponent({ 
  component: Component, 
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />,
  ...props 
}) {
  return (
    <Suspense fallback={fallback}>
      <Component key={typeof window !== 'undefined' ? window.location.pathname : 'component'} {...props} />
    </Suspense>
  )
}

// Pre-defined lazy components for common use cases
export const LazyDashboard = lazy(() => import('../dashboard/DashboardClient'))
export const LazyProfile = lazy(() => import('../complete-profile/CompleteProfileClient'))
export const LazyNavigation = lazy(() => import('./Navigation'))
export const LazyFooter = lazy(() => import('./Footer'))
export const LazyErrorBoundary = lazy(() => import('./ErrorBoundary'))
export const LazyLoadingSpinner = lazy(() => import('./LoadingSpinner'))

// Lazy loading for resource pages
export const LazyResourcePage = lazy(() => import('../resources/page'))
export const LazyAboutPage = lazy(() => import('../about/page'))
export const LazyContactPage = lazy(() => import('../contact/page'))

// Lazy loading for tools
export const LazyAIContentGenerator = lazy(() => import('../tools/ai-content-generator/page'))

// Lazy loading for policy pages
export const LazyPrivacyPolicy = lazy(() => import('../policies/privacy-policy/page'))
export const LazyTermsConditions = lazy(() => import('../policies/terms-and-conditions/page'))
export const LazyCookiePolicy = lazy(() => import('../policies/cookie-policy/page'))
export const LazyGDPR = lazy(() => import('../policies/gdpr/page')) 