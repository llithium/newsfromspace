import { ReactNode } from "react";

/**
 * Editorial "cosmic well" photo region. Renders the real image when `src` is
 * present; otherwise falls back to the styled starfield well + caption.
 * Sizing is controlled by the parent layout (e.g. `.feat .photo{height:380px}`).
 */
export default function Photo({
  src,
  caption,
  alt,
  className,
  badge,
  priority = false,
  decorative = false,
}: {
  src?: string | null;
  caption?: ReactNode;
  alt?: string;
  className?: string;
  badge?: ReactNode;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <div
      className={["photo", src ? "has-img" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={
            decorative
              ? ""
              : (alt ?? (typeof caption === "string" ? caption : ""))
          }
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      )}
      {caption ? <span className="cap">{caption}</span> : null}
      {badge ? <span className="badge">{badge}</span> : null}
    </div>
  );
}
