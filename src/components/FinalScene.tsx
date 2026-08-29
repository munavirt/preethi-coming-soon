interface FinalSceneProps {
  brandRef: React.RefObject<HTMLHeadingElement>;
  messageRef: React.RefObject<HTMLParagraphElement>;
  metaRef: React.RefObject<HTMLParagraphElement>;
  noteRef: React.RefObject<HTMLParagraphElement>;
}

/**
 * Scene 08 — Final composition.
 * The settled end frame: brand name, emotional closing line, and metadata.
 * Text is light (ivory) because it sits over the crimson silk.
 */
export default function FinalScene({
  brandRef,
  messageRef,
  metaRef,
  noteRef,
}: FinalSceneProps) {
  return (
    <section className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6">
      <h2
        ref={brandRef}
        className="font-serif font-light text-4xl sm:text-6xl md:text-7xl tracking-brand text-ivory text-center leading-[1.1]"
        style={{ opacity: 0 }}
      >
        Preethi Silks
      </h2>
      <p
        ref={messageRef}
        className="font-serif font-light italic text-xl sm:text-2xl md:text-3xl text-ivory/80 text-center mt-4 sm:mt-6 leading-[1.3]"
        style={{ opacity: 0 }}
      >
        Our online store is coming soon.
      </p>

      <p
        ref={noteRef}
        className="font-sans text-[10px] sm:text-xs tracking-editorial-sm text-ivory/50 mt-3 sm:mt-4 text-center max-w-xs"
        style={{ opacity: 0 }}
      >
        See you online.
      </p>
    </section>
  );
}
