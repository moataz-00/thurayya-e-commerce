import { notFound } from "next/navigation";

/**
 * Catch-all so an unmatched URL under a locale renders the branded 404 inside
 * the locale layout, rather than Next's unstyled default. Static and dynamic
 * segments always win over a catch-all, so this only sees genuine misses.
 */
export default function CatchAll(): never {
  notFound();
}
