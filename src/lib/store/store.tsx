"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Currency, Localized } from "@/lib/types";
import { CURRENCIES } from "@/lib/format";
import { STARTING_CART, PROMO_CODES, getProduct } from "@/lib/mock";

/* ==========================================================================
   Shape
   ========================================================================== */

export interface BagLine {
  /** slug + variant, so the same piece in two finishes is two lines. */
  key: string;
  slug: string;
  qty: number;
  variant: Localized;
  /** EGP, captured at the time it was added. */
  unitPrice: number;
}

interface StoreValue {
  hydrated: boolean;

  currency: Currency;
  setCurrency: (c: Currency) => void;

  bag: BagLine[];
  bagCount: number;
  bagSubtotal: number;
  addToBag: (input: { slug: string; variant: Localized; unitPrice: number; qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearBag: () => void;

  giftWrap: boolean;
  setGiftWrap: (on: boolean) => void;
  installation: boolean;
  setInstallation: (on: boolean) => void;

  promo: string | null;
  promoRate: number;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;

  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  inWishlist: (slug: string) => boolean;

  recentlyViewed: string[];
  markViewed: (slug: string) => void;

  toast: { title: string; href?: string; linkLabel?: string } | null;
  showToast: (t: { title: string; href?: string; linkLabel?: string }) => void;
  dismissToast: () => void;

  /** Kept in the store so the header search and the /search page agree. */
  recentSearches: string[];
  pushSearch: (q: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const KEY = "thurayya.store.v1";

interface Persisted {
  currency: Currency;
  bag: BagLine[];
  wishlist: string[];
  recentlyViewed: string[];
  giftWrap: boolean;
  installation: boolean;
  promo: string | null;
  recentSearches: string[];
}

function seedBag(): BagLine[] {
  return STARTING_CART.map((line) => {
    const product = getProduct(line.slug);
    return {
      key: `${line.slug}::default`,
      slug: line.slug,
      qty: line.qty,
      variant: line.variant,
      unitPrice: product?.price ?? 0,
    };
  });
}

function readPersisted(): Partial<Persisted> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<Persisted>) : null;
  } catch {
    /* Private mode, blocked storage, corrupt JSON - fall back to defaults. */
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>("EGP");
  const [bag, setBag] = useState<BagLine[]>(seedBag);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [giftWrap, setGiftWrap] = useState(true);
  const [installation, setInstallation] = useState(false);
  const [promo, setPromo] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [toast, setToast] = useState<StoreValue["toast"]>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Read persisted state after mount so server and first client render match. */
  useEffect(() => {
    const saved = readPersisted();
    if (saved) {
      if (saved.currency && CURRENCIES.includes(saved.currency)) setCurrencyState(saved.currency);
      if (Array.isArray(saved.bag)) setBag(saved.bag);
      if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist);
      if (Array.isArray(saved.recentlyViewed)) setRecentlyViewed(saved.recentlyViewed);
      if (typeof saved.giftWrap === "boolean") setGiftWrap(saved.giftWrap);
      if (typeof saved.installation === "boolean") setInstallation(saved.installation);
      if (typeof saved.promo === "string" || saved.promo === null) setPromo(saved.promo ?? null);
      if (Array.isArray(saved.recentSearches)) setRecentSearches(saved.recentSearches);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    const payload: Persisted = {
      currency,
      bag,
      wishlist,
      recentlyViewed,
      giftWrap,
      installation,
      promo,
      recentSearches,
    };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(payload));
    } catch {
      /* Storage full or blocked - the session still works, it just will not persist. */
    }
  }, [hydrated, currency, bag, wishlist, recentlyViewed, giftWrap, installation, promo, recentSearches]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const showToast = useCallback((t: { title: string; href?: string; linkLabel?: string }) => {
    setToast(t);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addToBag = useCallback<StoreValue["addToBag"]>(
    ({ slug, variant, unitPrice, qty = 1 }) => {
      const key = `${slug}::${variant.en}`;
      setBag((current) => {
        const existing = current.find((l) => l.key === key);
        if (existing) {
          return current.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
        }
        return [...current, { key, slug, qty, variant, unitPrice }];
      });
    },
    [],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setBag((current) =>
      qty <= 0
        ? current.filter((l) => l.key !== key)
        : current.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setBag((current) => current.filter((l) => l.key !== key));
  }, []);

  const clearBag = useCallback(() => setBag([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );
  }, []);

  const markViewed = useCallback((slug: string) => {
    setRecentlyViewed((current) => [slug, ...current.filter((s) => s !== slug)].slice(0, 8));
  }, []);

  const pushSearch = useCallback((q: string) => {
    const term = q.trim();
    if (!term) return;
    setRecentSearches((current) => [term, ...current.filter((s) => s !== term)].slice(0, 6));
  }, []);

  const applyPromo = useCallback((code: string) => {
    const normalised = code.trim().toUpperCase();
    if (normalised in PROMO_CODES) {
      setPromo(normalised);
      return true;
    }
    return false;
  }, []);

  const value = useMemo<StoreValue>(() => {
    const bagCount = bag.reduce((sum, l) => sum + l.qty, 0);
    const bagSubtotal = bag.reduce((sum, l) => sum + l.qty * l.unitPrice, 0);
    return {
      hydrated,
      currency,
      setCurrency: setCurrencyState,
      bag,
      bagCount,
      bagSubtotal,
      addToBag,
      setQty,
      removeLine,
      clearBag,
      giftWrap,
      setGiftWrap,
      installation,
      setInstallation,
      promo,
      promoRate: promo ? (PROMO_CODES[promo] ?? 0) : 0,
      applyPromo,
      clearPromo: () => setPromo(null),
      wishlist,
      toggleWishlist,
      inWishlist: (slug: string) => wishlist.includes(slug),
      recentlyViewed,
      markViewed,
      toast,
      showToast,
      dismissToast: () => setToast(null),
      recentSearches,
      pushSearch,
    };
  }, [
    hydrated,
    currency,
    bag,
    giftWrap,
    installation,
    promo,
    wishlist,
    recentlyViewed,
    toast,
    recentSearches,
    addToBag,
    setQty,
    removeLine,
    clearBag,
    toggleWishlist,
    markViewed,
    showToast,
    pushSearch,
    applyPromo,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
