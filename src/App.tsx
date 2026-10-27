import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from '@/components/Header';
import HeadlineSequence from '@/components/HeadlineSequence';
import FinalScene from '@/components/FinalScene';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  buildMasterTimeline,
  buildReducedTimeline,
  type MasterTimelineRefs,
} from '@/animations/masterTimeline';

export default function App() {
  const reduced = useReducedMotion();

  // Header refs
  const headerBrand = useRef<HTMLDivElement>(null);
  const headerSoon = useRef<HTMLDivElement>(null);

  // Changing headline sequence refs
  const headline1 = useRef<HTMLHeadingElement>(null);
  const headline2 = useRef<HTMLHeadingElement>(null);
  const headline3 = useRef<HTMLHeadingElement>(null);

  // Final brand scene refs
  const finalBrand = useRef<HTMLHeadingElement>(null);
  const finalTagline = useRef<HTMLParagraphElement>(null);
  const finalSubtext = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const refs: MasterTimelineRefs = {
      headerBrand,
      headerSoon,
      headline1,
      headline2,
      headline3,
      finalBrand,
      finalTagline,
      finalSubtext,
    };

    const ctx = gsap.context(() => {
      if (reduced) {
        buildReducedTimeline(refs);
      } else {
        buildMasterTimeline(refs);
      }
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <main className="relative min-h-screen h-screen w-screen overflow-hidden bg-white text-[#111111] antialiased">
      {/* Accessible skip link */}
      <a
        href="#final"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#111111] focus:text-white focus:px-4 focus:py-2 focus:text-xs tracking-editorial"
      >
        Skip to brand message
      </a>

      {/* Persistent minimal header */}
      <Header brandRef={headerBrand} soonRef={headerSoon} />

      {/* Changing editorial statements (1.0s – 8.0s) */}
      <HeadlineSequence
        headline1Ref={headline1}
        headline2Ref={headline2}
        headline3Ref={headline3}
      />

      {/* Centered final brand composition (8.0s – settled) */}
      <FinalScene
        brandRef={finalBrand}
        taglineRef={finalTagline}
        subtextRef={finalSubtext}
      />
    </main>
  );
}
