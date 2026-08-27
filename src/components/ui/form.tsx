"use client";

import { useId, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { useLocale } from "@/lib/i18n/provider";

/* ----------------------------------------------------------------- field */

export function Field({
  label,
  hint,
  error,
  children,
  className = "",
  dark = false,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: (id: string) => ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const id = useId();
  return (
    <div className={`t-field ${className}`}>
      <label
        htmlFor={id}
        className={`t-label ${error ? "text-danger" : dark ? "text-ivory/50" : ""}`}
      >
        {label}
      </label>
      {children(id)}
      {error ? (
        <span className="text-[10.5px] text-danger">{error}</span>
      ) : hint ? (
        <span className={`text-[10.5px] ${dark ? "text-ivory/45" : "text-muted"}`}>{hint}</span>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  dark = false,
  className = "",
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
  dark?: boolean;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field label={label} hint={hint} error={error} dark={dark} className={className}>
      {(id) => (
        <input
          id={id}
          className={`t-input ${dark ? "t-input--dark" : ""}`}
          aria-invalid={error ? true : undefined}
          {...props}
        />
      )}
    </Field>
  );
}

export function TextAreaField({
  label,
  hint,
  className = "",
  ...props
}: {
  label: string;
  hint?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Field label={label} hint={hint} className={className}>
      {(id) => <textarea id={id} className="t-textarea" {...props} />}
    </Field>
  );
}

export function SelectField({
  label,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <Field label={label} className={className}>
      {(id) => (
        <div className="relative">
          <select
            id={id}
            className="t-select pe-6"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-brass"
          >
            ▾
          </span>
        </div>
      )}
    </Field>
  );
}

/* ------------------------------------------------------------ check/radio */

export function CheckRow({
  checked,
  onChange,
  children,
  dark = false,
  className = "",
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3 border-0 bg-transparent p-0 text-start text-[12.5px] leading-relaxed ${
        dark ? "text-ivory/75" : "text-body"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`mt-[3px] flex h-[15px] w-[15px] flex-none items-center justify-center border transition-colors ${
          checked
            ? "border-brass bg-brass text-onyx"
            : dark
              ? "border-ivory/30"
              : "border-ink/30"
        }`}
      >
        {checked ? <span className="text-[9px] leading-none">✓</span> : null}
      </span>
      <span>{children}</span>
    </button>
  );
}

export function RadioRow({
  checked,
  onChange,
  children,
  className = "",
}: {
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onChange}
      className={`flex w-full items-start gap-3.5 border-0 bg-transparent p-0 text-start ${className}`}
    >
      <span
        aria-hidden
        className={`mt-[3px] flex h-[15px] w-[15px] flex-none rounded-full border p-[3px] ${
          checked ? "border-brass" : "border-ink/30"
        }`}
      >
        {checked ? <span className="flex-1 rounded-full bg-brass" /> : null}
      </span>
      <span className="flex-1">{children}</span>
    </button>
  );
}

/* -------------------------------------------------------- quantity stepper */

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  compact = false,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  compact?: boolean;
}) {
  const { d } = useLocale();
  const size = compact ? "h-[34px] w-[34px]" : "h-[42px] w-[42px]";
  return (
    <div className="inline-flex items-center border border-ink/20">
      <button
        type="button"
        aria-label={d.cart.decrease}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${size} cursor-pointer border-0 bg-transparent text-[15px] leading-none`}
      >
        −
      </button>
      <span className="min-w-[32px] text-center text-[13px]" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={d.cart.increase}
        onClick={() => onChange(value + 1)}
        className={`${size} cursor-pointer border-0 bg-transparent text-[15px] leading-none`}
      >
        +
      </button>
    </div>
  );
}

/* ------------------------------------------------------------- newsletter */

export function InlineSubmit({
  placeholder,
  cta,
  done,
  onSubmit,
  dark = false,
}: {
  placeholder: string;
  cta: string;
  done: string;
  onSubmit?: (value: string) => void;
  dark?: boolean;
}) {
  const id = useId();
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.currentTarget.elements.namedItem(id) as HTMLInputElement | null)?.value ?? "";
        onSubmit?.(input);
        e.currentTarget.reset();
        const status = e.currentTarget.querySelector("[data-status]");
        if (status) status.textContent = done;
      }}
    >
      <div
        className={`flex items-center border-b ${dark ? "border-ivory/35" : "border-ink/30"}`}
      >
        <label htmlFor={id} className="t-sr-only">
          {placeholder}
        </label>
        <input
          id={id}
          name={id}
          type="email"
          required
          placeholder={placeholder}
          className={`flex-1 border-0 bg-transparent py-3.5 text-[14px] outline-none ${
            dark ? "text-ivory" : "text-ink"
          }`}
        />
        <button
          type="submit"
          className="cursor-pointer border-0 bg-transparent px-1 text-[11px] uppercase tracking-[0.18em] text-brass"
        >
          {cta}
        </button>
      </div>
      <span
        data-status
        role="status"
        className={`mt-3 block text-[11.5px] ${dark ? "text-ivory/60" : "text-muted"}`}
      />
    </form>
  );
}
