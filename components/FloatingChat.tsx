'use client';

import { useEffect, useState } from "react";
import { ChatWidget } from "./ChatWidget";

const TEASERS = [
  "New: ask about the Villa Ikarus resort website project.",
  "Ask about John’s projects and skills here.",
  "Curious about the ELO nomination or GMA feature?",
  "You can quickly ask about his IT support experience too."
];

export const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [teaserIndex, setTeaserIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTeaserIndex((prev) => (prev + 1) % TEASERS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setShowTeaser(false), 20000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {!open && showTeaser && (
        <div className="pointer-events-auto max-w-xs rounded-2xl border border-slate-200 bg-white/90 p-3 text-xs text-slate-700 shadow-subtle dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100">
          <div className="mb-1 flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Ask about John
            </p>
            <button
              type="button"
              onClick={() => setShowTeaser(false)}
              className="rounded-full p-1 text-[10px] text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              aria-label="Dismiss chat hint"
            >
              ✕
            </button>
          </div>
          <p>{TEASERS[teaserIndex]}</p>
        </div>
      )}

      {open && (
        <div className="pointer-events-auto w-[min(100vw-2.5rem,22rem)] rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-subtle dark:border-slate-700 dark:bg-slate-900/95">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Ask about John
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-[10px] text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <ChatWidget />
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) setShowTeaser(false);
        }}
        className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-subtle transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        aria-label={open ? "Hide Ask about John chat" : "Open Ask about John chat"}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3H9.6L6 19.7V15H7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="9" r="0.8" fill="currentColor" />
          <circle cx="12" cy="9" r="0.8" fill="currentColor" />
          <circle cx="15" cy="9" r="0.8" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

