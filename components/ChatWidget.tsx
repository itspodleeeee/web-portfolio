'use client';

import { FormEvent, useLayoutEffect, useRef } from "react";
import { CHAT_SUGGESTIONS } from "./chatSuggestions";
import { useChat } from "./ChatProvider";

export const ChatWidget = () => {
  const {
    messages,
    loading,
    error,
    sendMessage,
    clearError,
    draft,
    setDraft,
    submitDraft,
    expanded,
    openExpanded,
    closeExpanded
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (expanded) return;
    const container = messagesContainerRef.current;
    const end = messagesEndRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "auto" });
    } else if (end) {
      end.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [messages, loading, expanded]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearError();
    void submitDraft();
  };

  if (expanded) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 text-center text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <p className="text-slate-600 dark:text-slate-300">
          Chat is open in a larger window with a blurred backdrop. Close it there
          to continue here, or use the button below.
        </p>
        <button
          type="button"
          onClick={closeExpanded}
          className="mt-3 inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Close expanded view
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          Ask about me
        </p>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Thinking…
            </span>
          )}
          <button
            type="button"
            onClick={openExpanded}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800"
            aria-label="Open larger chat view"
            title="Larger chat view"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M21 15v4a2 2 0 0 1-2 2h-4M3 15v4a2 2 0 0 0 2 2h4" />
            </svg>
            <span className="hidden sm:inline">Expand</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CHAT_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.prompt}
            type="button"
            onClick={() => {
              clearError();
              void sendMessage(suggestion.prompt);
            }}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
          >
            <span className="inline-flex items-center gap-1.5">
              <span>{suggestion.prompt}</span>
              {suggestion.badge && (
                <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-accent">
                  {suggestion.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      <div
        ref={messagesContainerRef}
        className="h-52 space-y-2 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-[11px] dark:border-slate-800 dark:bg-slate-950/40"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 leading-relaxed ${
                m.role === "user"
                  ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                  : "bg-white text-slate-800 shadow-sm border border-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} aria-hidden />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask a question about John..."
            className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-accent/20 transition focus:border-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <button
            type="submit"
            disabled={loading || !draft.trim()}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-[11px] font-medium text-white shadow-subtle transition hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Send
          </button>
        </div>
        {error && (
          <p className="text-[11px] text-red-500 dark:text-red-400">{error}</p>
        )}
      </form>
    </div>
  );
};
