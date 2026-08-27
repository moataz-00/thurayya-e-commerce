"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes } from "@/lib/routes";
import {
  ADDRESSES,
  APPOINTMENTS,
  BOARDS,
  CUSTOMER,
  ORDERS,
  SAVED_ROOMS,
  getProducts,
  getRoom,
} from "@/lib/mock";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { Money } from "@/components/ui/Money";
import { CheckRow, TextField } from "@/components/ui/form";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Eyebrow, SectionHead, Wordmark } from "@/components/ui/primitives";
import { useState } from "react";
import { ACCOUNT_SECTIONS, type AccountSection } from "@/lib/account-sections";


export function AccountView({ section }: { section: AccountSection }) {
  const { locale, d, t } = useLocale();
  const { wishlist, hydrated } = useStore();

  const navLabels: Record<AccountSection, string> = {
    dashboard: d.account.nav.dashboard,
    orders: d.account.nav.orders,
    wishlist: d.account.nav.wishlist,
    rooms: d.account.nav.rooms,
    addresses: d.account.nav.addresses,
    consultations: d.account.nav.consultations,
    trade: d.account.nav.trade,
    profile: d.account.nav.profile,
    preferences: d.account.nav.preferences,
  };

  return (
    <div className="t-shell grid items-start gap-12 pb-24 pt-12 lg:grid-cols-[260px_1fr] lg:gap-16">
      {/* ----------------------------------------------------------- sidebar */}
      <aside className="flex flex-col gap-6 lg:sticky lg:top-[70px]">
        <div className="flex flex-col gap-1.5">
          <span className="text-[26px]" style={{ fontFamily: "var(--font-display)" }}>
            {locale === "ar" ? CUSTOMER.nameAr : CUSTOMER.name}
          </span>
          <span className="text-[11.5px] text-muted">
            {d.account.memberSince} {t(CUSTOMER.memberSince)}
          </span>
        </div>

        <nav aria-label={d.nav.account} className="flex flex-col">
          {ACCOUNT_SECTIONS.map((id) => (
            <Link
              key={id}
              href={id === "dashboard" ? routes.account(locale) : routes.accountSection(locale, id)}
              aria-current={section === id ? "page" : undefined}
              className={`flex items-center justify-between border-b border-ink/8 py-3 text-[12.5px] no-underline ${
                section === id ? "text-ink" : "text-body/80"
              }`}
            >
              {navLabels[id]}
              <span aria-hidden className="t-mirror text-brass">
                ›
              </span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="cursor-pointer self-start border-0 bg-transparent p-0 text-[11px] uppercase tracking-[0.14em] text-muted"
        >
          {d.account.signOut}
        </button>
      </aside>

      {/* ----------------------------------------------------------- content */}
      <div className="flex flex-col gap-14">
        {section === "dashboard" ? <Dashboard /> : null}
        {(section === "dashboard" || section === "orders") ? <Orders /> : null}
        {(section === "dashboard" || section === "wishlist") ? (
          <Wishlist wishlist={hydrated ? wishlist : []} />
        ) : null}
        {section === "rooms" ? <SavedRooms /> : null}
        {(section === "dashboard" || section === "addresses") ? <Addresses /> : null}
        {section === "consultations" ? <Consultations /> : null}
        {section === "trade" ? <TradeStatus /> : null}
        {(section === "profile" || section === "preferences") ? <Profile /> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ blocks */

function Dashboard() {
  const { locale, d, t } = useLocale();
  const order = ORDERS[0];
  const appointment = APPOINTMENTS[0];
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div className="t-panel flex flex-col gap-2 p-6">
        <span className="t-label">{d.account.openOrder}</span>
        <span className="text-[27px]" style={{ fontFamily: "var(--font-display)" }}>
          {t(order.statusLabel)}
        </span>
        <span className="text-[12px] text-body">
          {t(order.lines[0].title)} · {t(order.timeline[order.timeline.length - 1].date)}
        </span>
        <Link href={routes.track(locale)} className="t-link mt-2 self-start">
          {d.account.track}
        </Link>
      </div>

      <div className="t-panel flex flex-col gap-2 p-6">
        <span className="t-label">{d.account.nextAppointment}</span>
        <span className="text-[27px]" style={{ fontFamily: "var(--font-display)" }}>
          {t(appointment.date)}
        </span>
        <span className="text-[12px] text-body">
          {t(appointment.service)} · {t(appointment.format)}
        </span>
        <Link href={routes.consultation(locale)} className="t-link mt-2 self-start">
          {d.consultation.reschedule}
        </Link>
      </div>

      <div className="flex flex-col gap-2 bg-onyx p-6 text-ivory">
        <span className="t-label text-brass">{d.account.tradeStatus}</span>
        <span className="text-[27px]" style={{ fontFamily: "var(--font-display)" }}>
          {d.account.tradeUnderReview}
        </span>
        <span className="text-[12px] text-ivory/60">{d.account.tradeSubmitted}</span>
        <Link
          href={routes.trade(locale)}
          className="mt-2 self-start border-b border-brass pb-1 text-[10.5px] uppercase tracking-[0.16em] text-brass no-underline"
        >
          {d.nav.discover}
        </Link>
      </div>
    </div>
  );
}

function Orders() {
  const { locale, d, t } = useLocale();
  return (
    <section>
      <SectionHead
        size="sm"
        title={d.account.ordersTitle}
        action={
          <Link href={routes.track(locale)} className="t-link">
            {d.common.viewAll}
          </Link>
        }
      />
      <div className="border-t border-ink/12">
        {ORDERS.map((order) => (
          <div
            key={order.id}
            className="grid items-center gap-5 border-b border-ink/12 py-5 text-[12.5px] sm:grid-cols-[92px_1fr_140px_130px_100px]"
          >
            <div className="aspect-4/5 w-[76px] bg-surface-2 sm:w-auto">
              <ShotSlot tone={2} showLabel={false} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[19px]" style={{ fontFamily: "var(--font-display)" }}>
                {t(order.lines[0].title)}
              </span>
              <span className="text-muted">
                {order.reference} · {t(order.placedOn)}
              </span>
            </div>
            <Money amount={order.total} />
            <span className={order.status === "in-production" ? "text-brass" : "text-body"}>
              {t(order.statusLabel)}
            </span>
            <Link
              href={routes.track(locale)}
              className="border border-ink/25 px-3 py-2.5 text-center text-[10px] uppercase tracking-[0.14em] text-ink no-underline"
            >
              {t(order.action)}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Wishlist({ wishlist }: { wishlist: string[] }) {
  const { locale, d, t } = useLocale();
  const saved = getProducts(wishlist);
  return (
    <section>
      <SectionHead
        size="sm"
        title={d.account.wishlistTitle}
        action={
          <div className="flex gap-5 text-[11px] uppercase tracking-[0.14em]">
            <span className="text-muted">{d.account.share}</span>
            <span className="text-brass">{d.account.newBoard}</span>
          </div>
        }
      />
      <div className="mb-6 flex flex-wrap gap-3">
        {BOARDS.map((board, i) => (
          <span
            key={board.id}
            className={`border px-4.5 py-2.5 text-[11.5px] ${
              i === 0 ? "border-ink text-ink" : "border-ink/20 text-body"
            }`}
          >
            {t(board.name)} · {board.count}
          </span>
        ))}
      </div>
      {saved.length > 0 ? (
        <ProductGrid products={saved} columns={4} compact />
      ) : (
        <div className="flex flex-col items-start gap-4 border border-dashed border-ink/20 p-8">
          <p className="text-[13px] text-muted">{d.account.emptyWishlist}</p>
          <Link href={routes.lighting(locale)} className="t-btn t-btn--outline">
            {d.common.shopAll}
          </Link>
        </div>
      )}
    </section>
  );
}

function SavedRooms() {
  const { locale, d } = useLocale();
  return (
    <section>
      <SectionHead size="sm" title={d.account.savedRoomsTitle} />
      <div className="grid gap-5 sm:grid-cols-2">
        {SAVED_ROOMS.map((saved) => {
          const room = getRoom(saved.slug);
          if (!room) return null;
          return (
            <Link
              key={saved.slug}
              href={routes.room(locale, saved.slug)}
              className="flex flex-col gap-3 text-inherit no-underline"
            >
              <div className="aspect-16/11 bg-surface-3">
                <ShotSlot tone={3} label={room.tileShot} showLabel={false} />
              </div>
              <span className="text-[21px]" style={{ fontFamily: "var(--font-display)" }}>
                {room.name[locale]}
              </span>
              <span className="text-[11.5px] text-muted">{saved.savedOn[locale]}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Addresses() {
  const { d, t } = useLocale();
  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <div className="flex flex-col gap-5">
        <SectionHead size="sm" title={d.account.addressesTitle} className="mb-0" />
        {ADDRESSES.map((address) => (
          <div
            key={address.id}
            className="flex flex-col gap-2 border border-ink/15 p-6 text-[13px] leading-[1.8] text-body"
          >
            <span className="t-label text-brass">{t(address.label)}</span>
            <span className="text-ink">{address.name}</span>
            {address.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <span>{address.phone}</span>
          </div>
        ))}
        <div className="border border-dashed border-ink/25 p-6 text-center text-[12.5px] text-muted">
          {d.account.addAddress}
        </div>
      </div>
      <Profile compact />
    </section>
  );
}

function Consultations() {
  const { locale, d, t } = useLocale();
  return (
    <section>
      <SectionHead
        size="sm"
        title={d.account.consultationsTitle}
        action={
          <Link href={routes.consultation(locale)} className="t-link">
            {d.common.bookConsultation}
          </Link>
        }
      />
      <div className="border-t border-ink/12">
        {APPOINTMENTS.map((appointment) => (
          <div
            key={appointment.id}
            className="grid gap-4 border-b border-ink/12 py-5 text-[12.5px] sm:grid-cols-4"
          >
            <span className="text-[19px]" style={{ fontFamily: "var(--font-display)" }}>
              {t(appointment.service)}
            </span>
            <span className="text-body">{t(appointment.format)}</span>
            <span className="text-body">
              {t(appointment.date)} · {t(appointment.time)}
            </span>
            <span className={appointment.status === "confirmed" ? "text-brass" : "text-muted"}>
              {t(appointment.designer)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TradeStatus() {
  const { locale, d } = useLocale();
  return (
    <section className="flex flex-col gap-6">
      <SectionHead size="sm" title={d.account.tradeStatus} className="mb-0" />
      <div className="flex flex-col gap-3 bg-onyx p-8 text-ivory">
        <Eyebrow>{d.trade.kicker}</Eyebrow>
        <span className="text-[30px]" style={{ fontFamily: "var(--font-display)" }}>
          {d.account.tradeUnderReview}
        </span>
        <span className="text-[12.5px] text-ivory/60">{d.account.tradeSubmitted}</span>
        <span className="mt-2 text-[12.5px] leading-relaxed text-ivory/60">
          {d.trade.reviewNote}
        </span>
        <Link href={routes.trade(locale)} className="t-btn t-btn--ghost mt-3 self-start">
          {d.trade.downloads}
        </Link>
      </div>
    </section>
  );
}

function Profile({ compact = false }: { compact?: boolean }) {
  const { d } = useLocale();
  const [prefs, setPrefs] = useState([true, false, false]);
  const labels = [d.account.pref1, d.account.pref2, d.account.pref3];

  return (
    <section className="flex flex-col gap-5">
      {!compact ? <SectionHead size="sm" title={d.account.signInTitle} className="mb-0" /> : null}
      <div className="flex flex-col gap-4 border border-ink/15 p-6">
        {compact ? <Wordmark size="sm" className="mb-2" /> : null}
        <TextField label={d.common.email} defaultValue={CUSTOMER.email} type="email" />
        <TextField label={d.account.password} defaultValue="••••••••••" type="password" />
        <div className="mt-1.5 flex flex-wrap gap-3.5">
          <button type="button" className="t-btn t-btn--primary">
            {d.checkout.signIn}
          </button>
          <button type="button" className="t-btn t-btn--outline">
            {d.account.createAccount}
          </button>
        </div>
        <span className="text-[11.5px] text-brass">{d.account.forgot}</span>
      </div>

      <div className="flex flex-col gap-3 border border-ink/15 p-6">
        <span className="t-label">{d.account.prefsTitle}</span>
        {labels.map((label, i) => (
          <CheckRow
            key={label}
            checked={prefs[i]}
            onChange={(next) =>
              setPrefs((current) => current.map((v, index) => (index === i ? next : v)))
            }
          >
            {label}
          </CheckRow>
        ))}
      </div>
    </section>
  );
}
