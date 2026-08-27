"use client";

import { useState, type ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  body: ReactNode;
}

/**
 * Single-open accordion, as specified in the design handoff.
 * Pass `multi` for the PLP filter sidebar, which keeps several groups open.
 */
export function Accordion({
  items,
  defaultOpen,
  multi = false,
  dark = false,
  className = "",
}: {
  items: AccordionItem[];
  defaultOpen?: string | string[];
  multi?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>(() => {
    if (Array.isArray(defaultOpen)) return defaultOpen;
    if (typeof defaultOpen === "string") return [defaultOpen];
    return [];
  });

  const toggle = (id: string) => {
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      return multi ? [...current, id] : [id];
    });
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div
            key={item.id}
            className={`border-t ${dark ? "border-ivory/12" : "border-ink/12"}`}
          >
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-0 py-4 text-start text-[12px] uppercase tracking-[0.1em] ${
                  dark ? "text-ivory" : "text-ink"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.title}
                <span aria-hidden className="text-[15px] leading-none text-brass">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div id={`panel-${item.id}`} className="pb-5">
                {item.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
