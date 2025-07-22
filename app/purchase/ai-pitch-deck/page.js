'use client';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const PURPOSES = ['Fundraising', 'Sales', 'Internal', 'Other'];

export default function PitchDeckOrderPage() {
  const [isMember, setIsMember] = useState(false);
  const [form, setForm] = useState({
    name: '',
    industry: '',
    purpose: '',
    usp: '',
    example: '',
    email: '',
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#181A2A] pt-20 pb-16 px-2">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Get a Stunning AI-Generated Pitch Deck for Your Startup or Project</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 mt-6">
            <Step num={1} text="Tell us about your startup/idea" />
            <Step num={2} text="We generate your pitch deck" />
            <Step num={3} text="Delivered to your inbox in < 24 hours" />
          </div>
        </div>
        <form className="max-w-xl mx-auto bg-[#232946] rounded-2xl shadow-lg p-8 mt-8 flex flex-col gap-6">
          <FormField label="Startup/Project Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="e.g. FinTechly, EduSpark" />
          <FormField label="Industry/Niche" value={form.industry} onChange={v => setForm(f => ({ ...f, industry: v }))} placeholder="e.g. Fintech, EdTech, SaaS" />
          <FormSelect label="Deck Purpose" value={form.purpose} onChange={v => setForm(f => ({ ...f, purpose: v }))} options={PURPOSES} />
          <FormField label="Key Points / USP" value={form.usp} onChange={v => setForm(f => ({ ...f, usp: v }))} placeholder="What makes you unique?" />
          <FormField label="Example deck link (optional)" value={form.example} onChange={v => setForm(f => ({ ...f, example: v }))} placeholder="Paste a link or describe your style" />
          <FormField label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@email.com" type="email" />
          <PriceCards isMember={isMember} setIsMember={setIsMember} />
          <button type="submit" className="w-full bg-[#377DFF] text-white font-bold rounded-full py-3 text-lg mt-2 hover:bg-[#0051b3] transition-all">Generate My Pitch Deck 🚀</button>
        </form>
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

function FormField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="flex flex-col text-left gap-2">
      <span className="text-gray-200 font-semibold">{label}</span>
      <input
        type={type}
        className="bg-[#181A2A] border border-[#377DFF] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#377DFF]"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={type !== 'email' ? true : undefined}
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
        <div className="text-2xl font-extrabold text-white mb-1">₹149 <span className="text-base text-gray-400 line-through ml-1">₹199</span></div>
        <div className="text-gray-400 text-xs">1 pitch deck</div>
      </div>
      <div className={`flex-1 bg-[#232946] border-2 ${isMember ? 'border-[#377DFF]' : 'border-[#232946]'} rounded-xl p-4 text-center transition-all cursor-pointer`} onClick={() => setIsMember(true)}>
        <div className="text-[#00FFC2] text-sm mb-1 font-bold">Creator Mode</div>
        <div className="text-2xl font-extrabold text-white mb-1">₹0 <span className="text-base text-gray-400 line-through ml-1">₹149</span></div>
        <div className="text-gray-400 text-xs">Free for 1st 100 users</div>
      </div>
    </div>
  );
} 