import Image from "next/image";

type Props = {
  state: any;
  setState: (s: any) => void;
  step: number;
  setStep: (n: number) => void;
  totalSteps: number;
};

export default function StepWelcome({ setStep, step }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <Image src="/logo.png" alt="HustleHack AI Logo" width={64} height={64} className="mb-2" />
      <h1 className="text-2xl font-bold text-[--hh-purple]">Find YouTube Clients Who Need Better Thumbnails</h1>
      <p className="text-gray-700">Let’s help you land paying clients. Pick a niche and we’ll find YouTube creators who could use better thumbnails.</p>
      <button
        className="mt-4 px-6 py-2 bg-[--hh-purple] text-white rounded-md font-semibold hover:bg-purple-700 transition"
        onClick={() => setStep(step + 1)}
      >
        Get Started
      </button>
    </div>
  );
} 