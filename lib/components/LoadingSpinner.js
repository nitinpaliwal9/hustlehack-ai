"use client"

import classNames from '../utils/classNames'

const LoadingSpinner = ({
  size = 'md',
  variant = 'default',
  message = '',
  className = ''
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  const variants = {
    default: 'text-purple-600',
    white: 'text-white',
    gray: 'text-gray-400',
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }
  
  const spinnerClasses = classNames(
    'animate-spin',
    sizes[size],
    variants[variant],
    className
  )
  
  return (
    <div className="flex flex-col items-center justify-center">
      <svg className={spinnerClasses} fill="none" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  )
}

export default LoadingSpinner 