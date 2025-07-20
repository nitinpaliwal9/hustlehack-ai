import React from 'react';

type Props = {
  state: any;
  setState: (s: any) => void;
  step: number;
  setStep: (n: number) => void;
  totalSteps: number;
};

const PRESETS = [
  { label: "Small (5K–50K)", min: 5000, max: 50000 },
  { label: "Growing (50K–250K)", min: 50000, max: 250000 },
  { label: "Custom", min: null, max: null },
];

export default function StepChannelSize({ state, setState, setStep, step }: Props) {
  const [custom, setCustom] = React.useState(false);

  const handlePreset = (preset: typeof PRESETS[0]) => {
    if (preset.label === "Custom") {
      setCustom(true);
    } else {
      setCustom(false);
      setState({ ...state, subsMin: preset.min, subsMax: preset.max });
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h2 className="text-xl font-bold text-[--hh-purple]">Select Channel Size</h2>
      <div className="flex gap-2 mb-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            className={`px-4 py-2 rounded-full border font-medium transition ${!custom && state.subsMin === preset.min && state.subsMax === preset.max ? 'bg-[--hh-purple] text-white' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => handlePreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>
      {custom && (
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <label className="text-sm text-gray-600">Min Subscribers: {state.subsMin}</label>
          <input
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={state.subsMin}
            onChange={e => setState({ ...state, subsMin: Number(e.target.value) })}
          />
          <label className="text-sm text-gray-600">Max Subscribers: {state.subsMax}</label>
          <input
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={state.subsMax}
            onChange={e => setState({ ...state, subsMax: Number(e.target.value) })}
          />
        </div>
      )}
      <button
        className="mt-4 px-6 py-2 bg-[--hh-purple] text-white rounded-md font-semibold hover:bg-purple-700 transition"
        onClick={() => setStep(step + 1)}
      >
        Next
      </button>
    </div>
  );
} 