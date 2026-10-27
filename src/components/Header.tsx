interface HeaderProps {
  /** Refs for animation targeting. */
  brandRef: React.RefObject<HTMLDivElement>;
  soonRef: React.RefObject<HTMLDivElement>;
}

/**
 * Minimal fixed header:
 * - Brand label top-left: PREETHI SILKS (refined serif, letter-spaced, near-black)
 * - Status label top-right: COMING SOON (clean sans-serif, widely tracked, subtle grey)
 */
export default function Header({ brandRef, soonRef }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-12 md:px-16 py-7 sm:py-9 pointer-events-none select-none">
      <div
        ref={brandRef}
        className="font-serif font-normal text-[11px] sm:text-xs tracking-editorial uppercase text-[#1a1a1a]"
        style={{ opacity: 0 }}
      >
        Preethi Silks
      </div>
      <div
        ref={soonRef}
        className="font-sans text-[10px] sm:text-[11px] font-normal tracking-editorial-lg uppercase text-[#7a7a7a]"
        style={{ opacity: 0 }}
      >
        Coming Soon
      </div>
    </header>
  );
}
