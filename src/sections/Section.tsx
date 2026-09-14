/**
 *  Reusable section shell with an eyebrow + title header.
 */
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  tone?: "light" | "dark";
  /** Skip the translucent pane — for sections whose cards carry it instead. */
  bare?: boolean;
  children?: ReactNode;
};

function Section({ id, eyebrow, title, tone = "light", bare, children }: SectionProps) {
  return (
    <section id={id} className={`section section--${tone}`}>
      <div className="section__inner">
        {(eyebrow || title) && (
          <header className="section__head">
            {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
            {title && <h2 className="section__title">{title}</h2>}
          </header>
        )}
        <div className={`section__body${bare ? " section__body--bare" : ""}`}>{children}</div>
      </div>
    </section>
  );
}

export default Section;
