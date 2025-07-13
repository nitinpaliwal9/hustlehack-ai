'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../hooks/useAuth';
import Link from 'next/link';
import DashboardCard from '../../components/DashboardCard';

export default function DashboardClient() {
  const [userData, setUserData] = useState({ 
    name: 'Hustler', 
    email: 'Email: Not available', 
    plan: 'Not active', 
    expiry: 'Data not available' 
  });
  const [resources, setResources] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (!user) {
          console.warn("User not logged in or session not ready");
          return;
        }

        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('plan_name, expiry_date')
          .eq('user_id', user.id)
          .single();

        if (subError) throw subError;

        const { data: resources, error: resError } = await supabase
          .from('resources')
          .select('id, name, category, min_plan');
        if (resError) throw resError;

        const { data: activity, error: actError } = await supabase
          .from('user_activity')
          .select('action, resource_name, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        if (actError) throw actError;

        setUserData({
          name: user.user_metadata?.name || `Hello, ${user.email.split('@')[0]}!`,
          email: user.email,
          plan: subscription?.plan_name || 'Not active',
          expiry: subscription?.expiry_date || 'Data not available'
        });

        const unlockedResources = resources.map(resource => ({
          ...resource,
          unlocked: subscription?.plan_name && subscription.plan_name.localeCompare(resource.min_plan) >= 0
        }));

        setResources(unlockedResources);
        setRecentActivity(activity || []);
      } catch (error) {
        console.error('[Dashboard] Error fetching user:', error.message);
        
        // Fallback resources to show even without database data
        const fallbackResources = [
          { id: 1, name: 'Social Media Prompt Pack', category: 'Toolkits & Templates', min_plan: 'starter', unlocked: userData.plan === 'creator' || userData.plan === 'pro' },
          { id: 2, name: 'AI Content Generator', category: 'Weekly Drops', min_plan: 'creator', unlocked: userData.plan === 'creator' || userData.plan === 'pro' },
          { id: 3, name: 'Advanced Automation Scripts', category: 'Pro Tools', min_plan: 'pro', unlocked: userData.plan === 'pro' },
          { id: 4, name: 'Study Guide Templates', category: 'Prompt Packs', min_plan: 'starter', unlocked: userData.plan === 'creator' || userData.plan === 'pro' },
          { id: 5, name: 'Business Plan Generator', category: 'Toolkits & Templates', min_plan: 'creator', unlocked: userData.plan === 'creator' || userData.plan === 'pro' },
          { id: 6, name: 'Premium AI Models', category: 'Weekly Drops', min_plan: 'pro', unlocked: userData.plan === 'pro' }
        ];
        
        setResources(fallbackResources);
        setRecentActivity([
          { action: 'accessed', resource_name: 'Social Media Prompt Pack', created_at: new Date().toISOString() },
          { action: 'downloaded', resource_name: 'AI Content Generator', created_at: new Date(Date.now() - 86400000).toISOString() }
        ]);
      } finally {
        setLoading(false);
        console.log('[Dashboard] User info loaded:', userData);
      }
    };
    console.log('[Dashboard] Fetching user data...');
    fetchData();
  }, []);

  const logUserActivity = async (resourceName) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_activity')
        .insert({
          user_id: user.id,
          action: 'accessed',
          resource_name: resourceName,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      setRecentActivity(prev => [
        {
          action: 'accessed',
          resource_name: resourceName,
          created_at: new Date().toISOString()
        },
        ...prev.slice(0, 4)
      ]);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#7F5AF0] border-t-transparent mx-auto"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] opacity-20 animate-pulse"></div>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-2">Loading your dashboard...</p>
        <p className="text-gray-500 text-lg">Preparing your personalized experience</p>
        <div className="mt-6 w-64 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] animate-shimmer"></div>
        </div>
      </div>
    </div>
  );

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
<div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 hover:text-[#7F5AF0] transition-all duration-300 transform hover:scale-105">
            👋 {userData.name === 'Hustler' ? 'Hello, Hustler!' : `Hello, ${userData.name}!`}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ✉️ {userData.email === 'Email: Not available' ? 
              <span className="text-gray-400 italic">Email: Not available</span> : 
              userData.email
            }
          </p>
        </div>

        {/* Plan Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-[#7F5AF0] animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">💼 Your Plan</h2>
              <p className={`text-3xl font-bold mt-1 transition-colors ${
                userData.plan === 'Not active' ? 'text-gray-400' : 'text-[#7F5AF0]'
              }`}>
                {userData.plan === 'Not active' ? 
                  <span className="italic">Not active</span> : 
                  userData.plan
                }
              </p>
              <p className="text-gray-500 mt-2 text-lg">
                ⏳ Expires on: {userData.expiry === 'Data not available' ? 
                  <span className="text-gray-400 italic">Data not available</span> : 
                  userData.expiry
                }
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Plan Expiry Warning */}
        {userData.expiry !== 'Data not available' && new Date(userData.expiry) - new Date() < 5 * 24 * 60 * 60 * 1000 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-12 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800">Plan Expiring Soon</h3>
                <div className="mt-2 text-yellow-700">
                  <p>Your plan is about to expire soon. <a href="/#pricing" className="font-medium underline hover:text-yellow-600 transition-colors">Renew now</a> to continue accessing premium features.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center hover:text-[#7F5AF0] transition-colors">🚀 Your Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
            {resources.map((resource, index) => (
              <div key={resource.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <DashboardCard 
                  resource={resource} 
                  onAccess={logUserActivity} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center hover:text-[#7F5AF0] transition-colors">📊 Recent Activity</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            {recentActivity.length > 0 ? (
              <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
                    <span className="font-medium text-gray-900">{activity.action} {activity.resource_name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-center text-lg italic">No recent activity logged yet</p>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-2xl p-8 text-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-4">🎯 Ready to Upgrade?</h3>
          <p className="text-lg mb-6 opacity-90">Unlock premium features and boost your productivity</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#pricing" className="bg-white text-[#7F5AF0] px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Upgrade / Renew Plan
            </Link>
            <a href="mailto:hustlehackai@gmail.com" className="text-white underline hover:text-gray-100 transition-colors">
              Need help? Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
