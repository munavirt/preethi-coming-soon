import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  /** Maximum horizontal displacement in px. */
  x?: number;
  /** Maximum vertical displacement in px. */
  y?: number;
  /** Smoothing factor (0–1). Lower = more lag. */
  smooth?: number;
  /** Disable on touch / small screens. */
  disableOnTouch?: boolean;
}

/**
 * Tracks pointer position and applies a subtle parallax translate to the
 * target element via a ref. Uses requestAnimationFrame for smoothness and
 * disables itself on coarse-pointer (touch) devices.
 */
export function usePointerParallax<T extends HTMLElement>(
  ref: React.RefObject<T>,
  { x = 4, y = 3, smooth = 0.08, disableOnTouch = true }: ParallaxOptions = {}
) {
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch =
      disableOnTouch && window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX.current = nx * x;
      targetY.current = ny * y;
    };

    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * smooth;
      currentY.current += (targetY.current - currentY.current) * smooth;
      el.style.transform = `translate3d(${currentX.current.toFixed(2)}px, ${currentY.current.toFixed(2)}px, 0)`;
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [ref, x, y, smooth, disableOnTouch]);
}
