export default function Loading() {
  return (
    <div className="p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-700/40 rounded w-1/3 mb-4" />
        <div className="h-6 bg-gray-700/40 rounded w-1/4 mb-2" />
        <div className="h-40 bg-gray-700/40 rounded w-full mb-4" />
        <div className="h-6 bg-gray-700/40 rounded w-1/2 mb-2" />
        <div className="h-32 bg-gray-700/40 rounded w-full" />
      </div>
    </div>
  );
} 