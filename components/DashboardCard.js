'use client'

import React from 'react'

export default function DashboardCard({ resource, onAccess }) {
  const getResourceIcon = (category) => {
    switch (category) {
      case 'Toolkits & Templates': return '🛠️'
      case 'Weekly Drops': return '📦'
      case 'Pro Tools': return '⚡'
      case 'Prompt Packs': return '📝'
      default: return '📄'
    }
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
      resource.unlocked 
        ? 'border-l-4 border-[#7F5AF0] hover:border-l-8' 
        : 'border-l-4 border-gray-300 opacity-70 hover:opacity-80'
    }`}>
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-4xl animate-bounce">{getResourceIcon(resource.category)}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 hover:text-[#7F5AF0] transition-colors">{resource.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{resource.category}</p>
            </div>
          </div>
          {resource.unlocked ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 animate-pulse">
              ✅ Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200">
              🔒 Locked
            </span>
          )}
        </div>
        
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
  )
}
