'use client';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const TONES = ['Professional', 'Friendly', 'Bold', 'Playful', 'Minimal', 'Other'];
const GOALS = ['More followers', 'Sales', 'Leads', 'Brand Awareness', 'Other'];
const PROCESS_MESSAGES = [
  { msg: '⚡ Analyzing your niche, tone, and goal…', percent: 50 },
  { msg: '🤖 HustleHack AI is now building your content logic…', percent: 65 },
  { msg: '🎨 Designing carousel layout and headlines…', percent: 91 },
];

export default function InstagramCarouselsOrderPage() {
  const [isMember, setIsMember] = useState(false);
  const [form, setForm] = useState({
    niche: '',
    goal: '',
    tone: '',
    example: '',
    email: '',
  });
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'done'
  const [processIdx, setProcessIdx] = useState(0);
  const [progress, setProgress] = useState(PROCESS_MESSAGES[0].percent);
  const [error, setError] = useState(null);

  // Simulate processing animation
  function startProcessing() {
    setStep('processing');
    setProcessIdx(0);
    setProgress(PROCESS_MESSAGES[0].percent);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < PROCESS_MESSAGES.length) {
        setProcessIdx(idx);
        setProgress(PROCESS_MESSAGES[idx].percent);
      }
    }, 1200);
    setTimeout(() => {
      setProgress(100);
      clearInterval(interval);
      setTimeout(() => setStep('done'), 800);
    }, 4200);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!isMember) {
      // Non-member: Save order, then redirect to payment
      try {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            product_type: 'carousel',
            form_data: {
              niche: form.niche,
              goal: form.goal,
              tone: form.tone,
              example: form.example,
            },
            membership_status: 'free',
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.order_id) {
          setError(data.error || 'Failed to create order. Please try again.');
          return;
        }
        // Redirect to Razorpay payment page with order_id
        window.location.href = `https://rzp.io/rzp/QzrZpGB?order_id=${data.order_id}`;
      } catch (err) {
        setError('Failed to create order. Please try again.');
      }
    } else {
      // Member: skip payment, proceed as before
      startProcessing();
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#181A2A] pt-20 pb-16 px-2">
        {step === 'form' && (
          <div>
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Get Premium AI-Generated Instagram Carousels, Designed to Convert</h1>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 mt-6">
                <Step num={1} text="Tell us about your content (niche, tone, product)" />
                <Step num={2} text="We generate carousel content & design" />
                <Step num={3} text="Delivered to your inbox in < 24 hours" />
              </div>
            </div>
            <form className="max-w-xl mx-auto bg-[#232946] rounded-2xl shadow-lg p-8 mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
              {error && <div className="text-red-400 text-center mb-4 font-semibold">{error}</div>}
              <FormField label="What’s your niche?" value={form.niche} onChange={v => setForm(f => ({ ...f, niche: v }))} placeholder="e.g. Fitness, Marketing, EdTech" />
              <FormSelect label="What’s your goal?" value={form.goal} onChange={v => setForm(f => ({ ...f, goal: v }))} options={GOALS} />
              <FormSelect label="Preferred tone?" value={form.tone} onChange={v => setForm(f => ({ ...f, tone: v }))} options={TONES} />
              <FormField label="Any example content / link? (optional)" value={form.example} onChange={v => setForm(f => ({ ...f, example: v }))} placeholder="Paste a link or describe your style" optional />
              <FormField label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@email.com" type="email" />
              <PriceCards isMember={isMember} setIsMember={setIsMember} />
              <button type="submit" className="w-full bg-[#377DFF] text-white font-bold rounded-full py-3 text-lg mt-2 hover:bg-[#0051b3] transition-all">Generate My Carousel 🚀</button>
            </form>
          </div>
        )}
        {step === 'processing' && (
          <ProcessingScreen msg={PROCESS_MESSAGES[processIdx].msg} percent={progress} />
        )}
        {step === 'done' && (
          <ConfirmationScreen email={form.email} />
        )}
      </main>
      <Footer />
    </>
  );
}

function Step({ num, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#377DFF] text-white font-bold text-lg">{num}</span>
      <span className="text-white text-base font-semibold">{text}</span>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type = 'text', optional = false }) {
  return (
    <label className="flex flex-col text-left gap-2">
      <span className="text-gray-200 font-semibold">{label}</span>
      <input
        type={type}
        className="bg-[#181A2A] border border-[#377DFF] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#377DFF]"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={optional ? false : (type !== 'email' ? true : undefined)}
      />
    </label>
  );
}

function FormSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col text-left gap-2">
      <span className="text-gray-200 font-semibold">{label}</span>
      <select
        className="bg-[#181A2A] border border-[#377DFF] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#377DFF]"
        value={value}
        onChange={e => onChange(e.target.value)}
        required
      >
        <option value="" disabled>Select...</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </label>
  );
}

function PriceCards({ isMember, setIsMember }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-2 mb-2">
      <div className={`flex-1 bg-[#232946] border-2 ${!isMember ? 'border-[#377DFF]' : 'border-[#232946]'} rounded-xl p-4 text-center transition-all cursor-pointer`} onClick={() => setIsMember(false)}>
        <div className="text-gray-300 text-sm mb-1">Non-member</div>
        <div className="text-2xl font-extrabold text-white mb-1">₹99 <span className="text-base text-gray-400 line-through ml-1">₹149</span></div>
        <div className="text-gray-400 text-xs">1 carousel</div>
      </div>
      <div className={`flex-1 bg-[#232946] border-2 ${isMember ? 'border-[#377DFF]' : 'border-[#232946]'} rounded-xl p-4 text-center transition-all cursor-pointer`} onClick={() => setIsMember(true)}>
        <div className="text-[#00FFC2] text-sm mb-1 font-bold">Creator Mode</div>
        <div className="text-2xl font-extrabold text-white mb-1">₹0 <span className="text-base text-gray-400 line-through ml-1">₹99</span></div>
        <div className="text-gray-400 text-xs">Free for 1st 100 users</div>
      </div>
    </div>
  );
}

function ProcessingScreen({ msg, percent }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-[#232946] rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#377DFF] to-[#00FFC2] flex items-center justify-center mb-2 animate-spin-slow">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#fff" strokeWidth="4" strokeDasharray="28 28" /><circle cx="20" cy="20" r="12" stroke="#377DFF" strokeWidth="3" strokeDasharray="18 18" /></svg>
        </div>
        <div className="text-xl text-white font-bold text-center min-h-[32px]">{msg}</div>
        <div className="w-full bg-[#181A2A] rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-[#377DFF] to-[#00FFC2] h-4 rounded-full transition-all duration-700" style={{ width: percent + '%' }} />
        </div>
        <div className="text-sm text-gray-400 mt-2">Processing…</div>
      </div>
    </div>
  );
}

function ConfirmationScreen({ email }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl bg-[#232946] rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
        <div className="text-3xl text-green-400 font-extrabold text-center">✅ Your Carousel Is Being Created!</div>
        <div className="text-lg text-gray-200 text-center">Our AI content engine is working its magic. You’ll receive a high-converting Instagram carousel in your inbox within 24 hours.</div>
        <div className="w-full bg-[#181A2A] rounded-xl p-4 mt-2">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
            <div>Content Strategy Generated</div><div className="text-green-400 font-bold">✅ Completed</div>
            <div>Headline & Hook Optimization</div><div className="text-green-400 font-bold">✅ Completed</div>
            <div>Design Layout Setup</div><div className="text-yellow-400 font-bold">🟡 In Progress</div>
            <div>AI-Powered Carousel Generation</div><div className="text-yellow-400 font-bold">🟡 Queued</div>
          </div>
        </div>
        <div className="text-base text-white text-center mt-2">Estimated Delivery: <span className="font-bold text-[#00FFC2]">Within 24 hours</span> to your email: <span className="underline text-[#377DFF]">{email || 'your@email.com'}</span></div>
        <div className="text-sm text-gray-400 text-center">📎 File will be a ready-to-post PNG carousel or PDF</div>
        <div className="w-full flex flex-col gap-2 mt-4">
          <div className="text-sm text-[#00FFC2] font-bold">Used by 1,500+ creators across India</div>
          <div className="text-sm text-gray-300">🛡️ Your data is safe – we never share your content with 3rd parties.</div>
          <div className="text-sm text-gray-300">🤖 100% AI-generated using state-of-the-art language + design models.</div>
          <div className="text-sm text-gray-300">🧠 Custom prompts crafted based on your niche and goal.</div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-1 bg-[#181A2A] border border-[#377DFF] rounded-xl p-4 text-center">
            <div className="font-bold text-white mb-1">🎁 Want it 5x faster?</div>
            <div className="text-gray-300 mb-2">Upgrade to <span className="text-[#00FFC2] font-bold">Creator Mode</span> (₹149/month) → Instant Carousel Delivery + 4 per week</div>
            <button className="w-full bg-[#377DFF] text-white font-bold rounded-full py-2 mt-2 hover:bg-[#0051b3] transition-all">Upgrade Now 🔓</button>
          </div>
          <div className="flex-1 bg-[#181A2A] border border-[#377DFF] rounded-xl p-4 text-center">
            <div className="font-bold text-white mb-1">📢 Refer 1 friend and get 1 free carousel</div>
            <button className="w-full bg-[#232946] text-[#377DFF] font-bold rounded-full py-2 mt-2 border border-[#377DFF] hover:bg-[#377DFF] hover:text-white transition-all">Copy your referral link</button>
          </div>
        </div>
        <div className="text-xs text-gray-400 text-center mt-6">Support: <a href="mailto:hustlehackai@gmail.com" className="underline text-[#00FFC2]">hustlehackai@gmail.com</a></div>
      </div>
    </div>
  );
} 