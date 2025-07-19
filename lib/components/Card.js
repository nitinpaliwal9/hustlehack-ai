"use client"

import { forwardRef } from 'react'
import classNames from '../utils/classNames'

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  hover = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const baseClasses = 'bg-white rounded-lg border transition-all duration-200'
  
  const variants = {
    default: 'border-gray-200',
    elevated: 'border-gray-200 shadow-lg',
    outlined: 'border-2 border-gray-300',
    filled: 'bg-gray-50 border-gray-200'
  }
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
  
  const hoverEffects = {
    none: '',
    lift: 'hover:shadow-lg hover:-translate-y-1',
    glow: 'hover:shadow-lg hover:shadow-purple-500/25',
    scale: 'hover:scale-105'
  }
  
  const classes = classNames(
    baseClasses,
    variants[variant],
    paddings[padding],
    shadows[shadow],
    hover && hoverEffects.lift,
    onClick && 'cursor-pointer',
    className
  )
  
  return (
    <div
      ref={ref}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

// Card sub-components
Card.Header = ({ children, className = '', ...props }) => (
  <div className={classNames('border-b border-gray-200 pb-4 mb-4', className)} {...props}>
    {children}
  </div>
)

Card.Body = ({ children, className = '', ...props }) => (
  <div className={classNames('', className)} {...props}>
    {children}
  </div>
)

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={classNames('border-t border-gray-200 pt-4 mt-4', className)} {...props}>
    {children}
  </div>
)

Card.Title = ({ children, className = '', ...props }) => (
  <h3 className={classNames('text-lg font-semibold text-gray-900', className)} {...props}>
    {children}
  </h3>
)

Card.Subtitle = ({ children, className = '', ...props }) => (
  <p className={classNames('text-sm text-gray-600 mt-1', className)} {...props}>
    {children}
  </p>
)

export default Card 