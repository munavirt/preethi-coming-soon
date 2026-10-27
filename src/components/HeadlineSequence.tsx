import React from 'react';

interface HeadlineSequenceProps {
  headline1Ref: React.RefObject<HTMLHeadingElement>;
  headline2Ref: React.RefObject<HTMLHeadingElement>;
  headline3Ref: React.RefObject<HTMLHeadingElement>;
}

/**
 * Centered sequence of changing editorial statements, matching Telrah's pacing:
 * 1. "Elegance through generations."
 * 2. "Designed for elegance."
 * 3. "Crafted for unforgettable moments." (with "unforgettable" in editorial italics)
 */
export default function HeadlineSequence({
  headline1Ref,
  headline2Ref,
  headline3Ref,
}: HeadlineSequenceProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center px-6">
      {/* Statement 1 */}
      <h2
        ref={headline1Ref}
        className="absolute font-serif font-medium text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] text-[#111111] text-center leading-[1.2] tracking-tight sm:tracking-normal md:whitespace-nowrap max-w-xs sm:max-w-xl md:max-w-none"
        style={{ opacity: 0 }}
      >
        Elegance through generations.
      </h2>

      {/* Statement 2 */}
      <h2
        ref={headline2Ref}
        className="absolute font-serif font-medium text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] text-[#111111] text-center leading-[1.2] tracking-tight sm:tracking-normal md:whitespace-nowrap max-w-xs sm:max-w-xl md:max-w-none"
        style={{ opacity: 0 }}
      >
        Designed for elegance.
      </h2>

      {/* Statement 3 with italic accent */}
      <h2
        ref={headline3Ref}
        className="absolute font-serif font-medium text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] text-[#111111] text-center leading-[1.2] tracking-tight sm:tracking-normal md:whitespace-nowrap max-w-xs sm:max-w-xl md:max-w-none"
        style={{ opacity: 0 }}
      >
        Crafted for <span className="font-serif italic font-medium">unforgettable</span> moments.
      </h2>
    </div>
  );
}
