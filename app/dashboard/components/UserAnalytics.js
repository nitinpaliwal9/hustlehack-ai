'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts'
import { TrendingUp, Target, Clock, Award, Brain, Zap, Activity, Users, Calendar, Trophy } from 'lucide-react'
import ShareAchievement from './ShareAchievement'
import { supabase } from '../../../lib/supabaseClient';

export default function UserAnalytics({ user, userProfile }) {
  const [analytics, setAnalytics] = useState({
    totalUsage: 0,
    streakDays: 0,
    completedTasks: 0,
    toolsUsed: 0,
    learningProgress: 0,
    weeklyActivity: [],
    categoryUsage: [],
    progressData: [],
    achievements: [],
    learningPath: []
  })
  
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch analytics from Supabase
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use shared Supabase client
        if (!user || !supabase) {
          setAnalytics({
            totalUsage: 0,
            streakDays: 0,
            completedTasks: 0,
            toolsUsed: 0,
            learningProgress: 0,
            weeklyActivity: [],
            categoryUsage: [],
            progressData: [],
            achievements: [],
            learningPath: []
          });
          setError('User not authenticated or database unavailable.');
          setIsLoading(false);
          return;
        }
        // Example: Fetch analytics from a 'user_analytics' table
        const { data, error } = await supabase
          .from('user_analytics')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (error || !data) {
          setAnalytics({
            totalUsage: 0,
            streakDays: 0,
            completedTasks: 0,
            toolsUsed: 0,
            learningProgress: 0,
            weeklyActivity: [],
            categoryUsage: [],
            progressData: [],
            achievements: [],
            learningPath: []
          });
          setError('Failed to load analytics data. Please try again later.');
        } else {
          setAnalytics({
            totalUsage: data.total_usage || 0,
            streakDays: data.streak_days || 0,
            completedTasks: data.completed_tasks || 0,
            toolsUsed: data.tools_used || 0,
            learningProgress: data.learning_progress || 0,
            weeklyActivity: data.weekly_activity || [],
            categoryUsage: data.category_usage || [],
            progressData: data.progress_data || [],
            achievements: data.achievements || [],
            learningPath: data.learning_path || []
          });
        }
      } catch (e) {
        setAnalytics({
          totalUsage: 0,
          streakDays: 0,
          completedTasks: 0,
          toolsUsed: 0,
          learningProgress: 0,
          weeklyActivity: [],
          categoryUsage: [],
          progressData: [],
          achievements: [],
          learningPath: []
        });
        setError('An unexpected error occurred while loading analytics.');
      }
      setIsLoading(false);
    };
    fetchAnalytics();
  }, [selectedTimeframe, user]);

  // Calculate trends dynamically
  const getTrend = (current, previous) => {
    if (typeof current !== 'number' || typeof previous !== 'number' || previous === 0) return null;
    const diff = current - previous;
    return Math.round((diff / previous) * 100);
  };

  // Calculate trends for Total Usage and Completed Tasks
  let totalUsageTrend = null;
  let completedTasksTrend = null;

  if (analytics.weeklyActivity && analytics.weeklyActivity.length >= 2) {
    const len = analytics.weeklyActivity.length;
    const current = analytics.weeklyActivity[len - 1]?.usage;
    const previous = analytics.weeklyActivity[len - 2]?.usage;
    totalUsageTrend = getTrend(current, previous);
  }

  if (analytics.progressData && analytics.progressData.length >= 2) {
    const len = analytics.progressData.length;
    const current = analytics.progressData[len - 1]?.tasks;
    const previous = analytics.progressData[len - 2]?.tasks;
    completedTasksTrend = getTrend(current, previous);
  }

  const StatCard = ({ title, value, icon: Icon, subtitle, color = 'from-blue-500 to-purple-600', trend }) => (
    <div className="rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6" style={{ color: '#fff' }} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-sm" style={{ color: trend > 0 ? '#00FFC2' : '#F87171' }}>
            <TrendingUp className="w-4 h-4" />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{title}</p>
        {subtitle && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>
    </div>
  )

  const ProgressBar = ({ percentage, color = 'bg-blue-500' }) => (
    <div className="w-full rounded-full h-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <div
        className="h-2 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%`, background: color === 'bg-green-500' ? '#00FFC2' : '#7F5AF0' }}
      />
    </div>
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold mb-2">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>📊 Your Analytics</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Track your progress and achievements</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={
                selectedTimeframe === period
                  ? { background: 'var(--accent)', color: '#000' }
                  : { background: 'var(--bg-surface)', color: 'var(--text-secondary)' }
              }
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Usage"
          value={analytics.totalUsage}
          icon={Activity}
          subtitle="Actions this month"
          color="from-purple-500 to-pink-500"
          trend={totalUsageTrend}
        />
        <StatCard
          title="Current Streak"
          value={`${analytics.streakDays} days`}
          icon={Zap}
          subtitle="Keep it up!"
          color="from-orange-500 to-red-500"
          trend={null}
        />
        <StatCard
          title="Completed Tasks"
          value={analytics.completedTasks}
          icon={Target}
          subtitle="This month"
          color="from-green-500 to-emerald-500"
          trend={completedTasksTrend}
        />
        <StatCard
          title="Tools Used"
          value={analytics.toolsUsed}
          icon={Brain}
          subtitle="Unique tools"
          color="from-blue-500 to-cyan-500"
          trend={null}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity Chart */}
        <div className="rounded-xl shadow-lg border p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>📈 Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="usage" stroke="#7F5AF0" fill="#7F5AF0" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Usage Distribution */}
        <div className="rounded-xl shadow-lg border p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>🎯 Usage by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.categoryUsage}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.categoryUsage.map((entry, index) => (
                  <Cell key={index} fill={entry.color || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Over Time */}
      <div className="rounded-xl shadow-lg border p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>📊 Progress Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="progress" stroke="#7F5AF0" strokeWidth={3} />
            <Line type="monotone" dataKey="tasks" stroke="#00FFC2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Learning Path Progress */}
      <div className="rounded-xl shadow-lg border p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>🎓 Learning Path Progress</h3>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Overall Progress: {analytics.learningProgress}%
          </div>
        </div>
        <div className="space-y-4">
          {analytics.learningPath.map((path) => (
            <div key={path.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-surface)' }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{path.title}</h4>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{path.timeSpent}m</span>
                  {path.completed && <Trophy className="w-4 h-4" style={{ color: '#FFE27A' }} />}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <ProgressBar 
                    percentage={path.progress} 
                    color={path.completed ? 'bg-green-500' : 'bg-purple-500'}
                  />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {path.progress}% ({path.modules} modules)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-xl shadow-lg border p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>🏆 Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className="p-4 rounded-lg border-2 transition-all duration-300"
              style={{
                borderColor: achievement.unlocked ? '#00FFC2' : 'var(--border-color)',
                background: achievement.unlocked ? 'rgba(0,255,194,0.07)' : 'var(--bg-surface)'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold" style={{ color: achievement.unlocked ? '#00FFC2' : 'var(--text-primary)' }}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{achievement.description}</p>
                </div>
              </div>
              {achievement.unlocked ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#00FFC2' }}>
                    <Award className="w-4 h-4" />
                    <span>Unlocked {new Date(achievement.date).toLocaleDateString()}</span>
                  </div>
                  <ShareAchievement achievement={achievement} />
                </div>
              ) : (
                <div className="space-y-1">
                  <ProgressBar percentage={achievement.progress} color="bg-purple-500" />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{achievement.progress}% complete</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}