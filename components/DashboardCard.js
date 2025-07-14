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
    <div className={`bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full ${
      resource.unlocked 
        ? 'border-[#7F5AF0] hover:border-[#7F5AF0] border-l-4' 
        : 'border-gray-200 opacity-75 hover:opacity-90'
    }`}>
      <div className="p-6 sm:p-8 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-4xl animate-bounce flex-shrink-0">{getResourceIcon(resource.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 hover:text-[#7F5AF0] transition-colors leading-tight mb-1">
                {resource.name || resource.title}
              </h3>
              <p className="text-sm text-gray-500">{resource.category || resource.type}</p>
            </div>
          </div>
          {resource.unlocked ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 animate-pulse flex-shrink-0">
              ✅ Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200 flex-shrink-0">
              🔒 Locked
            </span>
          )}
        </div>
        
        {/* Main Content - Grows to fill available space */}
        <div className="flex-1 flex flex-col justify-end">
          <button
            className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              resource.unlocked
                ? 'bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white hover:shadow-lg hover:scale-105 transform hover:from-[#6B46C1] hover:to-[#00E5B8]'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed border-2 border-gray-200 hover:bg-gray-200'
            }`}
            disabled={!resource.unlocked}
            onClick={() => onAccess(resource.name)}
          >
            {resource.unlocked ? 'Access Now →' : 'Upgrade to Unlock 🔓'}
          </button>
          
          {!resource.unlocked && (
            <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100 hover:shadow-md transition-shadow">
              <p className="text-red-600 text-sm font-medium text-center">
                💎 Upgrade your plan to access this resource
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
