import type { ReactNode } from "react";

import { brand, type LinkItem, type Picture } from "@/content/home";

import { Arrow } from "./art";

export function Cta({
  link,
  variant = "primary",
  className = "",
}: {
  link: LinkItem;
  variant?: "primary" | "ink" | "light" | "line";
  className?: string;
}) {
  return (
    <a href={link.href} className={`cta cta--${variant} ${className}`}>
      <span>{link.label}</span>
      <Arrow className="cta__arrow" />
    </a>
  );
}

/** A photograph cropped to the frame set by its class, so nothing shifts while it loads. */
export function Photo({ image, className = "" }: { image: Picture; className?: string }) {
  return (
    <div className={`photo ${className}`} data-clip="">
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
    </div>
  );
}

/** Marks content the client still has to supply, so it can't be mistaken for a real claim. */
export function Tbc({ children = "To be confirmed" }: { children?: ReactNode }) {
  return <span className="tbc">{children}</span>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`logo ${className}`} aria-label={`${brand.name} home`}>
      {brand.logo ? (
        <img src={brand.logo.src} alt="" width={brand.logo.width} height={brand.logo.height} />
      ) : (
        <>
          <span className="logo__a">Preethi</span>
          <span className="logo__b">Silks</span>
        </>
      )}
    </a>
  );
}
