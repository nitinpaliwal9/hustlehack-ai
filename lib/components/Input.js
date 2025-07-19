"use client"

import { forwardRef, useState } from 'react'
import classNames from '../utils/classNames'

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  type = 'text',
  size = 'md',
  fullWidth = false,
  className = '',
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  
  const baseClasses = 'block w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0'
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }
  
  const states = {
    default: 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500'
  }
  
  const getState = () => {
    if (error) return 'error'
    if (props.value && !error) return 'success'
    return 'default'
  }
  
  const classes = classNames(
    baseClasses,
    sizes[size],
    states[getState()],
    fullWidth && 'w-full',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    className
  )
  
  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }
  
  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={classes}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input 