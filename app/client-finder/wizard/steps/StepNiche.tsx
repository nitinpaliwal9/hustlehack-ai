import StepShell from '../../components/StepShell';

const NICHES = [
  "Fitness", "Education", "Tech & AI", "Finance", "Entrepreneurship", "Motivation", "Parenting", "Health & Wellness", "Gaming", "Beauty", "Travel", "Food", "Fashion", "Personal Branding"
];

type Props = {
  state: any;
  setState: (s: any) => void;
  step: number;
  setStep: (n: number) => void;
  totalSteps: number;
};

export default function StepNiche({ state, setState, setStep, step }: Props) {
  const toggleNiche = (niche: string) => {
    setState({
      ...state,
      niches: state.niches.includes(niche)
        ? state.niches.filter((n: string) => n !== niche)
        : [...state.niches, niche],
    });
  };

  return (
    <StepShell
      step={step}
      totalSteps={6}
      title="Select Your Niche(s)"
      subtitle="Choose one or more niches to find the best-fit clients."
      variant="current"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {NICHES.map((niche) => (
          <button
            key={niche}
            className={`px-4 py-2 rounded-full border font-medium transition focus:outline-none focus:ring-2 focus:ring-[#7F5AF0] focus:ring-offset-2 ${state.niches.includes(niche) ? 'bg-[#7F5AF0] text-white border-[#7F5AF0]' : 'bg-white/10 text-gray-100 border-white/10 hover:bg-[#232136] hover:text-white'}`}
            onClick={() => toggleNiche(niche)}
          >
            {niche}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-[#7F5AF0] text-white rounded-md font-semibold hover:bg-[#5A3FA3] transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#7F5AF0] focus:ring-offset-2"
        onClick={() => setStep(step + 1)}
        disabled={state.niches.length === 0}
      >
        Next
      </button>
    </StepShell>
  );
} 