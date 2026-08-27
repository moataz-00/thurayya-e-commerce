"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/provider";
import { routes } from "@/lib/routes";

const KEY = "thurayya.cookies.v1";

/**
 * Analytics stay off until someone opts in, and declining is a one-click
 * action of equal weight - see docs/ACCESSIBILITY.md.
 */
export function CookieBanner() {
  const { locale, isRtl } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* Storage blocked - do not nag on every page view. */
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  const copy = isRtl
    ? {
        body: "نستخدم ملفات تعريف الارتباط الأساسية لحفظ حقيبتك ولغتك. أما ملفات التحليلات فتبقى معطلة حتى توافق.",
        accept: "قبول التحليلات",
        decline: "الأساسية فقط",
        more: "الخصوصية",
      }
    : {
        body: "We use essential cookies to keep your bag and language. Analytics cookies stay off until you accept them.",
        accept: "Accept analytics",
        decline: "Essential only",
        more: "Privacy",
      };

  return (
    <div
      role="region"
      aria-label={copy.more}
      className="fixed bottom-0 start-0 end-0 z-[190] border-t border-brass/25 bg-onyx/97 backdrop-blur-sm"
    >
      <div className="t-shell flex flex-wrap items-center justify-between gap-5 py-4">
        <p className="max-w-[560px] text-[11.5px] leading-relaxed text-ivory/70">
          {copy.body}{" "}
          <Link href={routes.legal(locale, "privacy")} className="text-brass underline-offset-4">
            {copy.more}
          </Link>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="cursor-pointer border border-ivory/30 bg-transparent px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-ivory"
          >
            {copy.decline}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="cursor-pointer border-0 bg-brass px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-onyx"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
