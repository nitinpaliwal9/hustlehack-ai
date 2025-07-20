import FinderWizard from "./wizard/FinderWizard";
import AnimatedBackground from '../instant-hustle/components/AnimatedBackground';
import PlanGatingProvider from '../instant-hustle/components/PlanGatingProvider';

export default function ClientFinderPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0E0E11] to-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <PlanGatingProvider>
        <FinderWizard />
      </PlanGatingProvider>
    </main>
  );
} 