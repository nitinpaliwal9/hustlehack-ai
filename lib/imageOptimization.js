// Image optimization utilities

// Predefined image sizes for responsive design
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 }
}

// Quality settings for different use cases
export const QUALITY_SETTINGS = {
  low: 60,
  medium: 80,
  high: 90,
  max: 100
}

// Format settings
export const FORMAT_SETTINGS = {
  webp: 'webp',
  jpeg: 'jpeg',
  png: 'png',
  avif: 'avif'
}

/**
 * Generate optimized image URL with Next.js Image component
 * @param {string} src - Image source
 * @param {Object} size - Image size object
 * @param {string} quality - Quality setting
 * @param {string} format - Image format
 * @returns {Object} - Image props for Next.js Image component
 */
export const getOptimizedImageProps = (
  src,
  size = IMAGE_SIZES.medium,
  quality = QUALITY_SETTINGS.medium,
  format = FORMAT_SETTINGS.webp
) => {
  return {
    src,
    width: size.width,
    height: size.height,
    quality,
    format,
    priority: false,
    loading: 'lazy',
    sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
  }
}

/**
 * Generate responsive image sizes
 * @param {string} src - Image source
 * @param {Object} sizes - Different sizes for responsive design
 * @returns {Object} - Responsive image props
 */
export const getResponsiveImageProps = (src, sizes = IMAGE_SIZES) => {
  return {
    src,
    sizes: Object.values(sizes).map(size => `${size.width}px`).join(', '),
    fill: true,
    quality: QUALITY_SETTINGS.medium,
    format: FORMAT_SETTINGS.webp,
    priority: false,
    loading: 'lazy'
  }
}

/**
 * Generate hero image props (high priority)
 * @param {string} src - Image source
 * @returns {Object} - Hero image props
 */
export const getHeroImageProps = (src) => {
  return {
    src,
    width: IMAGE_SIZES.hero.width,
    height: IMAGE_SIZES.hero.height,
    quality: QUALITY_SETTINGS.high,
    format: FORMAT_SETTINGS.webp,
    priority: true,
    loading: 'eager'
  }
}

/**
 * Generate thumbnail image props
 * @param {string} src - Image source
 * @returns {Object} - Thumbnail image props
 */
export const getThumbnailProps = (src) => {
  return {
    src,
    width: IMAGE_SIZES.thumbnail.width,
    height: IMAGE_SIZES.thumbnail.height,
    quality: QUALITY_SETTINGS.medium,
    format: FORMAT_SETTINGS.webp,
    priority: false,
    loading: 'lazy'
  }
}

/**
 * Generate avatar image props
 * @param {string} src - Image source
 * @param {number} size - Avatar size
 * @returns {Object} - Avatar image props
 */
export const getAvatarProps = (src, size = 40) => {
  return {
    src,
    width: size,
    height: size,
    quality: QUALITY_SETTINGS.medium,
    format: FORMAT_SETTINGS.webp,
    priority: false,
    loading: 'lazy',
    className: 'rounded-full object-cover'
  }
}

/**
 * Generate background image styles
 * @param {string} src - Image source
 * @param {string} position - Background position
 * @returns {Object} - Background image styles
 */
export const getBackgroundImageStyles = (src, position = 'center') => {
  return {
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: position,
    backgroundRepeat: 'no-repeat'
  }
}

/**
 * Preload critical images
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  if (typeof window === 'undefined') return

  imageUrls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}

/**
 * Generate placeholder for image loading
 * @param {number} width - Placeholder width
 * @param {number} height - Placeholder height
 * @param {string} color - Placeholder color
 * @returns {string} - Data URL for placeholder
 */
export const generatePlaceholder = (width = 300, height = 200, color = '#f3f4f6') => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = width
  canvas.height = height
  
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}

/**
 * Check if image is loaded
 * @param {string} src - Image source
 * @returns {Promise<boolean>} - Whether image is loaded
 */
export const isImageLoaded = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
} 