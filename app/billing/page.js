'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { 
  Crown, 
  Star, 
  Zap, 
  Check, 
  X, 
  CreditCard, 
  Calendar, 
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Gift,
  Users,
  Sparkles,
  Shield,
  Globe,
  BarChart3,
  FileText,
  Video,
  Music,
  Palette,
  Code,
  Brain,
  Rocket
} from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function BillingPage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  
  // State for billing data
  const [billingData, setBillingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [isFirst100User, setIsFirst100User] = useState(false)

  // Plans configuration
  const plans = [
    {
      id: 'starter',
      name: 'Starter Hustler',
      price: 0,
      originalPrice: 999,
      currency: '₹',
      period: 'month',
      description: 'Perfect for beginners getting started with AI tools',
      features: [
        'Access to basic AI tools',
        '5 content generations per day',
        'Basic templates library',
        'Community support',
        'Email support'
      ],
      limitations: [
        'Limited AI tool access',
        'No priority support',
        'Basic analytics'
      ],
      color: 'from-gray-500 to-gray-700',
      icon: Zap,
      popular: false
    },
    {
      id: 'creator',
      name: 'Creator Mode',
      price: 0, // Free for first 100 users
      originalPrice: 2999,
      currency: '₹',
      period: 'month',
      description: 'Everything you need to create amazing content',
      features: [
        'All Starter features',
        'Unlimited content generation',
        'Advanced AI tools',
        'Premium templates',
        'Priority support',
        'Creator badge',
        'Advanced analytics',
        'Custom prompts library',
        'Video generation tools',
        'Social media automation'
      ],
      limitations: [
        'No API access',
        'Limited team features'
      ],
      color: 'from-blue-500 to-purple-600',
      icon: Crown,
      popular: true,
      specialOffer: 'FREE for First 100 Users! 🎉'
    },
    {
      id: 'pro',
      name: 'Pro Hacker',
      price: 4999,
      originalPrice: 7999,
      currency: '₹',
      period: 'month',
      description: 'Ultimate power for serious entrepreneurs',
      features: [
        'All Creator features',
        'Unlimited everything',
        'API access',
        'Team collaboration',
        'White-label solutions',
        'Dedicated support',
        'Custom integrations',
        'Advanced analytics',
        'Priority feature access',
        'Exclusive workshops'
      ],
      limitations: [],
      color: 'from-yellow-400 to-orange-500',
      icon: Star,
      popular: false
    }
  ]

  // Load billing data on component mount
  useEffect(() => {
    if (user && !isLoading) {
      loadBillingData()
    }
  }, [user, isLoading])

  const loadBillingData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user's subscription data
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (subError && subError.code !== 'PGRST116') {
        console.error('Error loading subscription:', subError)
        setError('Failed to load subscription data')
        return
      }

      // Fetch user's profile data
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('created_at, plan')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('Error loading profile:', profileError)
        setError('Failed to load profile data')
        return
      }

      // Check if user is in first 100
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', profile.created_at)

      const isFirst100 = userCount < 100
      setIsFirst100User(isFirst100)

      // Fetch payment history from API
      const paymentHistoryData = await fetchPaymentHistory()

      setBillingData({
        subscription: subscription || {
          plan_name: 'starter',
          expiry_date: null,
          created_at: new Date().toISOString()
        },
        profile,
        isFirst100User: isFirst100,
        paymentHistory: paymentHistoryData
      })

    } catch (error) {
      console.error('Error in loadBillingData:', error)
      setError('Failed to load billing data')
    } finally {
      setLoading(false)
    }
  }

  const fetchPaymentHistory = async () => {
    try {
      // Fetch payment history from database
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching payment history:', error)
        return []
      }

      // Transform payment data to match UI format
      return payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency === 'INR' ? '₹' : payment.currency,
        status: payment.status,
        plan: payment.plan_id === 'creator' ? 'Creator Mode' : 
              payment.plan_id === 'pro' ? 'Pro Hacker' : 
              payment.plan_id === 'starter' ? 'Starter Hustler' : payment.plan_id,
        date: payment.created_at,
        description: payment.plan_id === 'creator' && payment.amount === 0 
          ? 'First 100 Users - Free Creator Mode' 
          : `${payment.plan_id} Plan Purchase`,
        payment_method: payment.payment_method || 'Online Payment'
      }))
    } catch (error) {
      console.error('Error fetching payment history:', error)
      return []
    }
  }

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan)
  }

  const handleUpgrade = async (plan) => {
    if (!user) {
      router.push('/auth')
      return
    }

    setProcessingPayment(true)

    try {
      // For first 100 users, Creator Mode is free
      if (plan.id === 'creator' && isFirst100User) {
        await upgradeToCreatorMode()
      } else {
        // Redirect to payment gateway
        await initiatePayment(plan)
      }
    } catch (error) {
      console.error('Error upgrading plan:', error)
      setError('Failed to process upgrade. Please try again.')
    } finally {
      setProcessingPayment(false)
    }
  }

  const upgradeToCreatorMode = async () => {
    try {
      // Update subscription
      const { error: subError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          plan_name: 'creator',
          expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          updated_at: new Date().toISOString()
        })

      if (subError) {
        throw subError
      }

      // Update user plan
      const { error: userError } = await supabase
        .from('users')
        .update({
          plan: 'creator',
          plan_start: new Date().toISOString(),
          plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (userError) {
        throw userError
      }

      // Reload billing data
      await loadBillingData()
      
      // Show success message
      alert('🎉 Congratulations! You\'ve been upgraded to Creator Mode for FREE!')
      
    } catch (error) {
      console.error('Error upgrading to Creator Mode:', error)
      throw error
    }
  }

  const initiatePayment = async (plan) => {
    try {
      // Create payment intent with your payment gateway
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.price,
          currency: 'inr',
          userId: user.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret, paymentIntentId } = await response.json()

      // Redirect to payment gateway or open payment modal
      // This would integrate with Razorpay, Stripe, or your preferred gateway
      console.log('Payment intent created:', { clientSecret, paymentIntentId })
      
      // For now, show a message
      alert(`Redirecting to payment gateway for ${plan.name}...`)
      
    } catch (error) {
      console.error('Error initiating payment:', error)
      throw error
    }
  }

  const getCurrentPlan = () => {
    if (!billingData) return null
    
    return plans.find(plan => plan.id === billingData.subscription.plan_name) || plans[0]
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500'
      case 'pending': return 'text-yellow-500'
      case 'failed': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />
      case 'pending': return <Clock className="w-5 h-5" />
      case 'failed': return <AlertCircle className="w-5 h-5" />
      default: return <Clock className="w-5 h-5" />
    }
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7F5AF0] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading billing information...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/')
    return null
  }

  const currentPlan = getCurrentPlan()

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
              Billing & Subscriptions
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Upgrade, downgrade, or manage your subscription anytime.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          {/* Current Plan Status */}
          {billingData && currentPlan && (
            <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Current Plan</h2>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <currentPlan.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#7F5AF0]" />
                    <span className="text-lg sm:text-xl font-semibold text-white">{currentPlan.name}</span>
                    {billingData.subscription.plan_name === 'creator' && isFirst100User && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        First 100 User
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-300">
                    {billingData.subscription.expiry_date 
                      ? `Expires on ${formatDate(billingData.subscription.expiry_date)}`
                      : 'No expiry date set'
                    }
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {currentPlan.price === 0 ? 'FREE' : `${currentPlan.currency}${currentPlan.price}`}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">per {currentPlan.period}</div>
                </div>
              </div>
            </div>
          )}

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {plans.map((plan) => {
              const isCurrentPlan = billingData?.subscription?.plan_name === plan.id
              const isUpgradeable = !isCurrentPlan && (
                (plan.id === 'creator' && isFirst100User) ||
                (plan.id === 'pro' && billingData?.subscription?.plan_name === 'creator')
              )

              return (
                <div
                  key={plan.id}
                  className={`relative bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-4 sm:p-6 hover:shadow-xl transition-all duration-300 ${
                    selectedPlan?.id === plan.id ? 'ring-2 ring-[#7F5AF0]' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#7F5AF0] to-[#6D4DC6] text-white px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Special Offer Badge */}
                  {plan.specialOffer && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {plan.specialOffer}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-4 sm:mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${plan.color} mb-3 sm:mb-4`}>
                      <plan.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                        {plan.price === 0 ? 'FREE' : `${plan.currency}${plan.price}`}
                      </span>
                      {plan.originalPrice > plan.price && (
                        <span className="text-gray-400 line-through ml-2 text-sm sm:text-base">
                          {plan.currency}{plan.originalPrice}
                        </span>
                      )}
                      <span className="text-gray-400 text-xs sm:text-sm">/{plan.period}</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3">
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                        <span className="text-gray-400 text-xs sm:text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => isCurrentPlan ? null : handleUpgrade(plan)}
                    disabled={isCurrentPlan || processingPayment}
                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      isCurrentPlan
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : isUpgradeable
                        ? 'bg-gradient-to-r from-[#7F5AF0] to-[#6D4DC6] text-white hover:from-[#6D4DC6] hover:to-[#5A3FA3]'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {isCurrentPlan ? 'Current Plan' : 
                     processingPayment ? 'Processing...' : 
                     isUpgradeable ? 'Upgrade Now' : 'Coming Soon'}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Payment History */}
          <div className="bg-[rgba(36,41,46,0.96)] rounded-xl shadow-lg border border-[var(--border-color)] p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Payment History</h2>
              <button
                onClick={loadBillingData}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {billingData?.paymentHistory?.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {billingData.paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-800 rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-2 rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm sm:text-base">{payment.description}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">{formatDate(payment.date)}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-white font-bold text-sm sm:text-base">
                        {payment.amount === 0 ? 'FREE' : `${payment.currency}${payment.amount}`}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">{payment.payment_method}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300">No payment history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 