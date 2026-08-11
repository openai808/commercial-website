"use client";

import { useEffect, useId, useRef, useState, type SubmitEvent, type ReactNode } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const MAX_INPUT_LENGTH = 2000;

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1 4.5A8 8 0 0 1 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Minimal markdown-link renderer: turns `[label](/path)` into a Link, everything else stays plain text. No new markdown dependency. */
function renderMessageText(text: string): ReactNode[] {
  const linkPattern = /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = linkPattern.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const [, label, href] = match;
    parts.push(
      href.startsWith("/") ? (
        <Link key={key++} href={href} className="font-semibold text-[#000759] underline underline-offset-2">
          {label}
        </Link>
      ) : (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#000759] underline underline-offset-2"
        >
          {label}
        </a>
      ),
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const titleId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  /** Panel remounts its scroll container each time it opens, so jump straight to the latest message instead of animating. */
  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const trimmed = input.trim().slice(0, MAX_INPUT_LENGTH);
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[140]">
        {!open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#000759] px-3 py-1.5 text-xs font-medium text-white shadow-md"
          >
            Chat with us
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="chat-widget-panel"
          aria-label={open ? "Close chat" : "Chat with us"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#000759] text-white shadow-lg transition hover:bg-[#001a8f]"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <ChatBubbleIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="chat-widget-panel"
          role="dialog"
          aria-labelledby={titleId}
          className="fixed bottom-24 right-5 z-[140] flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-[#d9dce5] bg-white shadow-2xl"
        >
          <div className="bg-[#000759] px-4 py-3">
            <h2 id={titleId} className="text-sm font-semibold text-white">
              Ask RE/MAX Commercial 8
            </h2>
            <p className="text-xs text-white/70">Properties, careers, and company info</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.length === 0 && (
              <p className="text-[#4a5f9a]">Ask about properties for sale or lease, careers, or our services.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block max-w-[85%] rounded-lg px-3 py-2 ${
                    m.role === "user" ? "bg-[#000759] text-white" : "bg-[#f4f4f4] text-[#000759]"
                  }`}
                >
                  {m.parts
                    .filter((p): p is { type: "text"; text: string } => p.type === "text")
                    .map((p, i) => (
                      <p key={i} className="whitespace-pre-wrap">
                        {renderMessageText(p.text)}
                      </p>
                    ))}
                </div>
              </div>
            ))}
            {error && <p className="text-xs text-red-600">Something went wrong. Please try again.</p>}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-[#d9dce5] px-3 py-3">
            <label htmlFor="chat-widget-input" className="sr-only">
              Message
            </label>
            <input
              id="chat-widget-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_INPUT_LENGTH}
              placeholder="Ask a question..."
              disabled={isStreaming}
              className="min-w-0 flex-1 rounded border border-[#c5d3f0] px-3 py-2 text-sm outline-none focus:border-[#000759]"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#000759] text-white disabled:opacity-40"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
}
