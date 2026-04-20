'use client';

import { FormEvent, useEffect, useLayoutEffect, useRef } from "react";
import { CHAT_SUGGESTIONS } from "./chatSuggestions";
import { useChat } from "./ChatProvider";
import { ChatMessageText } from "./ChatMessageText";

type ExpandedChatOverlayProps = {
  onClose: () => void;
};

export const ExpandedChatOverlay = ({ onClose }: ExpandedChatOverlayProps) => {
  const {
    messages,
    loading,
    error,
    sendMessage,
    clearError,
    draft,
    setDraft,
    submitDraft
  } = useChat();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "auto" });
    } else if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [messages, loading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearError();
    void submitDraft();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-slate-950/45 px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10 backdrop-blur-md sm:items-center sm:px-6 sm:py-10"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="expanded-chat-title"
        className="flex max-h-[min(92dvh,880px)] w-full max-w-lg min-h-0 flex-col rounded-t-3xl border border-slate-200/90 bg-white/95 p-4 shadow-2xl dark:border-slate-700/90 dark:bg-slate-900/95 sm:max-h-[min(85vh,820px)] sm:max-w-2xl sm:rounded-3xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div>
            <p
              id="expanded-chat-title"
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500"
            >
              Ask about me
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Larger view — same conversation. Tap outside, press Esc, or Close to exit.
            </p>
            {loading && (
              <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                Thinking…
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-3 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label="Close expanded chat"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          <div className="flex max-h-[9.5rem] shrink-0 flex-wrap gap-2 overflow-y-auto sm:max-h-[10rem]">
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
            className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-[11px] dark:border-slate-800 dark:bg-slate-950/40"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed sm:max-w-[80%] ${
                    m.role === "user"
                      ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                      : "border border-slate-100 bg-white text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  }`}
                >
                  <ChatMessageText text={m.content} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} aria-hidden />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-3 flex shrink-0 flex-col gap-2 border-t border-slate-100 pt-3 dark:border-slate-800"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question about John..."
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none ring-accent/20 transition focus:border-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={loading || !draft.trim()}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-[11px] font-medium text-white shadow-subtle transition hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Send
            </button>
          </div>
          {error && (
            <p className="text-[11px] text-red-500 dark:text-red-400">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};
