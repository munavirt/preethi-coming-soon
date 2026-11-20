import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { brand, contact } from "@/content/home";
import { sendChatMessage, type ChatResult } from "@/lib/chat.functions";
import { whatsappUrl } from "@/lib/whatsapp";

type Message = { role: "user" | "assistant"; content: string };
type ChatError = Extract<ChatResult, { ok: false }>["error"];

/** Session storage only: the conversation ends with the tab, and nothing is kept on a server. */
const STORAGE_KEY = "preethi-silks-chat";
const MAX_LENGTH = 1000;
/** A long conversation is better continued with the team. */
const MAX_QUESTIONS = 30;

const ERRORS: Record<ChatError, string> = {
  not_configured: "Our assistant isn’t available right now. Please contact our team instead.",
  busy: "We’re getting a lot of questions just now. Please try again in a moment.",
  unavailable: "Sorry, something went wrong on our side. Please try again.",
};

/** The pre-filled WhatsApp message: the latest question first, then what led to it. */
function handoffText(messages: Message[]) {
  const questions = messages.filter((message) => message.role === "user").map((m) => m.content);
  const clip = (text: string, length: number) =>
    text.length > length ? `${text.slice(0, length - 1)}…` : text;
  const latest = questions.at(-1) ?? "";
  const earlier = questions.slice(-4, -1);
  return [
    `Hello ${brand.name}, I was chatting with the assistant on your website.`,
    "",
    `My question: ${clip(latest, 500)}`,
    ...(earlier.length
      ? ["", "Earlier I asked:", ...earlier.map((question) => `- ${clip(question, 200)}`)]
      : []),
  ].join("\n");
}

/** Replies are plain text. Stray markdown emphasis is removed rather than shown as asterisks. */
function Reply({ text }: { text: string }) {
  return (
    <>
      {text
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .split(/\n+/)
        .filter(Boolean)
        .map((line, index) => (
          <p key={index}>{line}</p>
        ))}
    </>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 5.5h16v10.5H9.5L5 19.5V16H4z" strokeLinejoin="round" />
      <path d="M8 9.5h8M8 12.5h5" strokeLinecap="round" />
    </svg>
  );
}

export function ChatWidget() {
  const send = sendChatMessage;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const [restored, setRestored] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved) as Message[]);
    } catch {
      // Storage can be blocked. The chat then simply starts fresh.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Not being able to keep the history only matters after a reload.
    }
  }, [messages, restored]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    // The launcher is hidden while the chat is open, so it can only take focus after closing.
    else if (returnFocus.current) launcherRef.current?.focus();
    returnFocus.current = false;
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending, error, open]);

  const ask = async (history: Message[]) => {
    setPending(true);
    setError(null);
    try {
      const result = await send({ data: { messages: history } });
      if (result.ok) setMessages([...history, { role: "assistant", content: result.reply }]);
      else setError(result.error);
    } catch {
      setError("unavailable");
    } finally {
      setPending(false);
    }
  };

  const questionCount = messages.filter((message) => message.role === "user").length;
  const atLimit = questionCount >= MAX_QUESTIONS;

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = draft.trim();
    if (!text || pending || atLimit) return;
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setDraft("");
    void ask(history);
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

  const lastIsReply = messages.at(-1)?.role === "assistant" && !pending;

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
            <div>
              <h2 id="chat-title">{brand.name}</h2>
              <p>Ask us anything about our collections and showrooms</p>
            </div>
            <div className="chat__head-actions">
              {messages.length ? (
                <button
                  type="button"
                  className="chat__clear"
                  onClick={() => {
                    setMessages([]);
                    setError(null);
                  }}
                  disabled={pending}
                >
                  New chat
                </button>
              ) : null}
              <button type="button" className="chat__close" onClick={close} aria-label="Close chat">
                <svg viewBox="0 0 16 16" aria-hidden="true" stroke="currentColor" strokeWidth="1.6">
                  <path d="m3 3 10 10M13 3 3 13" />
                </svg>
              </button>
            </div>
          </header>

          <div className="chat__log" ref={logRef} role="log" aria-live="polite">
            {messages.length === 0 ? (
              <div className="chat__empty">
                <p className="chat__bubble chat__bubble--bot">
                  Hello, and welcome to {brand.name}. How can we help you today? Ask about our
                  collections, the Grand Festival Sale or visiting a showroom.
                </p>
                <p className="chat__note">
                  Answers come from an AI assistant and may not be perfect. Our team can confirm
                  anything important.
                </p>
              </div>
            ) : null}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat__bubble chat__bubble--${message.role === "user" ? "user" : "bot"}`}
              >
                <span className="sr-only">
                  {message.role === "user" ? "You:" : `${brand.name}:`}
                </span>
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  <Reply text={message.content} />
                )}
              </div>
            ))}

            {pending ? (
              <div className="chat__typing" aria-label={`${brand.name} is typing`}>
                <span className="chat__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                {brand.name} is typing…
              </div>
            ) : null}

            {error ? (
              <div className="chat__error" role="alert">
                <p>{ERRORS[error]}</p>
                {error === "not_configured" ? null : (
                  <button type="button" onClick={() => void ask(messages)}>
                    Try again
                  </button>
                )}
              </div>
            ) : null}

            {lastIsReply || error === "not_configured" ? (
              <div className="chat__handoff">
                <p>Want to know more? Our team will be happy to help.</p>
                {contact.whatsapp ? (
                  <a
                    className="chat__wa"
                    href={whatsappUrl(contact.whatsapp, handoffText(messages))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Continue on WhatsApp
                  </a>
                ) : (
                  <a className="chat__wa" href="#footer" onClick={close}>
                    Contact our team
                  </a>
                )}
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
              placeholder={atLimit ? "Please continue with our team" : "Type your question…"}
              disabled={atLimit}
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
