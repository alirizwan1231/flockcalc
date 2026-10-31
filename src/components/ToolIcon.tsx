/**
 * Decorative inline SVG icons for the tool cards, one per calculator.
 * Stroke style, currentColor — colour comes from the .tool-icon wrapper.
 */
export default function ToolIcon({ slug }: { slug: string }) {
  const common = {
    viewBox: "0 0 32 32",
    width: 27,
    height: 27,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };

  switch (slug) {
    case "quail-coop-size-calculator":
      // Cage mesh grid
      return (
        <svg {...common}>
          <rect x="5.5" y="5.5" width="21" height="21" rx="2.5" />
          <path d="M5.5 12.5h21M5.5 19.5h21M12.5 5.5v21M19.5 5.5v21" />
        </svg>
      );
    case "how-many-chickens-do-i-need":
      // Egg with yolk
      return (
        <svg {...common}>
          <path d="M16 4.5c4.2 4.7 6.8 9 6.8 12.9a6.8 6.8 0 1 1-13.6 0C9.2 13.5 11.8 9.2 16 4.5z" />
          <circle cx="16" cy="18.5" r="2.7" />
        </svg>
      );
    case "cost-per-egg-calculator":
      // Coin
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" />
          <text
            x="16"
            y="21.5"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="currentColor"
            stroke="none"
          >
            $
          </text>
        </svg>
      );
    case "duck-coop-size-calculator":
      // Water waves
      return (
        <svg {...common}>
          <path d="M3.5 12.5c2.6-2.7 5.2-2.7 7.8 0s5.2 2.7 7.8 0 5.2-2.7 7.4-0.4" />
          <path d="M3.5 20.5c2.6-2.7 5.2-2.7 7.8 0s5.2 2.7 7.8 0 5.2-2.7 7.4-0.4" />
        </svg>
      );
    case "chicken-coop-size-calculator":
    default:
      // Coop / house
      return (
        <svg {...common}>
          <path d="M5 15.5 16 6l11 9.5" />
          <path d="M8.5 13.8V26h15V13.8" />
          <path d="M13.8 26v-6.2h4.4V26" />
        </svg>
      );
  }
}
