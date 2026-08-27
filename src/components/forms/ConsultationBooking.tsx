"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/provider";
import {
  CONSULTATION_DAYS,
  CONSULTATION_FORMATS,
  CONSULTATION_MONTH,
  CONSULTATION_SERVICES,
  CONSULTATION_TIMES,
  PROJECT_TYPES,
  ROOM_COUNTS,
  TIMELINES,
} from "@/lib/mock";
import { SelectField, TextField } from "@/components/ui/form";
import { Eyebrow } from "@/components/ui/primitives";

export function ConsultationBooking() {
  const { d, t, locale } = useLocale();

  const [service, setService] = useState(CONSULTATION_SERVICES[0].id);
  const [format, setFormat] = useState(CONSULTATION_FORMATS[0].id);
  const [day, setDay] = useState("wed-16");
  const [time, setTime] = useState("1130");
  const [projectType, setProjectType] = useState(t(PROJECT_TYPES[1]));
  const [rooms, setRooms] = useState(t(ROOM_COUNTS[1]));
  const [timeline, setTimeline] = useState(t(TIMELINES[1]));
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = CONSULTATION_SERVICES.find((s) => s.id === service);
  const selectedFormat = CONSULTATION_FORMATS.find((f) => f.id === format);
  const selectedDay = CONSULTATION_DAYS.find((x) => x.id === day);
  const selectedTime = CONSULTATION_TIMES.find((x) => x.id === time);

  const dateLabel = selectedDay
    ? `${t(selectedDay.dow)} ${locale === "ar" ? selectedDay.dayAr : selectedDay.day} ${t(
        CONSULTATION_MONTH,
      )}`
    : "";

  return (
    <div className="t-shell grid items-start gap-14 pb-28 pt-14 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px]">
      <div className="flex flex-col gap-11">
        <header className="flex flex-col gap-4.5">
          <Eyebrow>{d.consultation.kicker}</Eyebrow>
          <h1 className="t-display max-w-[600px] text-[40px] leading-[1.05] sm:text-[56px]">
            {d.consultation.title}
          </h1>
          <p className="max-w-[520px] text-[14.5px] leading-relaxed text-body">
            {d.consultation.lede}
          </p>
        </header>

        {/* 01 service */}
        <section className="flex flex-col gap-4.5">
          <Eyebrow>{d.consultation.step1}</Eyebrow>
          <div className="grid gap-3.5 sm:grid-cols-2" role="radiogroup" aria-label={d.consultation.service}>
            {CONSULTATION_SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={service === s.id}
                onClick={() => setService(s.id)}
                className={`flex cursor-pointer flex-col gap-2 border p-5 text-start ${
                  service === s.id ? "border-ink bg-ink/4" : "border-ink/20 bg-transparent"
                }`}
              >
                <span className="text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
                  {t(s.name)}
                </span>
                <span className="text-[12px] text-muted">{t(s.meta)}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 02 where */}
        <section className="flex flex-col gap-4.5">
          <Eyebrow>{d.consultation.step2}</Eyebrow>
          <div className="flex flex-wrap gap-3.5" role="radiogroup" aria-label={d.consultation.format}>
            {CONSULTATION_FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={format === f.id}
                onClick={() => setFormat(f.id)}
                className={`cursor-pointer border px-5 py-3.5 text-[12px] uppercase tracking-[0.1em] ${
                  format === f.id ? "border-ink text-ink" : "border-ink/20 text-body"
                }`}
              >
                {t(f.label)}
              </button>
            ))}
          </div>
        </section>

        {/* 03 when */}
        <section className="flex flex-col gap-4.5">
          <Eyebrow>{d.consultation.step3}</Eyebrow>
          <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7">
            {CONSULTATION_DAYS.map((x) => {
              const selected = day === x.id;
              return (
                <button
                  key={x.id}
                  type="button"
                  disabled={!x.available}
                  aria-pressed={selected}
                  onClick={() => setDay(x.id)}
                  className={`flex flex-col items-center gap-1.5 border px-2 py-3.5 text-center ${
                    selected
                      ? "border-ink bg-onyx text-ivory"
                      : x.available
                        ? "cursor-pointer border-ink/15 bg-transparent"
                        : "cursor-not-allowed border-ink/15 text-ink/25"
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase tracking-[0.1em] ${
                      selected ? "text-brass" : x.available ? "text-muted" : ""
                    }`}
                  >
                    {t(x.dow)}
                  </span>
                  <span className="text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
                    {locale === "ar" ? x.dayAr : x.day}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CONSULTATION_TIMES.map((x) => {
              const selected = time === x.id;
              return (
                <button
                  key={x.id}
                  type="button"
                  disabled={!x.available}
                  aria-pressed={selected}
                  onClick={() => setTime(x.id)}
                  className={`border px-4.5 py-3 text-[12px] ${
                    selected
                      ? "border-brass bg-brass/12 text-ink"
                      : x.available
                        ? "cursor-pointer border-ink/20 text-body"
                        : "cursor-not-allowed border-ink/10 text-ink/25 line-through"
                  }`}
                >
                  {t(x.label)}
                  {!x.available ? (
                    <span className="t-sr-only"> — {d.consultation.unavailable}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>

        {/* 04 project */}
        <section className="flex flex-col gap-4.5">
          <Eyebrow>{d.consultation.step4}</Eyebrow>
          <div className="grid gap-6 sm:grid-cols-3">
            <SelectField
              label={d.custom.projectType}
              value={projectType}
              onChange={setProjectType}
              options={PROJECT_TYPES.map((x) => t(x))}
            />
            <SelectField
              label={d.consultation.rooms}
              value={rooms}
              onChange={setRooms}
              options={ROOM_COUNTS.map((x) => t(x))}
            />
            <SelectField
              label={d.consultation.timeline}
              value={timeline}
              onChange={setTimeline}
              options={TIMELINES.map((x) => t(x))}
            />
          </div>
          <div className="border border-dashed border-ink/28 px-6 py-6 text-center text-[12.5px] text-body">
            {d.consultation.upload}
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------- aside */}
      <aside className="flex flex-col gap-5 bg-onyx p-8 text-ivory lg:sticky lg:top-[70px]">
        <span className="t-label text-brass">{d.consultation.yourAppointment}</span>
        <dl className="m-0 flex flex-col gap-3.5 text-[13px]">
          <Row label={d.consultation.service} value={selectedService ? t(selectedService.name) : ""} />
          <Row label={d.consultation.format} value={selectedFormat ? t(selectedFormat.label) : ""} />
          <Row label={d.consultation.date} value={dateLabel} />
          <Row label={d.consultation.time} value={selectedTime ? t(selectedTime.label) : ""} />
          <Row label={d.consultation.designer} value={d.consultation.designerTbc} />
        </dl>
        <hr className="t-rule t-rule--dark" />
        <div className="flex flex-col gap-3.5">
          <TextField dark label={d.common.fullName} placeholder="Layla Hassan" />
          <TextField dark label={d.common.email} type="email" placeholder="you@email.com" />
        </div>
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="t-btn t-btn--brass w-full"
        >
          {d.consultation.confirm}
        </button>

        {confirmed ? (
          <div
            role="status"
            className="t-screen flex flex-col gap-2.5 border border-ivory/18 p-5"
          >
            <span className="t-mono text-brass">{d.consultation.confirmedTitle}</span>
            <span className="text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
              {dateLabel} · {selectedTime ? t(selectedTime.label) : ""}
            </span>
            <span className="text-[12px] leading-relaxed text-ivory/60">
              {d.consultation.confirmedBody}
            </span>
            <div className="mt-1.5 flex flex-wrap gap-2.5">
              <span className="border border-ivory/30 px-3 py-2 text-[10px] uppercase tracking-[0.14em]">
                {d.consultation.addToCalendar}
              </span>
              <button
                type="button"
                onClick={() => setConfirmed(false)}
                className="cursor-pointer border border-ivory/30 bg-transparent px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-ivory"
              >
                {d.consultation.reschedule}
              </button>
            </div>
          </div>
        ) : null}

        <p className="text-[11px] leading-relaxed text-ivory/40">{d.common.mockNotice}</p>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ivory/55">{label}</dt>
      <dd className="m-0 text-end">{value}</dd>
    </div>
  );
}
