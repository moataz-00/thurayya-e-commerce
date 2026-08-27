"use client";

import Link from "next/link";
import { useStore } from "@/lib/store/store";

/** Global toast. Mounted once in the locale layout; raised from anywhere. */
export function Toast() {
  const { toast, dismissToast } = useStore();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="t-screen fixed bottom-8 end-8 z-[200] flex items-center gap-4 bg-onyx px-6 py-4 text-ivory shadow-[0_20px_40px_-24px_rgb(22_24_25_/_0.6)]"
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brass" />
      <span className="text-[12.5px]">{toast.title}</span>
      {toast.href && toast.linkLabel ? (
        <Link
          href={toast.href}
          onClick={dismissToast}
          className="border-b border-brass/50 text-[10.5px] uppercase tracking-[0.14em] text-brass no-underline"
        >
          {toast.linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
