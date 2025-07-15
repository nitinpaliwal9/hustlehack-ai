'use client'

import Navigation from '../../../../../../components/Navigation';
import Footer from '../../../../../../components/Footer';

export default function Page() {
  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16 mt-28">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-400 mb-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <a href="/resources" className="hover:text-[#7F5AF0] font-medium">Resources</a>
            </li>
            <li className="mx-1">/</li>
            <li>
              <a href="/resources/study-planner-templates" className="hover:text-[#00FFC2] font-medium">Study Planner Templates</a>
            </li>
            <li className="mx-1">/</li>
            <li className="text-zinc-300 font-semibold">Daily Study Planner</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center text-center gap-4">
          <span className="text-5xl">📅</span>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] bg-clip-text text-transparent">Daily Study Planner</h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl">
            Stay organized, focused, and ahead of your goals. This planner is built for Indian students who want to ace their day with structure and discipline.
          </p>
        </section>

        {/* Features Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-[#7F5AF0]/90 to-[#00FFC2]/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🗂️</span>
              <h3 className="text-xl font-bold mb-1 text-white">Time-Blocked Schedule</h3>
              <p className="text-zinc-100">Plan your day hour-by-hour to maximize productivity and never miss a subject or task.</p>
            </div>
            <div className="bg-gradient-to-r from-[#00FFC2]/90 to-[#7F5AF0]/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">✅</span>
              <h3 className="text-xl font-bold mb-1 text-white">Priority Checklist</h3>
              <p className="text-zinc-100">List your top priorities and tick them off as you go. Stay focused on what matters most.</p>
            </div>
            <div className="bg-gradient-to-r from-[#7F5AF0]/80 to-[#00FFC2]/60 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">📊</span>
              <h3 className="text-xl font-bold mb-1 text-white">Progress Tracker</h3>
              <p className="text-zinc-100">Visualize your daily wins and keep your motivation high with a simple progress bar.</p>
            </div>
            <div className="bg-gradient-to-r from-[#00FFC2]/80 to-[#7F5AF0]/60 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🧘‍♂️</span>
              <h3 className="text-xl font-bold mb-1 text-white">Wellness Reminders</h3>
              <p className="text-zinc-100">Balance your study with breaks, hydration, and mindfulness prompts for a healthy routine.</p>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-center text-white">Download Your Free Daily Study Planner</h2>
          <a
            href="/templates/daily-study-planner.pdf"
            className="inline-block bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-black font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            download
          >
            Get the PDF – It’s 100% Free!
          </a>
        </section>

        {/* Preview Block */}
        <section className="flex flex-col items-center gap-2">
          <div className="w-full max-w-md aspect-[4/3] bg-zinc-900/60 rounded-2xl shadow-lg flex items-center justify-center border-2 border-dashed border-[#7F5AF0]/40">
            {/* Replace with actual preview image if available */}
            <span className="text-zinc-400 text-lg">[Preview coming soon]</span>
          </div>
        </section>

        {/* Study Tips Block */}
        <section className="bg-zinc-900/80 rounded-2xl shadow-lg p-8 flex flex-col gap-3 items-center">
          <h3 className="text-xl font-bold text-[#00FFC2] mb-2">Study Tips for Maximum Results</h3>
          <ul className="text-zinc-200 text-base list-disc list-inside space-y-1">
            <li>Start your day by filling out your planner before classes begin.</li>
            <li>Break big tasks into smaller, actionable steps.</li>
            <li>Use the progress tracker to celebrate small wins.</li>
            <li>Schedule short breaks to recharge your mind.</li>
            <li>Review your planner at night and prep for tomorrow.</li>
          </ul>
        </section>

        {/* CTA to explore other templates */}
        <section className="flex flex-col items-center gap-2">
          <p className="text-lg text-zinc-300">Want more productivity tools?</p>
          <a
            href="/resources/study-planner-templates"
            className="inline-block bg-gradient-to-r from-[#00FFC2] to-[#7F5AF0] text-black font-bold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Explore All Study Templates
          </a>
        </section>
      </div>
      <Footer />
    </>
  )
}