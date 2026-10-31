import { Coins, Egg, Grid3x3, Warehouse, Waves } from "lucide-react";

/**
 * One Lucide icon per calculator, used in the tool cards.
 * Colour and sizing come from the .tool-icon wrapper in globals.css.
 */
export default function ToolIcon({ slug }: { slug: string }) {
  const props = { size: 26, strokeWidth: 1.8, "aria-hidden": true } as const;
  switch (slug) {
    case "quail-coop-size-calculator":
      return <Grid3x3 {...props} />;
    case "how-many-chickens-do-i-need":
      return <Egg {...props} />;
    case "cost-per-egg-calculator":
      return <Coins {...props} />;
    case "duck-coop-size-calculator":
      return <Waves {...props} />;
    case "chicken-coop-size-calculator":
    default:
      return <Warehouse {...props} />;
  }
}
