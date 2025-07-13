'use client'

import React from 'react'

export default function DashboardCard({ resource, onAccess }) {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden transition-all duration-200 hover:shadow-lg ${
      resource.unlocked ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-300 opacity-60'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
          {resource.unlocked ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✅ Unlocked
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              🔒 Locked
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-4">{resource.category}</p>
        <button
          className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
            resource.unlocked
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!resource.unlocked}
          onClick={() => onAccess(resource.name)}
        >
          {resource.unlocked ? 'Access Now' : 'Upgrade to Unlock'}
        </button>
        {!resource.unlocked && (
          <p className="text-red-500 mt-2 text-sm font-medium">
            Upgrade your plan to access this resource.
          </p>
        )}
      </div>
    </div>
  )
}
