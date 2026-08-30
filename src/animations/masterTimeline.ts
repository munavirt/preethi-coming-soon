import gsap from 'gsap';

export interface SilkRefs {
  // Header
  headerBrand: React.RefObject<HTMLDivElement>;
  headerSoon: React.RefObject<HTMLDivElement>;
  // Intro
  introBrand: React.RefObject<HTMLHeadingElement>;
  introLabel: React.RefObject<HTMLParagraphElement>;
  // Silk layers — first unfold
  silk1Root: React.RefObject<HTMLDivElement>;
  silk1Body: Element | null;
  silk1Sheen: Element | null;
  // Statement 1 — over silk
  stmt1Heading: React.RefObject<HTMLHeadingElement>;
  stmt1Sub: React.RefObject<HTMLParagraphElement>;
  // Statement 2 — over ivory
  stmt2Heading: React.RefObject<HTMLHeadingElement>;
  stmt2Sub: React.RefObject<HTMLParagraphElement>;
  // Silk layers — second unfold
  silk2Root: React.RefObject<HTMLDivElement>;
  silk2Body: Element | null;
  silk2Sheen: Element | null;
  // Final
  finalBrand: React.RefObject<HTMLHeadingElement>;
  finalMessage: React.RefObject<HTMLParagraphElement>;
  finalMeta: React.RefObject<HTMLParagraphElement>;
  finalNote: React.RefObject<HTMLParagraphElement>;
}

const EASE_SLOW = 'power2.inOut';
const EASE_CINE = 'power3.inOut';
const EASE_EXPO = 'expo.inOut';

/**
 * Builds the master GSAP timeline — the full cinematic sequence:
 *  1. Intro fade          2. Typography reveal
 *  3. Thread entrance     4. Silk unfold
 *  5. Statement reveal    6. Silk fold-away
 *  7. White-space pause   8. Second statement
 *  9. Second silk unfold   10. Brand reveal
 * 11. Final message       12. Idle state
 *
 * The silk reveal uses clip-path: inset() so the fabric is *revealed*
 * rather than stretched — like cloth being unfolded.
 */
export function buildMasterTimeline(refs: SilkRefs): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: EASE_SLOW } });

  // ── 1. INTRO FADE ──────────────────────────────────────────────
  tl.to(refs.headerBrand.current, { opacity: 1, duration: 2.2, ease: EASE_CINE }, 0)
    .to(refs.headerSoon.current, { opacity: 1, duration: 2.2, ease: EASE_CINE }, 0.4)
    .fromTo(
      refs.introLabel.current,
      { opacity: 0, filter: 'blur(8px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: EASE_EXPO },
      0.6
    )
    .fromTo(
      refs.introBrand.current,
      { opacity: 0, filter: 'blur(8px)', y: 12 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 3, ease: EASE_EXPO },
      1
    );

  // ── 2. HOLD (silence) ──────────────────────────────────────────
  tl.to({}, { duration: 1.8 });

  // ── 3. THREAD ENTRANCE ─────────────────────────────────────────
  // A thin sliver of silk enters from the left via clip-path.
  tl.set(refs.silk1Root.current, {
    display: 'block',
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0,
  }).to(
    refs.silk1Root.current,
    {
      opacity: 1,
      clipPath: 'inset(0 96% 0 0)',
      duration: 1.6,
      ease: EASE_CINE,
    },
    '+=0.2'
  );

  // ── 4. SILK UNFOLD ─────────────────────────────────────────────
  // The fabric reveals across the viewport via clip-path. The sheen
  // sweeps across simultaneously. Intro text fades out as silk overtakes.
  tl.to(refs.silk1Root.current, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 3.2,
    ease: EASE_EXPO,
  })
    .to(
      refs.silk1Sheen,
      { attr: { x: 1100 }, duration: 3.2, ease: EASE_SLOW },
      '<'
    )
    .to(
      [refs.introBrand.current, refs.introLabel.current],
      { opacity: 0, filter: 'blur(6px)', duration: 1.2, ease: EASE_CINE },
      '<'
    )
    .to(
      [refs.headerBrand.current, refs.headerSoon.current],
      { color: '#F8F6F1', duration: 1.5, ease: EASE_SLOW },
      '<'
    );

  // ── 5. STATEMENT REVEAL — "Woven with tradition." ─────────────
  tl.fromTo(
    refs.stmt1Heading.current,
    { opacity: 0, filter: 'blur(6px)', y: 18 },
    { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.4, ease: EASE_EXPO },
    '-=0.8'
  ).fromTo(
    refs.stmt1Sub.current,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 1.8, ease: EASE_CINE },
    '-=1.2'
  );

  // Hold the statement
  tl.to({}, { duration: 2.2 });

  // ── 6. SILK FOLD-AWAY ──────────────────────────────────────────
  // Fabric is pulled away to the right. Text exits with it.
  tl.to(
    refs.stmt1Heading.current,
    { opacity: 0, filter: 'blur(6px)', y: -14, duration: 1.6, ease: EASE_CINE },
    '+=0.3'
  ).to(
    refs.stmt1Sub.current,
    { opacity: 0, duration: 1.2, ease: EASE_CINE },
    '<'
  );

  // Fold away to the right — clip-path closes from the left
  tl.to(refs.silk1Root.current, {
    clipPath: 'inset(0 0 0 100%)',
    duration: 2.4,
    ease: EASE_EXPO,
  })
    .to(
      refs.silk1Sheen,
      { attr: { x: 1600 }, duration: 2.4, ease: EASE_SLOW },
      '<'
    )
    .to(
      [refs.headerBrand.current, refs.headerSoon.current],
      { color: '#8B1118', duration: 1.5, ease: EASE_SLOW },
      '<'
    )
    .set(refs.silk1Root.current, { display: 'none' });

  // ── 7. WHITE-SPACE PAUSE ───────────────────────────────────────
  tl.to({}, { duration: 1.6 });

  // ── 8. SECOND STATEMENT — "Reimagined for tomorrow." ──────────
  tl.fromTo(
    refs.stmt2Heading.current,
    { opacity: 0, filter: 'blur(8px)', y: 16 },
    { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.6, ease: EASE_EXPO }
  ).fromTo(
    refs.stmt2Sub.current,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 1.8, ease: EASE_CINE },
    '-=1.4'
  );

  // Hold
  tl.to({}, { duration: 2 });

  // Exit statement 2 as the second silk arrives
  tl.to(
    [refs.stmt2Heading.current, refs.stmt2Sub.current],
    { opacity: 0, filter: 'blur(6px)', y: -12, duration: 1.4, ease: EASE_CINE },
    '+=0.2'
  );

  // ── 9. SECOND SILK UNFOLD ─────────────────────────────────────
  // More confident, diagonal feel — reveals from the left with a
  // slight vertical asymmetry for a more dramatic, sweeping motion.
  tl.set(refs.silk2Root.current, {
    display: 'block',
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0,
  })
    .to(refs.silk2Root.current, {
      opacity: 1,
      clipPath: 'inset(0 95% 0 0)',
      duration: 1.2,
      ease: EASE_CINE,
    })
    .to(refs.silk2Root.current, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 3.4,
      ease: EASE_EXPO,
    })
    .to(
      refs.silk2Sheen,
      { attr: { x: 1100 }, duration: 3.4, ease: EASE_SLOW },
      '<'
    )
    .to(
      [refs.headerBrand.current, refs.headerSoon.current],
      { color: '#F8F6F1', duration: 1.5, ease: EASE_SLOW },
      '<'
    );

  // ── 10. BRAND REVEAL ──────────────────────────────────────────
  // Brand name appears large over the second silk.
  tl.fromTo(
    refs.finalBrand.current,
    { opacity: 0, filter: 'blur(8px)', y: 20 },
    { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.6, ease: EASE_EXPO },
    '-=1.2'
  );

  // ── 11. FINAL MESSAGE ──────────────────────────────────────────
  tl.fromTo(
    refs.finalMessage.current,
    { opacity: 0, filter: 'blur(6px)', y: 14 },
    { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.2, ease: EASE_EXPO },
    '-=1'
  )
    .fromTo(
      refs.finalMeta.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 1.6, ease: EASE_CINE },
      '-=1.2'
    )
    .fromTo(
      refs.finalNote.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 1.6, ease: EASE_CINE },
      '-=1'
    );

  // ── 12. IDLE STATE ─────────────────────────────────────────────
  // The silk gently breathes — a very slow, subtle sheen drift.
  tl.to(
    refs.silk2Sheen,
    {
      attr: { x: 1400 },
      duration: 8,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    },
    '+=0.5'
  );

  return tl;
}

/**
 * A gentle reduced-motion timeline — fades only, no fabric animation.
 * Reveals the final composition directly with static silk backgrounds.
 */
export function buildReducedTimeline(refs: SilkRefs): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl.to(refs.headerBrand.current, { opacity: 1, duration: 0.8 }, 0)
    .to(refs.headerSoon.current, { opacity: 1, duration: 0.8 }, 0.2)
    .to(refs.introLabel.current, { opacity: 1, duration: 0.8 }, 0.4)
    .to(refs.introBrand.current, { opacity: 1, duration: 1 }, 0.6)
    .to({}, { duration: 1.5 })
    .to(refs.introBrand.current, { opacity: 0, duration: 0.6 })
    .to(refs.introLabel.current, { opacity: 0, duration: 0.6 }, '<')
    // Show silk 1 as a static background for the first statement
    .set(refs.silk1Root.current, { display: 'block', clipPath: 'inset(0 0% 0 0)', opacity: 1 })
    .to([refs.headerBrand.current, refs.headerSoon.current], { color: '#F8F6F1', duration: 0.4 }, '<')
    .to(refs.stmt1Heading.current, { opacity: 1, duration: 0.8 })
    .to(refs.stmt1Sub.current, { opacity: 1, duration: 0.6 }, '<')
    .to({}, { duration: 2 })
    .to(refs.stmt1Heading.current, { opacity: 0, duration: 0.6 })
    .to(refs.stmt1Sub.current, { opacity: 0, duration: 0.6 }, '<')
    // Hide silk 1, return header to charcoal for the ivory statement
    .set(refs.silk1Root.current, { display: 'none' })
    .to([refs.headerBrand.current, refs.headerSoon.current], { color: '#8B1118', duration: 0.4 }, '<')
    .to(refs.stmt2Heading.current, { opacity: 1, duration: 0.8 })
    .to(refs.stmt2Sub.current, { opacity: 1, duration: 0.6 }, '<')
    .to({}, { duration: 2 })
    .to(refs.stmt2Heading.current, { opacity: 0, duration: 0.6 })
    .to(refs.stmt2Sub.current, { opacity: 0, duration: 0.6 }, '<')
    // Show silk 2 as a static background for the final composition
    .set(refs.silk2Root.current, { display: 'block', clipPath: 'inset(0 0% 0 0)', opacity: 1 })
    .to([refs.headerBrand.current, refs.headerSoon.current], { color: '#F8F6F1', duration: 0.4 }, '<')
    .to(refs.finalBrand.current, { opacity: 1, duration: 0.8 })
    .to(refs.finalMessage.current, { opacity: 1, duration: 0.6 }, '<')
    .to(refs.finalMeta.current, { opacity: 1, duration: 0.6 }, '-=0.4')
    .to(refs.finalNote.current, { opacity: 1, duration: 0.6 }, '-=0.4');

  return tl;
}
