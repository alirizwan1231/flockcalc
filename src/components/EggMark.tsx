/** The FlockCalc mark — white egg on a violet rounded square (super.cx style). */
export default function EggMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="12" fill="#7C3AED" />
      <path
        d="M20 6.5c-4.9 0-8.7 7.8-8.7 13a8.7 8.7 0 0 0 17.4 0c0-5.2-3.8-13-8.7-13Z"
        fill="#ffffff"
      />
    </svg>
  );
}
