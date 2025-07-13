'use client'

import { useEffect, useState } from 'react'

export default function DashboardClient() {
  const [usage, setUsage] = useState(null)

  useEffect(() => {
    // Example logic: fetch from Supabase or placeholder for now
    setUsage({ visits: 42, downloads: 8 })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard</h1>
      {usage ? (
        <div>
          <p className="text-lg">Visits: {usage.visits}</p>
          <p className="text-lg">Downloads: {usage.downloads}</p>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  )
}
