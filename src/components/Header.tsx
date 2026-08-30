interface HeaderProps {
  /** Refs for animation targeting. */
  brandRef: React.RefObject<HTMLDivElement>;
  soonRef: React.RefObject<HTMLDivElement>;
}

/**
 * Minimal fixed header: brand name top-left, "Coming Soon" top-right.
 * Both elements start invisible and are faded in by the master timeline.
 */
export default function Header({ brandRef, soonRef }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 md:px-14 py-6 sm:py-8 pointer-events-none">
      <div
        ref={brandRef}
        className="font-serif text-lg sm:text-xl tracking-brand text-crimson"
        style={{ opacity: 0 }}
      >
        Preethi Silks
      </div>
      <div
        ref={soonRef}
        className="font-sans text-[10px] sm:text-xs tracking-editorial uppercase text-crimson/70"
        style={{ opacity: 0 }}
      >
        Coming Soon
      </div>
    </header>
  );
}
