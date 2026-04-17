'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export type ChatMessage = {
  role: "user" | "bot";
  content: string;
};

type ChatContextValue = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearError: () => void;
};

const STORAGE_KEY = "portfolio-chat-history";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "bot",
    content:
      "Hi! I can answer concise questions about John based on his public portfolio, including his new Villa Ikarus resort website project."
  }
];

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch (err) {
      console.error("[ChatProvider] failed to load chat history:", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error("[ChatProvider] failed to persist chat history:", err);
    }
  }, [messages]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
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
        console.error("[ChatProvider] error:", err);
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

  const value = useMemo(
    () => ({
      messages,
      loading,
      error,
      sendMessage,
      clearError
    }),
    [messages, loading, error, sendMessage, clearError]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return ctx;
};
