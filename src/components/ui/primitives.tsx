"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Availability, Localized } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { formatDecimal, stars } from "@/lib/format";

/* --------------------------------------------------------------- eyebrow */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`t-eyebrow ${className}`}>{children}</span>;
}

export function MonoLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`t-mono ${className}`}>{children}</span>;
}

/* ---------------------------------------------------------- section head */

export function SectionHead({
  title,
  action,
  className = "",
  size = "md",
  rule = false,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  rule?: boolean;
}) {
  const sizes = {
    sm: "text-[28px] sm:text-[32px]",
    md: "text-[30px] sm:text-[38px]",
    lg: "text-[34px] sm:text-[46px]",
  };
  return (
    <div
      className={`mb-8 flex flex-wrap items-baseline justify-between gap-5 ${
        rule ? "border-t border-ink/12 pt-8" : ""
      } ${className}`}
    >
      <h2 className={`t-display ${sizes[size]} leading-[1.08]`}>{title}</h2>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------ status pill */

const PILL_STYLES: Record<Availability, string> = {
  "ready-to-ship": "bg-ivory text-ink border border-ink/12",
  "made-to-order": "bg-ivory text-brass border border-brass/50",
  "pre-order": "bg-onyx text-ivory",
  "limited-edition": "bg-emerald text-ivory",
};

export function StatusPill({
  availability,
  className = "",
}: {
  availability: Availability;
  className?: string;
}) {
  const { d } = useLocale();
  return (
    <span
      className={`inline-block px-2.5 py-1.5 text-[9.5px] uppercase tracking-[0.14em] leading-none ${PILL_STYLES[availability]} ${className}`}
    >
      {d.availability[availability]}
    </span>
  );
}

/* ----------------------------------------------------------------- rating */

export function Rating({
  value,
  count,
  className = "",
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  const { locale, d } = useLocale();
  return (
    <span className={`flex items-center gap-2.5 text-[12px] text-muted ${className}`}>
      <span aria-hidden className="tracking-[0.2em] text-brass">
        {stars(value)}
      </span>
      <span>
        {formatDecimal(value, locale)}
        {count !== undefined ? ` · ${formatDecimal(count, locale, 0)} ${d.pdp.reviewsShort}` : ""}
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- diamond */

export function Diamond({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`t-diamond ${className}`} />;
}

/* ------------------------------------------------------------ breadcrumbs */

export function Breadcrumbs({
  items,
  dark = false,
}: {
  items: { label: string; href?: string }[];
  dark?: boolean;
}) {
  const { d } = useLocale();
  return (
    <nav
      aria-label={d.a11y.breadcrumb}
      className={`flex flex-wrap items-center gap-2.5 text-[10.5px] uppercase tracking-[0.12em] ${
        dark ? "text-ivory/50" : "text-muted"
      }`}
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2.5">
          {i > 0 ? (
            <span aria-hidden className="text-brass">
              /
            </span>
          ) : null}
          {item.href ? (
            <Link href={item.href} className="no-underline hover:text-brass">
              {item.label}
            </Link>
          ) : (
            <span className={dark ? "text-ivory" : "text-ink"} aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* --------------------------------------------------------------- lockup */

export function Wordmark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: { latin: "text-[16px]", arabic: "text-[10px]" },
    md: { latin: "text-[20px]", arabic: "text-[11px]" },
    lg: { latin: "text-[23px]", arabic: "text-[12px]" },
  };
  return (
    <span className={`flex flex-col gap-px leading-none ${className}`}>
      <span
        className={`font-display font-medium tracking-[0.3em] ${sizes[size].latin}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        THURAYY&#256;
      </span>
      <span
        className={`text-brass ${sizes[size].arabic}`}
        style={{ fontFamily: "var(--font-arabic-display)" }}
      >
        ثريا
      </span>
    </span>
  );
}

/** The seven-star mark. Never mirrored in RTL. */
export function StarMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative block h-[26px] w-[26px] ${className}`}>
      <span className="absolute left-[3px] top-[1px] h-[3px] w-[3px] rounded-full bg-brass" />
      <span className="absolute left-[12px] top-[5px] h-[4px] w-[4px] rounded-full bg-brass" />
      <span className="absolute left-[21px] top-[2px] h-[2px] w-[2px] rounded-full bg-brass" />
      <span className="absolute left-[7px] top-[13px] h-[2.5px] w-[2.5px] rounded-full bg-current opacity-[0.55]" />
      <span className="absolute left-[17px] top-[16px] h-[3px] w-[3px] rounded-full bg-current opacity-[0.7]" />
      <span className="absolute left-[11px] top-[22px] h-[2px] w-[2px] rounded-full bg-current opacity-[0.4]" />
    </span>
  );
}

/* ------------------------------------------------------------- text link */

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`t-link ${className}`}>
      {children}
    </Link>
  );
}

/* --------------------------------------------------------------- helpers */

export function useT() {
  const { t } = useLocale();
  return t;
}

export function L({ value }: { value: Localized }) {
  const { t } = useLocale();
  return <>{t(value)}</>;
}
