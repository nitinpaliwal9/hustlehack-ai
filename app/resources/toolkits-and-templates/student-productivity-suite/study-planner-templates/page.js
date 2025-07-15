import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import Link from 'next/link';

export default function StudyPlannerTemplatesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-28">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            📚 Study Planner Templates
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Level up your study game with these professionally designed templates! From daily schedules to exam prep strategies, we've got everything you need to ace your academics 🎯
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg p-6 text-center" style={{ background: 'var(--bg-surface)' }}>
            <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
            <div style={{ color: 'var(--text-secondary)' }}>Templates Available</div>
          </div>
          <div className="rounded-lg p-6 text-center" style={{ background: 'var(--bg-surface)' }}>
            <div className="text-3xl font-bold text-pink-400 mb-2">10K+</div>
            <div style={{ color: 'var(--text-secondary)' }}>Students Helped</div>
          </div>
          <div className="rounded-lg p-6 text-center" style={{ background: 'var(--bg-surface)' }}>
            <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
            <div style={{ color: 'var(--text-secondary)' }}>Success Rate</div>
          </div>
        </div>

        {/* Template Categories */}
        <div className="space-y-16">
          
          {/* Daily & Weekly Planners */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              📅 Daily & Weekly Planners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Daily Study Planner */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Daily Study Planner</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Perfect for organizing your daily study sessions with time blocks, priorities, and progress tracking.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Time blocking sections
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Priority task ranking
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Progress tracking
                  </div>
                </div>
                <Link href="/resources/toolkits-and-templates/student-productivity-suite/study-planner-templates/daily-weekly-planners/daily-study-planner" passHref legacyBehavior>
                  <a className="w-full block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center">
                    View & Download
                  </a>
                </Link>
              </div>

              {/* Weekly Study Schedule */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Weekly Study Schedule</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Map out your entire week with dedicated study blocks for each subject and built-in break times.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    7-day layout view
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Subject color coding
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Break reminders
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Download Template
                </button>
              </div>

              {/* Monthly Study Calendar */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Monthly Study Calendar</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Long-term planning made easy with monthly overviews, deadline tracking, and milestone celebrations.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Monthly calendar view
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Deadline alerts
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Milestone tracking
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

              {/* Habit Tracker Integration */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Habit Tracker Integration</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Build consistent study habits with our integrated habit tracker that works alongside your study planner.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    30-day habit tracking
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Progress visualization
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Streak counters
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

            </div>
          </section>

          {/* Exam Preparation */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              🎯 Exam Preparation Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Exam Study Timeline */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Exam Study Timeline</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Create a strategic countdown to your exams with this comprehensive timeline template.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Countdown calendar
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Topic breakdown
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Review schedules
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Download Template
                </button>
              </div>

              {/* Subject-Specific Study Plans */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Subject-Specific Study Plans</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Tailored study approaches for different subjects - from STEM to humanities, we've got you covered.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    STEM subjects
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Humanities & Arts
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Language learning
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Download Template
                </button>
              </div>

              {/* Revision Techniques Guide */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Revision Techniques Guide</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Master proven revision techniques with structured templates for active recall, spaced repetition, and more.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Active recall sheets
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Spaced repetition system
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Memory palace guides
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

              {/* Mock Test Scheduler */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Mock Test Scheduler</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Schedule and track your practice tests with detailed performance analysis and improvement suggestions.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Test scheduling
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Performance tracking
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Improvement insights
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

            </div>
          </section>

          {/* Goal Setting & Progress Tracking */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              🎯 Goal Setting & Progress Tracking
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Academic Goal Planner */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Academic Goal Planner</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Set SMART academic goals and track your progress with this comprehensive planning template.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    SMART goal framework
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Progress milestones
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Reflection prompts
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Download Template
                </button>
              </div>

              {/* Study Progress Tracker */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Study Progress Tracker</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Visual progress tracking with charts, graphs, and completion percentages to keep you motivated.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Visual progress bars
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Completion tracking
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Motivation metrics
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Download Template
                </button>
              </div>

              {/* Weekly Reflection Journal */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Weekly Reflection Journal</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Develop metacognitive skills with structured reflection prompts and learning insights.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Reflection prompts
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Learning insights
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Growth tracking
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

              {/* Achievement Celebration Planner */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Achievement Celebration Planner</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Plan meaningful rewards and celebrations for your academic achievements to maintain motivation.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Reward systems
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Milestone celebrations
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Motivation boosters
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

            </div>
          </section>

          {/* Specialized Templates */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              ⚡ Specialized Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Group Study Coordinator */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Group Study Coordinator</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Organize effective group study sessions with role assignments, topic distribution, and progress tracking.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Session planning
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Role assignments
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Progress coordination
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Download Template
                </button>
              </div>

              {/* Research Project Planner */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Research Project Planner</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Comprehensive template for managing research projects from conception to completion.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Research methodology
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Source organization
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Timeline management
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

              {/* Assignment Tracker */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Assignment Tracker</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Never miss a deadline again with this comprehensive assignment tracking system.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Deadline tracking
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Priority levels
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Submission status
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Download Template
                </button>
              </div>

              {/* Study Session Optimizer */}
              <div className="rounded-lg p-6 border hover:border-purple-500 transition-all" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Study Session Optimizer</h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PRO</span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Optimize your study sessions based on your peak performance times and learning preferences.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Peak time analysis
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Learning style optimization
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Energy level tracking
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Upgrade to Pro
                </button>
              </div>

            </div>
          </section>

        </div>

        {/* How to Use Section */}
        <div className="bg-gray-800 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">🚀 How to Use These Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Your Template</h3>
              <p className="text-gray-400 text-sm">Select the template that best fits your current study needs and goals.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Customize & Personalize</h3>
              <p className="text-gray-400 text-sm">Adapt the template to your specific subjects, schedule, and learning style.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Track & Optimize</h3>
              <p className="text-gray-400 text-sm">Monitor your progress and adjust your approach for maximum effectiveness.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Study Game? 🎯</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who've leveled up their academic performance with our templates!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Get All Free Templates
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">🔗 Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/resources/toolkits-and-templates/student-productivity-suite" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold mb-2">📚 Student Productivity Suite</h3>
              <p className="text-gray-400 text-sm">Complete productivity toolkit for students</p>
            </Link>
            <Link href="/resources/toolkits-and-templates/student-productivity-suite/note-taking-templates" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold mb-2">📝 Note-Taking Templates</h3>
              <p className="text-gray-400 text-sm">Structured templates for better note organization</p>
            </Link>
            <Link href="/resources/toolkits-and-templates/student-productivity-suite/time-management-tools" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold mb-2">⏰ Time Management Tools</h3>
              <p className="text-gray-400 text-sm">Master your schedule and boost productivity</p>
            </Link>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
