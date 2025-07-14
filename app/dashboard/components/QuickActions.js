'use client'

import { useState } from 'react'
import { 
  Zap, 
  Brain, 
  FileText, 
  Download, 
  Share2, 
  Star, 
  Clock, 
  Plus,
  TrendingUp,
  Target,
  BookOpen,
  Settings,
  ExternalLink
} from 'lucide-react'

export default function QuickActions({ userPlan = 'starter', onActionClick }) {
  const [hoveredAction, setHoveredAction] = useState(null)

  const quickActions = [
    {
      id: 'generate-content',
      title: 'Generate Content',
      description: 'Create AI-powered content instantly',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      action: () => onActionClick('ai-tools', 'content-generator'),
      shortcut: 'Ctrl+G',
      category: 'AI Tools',
      premium: false
    },
    {
      id: 'create-prompt',
      title: 'New Prompt',
      description: 'Create a custom AI prompt',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      action: () => onActionClick('prompts', 'create'),
      shortcut: 'Ctrl+P',
      category: 'Prompts',
      premium: false
    },
    {
      id: 'social-optimizer',
      title: 'Social Media',
      description: 'Optimize your social posts',
      icon: Share2,
      color: 'from-pink-500 to-rose-500',
      action: () => onActionClick('ai-tools', 'social-media-optimizer'),
      shortcut: 'Ctrl+S',
      category: 'AI Tools',
      premium: false
    },
    {
      id: 'view-analytics',
      title: 'Analytics',
      description: 'Check your performance metrics',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      action: () => onActionClick('analytics'),
      shortcut: 'Ctrl+A',
      category: 'Analytics',
      premium: false
    },
    {
      id: 'automation-script',
      title: 'Automation',
      description: 'Generate automation scripts',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      action: () => onActionClick('ai-tools', 'automation-script'),
      shortcut: 'Ctrl+Z',
      category: 'AI Tools',
      premium: true
    },
    {
      id: 'download-resources',
      title: 'Resources',
      description: 'Access premium templates',
      icon: Download,
      color: 'from-indigo-500 to-purple-500',
      action: () => onActionClick('resources'),
      shortcut: 'Ctrl+R',
      category: 'Resources',
      premium: false
    },
    {
      id: 'learning-path',
      title: 'Learning',
      description: 'Continue your learning journey',
      icon: BookOpen,
      color: 'from-teal-500 to-cyan-500',
      action: () => onActionClick('analytics', 'learning'),
      shortcut: 'Ctrl+L',
      category: 'Learning',
      premium: false
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Customize your experience',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      action: () => onActionClick('settings'),
      shortcut: 'Ctrl+,',
      category: 'Account',
      premium: false
    }
  ]

  const isActionUnlocked = (action) => {
    if (!action.premium) return true
    const planHierarchy = { starter: 1, creator: 2, pro: 3 }
    return planHierarchy[userPlan] >= 3 // Pro plan required for premium actions
  }

  const handleActionClick = (action) => {
    if (!isActionUnlocked(action)) {
      alert(`This feature requires a Pro plan. Current plan: ${userPlan}`)
      return
    }
    action.action()
  }

  // Group actions by category
  const actionsByCategory = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = []
    }
    acc[action.category].push(action)
    return acc
  }, {})

  const ActionCard = ({ action }) => {
    const unlocked = isActionUnlocked(action)
    
    return (
      <div
        className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          unlocked ? 'hover:shadow-lg' : 'opacity-75'
        }`}
        onClick={() => handleActionClick(action)}
        onMouseEnter={() => setHoveredAction(action.id)}
        onMouseLeave={() => setHoveredAction(null)}
      >
        <div className={`bg-white rounded-xl p-4 border-2 transition-all duration-300 ${
          unlocked 
            ? 'border-gray-200 hover:border-purple-200 shadow-md hover:shadow-xl' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} ${
              unlocked ? 'shadow-md' : 'opacity-50'
            }`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              {action.premium && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  unlocked 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  Pro
                </span>
              )}
              <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className={`font-semibold ${
              unlocked ? 'text-gray-900' : 'text-gray-600'
            }`}>
              {action.title}
            </h3>
            <p className={`text-sm ${
              unlocked ? 'text-gray-600' : 'text-gray-500'
            }`}>
              {action.description}
            </p>
          </div>

          {/* Shortcut */}
          {unlocked && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Shortcut</span>
                <code className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 font-mono">
                  {action.shortcut}
                </code>
              </div>
            </div>
          )}

          {/* Hover Effect */}
          {hoveredAction === action.id && unlocked && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">⚡ Quick Actions</h2>
          <p className="text-gray-600">Access your most used features instantly</p>
        </div>
        <div className="text-sm text-gray-500">
          Use keyboard shortcuts for faster access
        </div>
      </div>

      {/* Actions by Category */}
      <div className="space-y-6">
        {Object.entries(actionsByCategory).map(([category, actions]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {actions.map(action => (
                <ActionCard key={action.id} action={action} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-purple-900 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Use keyboard shortcuts for lightning-fast access</li>
              <li>• Premium features are available with Pro plan</li>
              <li>• Click on any action to jump directly to that tool</li>
              <li>• Hover over actions to see additional details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Keyboard Shortcuts
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.filter(action => isActionUnlocked(action)).map(action => (
            <div key={action.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
              <span className="text-sm text-gray-700">{action.title}</span>
              <code className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-mono">
                {action.shortcut}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
