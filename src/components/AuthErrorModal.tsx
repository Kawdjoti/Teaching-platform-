import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ExternalLink, X, MousePointerClick, RefreshCw, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthErrorModal() {
  const { authError, clearAuthError, signIn } = useAuth();

  if (!authError) return null;

  // Check if it's the expected popup-closed or blocked error
  const isPopupError = 
    authError.includes('popup-closed-by-user') || 
    authError.includes('cancelled-popup-request') ||
    authError.includes('popup-blocked');

  const handleOpenInNewTab = () => {
    // Open the current location in a new tab to escape iframe popup blocks
    window.open(window.location.href, '_blank');
    clearAuthError();
  };

  const handleRetry = () => {
    clearAuthError();
    // Short timeout to let the modal animate out before starting next auth trigger
    setTimeout(() => {
      signIn();
    }, 200);
  };

  return (
    <AnimatePresence>
      <div id="auth-error-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={clearAuthError}
          className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
        />

        {/* Modal Outer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        >
          {/* Header Warning Bar */}
          <div className="flex items-center justify-between border-b border-zinc-100 bg-amber-50 px-6 py-4">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span className="font-semibold text-sm">Google Account Sign In Alert</span>
            </div>
            <button
              id="close-auth-modal"
              onClick={clearAuthError}
              className="rounded-lg p-1 text-zinc-400 hover:bg-amber-100 hover:text-zinc-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Core Content */}
          <div className="px-6 py-6 font-sans">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900">
              {isPopupError ? 'Sign-In Pop-Up Was Blocked or Closed' : 'Sign-In Dynamic Issue'}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Because this application is running inside a secure **Google AI Studio preview iframe**, your browser likely blocked the Google Authentication window from opening.
            </p>

            {/* Step-by-Step Instructions */}
            <div className="mt-5 space-y-3.5">
              <div className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white leading-none">
                  A
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-800 flex items-center gap-1.5">
                    Open in a New Tab <span className="text-xs font-normal text-zinc-400 font-mono">(Highly Recommended)</span>
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 leading-normal">
                    Clicking the button below loads this application as a standalone site. Google popups compile and run perfectly from a dedicated browser tab.
                  </p>
                  <button
                    id="auth-new-tab-btn"
                    onClick={handleOpenInNewTab}
                    className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-95"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open App in Standalone Tab
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700 leading-none">
                  B
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-800">
                    Always Allow Popups in Browser Settings
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 leading-normal">
                    Check your browser's address bar (typically in the top right corner) for a blocked pop-up icon, and select <strong className="text-zinc-700 font-semibold">"Always allow popups and redirects from this site"</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="mt-6 border-t border-zinc-100 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                <KeyRound className="h-3 w-3" />
                <span>Error Details:</span>
                <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-600 font-medium">
                  {authError.slice(0, 36) + (authError.length > 36 ? '...' : '')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer controls */}
          <div className="flex items-center justify-end gap-3 bg-zinc-50 px-6 py-4 border-t border-zinc-100">
            <button
              id="auth-cancel-btn"
              onClick={clearAuthError}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </button>
            <button
              id="auth-retry-btn"
              onClick={handleRetry}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 shadow-sm transition-colors"
            >
              <RefreshCw className="h-4 w-4 shrink-0 transition-transform active:rotate-180 duration-500" />
              Try Popup Again
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
