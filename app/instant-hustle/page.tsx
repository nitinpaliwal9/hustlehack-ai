import Navigation from '../components/NavigationClient';
import Footer from '../components/FooterClient';
import InstantHustleLite from './components/InstantHustleLite';
import PlanGatingProvider from './components/PlanGatingProvider';
import AnimatedBackground from './components/AnimatedBackground';
import TestimonialsSliderClient from './components/TestimonialsSliderClient';

export default function InstantHustlePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0F0F1A] to-[#1A1A2E] overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <AnimatedBackground />
      <PlanGatingProvider>
        <div className="relative z-10 pt-20">
          <InstantHustleLite />
          <TestimonialsSliderClient />
        </div>
      </PlanGatingProvider>
      <Footer />
    </div>
  );
} 