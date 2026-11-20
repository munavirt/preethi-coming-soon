import { useCallback, useEffect, useRef, useState } from "react";

import offerPoster from "@/assets/offer.jpeg";

export const PROMO_STORAGE_KEY = "preethi-bumper-december-announcement-seen";
const AUTO_DISMISS_DELAY_MS = 3000;
const FADE_OUT_DURATION_MS = 260;

export function PromotionalAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    try {
      localStorage.setItem(PROMO_STORAGE_KEY, "true");
    } catch {
      // In case localStorage is blocked by private browsing mode
    }

    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, FADE_OUT_DURATION_MS);
  }, []);

  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem(PROMO_STORAGE_KEY);
      if (!hasSeen) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen || isClosing) return;

    // Focus close button for accessibility
    closeBtnRef.current?.focus();

    // 3-second automatic dismissal
    timerRef.current = setTimeout(() => {
      close();
    }, AUTO_DISMISS_DELAY_MS);

    // Escape key dismissal
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isClosing, close]);

  if (!isOpen) return null;

  return (
    <div
      className={`promo-modal ${isClosing ? "promo-modal--closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Bumper December Sale Promotional Announcement"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div className="promo-modal__card">
        <button
          ref={closeBtnRef}
          type="button"
          className="promo-modal__close"
          onClick={close}
          aria-label="Close promotional announcement"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <img
          src={offerPoster}
          alt="Preethi Silks Bumper December Sale - Up to 80% Off"
          className="promo-modal__image"
          width={1527}
          height={777}
        />

        <div className="promo-modal__progress" aria-hidden="true" />
      </div>
    </div>
  );
}
