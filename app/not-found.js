import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found (404)
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span>🏠</span>
            Go Home
          </Link>
          <Link
            href="/resources"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span>📚</span>
            Browse Resources
          </Link>
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <span>📞</span>
            Contact Support
          </Link>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Can't find what you're looking for? Try our{' '}
            <Link href="/resources" className="text-purple-600 hover:text-purple-700 underline">
              resource library
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-purple-600 hover:text-purple-700 underline">
              contact us
            </Link>{' '}
            for help.
          </p>
        </div>
      </div>
    </div>
  )
} 