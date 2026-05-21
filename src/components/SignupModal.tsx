import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, X, Compass, Award, Database, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  sourceContext?: 'lesson' | 'practice' | 'general';
}

export default function SignupModal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle,
  sourceContext = 'general' 
}: SignupModalProps) {
  const { signIn } = useAuth();

  if (!isOpen) return null;

  const defaultTitles = {
    lesson: "Sign Up to Begin Lesson",
    practice: "Sign Up to Start Practice",
    general: "Create Your Datamaker Account"
  };

  const defaultSubtitles = {
    lesson: "Join the professional AI annotator academy. Saving your lesson completion times, progress, and performance data requires a registered sandbox account.",
    practice: "Unlock the sandbox canvas. Submitting line-accuracy evaluations, loading dual-rail guides, and earning micro-credentials requires a registered workspace.",
    general: "Set up your developer profile to track learning milestones, earn certified badges, and benchmark against global labeling accuracy standards."
  };

  const displayTitle = title || defaultTitles[sourceContext];
  const displaySubtitle = subtitle || defaultSubtitles[sourceContext];

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
      onClose(); // Auto close on login success
    } catch (e) {
      console.error("Popup sign-in failed from modal:", e);
    }
  };

  return (
    <AnimatePresence>
      <div id="signup-interactive-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop glassmorphism */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: 20, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl"
        >
          {/* Decorative Top Accent Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-zinc-900 to-indigo-600" />

          {/* Close Trigger */}
          <button
            id="close-signup-modal-btn"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Main Body */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                {sourceContext === 'lesson' ? 'Datamaker Academy' : sourceContext === 'practice' ? 'Interactive Sandbox' : 'Authentication'}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              {displayTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {displaySubtitle}
            </p>

            {/* Premium Gating Features Grid */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 hover:bg-zinc-50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800">100% Free Sandbox Access</h4>
                  <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                    Instantly load high-resolution image sets, and try full-screen canvas segmentation utilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 hover:bg-zinc-50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800">Performance Metric Tracking</h4>
                  <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                    Compare current coordinate layouts against expert labels and build an annotation score.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 hover:bg-zinc-50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800">Official Datamaker Certificate</h4>
                  <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
                    Earn valid credentials demonstrating proficiency in micro-segmentation speed and label hygiene.
                  </p>
                </div>
              </div>
            </div>

            {/* Sign Up Actions */}
            <div className="mt-8 pt-6 border-t border-zinc-100 space-y-4">
              <button
                id="signup-modal-google-btn"
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-zinc-950 px-6 py-4 text-sm font-bold text-white shadow-xl hover:bg-zinc-800 transition-all active:scale-[0.98] outline-none"
              >
                <LogIn className="h-5 w-5 text-indigo-400" />
                Sign In with Google Account
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Zero configuration required. Safe server-side proxy integration.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
