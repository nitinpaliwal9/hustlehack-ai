'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabaseClient'

export default function First100Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      
      // Get total users
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      // Get creator mode users
      const { count: creatorUsers } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('plan_name', 'creator')

      // Get first 100 users count
      const { data: first100Users } = await supabase
        .from('users')
        .select('id')
        .order('created_at', { ascending: true })
        .limit(100)

      setStats({
        totalUsers: totalUsers || 0,
        creatorUsers: creatorUsers || 0,
        first100Count: first100Users?.length || 0
      })
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Error Loading Stats</h3>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  const remainingSlots = Math.max(0, 100 - stats.first100Count)
  const creatorPercentage = stats.totalUsers > 0 ? ((stats.creatorUsers / stats.totalUsers) * 100).toFixed(1) : 0

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-4">🎉 First 100 Users Stats</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{stats.creatorUsers}</div>
          <div className="text-sm opacity-90">Creator Mode Users</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">{stats.first100Count}</div>
          <div className="text-sm opacity-90">First 100 Users</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold">{remainingSlots}</div>
          <div className="text-sm opacity-90">Remaining Slots</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Creator Mode Percentage</span>
          <span className="text-sm font-bold">{creatorPercentage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${creatorPercentage}%` }}
          ></div>
        </div>
      </div>

      {remainingSlots > 0 && (
        <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg">
          <p className="text-sm font-medium">
            🎁 {remainingSlots} Creator Mode slots still available for first 100 users!
          </p>
        </div>
      )}

      {remainingSlots === 0 && (
        <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
          <p className="text-sm font-medium">
            ✅ All 100 Creator Mode slots have been claimed!
          </p>
        </div>
      )}
    </div>
  )
} 