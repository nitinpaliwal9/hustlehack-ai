export default function Loading() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-700/40 rounded w-2/3 mb-6" />
        <div className="flex gap-4 mb-8">
          <div className="h-64 w-1/3 bg-gray-700/40 rounded-xl" />
          <div className="h-64 w-1/3 bg-gray-700/40 rounded-xl" />
          <div className="h-64 w-1/3 bg-gray-700/40 rounded-xl" />
        </div>
        <div className="h-8 bg-gray-700/40 rounded w-1/2 mb-2" />
        <div className="h-24 bg-gray-700/40 rounded w-full" />
      </div>
    </div>
  );
} 