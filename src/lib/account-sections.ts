/**
 * Shared by the server route (`generateStaticParams`) and the client view, so
 * it must not live in a `"use client"` module — client exports reach server
 * code as references, not values.
 */
export const ACCOUNT_SECTIONS = [
  "dashboard",
  "orders",
  "wishlist",
  "rooms",
  "addresses",
  "consultations",
  "trade",
  "profile",
  "preferences",
] as const;

export type AccountSection = (typeof ACCOUNT_SECTIONS)[number];
