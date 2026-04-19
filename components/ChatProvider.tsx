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
import { createPortal } from "react-dom";
import { ExpandedChatOverlay } from "./ExpandedChatOverlay";

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
  draft: string;
  setDraft: (value: string) => void;
  submitDraft: () => Promise<void>;
  expanded: boolean;
  openExpanded: () => void;
  closeExpanded: () => void;
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
  const [draft, setDraft] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

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

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!expanded) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);

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

  const submitDraft = useCallback(async () => {
    const trimmed = draft.trim();
    if (!trimmed || loading) return;

    clearError();
    setDraft("");
    await sendMessage(trimmed);
  }, [draft, loading, clearError, sendMessage]);

  const openExpanded = useCallback(() => {
    setExpanded(true);
  }, []);

  const closeExpanded = useCallback(() => {
    setExpanded(false);
  }, []);

  const value = useMemo(
    () => ({
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
    }),
    [
      messages,
      loading,
      error,
      sendMessage,
      clearError,
      draft,
      submitDraft,
      expanded,
      openExpanded,
      closeExpanded
    ]
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
      {portalReady &&
        expanded &&
        typeof document !== "undefined" &&
        createPortal(
          <ExpandedChatOverlay onClose={closeExpanded} />,
          document.body
        )}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return ctx;
};
