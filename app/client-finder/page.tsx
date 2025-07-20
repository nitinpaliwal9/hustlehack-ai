import FinderWizard from "./wizard/FinderWizard";
import AnimatedBackground from '../instant-hustle/components/AnimatedBackground';
import PlanGatingProvider from '../instant-hustle/components/PlanGatingProvider';

export default function ClientFinderPage() {
  return (
    <>
      <AnimatedBackground />
      <PlanGatingProvider>
        <FinderWizard />
      </PlanGatingProvider>
    </>
  );
} 