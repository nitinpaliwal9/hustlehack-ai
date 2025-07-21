import Image from 'next/image';

const items = [
  {
    name: 'GPT-4o',
    logo: null, // No local logo, use styled text
    textClass: 'font-mono font-bold text-[#7F5AF0]'
  },
  {
    name: 'Supabase',
    logo: null, // No local logo, use styled text
    textClass: 'font-mono font-bold text-[#3ECF8E]'
  },
  {
    name: 'Vercel',
    logo: '/vercel.svg',
    textClass: ''
  },
  {
    name: 'Next.js',
    logo: '/next.svg',
    textClass: ''
  },
  {
    name: 'OpenAI',
    logo: null, // No local logo, use styled text
    textClass: 'font-mono font-bold text-[#00FFC2]'
  },
  {
    name: 'Railway',
    logo: null, // No local logo, use styled text
    textClass: 'font-mono font-bold text-[#FFD700]'
  },
];

export default function PoweredByBar() {
  return (
    <div className="w-full flex flex-col items-center py-4 px-2">
      <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-gray-400 font-semibold tracking-wide uppercase">
        Powered by:
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        {items.map((item, i) => (
          <div
            key={item.name}
            className="flex items-center gap-1 group transition-transform duration-150 hover:scale-105 hover:brightness-110"
          >
            {item.logo ? (
              <Image src={item.logo} alt={item.name + ' logo'} width={28} height={28} className="inline-block align-middle" />
            ) : (
              <span className={item.textClass + ' text-base sm:text-lg'}>{item.name}</span>
            )}
            {i < items.length - 1 && (
              <span className="mx-1 text-gray-500 font-bold text-lg select-none">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 