'use client';

type ChatMessageTextProps = {
  text: string;
};

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_EXACT_REGEX = /^https?:\/\/[^\s]+$/;

const formatLinkLabel = (rawUrl: string) => {
  try {
    const parsed = new URL(rawUrl);
    const core = `${parsed.hostname}${parsed.pathname}`;
    if (core.length <= 44) return core;
    return `${core.slice(0, 41)}...`;
  } catch {
    if (rawUrl.length <= 44) return rawUrl;
    return `${rawUrl.slice(0, 41)}...`;
  }
};

export const ChatMessageText = ({ text }: ChatMessageTextProps) => {
  const parts = text.split(URL_REGEX);

  return (
    <span className="whitespace-pre-wrap break-words">
      {parts.map((part, index) => {
        if (URL_EXACT_REGEX.test(part)) {
          return (
            <a
              key={`${part}-${index}`}
              href={part}
              target="_blank"
              rel="noreferrer"
              title={part}
              className="inline-flex items-center gap-1 underline decoration-current underline-offset-2 hover:opacity-80"
            >
              {formatLinkLabel(part)}
              <span aria-hidden>↗</span>
            </a>
          );
        }

        return <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>;
      })}
    </span>
  );
};
