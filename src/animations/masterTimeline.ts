import gsap from 'gsap';

export interface MasterTimelineRefs {
  // Header
  headerBrand: React.RefObject<HTMLDivElement>;
  headerSoon: React.RefObject<HTMLDivElement>;
  // Editorial headline sequence
  headline1: React.RefObject<HTMLHeadingElement>;
  headline2: React.RefObject<HTMLHeadingElement>;
  headline3: React.RefObject<HTMLHeadingElement>;
  // Final brand scene
  finalBrand: React.RefObject<HTMLHeadingElement>;
  finalTagline: React.RefObject<HTMLParagraphElement>;
  finalSubtext: React.RefObject<HTMLParagraphElement>;
}

const EASE_OUT = 'power2.out';
const EASE_IN = 'power2.in';
const EASE_CINE = 'power3.out';

/**
 * Builds the master GSAP timeline matching Telrah's visual reference and timestamps:
 *
 *  0.0s – 0.8s : Header elements fade in (Preethi Silks top-left, COMING SOON top-right)
 *  1.0s – 3.8s : Headline 1 — "Elegance through generations." (reveal -> hold at 2s-3s -> fade out)
 *  3.7s – 5.9s : Headline 2 — "Designed for elegance." (reveal -> hold at 4s-5s -> fade out)
 *  5.8s – 8.0s : Headline 3 — "Crafted for *unforgettable* moments." (reveal -> hold at 6s-7s -> fade out)
 *  7.8s – 9.2s : Centered Brand Wordmark — "PREETHI SILKS" smooth editorial reveal
 *  8.8s – 10.0s: Italic Tagline — "*An elegant new chapter is on its way.*"
 *  9.6s – 10.8s: Secondary line — "We’re preparing a new online experience for you..."
 * 11.0s – 13.0s+: Tranquil settled state on pure white canvas
 */
export function buildMasterTimeline(refs: MasterTimelineRefs): gsap.core.Timeline {
  const tl = gsap.timeline();

  // Initial resets to prevent any flashes
  tl.set(
    [
      refs.headerBrand.current,
      refs.headerSoon.current,
      refs.headline1.current,
      refs.headline2.current,
      refs.headline3.current,
      refs.finalBrand.current,
      refs.finalTagline.current,
      refs.finalSubtext.current,
    ],
    { opacity: 0 }
  );

  // ── 0. HEADER FADE IN (0.0s - 0.8s) ───────────────────────────
  tl.to(
    refs.headerBrand.current,
    { opacity: 1, duration: 0.9, ease: EASE_OUT },
    0.1
  ).to(
    refs.headerSoon.current,
    { opacity: 1, duration: 0.9, ease: EASE_OUT },
    0.2
  );

  // ── 1. HEADLINE 1: "Elegance through generations." (1.0s - 3.8s) ──────
  tl.fromTo(
    refs.headline1.current,
    { opacity: 0, y: 8, filter: 'blur(5px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: EASE_OUT },
    1.0
  ).to(
    refs.headline1.current,
    { opacity: 0, y: -6, filter: 'blur(4px)', duration: 0.7, ease: EASE_IN },
    3.1
  );

  // ── 2. HEADLINE 2: "Designed for elegance." (3.7s - 5.9s) ─────
  tl.fromTo(
    refs.headline2.current,
    { opacity: 0, y: 8, filter: 'blur(5px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: EASE_OUT },
    3.7
  ).to(
    refs.headline2.current,
    { opacity: 0, y: -6, filter: 'blur(4px)', duration: 0.7, ease: EASE_IN },
    5.2
  );

  // ── 3. HEADLINE 3: "Crafted for unforgettable moments." (5.8s - 8.0s)
  tl.fromTo(
    refs.headline3.current,
    { opacity: 0, y: 8, filter: 'blur(5px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: EASE_OUT },
    5.8
  ).to(
    refs.headline3.current,
    { opacity: 0, y: -6, filter: 'blur(4px)', duration: 0.7, ease: EASE_IN },
    7.3
  );

  // ── 4. FINAL COMPOSITION REVEAL (7.8s - 10.8s) ────────────────
  // Main brand wordmark transitions in right as headline 3 completes exit
  tl.fromTo(
    refs.finalBrand.current,
    { opacity: 0, y: 12, filter: 'blur(6px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: EASE_CINE },
    7.8
  );

  // Italic tagline smoothly appears below the wordmark
  tl.fromTo(
    refs.finalTagline.current,
    { opacity: 0, y: 8, filter: 'blur(3px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: EASE_OUT },
    8.8
  );

  // Secondary text appears beneath
  tl.fromTo(
    refs.finalSubtext.current,
    { opacity: 0, y: 6 },
    { opacity: 1, y: 0, duration: 1.1, ease: EASE_OUT },
    9.6
  );

  return tl;
}

/**
 * Reduced-motion timeline: skips rapid changing sequence and delivers
 * an immediate, calm fade-in of the settled brand presentation.
 */
export function buildReducedTimeline(refs: MasterTimelineRefs): gsap.core.Timeline {
  const tl = gsap.timeline();

  tl.to(
    [refs.headerBrand.current, refs.headerSoon.current],
    { opacity: 1, duration: 0.6, stagger: 0.1 },
    0
  ).fromTo(
    refs.finalBrand.current,
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    0.3
  ).fromTo(
    refs.finalTagline.current,
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    0.6
  ).fromTo(
    refs.finalSubtext.current,
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    0.8
  );

  return tl;
}
