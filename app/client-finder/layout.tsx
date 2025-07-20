import NavigationClient from '../components/NavigationClient';
import FooterClient from '../components/FooterClient';
import ClientFinderBackground from './wizard/ClientFinderBackground';

export default function ClientFinderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationClient />
      <main id="main" className="relative min-h-screen pt-20 pb-24 bg-[#0E0E11] flex justify-center items-start">
        <ClientFinderBackground />
        <div className="relative w-full max-w-5xl mx-auto z-10 flex flex-col items-center px-4">
          {children}
        </div>
      </main>
      <FooterClient />
    </>
  );
} 