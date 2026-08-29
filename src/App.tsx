import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from '@/components/Header';
import IntroScene from '@/components/IntroScene';
import StatementScene from '@/components/StatementScene';
import FinalScene from '@/components/FinalScene';
import SilkFabric from '@/components/SilkFabric';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { buildMasterTimeline, buildReducedTimeline, type SilkRefs } from '@/animations/masterTimeline';

function App() {
  const reduced = useReducedMotion();

  // Header
  const headerBrand = useRef<HTMLDivElement>(null);
  const headerSoon = useRef<HTMLDivElement>(null);
  // Intro
  const introBrand = useRef<HTMLHeadingElement>(null);
  const introLabel = useRef<HTMLParagraphElement>(null);
  // Silk 1 — outer wrapper for parallax, inner for GSAP transform
  const silk1Wrap = useRef<HTMLDivElement>(null);
  const silk1Root = useRef<HTMLDivElement>(null);
  // Statement 1
  const stmt1Heading = useRef<HTMLHeadingElement>(null);
  const stmt1Sub = useRef<HTMLParagraphElement>(null);
  // Statement 2
  const stmt2Heading = useRef<HTMLHeadingElement>(null);
  const stmt2Sub = useRef<HTMLParagraphElement>(null);
  // Silk 2
  const silk2Wrap = useRef<HTMLDivElement>(null);
  const silk2Root = useRef<HTMLDivElement>(null);
  // Final
  const finalBrand = useRef<HTMLHeadingElement>(null);
  const finalMessage = useRef<HTMLParagraphElement>(null);
  const finalMeta = useRef<HTMLParagraphElement>(null);
  const finalNote = useRef<HTMLParagraphElement>(null);

  // Subtle parallax on the resting silk layer — applied to the wrapper
  // so it doesn't conflict with GSAP's transform on the inner element.
  usePointerParallax(silk2Wrap, { x: 4, y: 3, smooth: 0.06 });

  useEffect(() => {
    // Query SVG sub-layers now that they're in the DOM
    const s1Body = silk1Root.current?.querySelector('[data-silk="body"]') ?? null;
    const s1Sheen = silk1Root.current?.querySelector('[data-silk="sheen"]') ?? null;
    const s2Body = silk2Root.current?.querySelector('[data-silk="body"]') ?? null;
    const s2Sheen = silk2Root.current?.querySelector('[data-silk="sheen"]') ?? null;

    const refs: SilkRefs = {
      headerBrand, headerSoon,
      introBrand, introLabel,
      silk1Root, silk1Body: s1Body, silk1Sheen: s1Sheen,
      stmt1Heading, stmt1Sub,
      stmt2Heading, stmt2Sub,
      silk2Root, silk2Body: s2Body, silk2Sheen: s2Sheen,
      finalBrand, finalMessage, finalMeta, finalNote,
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
    <main className="relative h-screen w-screen overflow-hidden bg-ivory">
      {/* Skip link for keyboard users */}
      <a
        href="#final"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:text-ivory focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to final message
      </a>

      {/* Header */}
      <Header brandRef={headerBrand} soonRef={headerSoon} />

      {/* ── Silk layer 1 (first unfold) ── */}
      <div ref={silk1Wrap} className="absolute inset-0 z-10" aria-hidden="true">
        <div
          ref={silk1Root}
          className="absolute inset-0 will-change-clip"
          style={{ display: 'none' }}
        >
          <SilkFabric variant="unfold-left" />
          <div className="absolute inset-0 silk-grain pointer-events-none opacity-40 mix-blend-overlay" />
        </div>
      </div>

      {/* ── Silk layer 2 (second unfold, resting) ── */}
      <div ref={silk2Wrap} className="absolute inset-0 z-10 will-change-transform" aria-hidden="true">
        <div
          ref={silk2Root}
          className="absolute inset-0 will-change-clip"
          style={{ display: 'none' }}
        >
          <SilkFabric variant="unfold-diagonal" />
          <div className="absolute inset-0 silk-grain pointer-events-none opacity-40 mix-blend-overlay" />
        </div>
      </div>

      {/* ── Scene 01: The Silence ── */}
      <IntroScene brandRef={introBrand} labelRef={introLabel} />

      {/* ── Scene 04: Woven with tradition ── */}
      <StatementScene
        headingRef={stmt1Heading}
        subRef={stmt1Sub}
<<<<<<< HEAD
        heading="Woven with tradition."
        sub="Crafted through generations."
=======
        heading="Fashion for every generation.."
        sub="Now we're bringing more of it online."
>>>>>>> a5fcf8d (second commit trying preethi content)
        over="silk"
      />

      {/* ── Scene 06: Reimagined for tomorrow ── */}
      <StatementScene
        headingRef={stmt2Heading}
        subRef={stmt2Sub}
        heading="Reimagined for tomorrow."
        over="ivory"
      />

      {/* ── Scene 08: Final ── */}
      <div id="final">
        <FinalScene
          brandRef={finalBrand}
          messageRef={finalMessage}
          metaRef={finalMeta}
          noteRef={finalNote}
        />
      </div>
    </main>
  );
}

export default App;
