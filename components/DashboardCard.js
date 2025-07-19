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
        ? 'border-[#7F5AF0] hover:border-[#7F5AF0] border-l-4' 
        : 'border-gray-600 opacity-80 hover:opacity-95'
    }`} style={{ 
      background: resource.unlocked 
        ? 'linear-gradient(135deg, rgba(127,90,240,0.05) 0%, rgba(0,255,194,0.05) 100%)' 
        : 'rgba(36,41,46,0.8)', 
      color: '#FFFFFF' 
    }}>
      <div className="p-4 sm:p-6 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-2xl sm:text-4xl animate-bounce flex-shrink-0">{getResourceIcon(resource.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-xl font-bold hover:text-[#7F5AF0] transition-colors leading-tight mb-1" style={{ color: '#FFFFFF' }}>
                {resource.name || resource.title}
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: '#B0B0B0' }}>{resource.category || resource.type}</p>
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
            className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F5AF0] focus-visible:ring-offset-2 ${
              resource.unlocked
                ? 'bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white hover:shadow-lg hover:scale-105 transform hover:from-[#6B46C1] hover:to-[#00E5B8]'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed border-2 border-gray-600 hover:bg-gray-600'
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
