"use client";
import { useState } from "react";
import type { FinderState } from "../../../types/client-finder";
import StepWelcome from "./steps/StepWelcome";
import StepNiche from "./steps/StepNiche";
import StepChannelSize from "./steps/StepChannelSize";
import StepActivity from "./steps/StepActivity";
import StepOpportunity from "./steps/StepOpportunity";
import StepReview from "./steps/StepReview";

const steps = [
  StepWelcome,
  StepNiche,
  StepChannelSize,
  StepActivity,
  StepOpportunity,
  StepReview,
];

export default function FinderWizard() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FinderState>({
    platform: "youtube",
    niches: [],
    subsMin: 10000,
    subsMax: 200000,
    recentDays: 60,
    regions: [],
    needThumbnailHelp: true,
    maxResults: 25,
    status: "idle",
    progress: 0,
  });

  const StepComponent = steps[step];

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
      {StepComponent ? (
        <StepComponent
          state={state}
          setState={setState}
          step={step}
          setStep={setStep}
          totalSteps={steps.length}
        />
      ) : (
        <div className="text-red-500 font-bold text-center">Step not found.</div>
      )}
    </div>
  );
} 