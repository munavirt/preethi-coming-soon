export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 12" className={className} aria-hidden="true" fill="none">
      <path d="M0 6h18M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Pin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 15 18" className={className} aria-hidden="true" fill="none">
      <path
        d="M7.5 17C3.5 12.5 1.5 9.8 1.5 6.8a6 6 0 0 1 12 0c0 3-2 5.7-6 10.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="7.5" cy="6.8" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
