import React from 'react';

interface StepShellProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'current' | 'default';
}

export default function StepShell({ step, totalSteps, title, subtitle, children, variant = 'default' }: StepShellProps) {
  return (
    <section
      className={`w-full max-w-2xl mx-auto my-8 rounded-2xl p-6 sm:p-10 bg-white/5 backdrop-blur-xl shadow-xl border border-white/10 relative flex flex-col items-center ${variant === 'current' ? 'ring-2 ring-[#7F5AF0] ring-offset-2 ring-offset-[#0E0E11]' : ''}`}
      aria-label={`Step ${step} of ${totalSteps}`}
      role="region"
    >
      {/* Step badge */}
      <div className="mb-4 flex items-center gap-2">
        <span
          className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#00FFC2] to-[#7F5AF0] text-black shadow ${variant === 'current' ? 'ring-2 ring-[#7F5AF0]' : ''}`}
          aria-current={variant === 'current' ? 'step' : undefined}
        >
          Step {step} / {totalSteps}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F9FAFB] mb-2 text-center">{title}</h2>
      {subtitle && <p className="text-base sm:text-lg text-[#9CA3AF] mb-6 text-center">{subtitle}</p>}
      <div className="w-full flex flex-col items-center">
        {children}
      </div>
    </section>
  );
} 