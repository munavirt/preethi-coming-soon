interface IntroSceneProps {
  brandRef: React.RefObject<HTMLHeadingElement>;
  labelRef: React.RefObject<HTMLParagraphElement>;
}

/**
 * Scene 01 — The Silence.
 * Centered brand name in editorial serif with a tiny "Coming Soon" label.
 * Everything starts at opacity 0 and is revealed by the master timeline.
 */
export default function IntroScene({ brandRef, labelRef }: IntroSceneProps) {
  return (
    <section className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
      <p
        ref={labelRef}
        className="font-sans text-[10px] sm:text-xs tracking-editorial uppercase text-crimson/70 mb-6 sm:mb-8"
        style={{ opacity: 0 }}
      >
        Coming Soon
      </p>
      <h1
        ref={brandRef}
        className="font-serif font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-brand text-crimson text-center leading-[1.1]"
        style={{ opacity: 0 }}
      >
        Preethi Silks
      </h1>
    </section>
  );
}
