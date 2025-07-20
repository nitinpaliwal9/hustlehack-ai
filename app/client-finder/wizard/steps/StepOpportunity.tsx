type Props = {
  state: any;
  setState: (s: any) => void;
  step: number;
  setStep: (n: number) => void;
  totalSteps: number;
};

export default function StepOpportunity({ state, setState, setStep, step }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h2 className="text-xl font-bold text-[--hh-purple]">Improvement Opportunity</h2>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={state.needThumbnailHelp}
          onChange={e => setState({ ...state, needThumbnailHelp: e.target.checked })}
          className="w-5 h-5 accent-[--hh-purple]"
        />
        <span className="text-gray-700">Prioritize channels where thumbnail design can be improved</span>
      </label>
      <p className="text-gray-500 text-sm">Turn this on to prioritize channels where design upgrades may boost clicks.</p>
      <button
        className="mt-4 px-6 py-2 bg-[--hh-purple] text-white rounded-md font-semibold hover:bg-purple-700 transition"
        onClick={() => setStep(step + 1)}
      >
        Next
      </button>
    </div>
  );
} 