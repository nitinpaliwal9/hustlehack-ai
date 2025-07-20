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
    <div className="flex flex-col items-center text-center gap-6">
      <h2 className="text-xl font-bold text-[--hh-purple]">Select Your Niche(s)</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {NICHES.map((niche) => (
          <button
            key={niche}
            className={`px-4 py-2 rounded-full border font-medium transition ${state.niches.includes(niche) ? 'bg-[--hh-purple] text-white' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => toggleNiche(niche)}
          >
            {niche}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-[--hh-purple] text-white rounded-md font-semibold hover:bg-purple-700 transition disabled:opacity-50"
        onClick={() => setStep(step + 1)}
        disabled={state.niches.length === 0}
      >
        Next
      </button>
    </div>
  );
} 