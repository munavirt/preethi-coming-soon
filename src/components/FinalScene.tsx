interface FinalSceneProps {
  brandRef: React.RefObject<HTMLHeadingElement>;
  taglineRef: React.RefObject<HTMLParagraphElement>;
  subtextRef: React.RefObject<HTMLParagraphElement>;
}

/**
 * Final Scene:
 * 1. Centered brand wordmark: PREETHI SILKS (refined serif, light, tracked)
 * 2. Italic tagline: "An elegant new chapter is on its way." (Cormorant Garamond italic)
 * 3. Subtle secondary copy: "We’re preparing a new online experience for you. The same familiar name, with a fresh way to discover Preethi."
 */
export default function FinalScene({
  brandRef,
  taglineRef,
  subtextRef,
}: FinalSceneProps) {
  return (
    <section
      id="final"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none select-none text-center"
      aria-label="Preethi Silks Coming Soon"
    >
      {/* Primary Brand Focal Group */}
      <div className="flex flex-col items-center justify-center">
        {/* Brand Wordmark */}
        <h1
          ref={brandRef}
          className="font-serif font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[94px] tracking-[0.10em] sm:tracking-[0.13em] text-[#111111] leading-none uppercase sm:whitespace-nowrap"
          style={{ opacity: 0 }}
        >
          Preethi Silks
        </h1>

        {/* Italic Tagline directly beneath with comfortable spacing */}
        <p
          ref={taglineRef}
          className="font-serif font-normal italic text-base sm:text-xl md:text-2xl text-[#4a4a4a] mt-4 sm:mt-5 md:mt-6 leading-snug tracking-normal"
          style={{ opacity: 0 }}
        >
          An elegant new chapter is on its way.
        </p>
      </div>

      {/* Supporting text positioned noticeably farther below */}
      <p
        ref={subtextRef}
        className="font-sans font-normal text-xs sm:text-[13px] md:text-sm text-[#787878] mt-12 sm:mt-16 md:mt-20 max-w-xs sm:max-w-md md:max-w-lg leading-relaxed tracking-editorial-tight"
        style={{ opacity: 0 }}
      >
        We’re preparing a new online experience for you. The same familiar name, with a fresh way to discover Preethi.
      </p>
    </section>
  );
}
