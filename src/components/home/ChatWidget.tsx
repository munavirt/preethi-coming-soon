import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { brand, contact } from "@/content/home";
import {
  buildHandoffText,
  FALLBACK_REPLY,
  formatTime,
  WELCOME_MESSAGE,
  WELCOME_SUGGESTIONS,
  type ChatMessage,
  type MessageAction,
} from "@/lib/chat-assistant";
import { sendChatMessage } from "@/lib/chat.functions";
import { whatsappUrl } from "@/lib/whatsapp";

const STORAGE_KEY = "preethi-silks-chat-v2";
const MAX_LENGTH = 1000;
const MAX_QUESTIONS = 30;

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 5.5h16v10.5H9.5L5 19.5V16H4z" strokeLinejoin="round" />
      <path d="M8 9.5h8M8 12.5h5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="16" height="16">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.39c1.45.79 3.08 1.21 4.69 1.21 5.46 0 9.91-4.45 9.91-9.91A9.91 9.91 0 0 0 12.04 2zm5.82 14.13c-.24.67-1.4 1.24-1.93 1.32-.49.07-1.12.1-3.23-.77-2.69-1.11-4.41-3.86-4.54-4.04-.13-.18-1.09-1.45-1.09-2.77 0-1.31.69-1.96.93-2.22.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.4-.06.62.48.24.57.81 1.99.88 2.14.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.17-.32.39-.46.52-.15.15-.31.31-.13.62.18.31.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.47 1.52.31.15.49.13.67-.08.18-.2.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.84.87 2.15 1.03.32.15.53.23.61.36.08.14.08.79-.16 1.46z" />
    </svg>
  );
}

/** Plain text formatter that handles paragraph lines cleanly */
function MessageContent({ text }: { text: string }) {
  const paragraphs = text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .split(/\n{2,}/)
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((p, pIdx) => {
        const lines = p.split("\n").filter(Boolean);
        return (
          <p key={pIdx}>
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {line}
                {lIdx < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [restored, setRestored] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved) as ChatMessage[]);
    } catch {
      // Storage can be blocked. Starts fresh.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage failure only matters on reload
    }
  }, [messages, restored]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (returnFocus.current) launcherRef.current?.focus();
    returnFocus.current = false;
  }, [open]);

  useEffect(() => {
    if (logRef.current) {
      if (typeof logRef.current.scrollTo === "function") {
        logRef.current.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
      } else {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }
  }, [messages, pending, open]);

  const sendQuery = async (queryText: string, currentHistory: ChatMessage[]) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      role: "user",
      content: queryText,
      timestamp: formatTime(),
    };

    const newHistory = [...currentHistory, userMessage];
    setMessages(newHistory);
    setPending(true);

    try {
      const result = await sendChatMessage({
        data: {
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        },
      });

      if (result.ok) {
        const assistantMessage: ChatMessage = {
          id: `asst-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          role: "assistant",
          content: result.reply,
          timestamp: formatTime(),
          actions: result.actions,
        };
        setMessages([...newHistory, assistantMessage]);
      } else {
        // Fallback gracefully without technical errors
        const fallbackMessage: ChatMessage = {
          id: `asst-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          role: "assistant",
          content: FALLBACK_REPLY,
          timestamp: formatTime(),
          actions: [
            {
              type: "whatsapp",
              label: "Continue on WhatsApp",
              text: buildHandoffText(newHistory),
            },
            {
              type: "tel",
              label: `Call ${contact.phone}`,
              phone: contact.phone,
            },
            {
              type: "link",
              label: "Contact Our Team",
              href: "#footer",
            },
          ],
        };
        setMessages([...newHistory, fallbackMessage]);
      }
    } catch {
      const fallbackMessage: ChatMessage = {
        id: `asst-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: "assistant",
        content: FALLBACK_REPLY,
        timestamp: formatTime(),
        actions: [
          {
            type: "whatsapp",
            label: "Continue on WhatsApp",
            text: buildHandoffText(newHistory),
          },
          {
            type: "tel",
            label: `Call ${contact.phone}`,
            phone: contact.phone,
          },
          {
            type: "link",
            label: "Contact Our Team",
            href: "#footer",
          },
        ],
      };
      setMessages([...newHistory, fallbackMessage]);
    } finally {
      setPending(false);
    }
  };

  const questionCount = messages.filter((m) => m.role === "user").length;
  const atLimit = questionCount >= MAX_QUESTIONS;

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = draft.trim();
    if (!text || pending || atLimit) return;
    setDraft("");
    void sendQuery(text, messages);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  const close = () => {
    returnFocus.current = true;
    setOpen(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignored
    }
  };

  const handleActionClick = (action: MessageAction) => {
    if (action.type === "quick-reply") {
      void sendQuery(action.query, messages);
    } else if (action.type === "link" && !action.external) {
      close();
    }
  };

  return (
    <div className="chat">
      {open ? (
        <section
          className="chat__panel"
          role="dialog"
          aria-labelledby="chat-title"
          onKeyDown={(event) => event.key === "Escape" && close()}
        >
          <header className="chat__head">
            <div className="chat__brand-meta">
              <div className="chat__avatar" aria-hidden="true">
                PS
              </div>
              <div>
                <h2 id="chat-title">{brand.name}</h2>
                <p className="chat__subtitle">
                  <span className="chat__status-dot" aria-hidden="true" />
                  Retail Shopping Assistant
                </p>
              </div>
            </div>
            <div className="chat__head-actions">
              {messages.length ? (
                <button
                  type="button"
                  className="chat__action-btn chat__action-btn--clear"
                  onClick={handleNewChat}
                  disabled={pending}
                >
                  New Chat
                </button>
              ) : null}
              <button
                type="button"
                className="chat__close"
                onClick={close}
                aria-label="Close chat"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" stroke="currentColor" strokeWidth="1.6">
                  <path d="m3 3 10 10M13 3 3 13" />
                </svg>
              </button>
            </div>
          </header>

          <div className="chat__log" ref={logRef} role="log" aria-live="polite">
            {/* Initial Welcome Experience */}
            {messages.length === 0 ? (
              <div className="chat__welcome">
                <div className="chat__bubble chat__bubble--bot">
                  <div className="chat__sender-tag">Preethi Silks Assistant</div>
                  <MessageContent text={WELCOME_MESSAGE} />
                  <span className="chat__time">{formatTime()}</span>
                </div>

                <div className="chat__suggestions-block">
                  <p className="chat__suggestions-heading">Quick assistance:</p>
                  <div className="chat__suggestions">
                    {WELCOME_SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion.label}
                        type="button"
                        className="chat__suggestion"
                        onClick={() => handleActionClick(suggestion)}
                        disabled={pending}
                      >
                        {suggestion.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Conversation Messages */}
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`chat__message-row chat__message-row--${isUser ? "user" : "bot"}`}
                >
                  <div
                    className={`chat__bubble chat__bubble--${isUser ? "user" : "bot"}`}
                  >
                    {!isUser ? <div className="chat__sender-tag">Preethi Silks Assistant</div> : null}
                    <MessageContent text={message.content} />
                    <span className="chat__time">{message.timestamp}</span>
                  </div>

                  {/* Render message actions if present */}
                  {message.actions && message.actions.length > 0 ? (
                    <div className="chat__actions">
                      {message.actions.map((action, actionIdx) => {
                        if (action.type === "quick-reply") {
                          return (
                            <button
                              key={actionIdx}
                              type="button"
                              className="chat__action-chip"
                              onClick={() => handleActionClick(action)}
                              disabled={pending}
                            >
                              {action.label}
                            </button>
                          );
                        }

                        if (action.type === "tel") {
                          return (
                            <a
                              key={actionIdx}
                              href={`tel:${action.phone.replace(/[^\d+]/g, "")}`}
                              className="chat__action-chip chat__action-chip--tel"
                            >
                              <span aria-hidden="true">📞</span> {action.label}
                            </a>
                          );
                        }

                        if (action.type === "whatsapp") {
                          return (
                            <a
                              key={actionIdx}
                              href={whatsappUrl(contact.whatsapp, action.text ?? buildHandoffText(messages))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chat__action-chip chat__action-chip--wa"
                            >
                              <WhatsAppIcon /> {action.label}
                            </a>
                          );
                        }

                        if (action.type === "link") {
                          return (
                            <a
                              key={actionIdx}
                              href={action.href}
                              target={action.external ? "_blank" : undefined}
                              rel={action.external ? "noopener noreferrer" : undefined}
                              className="chat__action-chip chat__action-chip--link"
                              onClick={!action.external ? close : undefined}
                            >
                              {action.label} <span aria-hidden="true">↗</span>
                            </a>
                          );
                        }

                        return null;
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}

            {/* Subtle Loading Indicator */}
            {pending ? (
              <div className="chat__typing" aria-label="Preethi Silks is typing">
                <span className="chat__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="chat__typing-text">Preethi Silks is typing…</span>
              </div>
            ) : null}
          </div>

          <form className="chat__form" onSubmit={submit}>
            <label htmlFor="chat-input" className="sr-only">
              Your message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={draft}
              maxLength={MAX_LENGTH}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder={atLimit ? "Please continue with our team" : "Ask about collections, offers, stores…"}
              disabled={atLimit || pending}
            />
            <button
              type="submit"
              className="chat__send"
              disabled={!draft.trim() || pending || atLimit}
              aria-label="Send message"
            >
              <svg viewBox="0 0 20 12" aria-hidden="true" fill="none">
                <path d="M0 6h18M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </form>
        </section>
      ) : null}

      <button
        ref={launcherRef}
        type="button"
        className={`chat__launcher ${open ? "is-hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label={`Chat with ${brand.name}`}
        aria-expanded={open}
      >
        <ChatIcon />
        <span>Ask us</span>
      </button>
    </div>
  );
}
