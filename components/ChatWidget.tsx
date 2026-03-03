'use client';

import { FormEvent, useCallback, useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
};

const SUGGESTIONS = [
  "What projects did you build?",
  "Tell me about the ELO nomination.",
  "What’s your IT support experience?",
  "What was the GMA feature about?"
];

export const ChatWidget = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi! I can answer concise questions about John based on his public portfolio—ask anything about his projects, experience, or skills."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed })
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = (await res.json()) as { reply?: string };
        const reply =
          (data.reply?.trim() || "") ||
          "I don’t have that detail yet—please contact John at contactjohnbotin@gmail.com.";

        setMessages((prev) => [...prev, { role: "bot", content: reply }]);
      } catch (err) {
        console.error("[ChatWidget] error:", err);
        setError("Something went wrong—try again.");
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Something went wrong—try again or reach out at contactjohnbotin@gmail.com."
          }
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          Ask about me
        </p>
        {loading && (
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Thinking…
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => sendMessage(s)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="h-52 space-y-2 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-[11px] dark:border-slate-800 dark:bg-slate-950/40">
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
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about John..."
            className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-accent/20 transition focus:border-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
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

