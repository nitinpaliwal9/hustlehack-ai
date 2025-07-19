// Core application types

export interface User {
  id: string
  email: string
  name?: string
  role?: string
  phone?: string
  avatar?: string
  created_at: string
  updated_at: string
  email_confirmed_at?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface Plan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'monthly' | 'yearly'
  features: string[]
  isPopular?: boolean
}

export interface ContentRequest {
  contentType: 'social-media' | 'blog' | 'email' | 'ad-copy' | 'product-description'
  topic: string
  tone: 'professional' | 'casual' | 'friendly' | 'formal' | 'enthusiastic'
  length: 'short' | 'medium' | 'long'
  userId?: string
}

export interface ContentResponse {
  content: string
  error?: string
}

export interface PaymentRequest {
  email: string
  amount: number
  planId?: string
}

export interface PaymentResponse {
  orderId: string
  error?: string
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface FormField {
  name: string
  value: string
  error?: string
  touched?: boolean
}

export interface FormState {
  [key: string]: FormField
}

export interface PasswordStrength {
  score: number
  feedback: string
}

export interface AuditLog {
  id: string
  action: string
  level: 'info' | 'warning' | 'error' | 'security' | 'critical'
  details: string
  user_id?: string
  ip_address?: string
  user_agent?: string
  timestamp: string
  environment: string
}

export interface UsageLog {
  id: string
  user_id: string
  action_type: string
  tool_used: string
  timestamp: string
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
}

export interface CacheItem {
  data: any
  timestamp: number
  ttl: number
}

export interface ImageProps {
  src: string
  width: number
  height: number
  quality?: number
  format?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  className?: string
}

// Component prop types
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  onClick?: (e: React.MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
}

export interface InputProps {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  type?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  onFocus?: (e: React.FocusEvent) => void
  onBlur?: (e: React.FocusEvent) => void
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  className?: string
  onClick?: () => void
}

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'gray' | 'primary' | 'success' | 'warning' | 'danger'
  message?: string
  className?: string
}

// API response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Event types
export interface GlobalLoadingEvent {
  show: boolean
  message?: string
}

export interface NotificationEvent {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// Environment types
export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test'
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  HF_API_TOKEN: string
  RAZORPAY_KEY_ID: string
  RAZORPAY_KEY_SECRET: string
} 