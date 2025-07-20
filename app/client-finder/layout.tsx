import NavigationClient from '../components/NavigationClient';
import FooterClient from '../components/FooterClient';

export default function ClientFinderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationClient />
      <main id="main" className="pt-20 pb-24">
        {children}
      </main>
      <FooterClient />
    </>
  );
} 