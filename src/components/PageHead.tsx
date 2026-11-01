import type { ReactNode } from "react";
import { CirclePlus } from "lucide-react";

type Props = {
  /** Kicker label, e.g. "Chicken Coop Size Calculator". */
  crumb: string;
  title: ReactNode;
  lede: ReactNode;
};

/**
 * super.cx page head: centred kicker with ⊕ icon, huge uppercase
 * Archivo h1, short centred intro paragraph.
 */
export default function PageHead({ crumb, title, lede }: Props) {
  return (
    <div className="page-head">
      <p className="kicker">
        <CirclePlus size={16} aria-hidden="true" />
        {crumb}
      </p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
    </div>
  );
}
