"use client"

import { useState, useEffect } from 'react'

export default function OfflineNotification() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
    }

    const handleOffline = () => {
      setIsOffline(true)
    }

    // Check initial state
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine)
    }

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[99999] bg-red-600 text-white p-4 rounded-lg shadow-lg border border-red-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">📡</span>
          <div>
            <h3 className="font-semibold">You're offline</h3>
            <p className="text-sm text-red-100">
              Some features may not work properly. Please check your internet connection.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOffline(false)}
          className="text-red-100 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  )
} 