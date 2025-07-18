'use client';

import { useState, useEffect } from 'react';
import { Clock, Sparkles, Rocket, ArrowLeft, Bell, Star } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon({ 
  title = "Coming Soon", 
  description = "We're working hard to bring you amazing content. Stay tuned!",
  category = "Resource",
  expectedDate = null,
  showNotificationSignup = true 
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate time until a default date (30 days from now)
  useEffect(() => {
    const targetDate = expectedDate ? new Date(expectedDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // If countdown is finished, clear the timer
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Remove expectedDate from dependencies to prevent infinite re-renders

  const handleSubscribe = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!email) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              {category}
            </span>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {unit}
              </div>
            </div>
          ))}
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Rocket className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Premium Content</h3>
            <p className="text-gray-400 text-sm">
              Exclusive resources and templates designed for maximum impact
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Star className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Curated Quality</h3>
            <p className="text-gray-400 text-sm">
              Handpicked tools and strategies that actually work
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Time-Saving</h3>
            <p className="text-gray-400 text-sm">
              Ready-to-use templates that save you hours of work
            </p>
          </div>
        </div>

        {/* Notification Signup */}
        {showNotificationSignup && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Get Notified</h3>
            </div>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Subscribing...' : 'Notify Me'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-green-400 font-semibold">You're on the list!</p>
                <p className="text-gray-400 text-sm mt-2">We'll notify you as soon as this is ready.</p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/resources"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          
          <Link 
            href="/dashboard"
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20 hover:border-white/40"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 