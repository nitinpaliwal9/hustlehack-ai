type Props = {
  state: any;
  setState: (s: any) => void;
  step: number;
  setStep: (n: number) => void;
  totalSteps: number;
};

export default function StepActivity({ state, setState, setStep, step }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h2 className="text-xl font-bold text-[--hh-purple]">Recent Activity Filter</h2>
      <label className="text-gray-700">
        Show channels that uploaded in last
        <input
          type="number"
          min={1}
          max={365}
          value={state.recentDays}
          onChange={e => setState({ ...state, recentDays: Number(e.target.value) })}
          className="mx-2 w-16 border rounded px-2 py-1 text-center"
        />
        days
      </label>
      <button
        className="mt-4 px-6 py-2 bg-[--hh-purple] text-white rounded-md font-semibold hover:bg-purple-700 transition"
        onClick={() => setStep(step + 1)}
      >
        Next
      </button>
    </div>
  );
} 