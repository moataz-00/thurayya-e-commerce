"use client";

import { useState } from "react";
import type { Localized } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { resolveImage } from "@/lib/images";

const TONES: Record<number, string> = {
  1: "bg-surface-1",
  2: "bg-surface-2",
  3: "bg-surface-3",
  4: "bg-surface-4",
};

/**
 * Every image on the site renders through here.
 *
 * `src` is an image id from `src/lib/images.ts` — an Unsplash photo path, a
 * local path, or any URL. Unsplash resizes on its own CDN, so we hand the
 * browser a `srcSet` and let it choose; there is no server-side optimiser in
 * the loop, which keeps dev and production identical.
 *
 * With no `src` (or if the image fails to load) the slot falls back to the
 * labelled placeholder, so the photography brief stays visible in the design.
 * See docs/IMAGE-BRIEF.md.
 */
export function ShotSlot({
  label,
  tone = 2,
  dark = false,
  src,
  className = "",
  showLabel = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
  position = "center",
}: {
  label?: Localized | string;
  tone?: 1 | 2 | 3 | 4;
  dark?: boolean;
  src?: string;
  className?: string;
  showLabel?: boolean;
  sizes?: string;
  priority?: boolean;
  position?: string;
}) {
  const { locale } = useLocale();
  const [failed, setFailed] = useState(false);
  const text = typeof label === "string" ? label : label ? (label[locale] ?? label.en) : "";
  const image = failed ? undefined : resolveImage(src);

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        alt={text}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: position }}
      />
    );
  }

  return (
    <div
      className={`t-shot ${dark ? "t-shot--dark" : TONES[tone]} ${className}`}
      role="img"
      aria-label={text || undefined}
    >
      {showLabel && text ? (
        <span
          className="t-mono absolute bottom-3 start-3.5 end-3.5 z-[1] truncate text-[9.5px] leading-relaxed"
          style={{ color: dark ? "rgb(242 238 229 / 0.45)" : "rgb(22 24 25 / 0.5)" }}
        >
          {text}
        </span>
      ) : null}
    </div>
  );
}
