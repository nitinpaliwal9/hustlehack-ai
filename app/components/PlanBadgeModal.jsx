import { useState, useRef, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

// Feature list data
const FEATURES = [
  {
    icon: <CheckCircle className="w-5 h-5 text-[#00FFC2] mr-2" />, // Brand accent
    text: '50+ AI-crafted prompt packs for instant content creation.'
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-[#7F5AF0] mr-2" />,
    text: '20+ ready-to-use templates (content calendars, growth blueprints).'
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />,
    text: 'Weekly HustleHack AI drops – cutting-edge tools delivered to you.'
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-pink-400 mr-2" />,
    text: 'Pro Resources – exclusive time-saving assets for modern hustlers.'
  },
];

export default function PlanBadgeModal({ open, onClose, planName = 'Creator Plan', tagline = 'Built for ambitious hustlers who want to win with AI.', showUpgrade = true }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Enhanced: Close on outside click (anywhere outside modal)
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  // Trap focus inside modal
  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable && focusable.length) focusable[0].focus();
  }, [open]);

  // Close on overlay click
  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <>
      {/* Sample trigger button for testing */}
      {/* <button className="plan-badge" onClick={() => setOpen(true)}>Creator Plan</button> */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadein pointer-events-auto"
          aria-hidden={!open}
          role="dialog"
          tabIndex={-1}
          onClick={handleOverlayClick}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-full sm:max-w-lg mx-2 sm:mx-auto my-auto bg-gradient-to-br from-[#18192b] to-[#232946] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 border border-white/10 scale-95 opacity-0 animate-modalin focus:outline-none pointer-events-auto"
            style={{
              animation: 'modalin 0.3s cubic-bezier(0.4,0,0.2,1) forwards',
              boxShadow: '0 8px 40px 0 #7F5AF055, 0 2px 8px 0 #00FFC255'
            }}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white focus:outline-none z-10"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Plan name and tagline */}
            <div className="mb-6 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] text-white font-bold text-xs sm:text-sm mb-2 shadow-md">{planName}</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2">{planName}</h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg font-medium">{tagline}</p>
            </div>
            {/* Feature list */}
            <ul className="mb-8 space-y-3 sm:space-y-4">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-start text-gray-200 text-sm sm:text-base">
                  {f.icon}
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
            {/* CTA buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-6">
              <button
                className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-white bg-gradient-to-r from-[#7F5AF0] to-[#00FFC2] shadow-lg hover:shadow-[0_0_16px_2px_#00FFC2] hover:from-[#7F5AF0]/90 hover:to-[#00FFC2]/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00FFC2] focus:ring-offset-2 text-sm sm:text-base"
                onClick={() => { onClose(); window.location.href = '/resources'; }}
              >
                Explore All Resources
              </button>
              {showUpgrade && (
                <button
                  className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-[#7F5AF0] bg-white/10 border border-[#7F5AF0] hover:bg-[#7F5AF0] hover:text-white hover:shadow-[0_0_16px_2px_#7F5AF0] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7F5AF0] focus:ring-offset-2 text-sm sm:text-base"
                  onClick={() => { onClose(); window.location.href = '/my-plans'; }}
                >
                  Upgrade to Pro
                </button>
              )}
            </div>
          </div>
          {/* Animations */}
          <style jsx>{`
            @keyframes fadein {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fadein { animation: fadein 0.3s cubic-bezier(0.4,0,0.2,1); }
            @keyframes modalin {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-modalin { animation: modalin 0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
          `}</style>
        </div>
      )}
    </>
  );
}

// Sample usage for testing (remove in production):
// import { useState } from 'react';
// function Demo() {
//   const [open, setOpen] = useState(false);
//   return <>
//     <button className="plan-badge" onClick={() => setOpen(true)}>Creator Plan</button>
//     <PlanBadgeModal open={open} onClose={() => setOpen(false)} />
//   </>;
// } 