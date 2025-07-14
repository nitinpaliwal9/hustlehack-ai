'use client'

import React from 'react'

export default function DashboardCard({ resource, onAccess }) {
  const getResourceIcon = (type) => {
    switch (type) {
      case 'template': return '🛠️'
      case 'prompt_pack': return '📝'
      case 'video': return '🎥'
      case 'pdf': return '📄'
      case 'notion': return '📓'
      default: return '📄'
    }
  }

  return (
    <div className={`rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full ${
      resource.unlocked 
        ? 'border-[var(--primary)] hover:border-[var(--primary)] border-l-4' 
        : 'border-[var(--border-color)] opacity-80 hover:opacity-95'
    }`} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
      <div className="p-4 sm:p-6 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-2xl sm:text-4xl animate-bounce flex-shrink-0">{getResourceIcon(resource.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-xl font-bold hover:text-[#7F5AF0] transition-colors leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>
                {resource.name || resource.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{resource.category || resource.type}</p>
            </div>
          </div>
          {resource.unlocked ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white border border-green-600 animate-pulse flex-shrink-0 shadow-sm">
              ✅ Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-orange-400 text-white border border-red-600 flex-shrink-0 shadow-sm">
              🔒 Locked
            </span>
          )}
        </div>
        
        {/* Main Content - Grows to fill available space */}
        <div className="flex-1 flex flex-col justify-end">
          <button
            className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
              resource.unlocked
                ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:shadow-lg hover:scale-105 transform hover:from-[#6B46C1] hover:to-[#00E5B8]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700 hover:bg-gray-700'
            }`}
            disabled={!resource.unlocked}
            onClick={() => onAccess(resource.name)}
            style={{ minHeight: 48 }}
          >
            {resource.unlocked ? 'Access Now →' : 'Upgrade to Unlock 🔓'}
          </button>
          {!resource.unlocked && (
            <div className="mt-3 p-2 sm:mt-4 sm:p-3 bg-gradient-to-r from-red-900/60 to-orange-900/40 rounded-lg border border-red-800 hover:shadow-md transition-shadow">
              <p className="text-red-300 text-xs sm:text-sm font-medium text-center">
                💎 Upgrade your plan to access this resource
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
