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
import First100Stats from './components/First100Stats';
import { BarChart3, Brain, BookOpen, Trophy, Settings, Bell, User, TrendingUp, Zap, FileText } from 'lucide-react';
import { useUserPlan } from '../hooks/useAuth';
import { getPlanDisplayName, isPlanAtLeast } from '../planUtils';

// Simple onboarding tour steps
const DASHBOARD_TOUR_STEPS = [
  {
    title: 'Welcome to Your Dashboard!',
    content: 'This is your personalized AI dashboard. Here you can access all your tools, templates, and resources.'
  },
  {
    title: 'Quick Actions',
    content: 'Use Quick Actions to jump straight into popular workflows and save time.'
  },
  {
    title: 'AI Tools Grid',
    content: 'Explore a variety of AI tools tailored for your needs. Click any tool to get started.'
  },
  {
    title: 'Resource Library',
    content: 'Find guides, templates, and blueprints to help you grow faster.'
  },
  {
    title: 'Track Your Progress',
    content: 'See your recent activity and achievements right here.'
  },
  {
    title: 'Need Help?',
    content: 'Use the Help & Support section in the menu for assistance anytime.'
  }
];

function OnboardingTour({ steps, onClose }) {
  const [step, setStep] = useState(0);
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-[#7F5AF0]">{steps[step].title}</h2>
        <p className="text-gray-700 mb-6">{steps[step].content}</p>
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              className="px-6 py-2 rounded bg-[#7F5AF0] text-white font-bold"
              onClick={() => setStep(s => s + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="px-6 py-2 rounded bg-[#00FFC2] text-black font-bold"
              onClick={onClose}
            >
              Finish
            </button>
          )}
        </div>
        <div className="mt-4 text-xs text-gray-400">Step {step + 1} of {steps.length}</div>
      </div>
    </div>
  );
}

// Placeholder analytics/error reporting
function logAnalytics(event, data) {
  // Replace with real analytics integration (e.g., Google Analytics, Sentry, etc.)
  console.log('[Analytics]', event, data);
}
function logError(error, context) {
  // Replace with real error reporting
  console.error('[Error]', error, context);
}

function PlanActivatedModal({ plan, onClose }) {
  const planDisplay = plan === 'pro' ? 'Pro Hacker' : plan === 'creator' ? 'Creator Mode' : 'Starter Hustler';
  const planMsg = plan === 'pro'
    ? 'You’ve unlocked all premium features. Enjoy the full power of HustleHack AI.'
    : plan === 'creator'
      ? '🎉 Congratulations! You are one of our first 100 users! As a special reward, you get Creator Mode access for free. Enjoy exclusive tools and features.'
      : 'Welcome to Starter Hustler! Explore essential AI tools and templates.';
  const benefits = plan === 'pro' ? [
    'Unlimited access to all AI tools',
    'Premium templates & resources',
    'Priority support',
    'Early access to new features',
    'Exclusive Pro badge',
  ] : plan === 'creator' ? [
    '🎁 Free Creator Mode (First 100 users only)',
    'Access to Creator tools',
    'Premium templates',
    'Priority support',
    'Creator badge',
  ] : [
    'Essential AI tools',
    'Basic templates',
    'Community access',
  ];
  const shareText = plan === 'creator' 
    ? `🎉 I'm one of the first 100 users and got Creator Mode for FREE on HustleHack AI! 🚀 #HustleHackAI #First100`
    : `I just unlocked the ${planDisplay} plan on HustleHack AI! 🚀 #HustleHackAI`;
  const shareUrl = 'https://hustlehackai.in';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fade-in">
      {/* Shimmer background */}
      <div className="absolute inset-0 pointer-events-none animate-shimmer" style={{ background: 'linear-gradient(120deg, rgba(127,90,240,0.08) 0%, rgba(0,255,194,0.08) 100%)' }} />
      <div className="relative bg-gradient-to-br from-[#1a1333] via-[#232946] to-[#0f172a] rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border-4 border-[#7F5AF0] animate-pop-in animate-glow-border overflow-hidden">
        {/* Confetti Animation */}
        <ConfettiBurst />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-full flex items-center justify-center mb-6 animate-bounce shadow-xl border-4 border-[#FFE27A] animate-glow">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#fff" fillOpacity="0.1"/><path d="M24 8l4.24 12.97h13.63l-11.02 8.01 4.24 12.97L24 33.94l-11.09 8.01 4.24-12.97-11.02-8.01h13.63L24 8z" fill="#FFE27A"/></svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg animate-fade-in-up">{planDisplay} Plan Activated!</h2>
          <p className="text-lg text-gray-200 mb-6 animate-fade-in-up delay-100">{planMsg}</p>
          <ul className="text-left mx-auto mb-6 max-w-xs space-y-2 animate-fade-in-up delay-200">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-base text-[#00FFC2] font-medium">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#00FFC2" fillOpacity="0.15"/><path d="M6 10.5l2.5 2.5L14 8.5" stroke="#00FFC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <button onClick={onClose} className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold text-lg shadow-xl hover:from-[#6D4DC6] hover:to-[#00E6B3] transition-all duration-300">Go to Dashboard</button>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-xl bg-[#1DA1F2] text-white font-bold text-lg shadow-xl hover:bg-[#0d8ddb] transition-all duration-300 flex items-center gap-2 justify-center">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64.95c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/></svg>
              Share
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-xl bg-[#0077b5] text-white font-bold text-lg shadow-xl hover:bg-[#005983] transition-all duration-300 flex items-center gap-2 justify-center">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              Share
            </a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100px) scale(1); opacity: 1; }
          100% { transform: translateY(600px) scale(1.2); opacity: 0.7; }
        }
        .animate-confetti-burst circle, .animate-confetti-burst rect {
          animation: confetti-fall 1.8s cubic-bezier(0.23, 1, 0.32, 1) infinite;
        }
        .animate-glow-border {
          box-shadow: 0 0 32px 8px #7F5AF0, 0 0 64px 16px #00FFC2;
          animation: glow-border 2.5s ease-in-out infinite alternate;
        }
        @keyframes glow-border {
          0% { box-shadow: 0 0 32px 8px #7F5AF0, 0 0 64px 16px #00FFC2; }
          100% { box-shadow: 0 0 48px 16px #00FFC2, 0 0 96px 32px #7F5AF0; }
        }
        .animate-glow {
          filter: drop-shadow(0 0 16px #FFE27A) drop-shadow(0 0 32px #00FFC2);
          animation: glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
          0% { filter: drop-shadow(0 0 16px #FFE27A) drop-shadow(0 0 32px #00FFC2); }
          100% { filter: drop-shadow(0 0 32px #FFE27A) drop-shadow(0 0 48px #7F5AF0); }
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

function ConfettiBurst() {
  // More dynamic confetti burst with falling animation
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0 w-full h-full animate-confetti-burst pointer-events-none">
      <circle cx="60" cy="60" r="8" fill="#7F5AF0" style={{ animationDelay: '0s' }} />
      <circle cx="340" cy="80" r="6" fill="#00FFC2" style={{ animationDelay: '0.2s' }} />
      <circle cx="200" cy="40" r="7" fill="#FFE27A" style={{ animationDelay: '0.4s' }} />
      <rect x="100" y="300" width="10" height="10" fill="#F87171" rx="2" style={{ animationDelay: '0.1s' }} />
      <rect x="320" y="320" width="12" height="12" fill="#7F5AF0" rx="3" style={{ animationDelay: '0.3s' }} />
      <circle cx="220" cy="200" r="6" fill="#00FFC2" style={{ animationDelay: '0.5s' }} />
      <rect x="300" y="150" width="8" height="8" fill="#FFE27A" rx="2" style={{ animationDelay: '0.6s' }} />
      <circle cx="80" cy="200" r="7" fill="#F87171" style={{ animationDelay: '0.7s' }} />
      <rect x="180" y="350" width="10" height="10" fill="#00FFC2" rx="2" style={{ animationDelay: '0.8s' }} />
      <circle cx="250" cy="100" r="5" fill="#FFE27A" style={{ animationDelay: '0.9s' }} />
    </svg>
  );
}

// Add helper function at the top or near imports
function PlanInfoCard({ plan, expiry }) {
  return (
    <div className="rounded-2xl shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-slide-up" style={{ background: 'var(--bg-surface)' }}>
      <div className="p-10 sm:p-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>💼 Your Plan</h2>
            </div>
            <p className="text-3xl sm:text-4xl font-bold transition-colors" style={{ color: plan === 'Not active' ? 'var(--text-secondary)' : 'var(--primary)' }}>
              {plan === 'Not active' ? <span className="italic">Not active</span> : plan}
            </p>
            <p className="text-lg flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
              <span className="text-2xl">⏳</span>
              <span>
                {expiry === 'Data not available' || !expiry ? (
                  <span className="italic">No expiry date set</span>
                ) : (
                  `Expires on: ${expiry}`
                )}
              </span>
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-gradient-to-br from-[#7F5AF0] to-[#00FFC2] rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesSection({ resources, onAccess }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>🚀 Your Resources</h2>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Access your tools, templates, and premium content based on your subscription plan
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
        {resources.map((resource, index) => (
          <div key={resource.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <DashboardCard resource={resource} onAccess={onAccess} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivitySection({ recentActivity }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>📊 Recent Activity</h2>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Track your latest interactions and resource usage
        </p>
      </div>
      <div className="rounded-2xl shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300" style={{ background: 'var(--bg-surface)' }}>
        <div className="p-10 sm:p-12">
          {recentActivity.length > 0 ? (
            <ul className="space-y-3">
              {recentActivity.map((activity, index) => (
                <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-xl hover:bg-[rgba(255,255,255,0.07)] transition-all duration-200 transform hover:scale-[1.02] gap-2" style={{ background: 'rgba(36,41,46,0.7)' }}>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    <span className="capitalize">{activity.action}</span> {activity.resource_name}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4 opacity-50">📊</div>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>No recent activity logged yet</p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Your resource usage will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardClient() {
  const { user, isLoading, isAuthenticated, supabase, checkUserProfile, criticalError, clearCriticalError } = useAuth();
  const { plan: userPlan, loading: planLoading } = useUserPlan(user?.id);
  const router = useRouter();
  const [userData, setUserData] = useState({ 
    name: 'Hustler', 
    email: 'Email: Not available', 
    plan: 'Not active', 
    expiry: 'Data not available' 
  });
  const [resources, setResources] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileCheckError, setProfileCheckError] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [toolsUsed, setToolsUsed] = useState(0);
  const [achievementsCount, setAchievementsCount] = useState(0);
  const [achievementsData, setAchievementsData] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showPlanModalSession, setShowPlanModalSession] = useState(false)

  // Session-based modal control
  useEffect(() => {
    if (userPlan && userPlan !== 'Not active') {
      const sessionKey = `planModalShown_${userPlan}_${user?.id}`
      const hasShownInSession = sessionStorage.getItem(sessionKey)
      
      if (!hasShownInSession) {
        setShowPlanModalSession(true)
        sessionStorage.setItem(sessionKey, 'true')
      }
    }
  }, [userPlan, user?.id])

  // Show modal only once per session
  useEffect(() => {
    if (showPlanModalSession) {
      setShowPlanModal(true)
      setShowPlanModalSession(false)
    }
  }, [showPlanModalSession])

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

          // Get user analytics data for tools used
          const { data: userAnalytics, error: analyticsError } = await supabase
            .from('user_analytics')
            .select('tools_used, total_usage, streak_days, completed_tasks, learning_progress, weekly_activity, category_usage, progress_data, achievements, learning_path')
            .eq('user_id', user.id)
            .single();
          
          if (analyticsError) {
            console.warn('Analytics error:', analyticsError);
            // Initialize user analytics if not exists
            const { error: insertError } = await supabase
              .from('user_analytics')
              .insert({
                user_id: user.id,
                tools_used: 0,
                total_usage: 0,
                streak_days: 0,
                completed_tasks: 0,
                learning_progress: 0,
                weekly_activity: [],
                category_usage: [],
                progress_data: [],
                achievements: [],
                learning_path: []
              });
            if (insertError) {
              console.warn('Failed to initialize user analytics:', insertError);
            }
            setToolsUsed(0);
            setAchievementsCount(0);
            setAchievementsData([]);
          } else {
            setToolsUsed(userAnalytics?.tools_used || 0);
            // Calculate achievements count from achievements array
            const achievements = userAnalytics?.achievements || [];
            const unlockedAchievements = achievements.filter(achievement => achievement.unlocked);
            setAchievementsCount(unlockedAchievements.length);
            setAchievementsData(achievements);
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
            unlocked: isPlanAtLeast(subscription?.plan_name, resource.plan_required)
          }));

          setResources(unlockedResources);
          setRecentActivity(activity || []);
          setDataFetched(true);
          setCurrentUserId(user.id);
          console.log('[Dashboard] Data fetch completed for user:', user.id);
        } catch (error) {
          console.error('[Dashboard] Error fetching user:', error.message);
          setProfileCheckError(true);
          
          setUserData({
            name: 'Data not available',
            email: 'Data not available',
            role: 'Data not available',
            phone: 'Data not available',
            plan: 'Not active',
            expiry: 'Data not available'
          });
          setResources([]);
          setRecentActivity([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user?.id, isLoading, isAuthenticated, profileCheckError, dataFetched, currentUserId]);

  // Removed the conflicting useEffect that was showing modal every time

  useEffect(() => {
    // Show onboarding tour for new users (first dashboard visit)
    if (typeof window !== 'undefined' && window.localStorage) {
      const seenTour = window.localStorage.getItem('dashboardTourSeen');
      if (!seenTour) {
        setShowTour(true);
        window.localStorage.setItem('dashboardTourSeen', '1');
        logAnalytics('onboarding_tour_shown', { user: user?.id });
      }
    }
  }, [user?.id]);

  useEffect(() => {
    // Example: log dashboard load event
    if (!isLoading && user?.id) {
      logAnalytics('dashboard_loaded', { user: user.id });
    }
  }, [isLoading, user?.id]);

  useEffect(() => {
    if (profileCheckError) {
      logError('profile_check_error', { user: user?.id });
    }
  }, [profileCheckError, user?.id]);


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

      // Get current analytics data
      const { data: currentAnalytics } = await supabase
        .from('user_analytics')
        .select('tools_used, total_usage, achievements')
        .eq('user_id', user.id)
        .single();

      const newToolsUsed = (currentAnalytics?.tools_used || 0) + 1;
      const newTotalUsage = (currentAnalytics?.total_usage || 0) + 1;
      
      // Update achievements based on usage
      let updatedAchievements = currentAnalytics?.achievements || [];
      
      // Check for new achievements based on tools used
      if (newToolsUsed === 1 && !updatedAchievements.find(a => a.id === 'first_tool')) {
        updatedAchievements.push({
          id: 'first_tool',
          title: 'First Tool Used',
          description: 'Used your first AI tool',
          icon: '🎯',
          unlocked: true,
          date: new Date().toISOString(),
          progress: 100
        });
      }
      
      if (newToolsUsed === 5 && !updatedAchievements.find(a => a.id === 'tool_explorer')) {
        updatedAchievements.push({
          id: 'tool_explorer',
          title: 'Tool Explorer',
          description: 'Used 5 different AI tools',
          icon: '🔍',
          unlocked: true,
          date: new Date().toISOString(),
          progress: 100
        });
      }
      
      if (newToolsUsed === 10 && !updatedAchievements.find(a => a.id === 'ai_master')) {
        updatedAchievements.push({
          id: 'ai_master',
          title: 'AI Master',
          description: 'Used 10 different AI tools',
          icon: '🧠',
          unlocked: true,
          date: new Date().toISOString(),
          progress: 100
        });
      }

      // Increment tools used count and update achievements
      const { error: updateError } = await supabase
        .from('user_analytics')
        .update({ 
          tools_used: newToolsUsed,
          total_usage: newTotalUsage,
          achievements: updatedAchievements
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.warn('Failed to update tools used:', updateError);
      } else {
        setToolsUsed(newToolsUsed);
        // Update achievements count
        const unlockedAchievements = updatedAchievements.filter(achievement => achievement.unlocked);
        setAchievementsCount(unlockedAchievements.length);
        setAchievementsData(updatedAchievements);
      }

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

  if (isLoading || planLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center animate-fade-in">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-[var(--primary)] border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-20 animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Loading your dashboard...</p>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Preparing your personalized experience</p>
        </div>
      </div>
    );
  }

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
            {/* First 100 Users Stats */}
            <First100Stats />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl shadow-lg p-6 border border-[var(--border-color)]" style={{ background: 'rgba(36,41,46,0.96)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-200">Tools Used</p>
                    <p className="text-2xl font-bold text-blue-600">{toolsUsed}</p>
                  </div>
                  <Brain className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="rounded-xl shadow-lg p-6 border border-[var(--border-color)]" style={{ background: 'rgba(36,41,46,0.96)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-200">Achievements</p>
                    <p className="text-2xl font-bold text-green-600">{achievementsCount}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">🚀 Your Resources</h2>
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
            <div className="rounded-xl shadow-lg border border-[var(--border-color)] p-6" style={{ background: 'rgba(36,41,46,0.96)' }}>
              <h3 className="text-xl font-bold text-white mb-4">📊 Recent Activity</h3>
              {recentActivity.length > 0 ? (
                <ul className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg text-white">
                      <span className="font-medium">
                        <span className="capitalize">{activity.action}</span> {activity.resource_name}
                      </span>
                      <span className="text-sm">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4 opacity-50">📊</div>
                  <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>No recent activity logged yet</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'quick-actions':
        return <QuickActions userPlan={userPlan} onActionClick={handleQuickAction} />;
      case 'analytics':
        return <UserAnalytics user={user} userProfile={userData} />;
      case 'ai-tools':
        return <AIToolsGrid userPlan={userPlan} />;
      case 'prompts':
        return (
          <PromptLibrary 
            userPlan={userPlan}
            platformData={{
              name: 'Instagram',
              platforms: [
                { name: 'Instagram' },
                { name: 'LinkedIn' },
                { name: 'Twitter' },
                { name: 'TikTok' }
              ],
              categories: [
                {
                  name: 'Fitness',
                  prompts: [
                    { title: 'Morning Motivation Post', prompt: '🌅 Start your day strong! Share your top 3 morning habits for crushing your fitness goals. #MorningRoutine #FitnessJourney', type: 'free' },
                    { title: 'Transformation Story', prompt: '💪 Post your before-and-after journey and tell your audience what changed the game for you. #TransformationTuesday', type: 'free' },
                    { title: 'Workout of the Day', prompt: '🔥 Today\'s Workout: {exercise1}, {exercise2}, {exercise3}. How many rounds can you do? Tag a friend to join! #WOD #TrainHard', type: 'free' },
                    { title: 'Myth-Busting Post', prompt: '❌ Fitness Myth Alert: {myth}. Here\'s why that\'s wrong and what to do instead. #FitnessFacts', type: 'pro' },
                    { title: 'Healthy Recipe Share', prompt: '🥗 Quick, healthy meal idea for busy hustlers: {recipe}. Tag someone who needs this today! #MealPrep #HealthyEating', type: 'pro' },
                    { title: 'Gym Humor Meme', prompt: '😂 When you hit the gym and forget your headphones… relatable? Drop your favorite workout playlist below! #GymLife', type: 'free' }
                  ]
                },
                {
                  name: 'Entrepreneurship',
                  prompts: [
                    { title: 'Business Tip', prompt: '💡 Pro tip: {business_tip}. This simple strategy helped me {result}. #BusinessTips', type: 'free' },
                    { title: 'Behind the Scenes', prompt: '🎥 BTS of running my business today. The reality isn\'t always pretty! #BehindTheScenes', type: 'free' },
                    { title: 'Success Story', prompt: '🎯 How I went from {starting_point} to {current_success} in {timeframe}. #SuccessStory', type: 'pro' },
                    { title: 'Daily Routine', prompt: '⏰ My morning routine that sets me up for success: {routine}. #ProductivityHacks', type: 'pro' },
                    { title: 'Mistake I Made', prompt: '❌ Biggest business mistake I made: {mistake}. Learn from my failure! #BusinessLessons', type: 'free' },
                    { title: 'Revenue Milestone', prompt: '💰 Just hit {milestone}! Here\'s what I learned along the way. #BusinessGrowth', type: 'pro' }
                  ]
                },
                {
                  name: 'Tech & AI',
                  prompts: [
                    { title: 'AI Tool Review', prompt: '🤖 Just tried {ai_tool} and here\'s what happened: {review}. #AITools', type: 'free' },
                    { title: 'Tech Tip', prompt: '💻 Quick tech hack that saved me {time/money}: {tip}. #TechTips', type: 'free' },
                    { title: 'Future Prediction', prompt: '🔮 My prediction for {tech_trend} in 2024: {prediction}. #TechTrends', type: 'pro' },
                    { title: 'Coding Challenge', prompt: '👨‍💻 Built {project} in {timeframe}. Want to see the code? #CodingLife', type: 'pro' },
                    { title: 'Tech Stack', prompt: '🛠️ My current tech stack: {tools}. What\'s in yours? #TechStack', type: 'free' },
                    { title: 'AI Prompt', prompt: '🎯 Best AI prompt I\'ve used: {prompt}. Try it and thank me later! #AIPrompts', type: 'pro' }
                  ]
                },
                {
                  name: 'Lifestyle',
                  prompts: [
                    { title: 'Daily Habit', prompt: '✨ My daily habit that changed everything: {habit}. #DailyHabits', type: 'free' },
                    { title: 'Life Lesson', prompt: '💭 Life lesson I learned the hard way: {lesson}. #LifeLessons', type: 'free' },
                    { title: 'Travel Story', prompt: '✈️ Just got back from {destination}. Here\'s what I learned: {insight}. #TravelLife', type: 'pro' },
                    { title: 'Book Recommendation', prompt: '📚 Just finished {book}. Here\'s why you need to read it: {reason}. #BookRecommendation', type: 'pro' },
                    { title: 'Morning Routine', prompt: '🌅 My 5-minute morning routine: {routine}. #MorningRoutine', type: 'free' },
                    { title: 'Gratitude Post', prompt: '🙏 Today I\'m grateful for: {gratitude}. What are you thankful for? #Gratitude', type: 'free' }
                  ]
                }
              ]
            }}
            bonusVault={{
              hooks: [
                "The truth about {topic} nobody talks about...",
                "You're wasting time on {task}. Here's why:",
                "Want to {goal} in {time}? Start here:",
                "This simple trick changed my {task} forever."
              ],
              ctas: [
                "Double-tap if this helped!",
                "Save this post for later!",
                "Tag someone who needs this.",
                "Comment YES if you agree."
              ],
              caption_hacks: [
                "Start with a question → Share 3 tips → CTA at end.",
                "Use emojis to break up text.",
                "Add curiosity: 'Nobody talks about this…'"
              ]
            }}
          />
        );
      case 'resources':
        return <ResourceLibrary userPlan={userPlan} />;
      case 'achievements':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">🏆 Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievementsData.length > 0 ? (
                achievementsData.map((achievement, index) => (
                  <div key={achievement.id || index} className="rounded-xl shadow-lg p-6 border border-[var(--border-color)]" style={{ background: 'rgba(36,41,46,0.96)' }}>
                    <div className="text-center">
                      <div className="text-4xl mb-4">{achievement.icon || '🏆'}</div>
                      <h3 className="text-lg font-semibold text-white">{achievement.title || 'Achievement'}</h3>
                      <p className="text-sm text-gray-200 mt-2">{achievement.description || 'Complete tasks to unlock achievements'}</p>
                      <div className={`mt-4 px-3 py-1 rounded-full text-sm font-medium ${
                        achievement.unlocked 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {achievement.unlocked ? 'Unlocked' : 'Locked'}
                      </div>
                      {achievement.progress !== undefined && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-100 mt-1">{achievement.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">🏆</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Achievements Yet</h3>
                  <p className="text-gray-200">Start using the platform to unlock achievements!</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
      {showPlanModal && <PlanActivatedModal plan={userPlan} onClose={() => setShowPlanModal(false)} />}
      {showTour && <OnboardingTour steps={DASHBOARD_TOUR_STEPS} onClose={() => setShowTour(false)} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Container */}
        <div className="pt-12 sm:pt-20 pb-20 sm:pb-28 space-y-12 sm:space-y-16">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:text-[#7F5AF0]">
              👋 {userData.name === 'Hustler' ? 'Hello, Hustler!' : `Hello, ${userData.name}!`}
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto">
              ✉️ {userData.email === 'Email: Not available' ? 
                <span className="text-gray-100 italic">Email: Not available</span> : 
                userData.email
              }
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="rounded-xl shadow-lg border border-[var(--border-color)] p-2" style={{ background: 'var(--bg-surface)' }}>
            <nav className="flex space-x-2" role="tablist" aria-label="Dashboard navigation tabs">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={e => {
                    if (e.key === 'ArrowRight') {
                      setActiveTab(tabs[(idx + 1) % tabs.length].id);
                      e.preventDefault();
                    } else if (e.key === 'ArrowLeft') {
                      setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length].id);
                      e.preventDefault();
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-black shadow-lg'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                  style={{ minWidth: 140 }}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in" id={`tabpanel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}> 
            {renderTabContent()}
          </div>

          {/* Plan Info Card */}
          {/* Removed Plan Info Card */}

          {/* Plan Expiry Warning */}
          {userData.expiry !== 'Data not available' && new Date(userData.expiry) - new Date() < 5 * 24 * 60 * 60 * 1000 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" style={{ background: 'var(--bg-surface)' }}>
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

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300" style={{ background: 'var(--bg-surface)' }}>
            <div className="p-8 sm:p-10 text-center text-white">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-2xl font-bold">🎯 Ready to Upgrade?</h3>
                  <p className="text-sm sm:text-lg opacity-90 max-w-2xl mx-auto">
                    Unlock premium features and boost your productivity
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Link href="/#pricing" className="bg-white text-[#7F5AF0] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                    Upgrade / Renew Plan
                  </Link>
                  <a href="mailto:hustlehackai@gmail.com" className="text-white underline hover:text-gray-100 transition-colors text-base sm:text-lg">
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
