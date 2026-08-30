export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="8" cy="9" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8 11.5V17" strokeLinecap="round" />
      <path d="M12 17v-3.2c0-1.4 1-2.3 2.2-2.3s2 .9 2 2.2V17" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11.5V17" strokeLinecap="round" />
    </svg>
  );
}
