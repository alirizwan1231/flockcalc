import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  /** Breadcrumb tail, e.g. "Chicken Coop Size Calculator". */
  crumb: string;
  title: ReactNode;
  lede: ReactNode;
};

/**
 * Concept title block: breadcrumb kicker, then a two-column
 * end-aligned grid — giant DM Serif h1 left, intro paragraph right.
 */
export default function PageHead({ crumb, title, lede }: Props) {
  return (
    <div className="page-head">
      <p className="kicker">
        <Link href="/">Home</Link>
        &nbsp;&nbsp;/&nbsp;&nbsp;{crumb}
      </p>
      <div className="page-head-grid">
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </div>
  );
}
