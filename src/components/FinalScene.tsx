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
        A new chapter is being woven.
      </p>
<<<<<<< HEAD
      <p
        ref={metaRef}
        className="font-sans text-[10px] sm:text-xs tracking-editorial uppercase text-ivory/60 mt-8 sm:mt-10"
        style={{ opacity: 0 }}
      >
        Coming Soon · 2027
      </p>
=======

>>>>>>> a5fcf8d (second commit trying preethi content)
      <p
        ref={noteRef}
        className="font-sans text-[10px] sm:text-xs tracking-editorial-sm text-ivory/50 mt-3 sm:mt-4 text-center max-w-xs"
        style={{ opacity: 0 }}
      >
        A new digital experience is on its way.
      </p>
    </section>
  );
}
