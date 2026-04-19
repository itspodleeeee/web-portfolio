export type ChatSuggestion = {
  prompt: string;
  badge?: string;
};

export const CHAT_SUGGESTIONS: ChatSuggestion[] = [
  { prompt: "Tell me about Villa Ikarus.", badge: "New" },
  { prompt: "What projects did you build?" },
  { prompt: "Tell me about the ELO nomination." },
  { prompt: "What’s your IT support experience?" },
  { prompt: "What was the GMA feature about?" }
];
