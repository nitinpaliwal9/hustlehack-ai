'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardCard from '../../components/DashboardCard';
import UserAnalytics from './components/UserAnalytics';
import AIToolsGrid from './components/AIToolsGrid';
import ResourceLibrary from './components/ResourceLibrary';
import PromptLibrary from './components/PromptLibrary';
import QuickActions from './components/QuickActions';
import { BarChart3, Brain, BookOpen, Trophy, Settings, Bell, User, TrendingUp, Zap, FileText } from 'lucide-react';

export default function DashboardClient() {
  const { user, isAuthenticated, isLoading, supabase, checkUserProfile, criticalError, clearCriticalError } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState({ 
    name: 'Hustler', 
    email: 'Email: Not available', 
    plan: 'starter', 
    expiry: 'Data not available' 
  });
  const [resources, setResources] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileCheckError, setProfileCheckError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Only fetch data if conditions are met and we haven't already fetched for this user
    if (!isLoading && isAuthenticated && user && user.id && !profileCheckError && (!dataFetched || currentUserId !== user.id)) {
      console.log('[Dashboard] Starting data fetch for user:', user.id);
      
      const fetchData = async () => {
        setLoading(true);
        try {
          // Check if user is authenticated
          if (!isAuthenticated) {
            console.warn("User not authenticated, redirecting to home");
            router.push('/');
            return;
          }

          if (!user || !user.id) {
            console.warn("User not logged in or session not ready");
            return;
          }

          // Check if profile is complete - only call this once per user session
          if (!dataFetched || currentUserId !== user.id) {
            console.log('[Dashboard] Checking profile status for user:', user.id);
            const profileStatus = await checkUserProfile(user);
            if (profileStatus === 'incomplete') {
              console.log('Profile incomplete, redirecting to complete-profile');
              router.push('/complete-profile');
              return;
            }
          }

          const { data: subscription, error: subError } = await supabase
            .from('subscriptions')
            .select('plan_name, expiry_date')
            .eq('user_id', user.id)
            .single();

          if (subError) {
            console.warn('Subscription error:', subError);
            // Don't throw error, use fallback data instead
          }

          const { data: resources, error: resError } = await supabase
            .from('resources')
            .select('id, title, type, plan_required, description, download_url');
          if (resError) {
            console.warn('Resources error:', resError);
            // Continue with empty resources array
          }

          const { data: activity, error: actError } = await supabase
            .from('user_activity')
            .select('action, resource_name, created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);
          if (actError) {
            console.warn('Activity error:', actError);
            // Continue with empty activity array
          }

          // Get user profile data
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('name, email, role, phone')
            .eq('id', user.id)
            .single();

          if (profileError) {
            console.warn('Profile error:', profileError);
            // Continue with auth user data
          }

          const newUserData = {
            name: userProfile?.name || user.user_metadata?.name || user.email.split('@')[0],
            email: userProfile?.email || user.email,
            role: userProfile?.role,
            phone: userProfile?.phone,
            plan: subscription?.plan_name || 'Not active',
            expiry: subscription?.expiry_date || 'Data not available'
          };

          setUserData(newUserData);

          const unlockedResources = (resources || []).map(resource => ({
            ...resource,
            name: resource.title, // Map title to name for compatibility
            category: resource.type, // Map type to category for compatibility
            min_plan: resource.plan_required, // Map plan_required to min_plan for compatibility
            unlocked: subscription?.plan_name && subscription.plan_name.localeCompare(resource.plan_required) >= 0
          }));

          setResources(unlockedResources);
          setRecentActivity(activity || []);
          setDataFetched(true);
          setCurrentUserId(user.id);
          console.log('[Dashboard] Data fetch completed for user:', user.id);
        } catch (error) {
          console.error('[Dashboard] Error fetching user:', error.message);
          setProfileCheckError(true);
          
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
        }
      };

      fetchData();
    }
  }, [user?.id, isLoading, isAuthenticated, profileCheckError, dataFetched, currentUserId]);


  

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

  if (criticalError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-bold mb-4">{criticalError}</p>
          <button onClick={clearCriticalError} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
        </div>
      </div>
    );
  }

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

  if (profileCheckError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-bold mb-4">We couldn't connect to our database.</p>
          <p className="text-gray-700 mb-2">Please check your internet connection or try again later.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'quick-actions', name: 'Quick Actions', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'ai-tools', name: 'AI Tools', icon: Brain },
    { id: 'prompts', name: 'Prompts', icon: FileText },
    { id: 'resources', name: 'Resources', icon: BookOpen },
    { id: 'achievements', name: 'Achievements', icon: Trophy }
  ];

  const handleQuickAction = (tab, action) => {
    setActiveTab(tab)
    // Additional logic for specific actions can be added here
    if (action && typeof window !== 'undefined') {
      setTimeout(() => {
        // Trigger specific action based on the action parameter
        console.log(`Executing action: ${action} in tab: ${tab}`)
      }, 100)
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Plan</p>
                    <p className="text-2xl font-bold text-purple-600 capitalize">{userData.plan}</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tools Used</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <Brain className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Achievements</p>
                    <p className="text-2xl font-bold text-green-600">8</p>
                  </div>
                  <Trophy className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">🚀 Your Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Recent Activity</h3>
              {recentActivity.length > 0 ? (
                <ul className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">
                        <span className="capitalize">{activity.action}</span> {activity.resource_name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4 opacity-50">📊</div>
                  <p className="text-gray-400 text-lg">No recent activity logged yet</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'quick-actions':
        return <QuickActions userPlan={userData.plan} onActionClick={handleQuickAction} />;
      case 'analytics':
        return <UserAnalytics user={user} userProfile={userData} />;
      case 'ai-tools':
        return <AIToolsGrid userPlan={userData.plan} />;
      case 'prompts':
        return <PromptLibrary userPlan={userData.plan} />;
      case 'resources':
        return <ResourceLibrary />;
      case 'achievements':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">🏆 Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Achievement cards will be here */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-gray-900">First Steps</h3>
                  <p className="text-sm text-gray-600 mt-2">Complete your first task</p>
                  <div className="mt-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Unlocked
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Container */}
        <div className="pt-8 pb-16 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 transition-all duration-300 transform hover:scale-105 hover:text-[#7F5AF0]">
              👋 {userData.name === 'Hustler' ? 'Hello, Hustler!' : `Hello, ${userData.name}!`}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              ✉️ {userData.email === 'Email: Not available' ? 
                <span className="text-gray-400 italic">Email: Not available</span> : 
                userData.email
              }
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
            <nav className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>

          {/* Plan Info Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-slide-up">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-full"></div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">💼 Your Plan</h2>
                  </div>
                  <p className={`text-3xl sm:text-4xl font-bold transition-colors ${
                    userData.plan === 'Not active' ? 'text-gray-400' : 'text-[#7F5AF0]'
                  }`}>
                    {userData.plan === 'Not active' ? 
                      <span className="italic">Not active</span> : 
                      userData.plan
                    }
                  </p>
                  <p className="text-gray-500 text-lg flex items-center gap-2">
                    <span className="text-2xl">⏳</span>
                    <span>Expires on: {userData.expiry === 'Data not available' ? 
                      <span className="text-gray-400 italic">Data not available</span> : 
                      userData.expiry
                    }</span>
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] rounded-full opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Expiry Warning */}
          {userData.expiry !== 'Data not available' && new Date(userData.expiry) - new Date() < 5 * 24 * 60 * 60 * 1000 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-medium text-yellow-800">Plan Expiring Soon</h3>
                    <p className="text-yellow-700">
                      Your plan is about to expire soon. <a href="/#pricing" className="font-medium underline hover:text-yellow-600 transition-colors">Renew now</a> to continue accessing premium features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resources Section */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 hover:text-[#7F5AF0] transition-colors">
                🚀 Your Resources
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access your tools, templates, and premium content based on your subscription plan
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 hover:text-[#7F5AF0] transition-colors">
                📊 Recent Activity
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Track your latest interactions and resource usage
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="p-6 sm:p-8">
                {recentActivity.length > 0 ? (
                  <ul className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-[1.02] gap-2">
                        <span className="font-medium text-gray-900">
                          <span className="capitalize">{activity.action}</span> {activity.resource_name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4 opacity-50">📊</div>
                    <p className="text-gray-400 text-lg">No recent activity logged yet</p>
                    <p className="text-gray-500 text-sm mt-2">Your resource usage will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="p-8 sm:p-10 text-center text-white">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold">🎯 Ready to Upgrade?</h3>
                  <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
                    Unlock premium features and boost your productivity
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/#pricing" className="bg-white text-[#7F5AF0] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                    Upgrade / Renew Plan
                  </Link>
                  <a href="mailto:hustlehackai@gmail.com" className="text-white underline hover:text-gray-100 transition-colors text-lg">
                    Need help? Contact support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
