'use client'

import React, { useState, useEffect } from 'react'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'

const LoadingSpinner = ({ 
  message = 'Loading...', 
  timeout = 30000, // 30 seconds
  onTimeout = null,
  showRetry = true,
  onRetry = null,
  className = '',
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const [isTimedOut, setIsTimedOut] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    setIsTimedOut(false)
    setTimeElapsed(0)

    const timer = setTimeout(() => {
      setIsTimedOut(true)
      if (onTimeout) onTimeout()
    }, timeout)

    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1000)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [timeout, onTimeout])

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const containerClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  }

  if (isTimedOut) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${containerClasses[size]} ${className}`}>
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-orange-600" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">
            Taking longer than expected
          </h3>
          <p className="text-[#9CA3AF] text-sm mb-4">
            This is taking a while. There might be a network issue or the server is busy.
          </p>
          
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${containerClasses[size]} ${className}`}>
      <Loader2 className={`animate-spin text-purple-600 ${sizeClasses[size]}`} />
      <div className="text-center">
        <p className="text-gray-700 font-medium">{message}</p>
        {timeElapsed > 5000 && (
          <p className="text-gray-500 text-sm mt-1">
            {Math.floor(timeElapsed / 1000)}s elapsed...
          </p>
        )}
      </div>
    </div>
  )
}

export default LoadingSpinner
