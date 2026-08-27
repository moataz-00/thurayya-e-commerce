import type { ReactNode } from "react";
import { Header, type HeaderVariant } from "./Header";
import { Footer } from "./Footer";

/**
 * Standard page frame: utility bar, header, content, footer.
 * Checkout and search deliberately opt out and render their own chrome.
 */
export function PageShell({
  children,
  variant = "light",
  footer = true,
  className = "",
}: {
  children: ReactNode;
  variant?: HeaderVariant;
  footer?: boolean;
  className?: string;
}) {
  return (
    <div className={`t-screen bg-ivory text-ink ${className}`}>
      {variant !== "over" ? <Header variant={variant} /> : null}
      {children}
      {footer ? <Footer /> : null}
    </div>
  );
}
