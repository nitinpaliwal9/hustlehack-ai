import { useState } from "react";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const STAGES = [
  "Fetching Channels",
  "Collecting Recent Videos",
  "Evaluating Thumbnails",
  "Scoring Fit",
  "Finalizing Results",
];

const MOCK_RESULTS = [
  {
    channelId: "UC_123",
    name: "FitWithRiya",
    url: "https://youtube.com/@fitwithriya",
    subs: 42000,
    country: "IN",
    lastUpload: "2025-07-10",
    avgViews: 5500,
    thumbSamples: ["/branding/sample-thumb1.jpg"],
    notes: "Strong content, weak thumbnails",
    scores: { thumbnailOppty: 82, activity: 90, sizeFit: 80, overall: 84 },
    contact: { email: "riya@email.com", socials: [{ type: "instagram", url: "https://instagram.com/riya" }] },
  },
  {
    channelId: "UC_456",
    name: "EduBytes",
    url: "https://youtube.com/@edubytes",
    subs: 120000,
    country: "US",
    lastUpload: "2025-07-15",
    avgViews: 18000,
    thumbSamples: ["/branding/sample-thumb2.jpg"],
    notes: "Great info, but thumbnails lack contrast",
    scores: { thumbnailOppty: 75, activity: 95, sizeFit: 90, overall: 85 },
    contact: { email: "contact@edubytes.com", socials: [{ type: "twitter", url: "https://twitter.com/edubytes" }] },
  },
];

type Props = {
  state: any;
  setState: (s: any) => void;
  step: number;
  setStep: (n: number) => void;
  totalSteps: number;
};

export default function StepReview({ state, setState }: Props) {
  const [processing, setProcessing] = useState(false);
  const [stage, setStage] = useState(0);
  const [results, setResults] = useState<any[]>([]);

  const runScan = async () => {
    setProcessing(true);
    setStage(0);
    for (let i = 0; i < STAGES.length; i++) {
      setStage(i);
      await sleep(700 + Math.random() * 600);
    }
    setResults(MOCK_RESULTS);
    setProcessing(false);
  };

  if (processing) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold text-[--hh-purple]">Scanning YouTube…</h2>
        <div className="w-full max-w-xs">
          <div className="flex flex-col gap-2">
            {STAGES.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${i <= stage ? 'bg-[--hh-purple]' : 'bg-gray-300'}`}></span>
                <span className={i === stage ? 'font-semibold text-[--hh-purple]' : 'text-gray-500'}>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[--hh-purple] h-2 rounded-full transition-all" style={{ width: `${((stage+1)/STAGES.length)*100}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-xl font-bold text-[--hh-purple]">Results</h2>
        <div className="w-full flex flex-col gap-4">
          {results.map((ch) => (
            <div key={ch.channelId} className="bg-gray-50 rounded-lg p-4 flex gap-4 items-center shadow">
              <img src={ch.thumbSamples[0]} alt={ch.name} className="w-16 h-16 rounded object-cover border" />
              <div className="flex-1">
                <div className="font-semibold text-lg">{ch.name}</div>
                <div className="text-gray-600 text-sm">{ch.subs.toLocaleString()} subs • {ch.country}</div>
                <div className="text-gray-500 text-xs">{ch.notes}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[--hh-purple] font-bold">{ch.scores.overall}/100</span>
                <a href={ch.url} target="_blank" rel="noopener" className="text-xs text-blue-600 underline mt-1">View Channel</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h2 className="text-xl font-bold text-[--hh-purple]">Review & Run</h2>
      <div className="bg-gray-50 rounded-lg p-4 w-full max-w-md text-left">
        <div><span className="font-semibold">Niches:</span> {state.niches.join(", ")}</div>
        <div><span className="font-semibold">Subscribers:</span> {state.subsMin} – {state.subsMax}</div>
        <div><span className="font-semibold">Recent Activity:</span> Last {state.recentDays} days</div>
        <div><span className="font-semibold">Thumbnail Help:</span> {state.needThumbnailHelp ? "Yes" : "No"}</div>
      </div>
      <button
        className="mt-4 px-6 py-2 bg-[--hh-purple] text-white rounded-md font-semibold hover:bg-purple-700 transition"
        onClick={runScan}
      >
        Run Scan
      </button>
    </div>
  );
} 