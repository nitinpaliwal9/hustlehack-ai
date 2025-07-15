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
        <div
          className="rounded-xl p-4 border-2 transition-all duration-300"
          style={{
            background: 'var(--bg-surface)',
            borderColor: unlocked ? 'var(--border-color)' : 'var(--border-color)',
            boxShadow: unlocked ? undefined : undefined
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} ${unlocked ? 'shadow-md' : 'opacity-50'}`}> 
              <action.icon className="w-5 h-5" style={{ color: '#fff' }} />
            </div>
            <div className="flex items-center gap-2">
              {action.premium && (
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    background: unlocked ? 'var(--warning)' : 'var(--bg-surface)',
                    color: unlocked ? '#7F5AF0' : 'var(--text-secondary)'
                  }}
                >
                  Pro
                </span>
              )}
              <ExternalLink className="w-4 h-4" style={{ color: 'var(--text-secondary)', opacity: hoveredAction === action.id ? 1 : 0, transition: 'opacity 0.2s' }} />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-semibold" style={{ color: unlocked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {action.title}
            </h3>
            <p className="text-sm" style={{ color: unlocked ? 'var(--text-secondary)' : 'var(--text-secondary)' }}>
              {action.description}
            </p>
          </div>

          {/* Shortcut */}
          {unlocked && (
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Shortcut</span>
                <code className="px-2 py-1 rounded text-xs font-mono" style={{ background: 'rgba(127,90,240,0.08)', color: 'var(--text-secondary)' }}>
                  {action.shortcut}
                </code>
              </div>
            </div>
          )}

          {/* Hover Effect */}
          {hoveredAction === action.id && unlocked && (
            <div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(127,90,240,0.07)' }} />
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
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>⚡ Quick Actions</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Access your most used features instantly</p>
        </div>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Use keyboard shortcuts for faster access
        </div>
      </div>

      {/* Actions by Category */}
      <div className="space-y-6">
        {Object.entries(actionsByCategory).map(([category, actions]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span className="w-2 h-2" style={{ background: 'var(--accent)', borderRadius: '9999px', display: 'inline-block' }}></span>
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
      <div className="rounded-xl p-6 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg" style={{ background: 'var(--accent)' }}>
            <Target className="w-5 h-5" style={{ color: '#fff' }} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>💡 Pro Tips</h4>
            <ul className="text-sm" style={{ color: 'var(--accent)' }}>
              <li>• Use keyboard shortcuts for lightning-fast access</li>
              <li>• Premium features are available with Pro plan</li>
              <li>• Click on any action to jump directly to that tool</li>
              <li>• Hover over actions to see additional details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="rounded-xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
        <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Clock className="w-5 h-5" />
          Keyboard Shortcuts
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.filter(action => isActionUnlocked(action)).map(action => (
            <div key={action.id} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{action.title}</span>
              <code className="px-2 py-1 rounded text-xs font-mono" style={{ background: 'rgba(127,90,240,0.08)', color: 'var(--text-secondary)' }}>
                {action.shortcut}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
