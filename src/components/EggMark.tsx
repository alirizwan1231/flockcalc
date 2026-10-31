/** The FlockCalc egg mark — amber fill, ink stroke (from the approved concept). */
export default function EggMark({
  width = 30,
  height = 36,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 34"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14 1C7 1 1 12 1 21a13 13 0 0 0 26 0C27 12 21 1 14 1Z"
        fill="#F4B31F"
        stroke="#10231A"
        strokeWidth="2.5"
      />
    </svg>
  );
}
