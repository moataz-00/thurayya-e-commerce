"use client";

import type { Localized } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";

const TONES: Record<number, string> = {
  1: "bg-surface-1",
  2: "bg-surface-2",
  3: "bg-surface-3",
  4: "bg-surface-4",
};

/**
 * Photography placeholder.
 *
 * The design ships labelled slots rather than images so the shot brief stays
 * visible to whoever is commissioning the photography. When a real image
 * exists, pass `src` and this renders it instead - nothing else has to change.
 * See docs/IMAGE-BRIEF.md.
 */
export function ShotSlot({
  label,
  tone = 2,
  dark = false,
  src,
  className = "",
  showLabel = true,
}: {
  label?: Localized | string;
  tone?: 1 | 2 | 3 | 4;
  dark?: boolean;
  src?: string;
  className?: string;
  showLabel?: boolean;
}) {
  const { locale } = useLocale();
  const text = typeof label === "string" ? label : label ? (label[locale] ?? label.en) : "";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={text}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
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
