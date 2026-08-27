"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/provider";
import {
  BUDGET_BANDS,
  CONTACT_SUBJECTS,
  DISCIPLINES,
  PROJECT_TYPES,
  SPEND_BANDS,
} from "@/lib/mock";
import { CheckRow, SelectField, TextAreaField, TextField } from "@/components/ui/form";

/* ==========================================================================
   Custom & Projects enquiry
   ========================================================================== */

export function CustomProjectForm() {
  const { d, t } = useLocale();
  const [projectType, setProjectType] = useState(t(PROJECT_TYPES[3]));
  const [budget, setBudget] = useState(t(BUDGET_BANDS[2]));
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h2 className="t-display text-[32px] sm:text-[38px]">{d.custom.formTitle}</h2>
      <p className="max-w-[520px] text-[14px] leading-relaxed text-body">{d.custom.formLede}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label={d.common.fullName} placeholder="Layla Hassan" required />
        <TextField label={d.common.company} placeholder={d.common.optional} />
        <TextField label={d.common.email} type="email" placeholder="you@studio.com" required />
        <TextField label={d.common.phone} type="tel" placeholder="+20" />
        <SelectField
          label={d.custom.projectType}
          value={projectType}
          onChange={setProjectType}
          options={PROJECT_TYPES.map((x) => t(x))}
        />
        <SelectField
          label={d.custom.budget}
          value={budget}
          onChange={setBudget}
          options={BUDGET_BANDS.map((x) => t(x))}
        />
      </div>

      <TextAreaField label={d.custom.aboutSpace} placeholder={d.custom.aboutSpacePlaceholder} />

      <div className="flex flex-col items-center gap-2 border border-dashed border-ink/28 px-6 py-7 text-center">
        <span aria-hidden className="h-[22px] w-[22px] rotate-45 border border-brass" />
        <span className="mt-2 text-[12.5px] text-body">{d.custom.dropFiles}</span>
        <span className="text-[11px] text-muted">{d.custom.dropFormats}</span>
      </div>

      <button type="submit" className="t-btn t-btn--primary self-start">
        {d.custom.submit}
      </button>

      {sent ? (
        <p role="status" className="t-screen text-[13px] text-brass">
          {d.custom.submitted}
        </p>
      ) : null}
      <p className="text-[11px] text-muted">{d.common.mockNotice}</p>
    </form>
  );
}

/* ==========================================================================
   Trade account application
   ========================================================================== */

export function TradeApplicationForm() {
  const { d, t } = useLocale();
  const [discipline, setDiscipline] = useState(t(DISCIPLINES[0]));
  const [spend, setSpend] = useState(t(SPEND_BANDS[2]));
  const [consent, setConsent] = useState(true);
  const [sent, setSent] = useState(false);

  return (
    <form
      className="t-panel flex flex-col gap-6 p-8 sm:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h2 className="t-display text-[28px] sm:text-[34px]">{d.trade.applicationTitle}</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label={d.trade.studio} required />
        <TextField label={d.trade.taxNo} />
        <SelectField
          label={d.trade.discipline}
          value={discipline}
          onChange={setDiscipline}
          options={DISCIPLINES.map((x) => t(x))}
        />
        <SelectField
          label={d.trade.spend}
          value={spend}
          onChange={setSpend}
          options={SPEND_BANDS.map((x) => t(x))}
        />
        <TextField label={d.common.email} type="email" required />
        <TextField label={d.trade.portfolio} placeholder="studio.com" />
      </div>

      <CheckRow checked={consent} onChange={setConsent}>
        {d.trade.consent}
      </CheckRow>

      <button type="submit" className="t-btn t-btn--primary self-start">
        {d.trade.submit}
      </button>
      <span className="text-[11.5px] text-muted">{d.trade.reviewNote}</span>
      {sent ? (
        <p role="status" className="t-screen text-[13px] text-brass">
          {d.trade.submitted}
        </p>
      ) : null}
    </form>
  );
}

/* ==========================================================================
   Contact the studio
   ========================================================================== */

export function ContactForm() {
  const { d, t } = useLocale();
  const [subject, setSubject] = useState(t(CONTACT_SUBJECTS[0]));
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label={d.common.fullName} required />
        <TextField label={d.common.email} type="email" required />
        <SelectField
          className="sm:col-span-2"
          label={d.showrooms.subject}
          value={subject}
          onChange={setSubject}
          options={CONTACT_SUBJECTS.map((x) => t(x))}
        />
      </div>
      <TextAreaField label={d.common.message} />
      <button type="submit" className="t-btn t-btn--primary self-start">
        {d.common.send}
      </button>
      {sent ? (
        <p role="status" className="t-screen text-[13px] text-brass">
          {d.showrooms.sent}
        </p>
      ) : null}
    </form>
  );
}

/* ==========================================================================
   Track order
   ========================================================================== */

export function TrackOrderForm({
  onLookup,
}: {
  onLookup: (reference: string) => void;
}) {
  const { d } = useLocale();
  const [value, setValue] = useState("");
  return (
    <form
      className="flex w-full max-w-[420px] flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onLookup(value);
      }}
    >
      <label className="t-label" htmlFor="order-ref">
        {d.support.trackTitle}
      </label>
      <div className="flex border border-ink/20">
        <input
          id="order-ref"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={d.support.trackPlaceholder}
          className="flex-1 border-0 bg-transparent px-3.5 py-3 text-[13px] outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer border-0 bg-onyx px-5 text-[10.5px] uppercase tracking-[0.14em] text-ivory"
        >
          {d.support.trackCta}
        </button>
      </div>
    </form>
  );
}
