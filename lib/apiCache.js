// API caching utilities

// Cache storage
const cache = new Map()

// Cache configuration
const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxSize: 100, // Maximum number of cached items
  cleanupInterval: 10 * 60 * 1000 // 10 minutes
}

/**
 * Generate cache key from request parameters
 * @param {string} url - Request URL
 * @param {Object} params - Request parameters
 * @returns {string} - Cache key
 */
export const generateCacheKey = (url, params = {}) => {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')
  
  return `${url}?${sortedParams}`
}

/**
 * Cache item class
 */
class CacheItem {
  constructor(data, ttl = CACHE_CONFIG.defaultTTL) {
    this.data = data
    this.timestamp = Date.now()
    this.ttl = ttl
  }

  isExpired() {
    return Date.now() - this.timestamp > this.ttl
  }

  getAge() {
    return Date.now() - this.timestamp
  }
}

/**
 * Get cached data
 * @param {string} key - Cache key
 * @returns {any|null} - Cached data or null if not found/expired
 */
export const getCachedData = (key) => {
  const item = cache.get(key)
  
  if (!item) {
    return null
  }
  
  if (item.isExpired()) {
    cache.delete(key)
    return null
  }
  
  return item.data
}

/**
 * Set cached data
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in milliseconds
 */
export const setCachedData = (key, data, ttl = CACHE_CONFIG.defaultTTL) => {
  // Clean up expired items
  cleanupCache()
  
  // Check cache size limit
  if (cache.size >= CACHE_CONFIG.maxSize) {
    const oldestKey = cache.keys().next().value
    cache.delete(oldestKey)
  }
  
  cache.set(key, new CacheItem(data, ttl))
}

/**
 * Remove cached data
 * @param {string} key - Cache key
 */
export const removeCachedData = (key) => {
  cache.delete(key)
}

/**
 * Clear all cached data
 */
export const clearCache = () => {
  cache.clear()
}

/**
 * Clean up expired cache items
 */
export const cleanupCache = () => {
  for (const [key, item] of cache.entries()) {
    if (item.isExpired()) {
      cache.delete(key)
    }
  }
}

/**
 * Get cache statistics
 * @returns {Object} - Cache statistics
 */
export const getCacheStats = () => {
  cleanupCache()
  
  return {
    size: cache.size,
    maxSize: CACHE_CONFIG.maxSize,
    hitRate: 0, // Would need to track hits/misses
    oldestItem: Math.min(...Array.from(cache.values()).map(item => item.getAge())),
    newestItem: Math.max(...Array.from(cache.values()).map(item => item.getAge()))
  }
}

/**
 * Cached API request wrapper
 * @param {string} url - Request URL
 * @param {Object} options - Request options
 * @param {Object} cacheOptions - Cache options
 * @returns {Promise<any>} - API response
 */
export const cachedFetch = async (url, options = {}, cacheOptions = {}) => {
  const { ttl = CACHE_CONFIG.defaultTTL, useCache = true } = cacheOptions
  
  if (!useCache) {
    return fetch(url, options)
  }
  
  const cacheKey = generateCacheKey(url, options)
  const cachedData = getCachedData(cacheKey)
  
  if (cachedData) {
    return Promise.resolve(cachedData)
  }
  
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    
    setCachedData(cacheKey, data, ttl)
    
    return data
  } catch (error) {
    console.error('Cached fetch error:', error)
    throw error
  }
}

/**
 * Cache middleware for API routes
 * @param {Function} handler - API route handler
 * @param {Object} options - Cache options
 * @returns {Function} - Wrapped handler
 */
export const withCache = (handler, options = {}) => {
  return async (req, res) => {
    const { ttl = CACHE_CONFIG.defaultTTL, useCache = true } = options
    
    if (!useCache || req.method !== 'GET') {
      return handler(req, res)
    }
    
    const cacheKey = generateCacheKey(req.url, req.query)
    const cachedData = getCachedData(cacheKey)
    
    if (cachedData) {
      return res.json(cachedData)
    }
    
    // Store original res.json method
    const originalJson = res.json
    
    // Override res.json to cache the response
    res.json = function(data) {
      setCachedData(cacheKey, data, ttl)
      return originalJson.call(this, data)
    }
    
    return handler(req, res)
  }
}

/**
 * Cache invalidation patterns
 */
export const CACHE_PATTERNS = {
  // Invalidate all user-related cache when user data changes
  userData: (userId) => `user:${userId}:*`,
  
  // Invalidate content cache when content is updated
  content: (contentId) => `content:${contentId}:*`,
  
  // Invalidate all cache
  all: () => '*'
}

/**
 * Invalidate cache by pattern
 * @param {string} pattern - Cache invalidation pattern
 */
export const invalidateCache = (pattern) => {
  for (const key of cache.keys()) {
    if (pattern === '*' || key.includes(pattern)) {
      cache.delete(key)
    }
  }
}

// Set up periodic cache cleanup
if (typeof window !== 'undefined') {
  setInterval(cleanupCache, CACHE_CONFIG.cleanupInterval)
} 