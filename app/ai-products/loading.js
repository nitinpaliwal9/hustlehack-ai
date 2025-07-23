// Skeleton loading page for AI Products
export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#0A1020] flex flex-col items-center justify-center py-24">
      <div className="animate-pulse w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-[#151a28] rounded-2xl p-8 shadow-lg flex flex-col gap-4">
            <div className="h-8 w-2/3 bg-[#232946] rounded mb-2" />
            <div className="h-4 w-1/2 bg-[#232946] rounded mb-4" />
            <div className="h-24 w-full bg-[#232946] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
} 