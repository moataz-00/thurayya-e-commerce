"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Currency } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes, switchLocalePath } from "@/lib/routes";
import { CURRENCIES } from "@/lib/format";
import { MEGA_MENUS, PRIMARY_NAV } from "@/lib/mock/navigation";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { StarMark, Wordmark } from "@/components/ui/primitives";

export type HeaderVariant = "light" | "dark" | "over";

export function Header({ variant = "light" }: { variant?: HeaderVariant }) {
  const { locale, d, t } = useLocale();
  const { bagCount, currency, setCurrency, hydrated } = useStore();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerSection, setDrawerSection] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const onDark = variant === "dark" || variant === "over";
  const fg = onDark ? "text-ivory" : "text-ink";

  /* Esc closes the mega menu and the drawer, per the interaction spec. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Route change closes everything. */
  useEffect(() => {
    setOpenMenu(null);
    setDrawer(false);
    setDrawerSection(null);
  }, [pathname]);

  /* Lock the page behind the mobile drawer and move focus into it. */
  useEffect(() => {
    if (!drawer) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawer]);

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  const openWithIntent = (id: string | undefined) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (!id) {
      setOpenMenu(null);
      return;
    }
    hoverTimer.current = setTimeout(() => setOpenMenu(id), 120);
  };

  const menu = openMenu ? MEGA_MENUS[openMenu] : undefined;

  return (
    <header className={`relative z-[60] ${variant === "over" ? "" : ""}`}>
      {/* ---------------------------------------------------- utility bar */}
      <div className="bg-onyx text-[11px] tracking-[0.08em] text-ivory/72">
        <div className="t-shell flex h-9 items-center justify-between gap-6">
          <div className="hidden items-center gap-6 lg:flex">
            <span>{d.utility.delivery}</span>
            <span aria-hidden className="h-3 w-px bg-brass/50" />
            <Link
              href={routes.consultation(locale)}
              className="border-b border-brass/35 pb-px text-brass no-underline"
            >
              {d.utility.consultation}
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
            <span className="hidden items-center gap-2 md:flex">
              <span aria-hidden className="t-diamond h-[5px] w-[5px]" />
              {d.utility.region}
            </span>

            {/* Language: preserves the current route, as the handoff requires */}
            <span className="flex items-center gap-2" aria-label={d.a11y.langSwitch}>
              <Link
                href={switchLocalePath(pathname, "en")}
                aria-current={locale === "en" ? "true" : undefined}
                className={`border-b no-underline ${
                  locale === "en" ? "border-brass text-ivory" : "border-transparent text-ivory/50"
                }`}
              >
                EN
              </Link>
              <span aria-hidden className="opacity-35">
                /
              </span>
              <Link
                href={switchLocalePath(pathname, "ar")}
                aria-current={locale === "ar" ? "true" : undefined}
                className={`border-b no-underline ${
                  locale === "ar" ? "border-brass text-ivory" : "border-transparent text-ivory/50"
                }`}
                style={{ fontFamily: "var(--font-arabic)" }}
              >
                العربية
              </Link>
            </span>

            {/* Currency */}
            <label className="hidden items-center gap-1.5 sm:flex">
              <span className="t-sr-only">{d.a11y.currencySwitch}</span>
              <select
                value={hydrated ? currency : "EGP"}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="cursor-pointer appearance-none border-0 bg-transparent pe-3 text-[11px] tracking-[0.08em] text-ivory/80 outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c} className="bg-onyx text-ivory">
                    {c}
                  </option>
                ))}
              </select>
              <span aria-hidden className="-ms-3 text-brass">
                ▾
              </span>
            </label>

            <Link href={routes.search(locale)} className="hidden items-center gap-2 text-ivory/80 no-underline hover:text-brass sm:flex">
              <span aria-hidden className="inline-block h-[11px] w-[11px] rounded-full border border-current" />
              {d.nav.search}
            </Link>
            <Link href={routes.account(locale)} className="hidden text-ivory/80 no-underline hover:text-brass md:inline">
              {d.nav.account}
            </Link>
            <Link href={routes.wishlist(locale)} className="hidden text-ivory/80 no-underline hover:text-brass md:inline">
              {d.nav.wishlist}
            </Link>
            <Link
              href={routes.cart(locale)}
              className="flex items-center gap-1.5 text-ivory no-underline hover:text-brass"
            >
              {d.nav.bag}
              <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-brass px-1 text-[9.5px] font-semibold text-onyx">
                {hydrated ? bagCount : 0}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- main bar */}
      <div
        className={`relative border-b ${
          variant === "over"
            ? "border-ivory/14 bg-transparent"
            : variant === "dark"
              ? "border-ivory/14 bg-onyx"
              : "border-ink/10 bg-ivory"
        } ${fg}`}
        onMouseLeave={() => openWithIntent(undefined)}
      >
        <div className="t-shell flex h-[72px] items-center gap-8 lg:h-[88px] xl:gap-14">
          <button
            type="button"
            aria-label={drawer ? d.nav.closeMenu : d.nav.openMenu}
            aria-expanded={drawer}
            onClick={() => setDrawer((v) => !v)}
            className="flex h-11 w-11 flex-none cursor-pointer items-center justify-center border-0 bg-transparent text-[17px] xl:hidden"
          >
            {drawer ? "×" : "☰"}
          </button>

          <Link
            href={routes.home(locale)}
            className="flex flex-none items-center gap-3.5 text-inherit no-underline"
          >
            <StarMark className="hidden sm:block" />
            <Wordmark size="lg" />
          </Link>

          <nav
            aria-label={d.a11y.mainNav}
            className="hidden items-center gap-7 text-[12px] uppercase tracking-[0.13em] xl:flex"
          >
            {PRIMARY_NAV.map((item) => {
              const active = openMenu === item.menu && Boolean(item.menu);
              return (
                <Link
                  key={item.id}
                  href={item.href(locale)}
                  onMouseEnter={() => openWithIntent(item.menu)}
                  onFocus={() => setOpenMenu(item.menu ?? null)}
                  className={`relative whitespace-nowrap pb-1.5 no-underline ${
                    active ? "text-brass" : "text-inherit"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {t(item.label)}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-[left_center] bg-brass transition-transform duration-[350ms] ease-[var(--ease-thurayya)] rtl:origin-[right_center]"
                    style={{ transform: `scaleX(${active ? 1 : 0})` }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-2 xl:hidden">
            <Link
              href={routes.search(locale)}
              aria-label={d.nav.search}
              className="flex h-11 w-11 items-center justify-center text-inherit no-underline"
            >
              <span aria-hidden className="inline-block h-[13px] w-[13px] rounded-full border border-current" />
            </Link>
          </div>
        </div>

        {/* ------------------------------------------------- mega menu */}
        {menu ? (
          <div className="absolute inset-x-0 top-full hidden border-t border-ink/8 bg-ivory text-ink shadow-[0_24px_48px_-28px_rgb(22_24_25_/_0.28)] xl:block">
            <div className="t-shell grid grid-cols-[1fr_1fr_1fr_360px] gap-12 pb-13 pt-11">
              {menu.columns.map((col) => (
                <div key={col.title.en} className="flex flex-col gap-3.5">
                  <div className="t-label text-brass">{t(col.title)}</div>
                  {col.items.map((li) => (
                    <Link
                      key={li.label.en}
                      href={li.href(locale)}
                      className="text-[19px] text-ink no-underline hover:text-brass"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t(li.label)}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="flex flex-col gap-3.5">
                <div className="h-[230px] bg-surface-3">
                  <ShotSlot label={menu.shot} src={menu.shotSrc} tone={3} sizes="360px" />
                </div>
                <div className="text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
                  {t(menu.feature)}
                </div>
                <Link href={menu.featureHref(locale)} className="t-link self-start">
                  {d.nav.discover}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* ---------------------------------------------------- mobile drawer */}
      {drawer ? (
        <div className="fixed inset-0 z-[150] xl:hidden">
          <button
            type="button"
            aria-label={d.nav.closeMenu}
            onClick={() => setDrawer(false)}
            className="absolute inset-0 cursor-default border-0 bg-onyx/60 p-0"
          />
          <div
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={d.nav.menu}
            className="absolute inset-y-0 start-0 flex w-[86%] max-w-[420px] flex-col overflow-y-auto bg-ivory outline-none"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <Wordmark size="md" />
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label={d.nav.closeMenu}
                className="h-11 w-11 cursor-pointer border-0 bg-transparent text-[18px]"
              >
                ×
              </button>
            </div>

            <nav aria-label={d.a11y.mainNav} className="flex flex-col px-5 py-2">
              {PRIMARY_NAV.map((item) => {
                const sub = item.menu ? MEGA_MENUS[item.menu] : undefined;
                const open = drawerSection === item.id;
                return (
                  <div key={item.id} className="border-b border-ink/8">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href(locale)}
                        className="flex-1 py-4 text-[20px] text-ink no-underline"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {t(item.label)}
                      </Link>
                      {sub ? (
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-label={t(item.label)}
                          onClick={() => setDrawerSection(open ? null : item.id)}
                          className="h-11 w-11 cursor-pointer border-0 bg-transparent text-[16px] text-brass"
                        >
                          {open ? "−" : "+"}
                        </button>
                      ) : null}
                    </div>
                    {sub && open ? (
                      <div className="flex flex-col gap-5 pb-5">
                        {sub.columns.map((col) => (
                          <div key={col.title.en} className="flex flex-col gap-2">
                            <span className="t-label text-brass">{t(col.title)}</span>
                            {col.items.map((li) => (
                              <Link
                                key={li.label.en}
                                href={li.href(locale)}
                                className="py-1 text-[14px] text-body no-underline"
                              >
                                {t(li.label)}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t border-ink/10 px-5 py-6">
              <Link href={routes.account(locale)} className="text-[13px] text-ink no-underline">
                {d.nav.account}
              </Link>
              <Link href={routes.wishlist(locale)} className="text-[13px] text-ink no-underline">
                {d.nav.wishlist}
              </Link>
              <Link href={routes.consultation(locale)} className="text-[13px] text-brass no-underline">
                {d.common.bookConsultation}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
