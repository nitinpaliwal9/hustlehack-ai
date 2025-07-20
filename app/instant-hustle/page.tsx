import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import InstantHustleLite from './components/InstantHustleLite';
import PlanGatingProvider from './components/PlanGatingProvider';
import AnimatedBackground from './components/AnimatedBackground';
import TestimonialsSlider from './components/TestimonialsSlider';

export default function InstantHustlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1A] to-[#1A1A2E] relative overflow-hidden">
      <Navigation />
      <AnimatedBackground />
      <PlanGatingProvider>
        <div className="relative z-10 pt-20">
          <InstantHustleLite />
          <TestimonialsSlider />
        </div>
      </PlanGatingProvider>
      <Footer />
    </div>
  );
} 