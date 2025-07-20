export default function ClientFinderBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 z-0 w-full h-full overflow-hidden"
      style={{
        filter: 'blur(48px)',
        opacity: 0.55,
      }}
    >
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-br from-[#7F5AF0]/40 via-[#00FFC2]/30 to-transparent animate-pulse"
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-gradient-to-tr from-[#00FFC2]/30 via-[#7F5AF0]/20 to-transparent animate-pulse"
      />
    </div>
  );
} 