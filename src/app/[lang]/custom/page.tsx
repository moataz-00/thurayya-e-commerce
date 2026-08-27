import type { Metadata } from "next";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { SITE_IMAGES } from "@/lib/images";
import { CUSTOMISATION_OPTIONS, CUSTOM_FAQS, PROCESS, PROJECT_SHOTS } from "@/lib/mock";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { CustomProjectForm } from "@/components/forms/ProjectForms";
import { Eyebrow, SectionHead } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.custom.kicker, description: d.custom.lede };
}

export default async function CustomPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <div className="t-screen bg-ivory text-ink">
      {/* ============================================================== hero */}
      <section className="relative overflow-hidden bg-onyx">
        <div className="absolute inset-0 opacity-[0.45]">
          <ShotSlot
            dark
            showLabel={false}
            src={SITE_IMAGES.customHero}
            priority
            sizes="100vw"
            label={{
              en: "project hero — hotel lobby installation, 2400x1200",
              ar: "الصورة الرئيسية — تركيب في بهو فندق",
            }}
          />
        </div>
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgb(22 24 25 / 0.62), rgb(22 24 25 / 0.42) 45%, rgb(22 24 25 / 0.78))" }}
        />

        <Header variant="over" />

        <div className="t-shell relative grid items-end gap-12 pb-24 pt-24 text-ivory lg:grid-cols-[1fr_380px] lg:gap-18 lg:pb-30 lg:pt-32">
          <div className="flex flex-col gap-6">
            <Eyebrow>{d.custom.kicker}</Eyebrow>
            <h1 className="t-display max-w-[700px] text-[42px] leading-[1.02] sm:text-[58px] lg:text-[74px]">
              {d.custom.title}
            </h1>
            <p className="max-w-[500px] text-[15px] leading-[1.85] text-ivory/72 sm:text-[16px]">
              {d.custom.lede}
            </p>
          </div>
          <div className="flex flex-col gap-3.5 border-s border-brass/50 ps-6 text-[12.5px] leading-[1.9] text-ivory/65">
            <span>{d.custom.stat1}</span>
            <span>{d.custom.stat2}</span>
            <span>{d.custom.stat3}</span>
          </div>
        </div>
      </section>

      {/* ========================================================== projects */}
      <section className="t-shell py-20 lg:py-24">
        <SectionHead
          title={d.custom.projectsTitle}
          action={<span className="text-[11.5px] text-muted">{d.custom.projectsNote}</span>}
        />
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="aspect-4/3 bg-surface-3">
            <ShotSlot tone={3} label={PROJECT_SHOTS[0]} src={SITE_IMAGES.projects[0]} sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="min-h-[180px] flex-1 bg-surface-2">
              <ShotSlot tone={2} label={PROJECT_SHOTS[1]} src={SITE_IMAGES.projects[1]} sizes="(max-width: 1024px) 100vw, 28vw" />
            </div>
            <div className="min-h-[180px] flex-1 bg-surface-4">
              <ShotSlot tone={4} label={PROJECT_SHOTS[2]} src={SITE_IMAGES.projects[2]} sizes="(max-width: 1024px) 100vw, 28vw" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="min-h-[180px] flex-1 bg-surface-4">
              <ShotSlot tone={4} label={PROJECT_SHOTS[3]} src={SITE_IMAGES.projects[3]} sizes="(max-width: 1024px) 100vw, 28vw" />
            </div>
            <div className="min-h-[180px] flex-1 bg-surface-2">
              <ShotSlot tone={2} label={PROJECT_SHOTS[4]} src={SITE_IMAGES.projects[4]} sizes="(max-width: 1024px) 100vw, 28vw" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================== process */}
      <section className="bg-onyx text-ivory">
        <div className="t-shell py-20 lg:py-24">
          <h2 className="t-display mb-12 text-[30px] sm:text-[38px]">{d.custom.processTitle}</h2>
          <ol className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((item) => (
              <li key={item.step.en} className="flex flex-col gap-3.5 border-t border-brass/55 pt-5">
                <span
                  className="text-[9.5px] uppercase tracking-[0.16em] text-brass"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {d.custom.step}
                </span>
                <span className="text-[26px]" style={{ fontFamily: "var(--font-display)" }}>
                  {item.step[locale]}
                </span>
                <span className="text-[12.5px] leading-[1.85] text-ivory/62">
                  {item.body[locale]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ====================================================== form + aside */}
      <section className="t-shell grid items-start gap-14 py-20 lg:grid-cols-2 lg:gap-18 lg:py-24">
        <CustomProjectForm />

        <div className="flex flex-col gap-11">
          <div className="t-panel flex flex-col gap-4.5 p-8">
            <Eyebrow>{d.custom.customisation}</Eyebrow>
            <div className="grid grid-cols-2 gap-3.5 text-[12.5px] leading-[1.8] text-body">
              {CUSTOMISATION_OPTIONS.map((option) => (
                <span key={option.en}>{option[locale]}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Eyebrow>{d.custom.clients}</Eyebrow>
            <div className="grid grid-cols-3 gap-3.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="flex h-16 items-center justify-center border border-ink/12 text-[9px] tracking-[0.1em] text-muted"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  LOGO
                </span>
              ))}
            </div>
          </div>

          <figure className="m-0 flex flex-col gap-3.5 border-t border-ink/14 pt-6">
            <blockquote
              className="m-0 text-[21px] italic leading-[1.5] sm:text-[23px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {locale === "ar"
                ? "«أعادوا رسم العنقود ثلاث مرات حتى استقر فوق بئر سلم بارتفاع أربعة أمتار. لم يعرض ذلك أحد غيرهم.»"
                : "“They redrew the cluster three times until it sat right over a 4-metre stairwell. Nobody else offered that.”"}
            </blockquote>
            <figcaption className="text-[10.5px] uppercase tracking-[0.14em] text-muted">
              {locale === "ar"
                ? "هالة م. — مهندسة ديكور، القاهرة"
                : "Hala M. — Interior Architect, Cairo"}
            </figcaption>
          </figure>

          <div className="flex flex-col">
            <Eyebrow className="mb-3.5">{d.custom.faq}</Eyebrow>
            {CUSTOM_FAQS.map((faq) => (
              <div key={faq.q.en} className="flex flex-col gap-2.5 border-t border-ink/12 py-4">
                <span className="text-[13.5px]">{faq.q[locale]}</span>
                <span className="text-[12.5px] leading-[1.85] text-body">{faq.a[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
