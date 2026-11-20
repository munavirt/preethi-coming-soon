import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

import type { Collection } from "@/content/home";

import { Arrow } from "./art";
import { Tbc } from "./primitives";

const SWIPE_DISTANCE = 40;

/** Shortest signed distance from the active card, so the stack wraps both ways. */
function offsetFrom(index: number, active: number, total: number) {
  const half = Math.floor(total / 2);
  return ((index - active + total + half) % total) - half;
}

export function CollectionCarousel({ items }: { items: Collection[] }) {
  const [active, setActive] = useState(0);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const total = items.length;
  const step = (by: number) => setActive((current) => (current + by + total) % total);

  const onPointerUp = (event: PointerEvent) => {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) < SWIPE_DISTANCE) return;
    dragged.current = true;
    step(distance < 0 ? 1 : -1);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Collections"
      onKeyDown={onKeyDown}
    >
      <ul
        className="cc__stage"
        onPointerDown={(event) => {
          dragStart.current = event.clientX;
          dragged.current = false;
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStart.current = null)}
        onClickCapture={(event) => {
          // A swipe that ends over a card must not also follow its link.
          if (!dragged.current) return;
          dragged.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {items.map((item, index) => {
          const offset = offsetFrom(index, active, total);
          const isActive = offset === 0;
          const number = String(index + 1).padStart(2, "0");
          return (
            <li
              key={item.title}
              className={`cc__card ${item.image ? "" : "cc__card--empty"}`}
              data-depth={Math.min(Math.abs(offset), 3)}
              style={{ "--side": Math.sign(offset) } as CSSProperties}
            >
              {item.image ? (
                <img
                  src={item.image.src}
                  alt={isActive ? item.image.alt : ""}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  style={item.image.position ? { objectPosition: item.image.position } : undefined}
                />
              ) : (
                <div className="cc__empty">
                  <Tbc>Photograph to be supplied</Tbc>
                </div>
              )}
              <div className="cc__shade" aria-hidden="true" />
              {isActive ? (
                <div className="cc__text">
                  <span className="cc__count">
                    {number} / {String(total).padStart(2, "0")}
                  </span>
                  <span className="cc__title">{item.title}</span>
                  <span className="cc__note">{item.note}</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="cc__pick"
                  aria-label={`Show ${item.title}`}
                  onClick={() => setActive(index)}
                >
                  <span aria-hidden="true">
                    {number} — {item.short}
                  </span>
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div className="cc__controls">
        <button type="button" onClick={() => step(-1)} aria-label="Previous collection">
          <Arrow className="cc__back" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next collection">
          <Arrow />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {active + 1} of {total}: {items[active]?.title}
      </p>
    </div>
  );
}
