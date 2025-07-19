/**
 * Utility function to combine CSS class names conditionally
 * @param {...any} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export default function classNames(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
} 