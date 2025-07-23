'use client';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AIPoweredProductsSection from '../components/AIPoweredProductsSection';

export default function AIProductsPage() {
  return (
    <div className="w-full min-h-screen bg-[#0A1020] text-white">
      <Navigation />
      <div className="mt-20">
        <AIPoweredProductsSection onCarouselClick={() => window.location.href = '/purchase/instagram-carousels'} />
      </div>
      <Footer />
    </div>
  );
} 