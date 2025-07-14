'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts'
import { TrendingUp, Target, Clock, Award, Brain, Zap, Activity, Users, Calendar, Trophy } from 'lucide-react'
import ShareAchievement from './ShareAchievement'

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

  // Fetch analytics from Supabase
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual Supabase client from context/props
        const supabase = null;
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
      }
      setIsLoading(false);
    };
    fetchAnalytics();
  }, [selectedTimeframe, user]);

  const StatCard = ({ title, value, icon: Icon, subtitle, color = 'from-blue-500 to-purple-600', trend }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4" />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  )

  const ProgressBar = ({ percentage, color = 'bg-blue-500' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`${color} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Your Analytics</h2>
          <p className="text-gray-600">Track your progress and achievements</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTimeframe === period
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
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
          trend={12}
        />
        <StatCard
          title="Current Streak"
          value={`${analytics.streakDays} days`}
          icon={Zap}
          subtitle="Keep it up!"
          color="from-orange-500 to-red-500"
          trend={8}
        />
        <StatCard
          title="Completed Tasks"
          value={analytics.completedTasks}
          icon={Target}
          subtitle="This month"
          color="from-green-500 to-emerald-500"
          trend={25}
        />
        <StatCard
          title="Tools Used"
          value={analytics.toolsUsed}
          icon={Brain}
          subtitle="Unique tools"
          color="from-blue-500 to-cyan-500"
          trend={15}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Weekly Activity</h3>
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Usage by Category</h3>
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Over Time */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Progress Over Time</h3>
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
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">🎓 Learning Path Progress</h3>
          <div className="text-sm text-gray-600">
            Overall Progress: {analytics.learningProgress}%
          </div>
        </div>
        <div className="space-y-4">
          {analytics.learningPath.map((path) => (
            <div key={path.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{path.title}</h4>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{path.timeSpent}m</span>
                  {path.completed && <Trophy className="w-4 h-4 text-yellow-500" />}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <ProgressBar 
                    percentage={path.progress} 
                    color={path.completed ? 'bg-green-500' : 'bg-purple-500'}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {path.progress}% ({path.modules} modules)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">🏆 Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-green-200 bg-green-50 hover:shadow-md'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              {achievement.unlocked ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Award className="w-4 h-4" />
                    <span>Unlocked {new Date(achievement.date).toLocaleDateString()}</span>
                  </div>
                  <ShareAchievement achievement={achievement} />
                </div>
              ) : (
                <div className="space-y-1">
                  <ProgressBar percentage={achievement.progress} color="bg-purple-500" />
                  <p className="text-sm text-gray-600">{achievement.progress}% complete</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
