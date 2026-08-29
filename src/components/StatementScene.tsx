interface StatementSceneProps {
  headingRef: React.RefObject<HTMLHeadingElement>;
  subRef: React.RefObject<HTMLParagraphElement>;
  heading: string;
  sub?: string;
  /** Whether the text sits over silk (light text) or ivory (dark text). */
  over?: 'silk' | 'ivory';
}

/**
 * A reusable typographic statement scene. Used for:
 *  - Scene 04: "Woven with tradition." (over silk)
 *  - Scene 06: "Reimagined for tomorrow." (over ivory)
 *  - Scene 08: "A new chapter is being woven." (over silk)
 */
export default function StatementScene({
  headingRef,
  subRef,
  heading,
  sub,
  over = 'silk',
}: StatementSceneProps) {
  const headingColor = over === 'silk' ? 'text-ivory' : 'text-charcoal';
  const subColor = over === 'silk' ? 'text-ivory/70' : 'text-charcoal-400';

  return (
    <section className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6">
      <h2
        ref={headingRef}
        className={`font-serif font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-brand text-center leading-[1.15] max-w-4xl ${headingColor}`}
        style={{ opacity: 0 }}
      >
        {heading}
      </h2>
      {sub && (
        <p
          ref={subRef}
          className={`font-sans text-xs sm:text-sm tracking-editorial-sm uppercase mt-6 sm:mt-8 text-center ${subColor}`}
          style={{ opacity: 0 }}
        >
          {sub}
        </p>
      )}
    </section>
  );
}
