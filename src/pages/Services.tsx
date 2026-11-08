import { useState } from "react";
import { cn } from "@/utils/cn";
import heroSuite from "@/assets/hero-suite.jpg";
import clinicSuite from "@/assets/clinic-suite.jpg";
import sterilizationImg from "@/assets/clinic-sterilization.jpg";
import { WHATSAPP_URL, FINANCE_PARTNERS } from "@/data/clinic";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, GoldButton, GoldGlow, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

function scrollToCatalog() {
  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
}

/* ================= HERO ================= */
function ServicesHero({ onBook }: { onBook: () => void }) {
  const { t } = useI18n();
  const a = t.servicesPage.hero;

  return (
    <section id="top" className="relative overflow-hidden bg-primary-950 pt-28 pb-20 sm:pt-32 lg:pt-44 lg:pb-28">
      <GoldGlow className="-top-40 right-[-10%] h-[520px] w-[520px] bg-primary-800/50" />
      <GoldGlow className="bottom-[-30%] left-[-12%] h-[560px] w-[560px] bg-gold-500/12" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,191,155,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(216,191,155,.6) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(ellipse 70% 60% at 70% 30%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 70% 30%, #000 20%, transparent 75%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <nav
              aria-label="breadcrumb"
              className="inline-flex items-center gap-2.5"
              style={{ animation: "reveal-up .9s var(--ease-lux) both" }}
            >
              <a href="#top" className="text-[12px] font-medium text-primary-100/60 transition-colors duration-300 hover:text-gold-400">
                {a.breadcrumbHome}
              </a>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-500/70" />
              <span className="text-[12px] font-semibold text-gold-300">{a.breadcrumbHere}</span>
            </nav>

            <div
              className="mt-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 backdrop-blur-sm"
              style={{ animation: "reveal-up .9s .05s var(--ease-lux) both" }}
            >
              <Icon name="tooth" className="h-4 w-4 shrink-0 text-gold-400" />
              <span className="min-w-0 break-words text-[10.5px] font-medium leading-snug text-gold-300 sm:text-xs">
                {a.eyebrow}
              </span>
            </div>

            <h1
              className="mt-7 text-[30px] font-bold leading-[1.3] text-white sm:text-[40px] lg:text-[50px] lg:leading-[1.25]"
              style={{ animation: "reveal-up .95s .1s var(--ease-lux) both" }}
            >
              {a.titleA}{" "}
              <span className="text-gold-gradient">{a.titleGold}</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-[14.5px] leading-[1.85] text-primary-100/78 sm:text-[16.5px]"
              style={{ animation: "reveal-up .95s .2s var(--ease-lux) both" }}
            >
              {a.lead}
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animation: "reveal-up .95s .3s var(--ease-lux) both" }}
            >
              <GoldButton onClick={onBook} className="w-full px-8 py-4 sm:w-auto">
                {a.cta}
              </GoldButton>
              <button
                type="button"
                onClick={scrollToCatalog}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-gold-500/40 bg-white/5 px-8 py-4 text-base font-semibold text-gold-300 backdrop-blur-md transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
              >
                <Icon name="chevron" className="h-4 w-4" />
                {a.discover}
              </button>
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/8 pt-7"
              style={{ animation: "reveal-up .95s .4s var(--ease-lux) both" }}
            >
              <span className="inline-flex items-center gap-2 text-[12.5px] text-primary-100/75">
                <Icon name="shield" className="h-4 w-4 text-gold-500" />
                {t.hero.moh}
              </span>
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <span className="inline-flex items-center gap-2 text-[12.5px] text-primary-100/75">
                <Icon name="sparkle" className="h-4 w-4 text-gold-500" />
                {t.hero.painless}
              </span>
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <span className="inline-flex items-center gap-2 text-[12.5px] text-primary-100/75">
                <Icon name="star" className="h-4 w-4 text-gold-500" />
                <span className="num font-semibold text-white">4.9/5</span>
                {t.hero.rating}
              </span>
            </div>
          </div>

          <div className="relative" style={{ animation: "reveal-up 1.1s .25s var(--ease-lux) both" }}>
            <div className="relative mx-auto max-w-[520px]">
              <div className="absolute -inset-4 rounded-[38px] border border-gold-500/20" />
              <div className="relative overflow-hidden rounded-[32px] border border-gold-500/25 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]">
                <img
                  src={clinicSuite}
                  alt={a.imgAlt}
                  width={880}
                  height={1100}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-center gap-2.5 rounded-2xl border border-gold-500/25 bg-white/10 px-4 py-3 backdrop-blur-xl">
                  <Icon name="pin" className="h-4 w-4 shrink-0 text-gold-400" />
                  <span className="text-[12.5px] font-medium text-white">{a.imgCaption}</span>
                </div>
              </div>

              <div
                className="absolute -right-4 top-10 hidden animate-float-slow rounded-2xl border border-gold-500/25 bg-primary-950/85 px-4 py-3 backdrop-blur-xl sm:block"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="num text-xl font-bold text-gold-400">7</div>
                <div className="text-[10.5px] text-primary-100/70">{a.chipDepts}</div>
              </div>
              <div
                className="absolute -left-5 bottom-28 hidden animate-float-slow rounded-2xl border border-gold-500/25 bg-primary-950/85 px-4 py-3 backdrop-blur-xl md:block"
                style={{ animationDelay: "3.4s" }}
              >
                <div className="num text-xl font-bold text-gold-400">45,000+</div>
                <div className="text-[10.5px] text-primary-100/70">{a.chipSmiles}</div>
              </div>

              <img
                src={sterilizationImg}
                alt={a.imgSideAlt}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-10 -left-6 hidden w-44 rounded-[22px] border border-gold-500/30 shadow-2xl sm:block"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============ PHILOSOPHY (4 rules) ============ */
function Philosophy() {
  const { t } = useI18n();
  const p = t.servicesPage.philosophy;

  return (
    <section id="philosophy" className="scroll-mt-28 bg-porcelain py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={p.eyebrow} icon="precision" title={<>{p.title} <span className="text-gold-gradient">{p.titleGold}</span></>} lead={p.lead} />

        <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[26px] border border-primary-900/8 bg-white p-7 shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:border-gold-500/45 hover:shadow-lift">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-right scale-x-0 bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 transition-transform duration-[520ms] ease-lux group-hover:scale-x-100" />
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[650ms] ease-lux group-hover:bg-gold-500/12" />
                <span className="num select-none absolute end-5 top-5 text-[28px] font-bold leading-none text-primary-900/8 transition-colors duration-[520ms] group-hover:text-gold-500/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative grid h-16 w-16 place-items-center rounded-[20px] bg-primary-950 text-gold-400 transition-transform duration-[420ms] ease-lux group-hover:-rotate-3 group-hover:scale-105">
                  <Icon name={it.icon} className="h-8 w-8" />
                </span>
                <h3 className="relative mt-7 text-[17px] font-semibold text-primary-950">{it.title}</h3>
                <p className="relative mt-3 text-[13.5px] leading-[1.8] text-body/85">{it.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============ CATALOG (interactive accordion) ============ */
type CatalogItem = {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  desc: string;
  duration: string;
  result: string;
  includes: string[];
};

function CatalogRow({ it, i, open, onToggle }: { it: CatalogItem; i: number; open: boolean; onToggle: () => void }) {
  const { t } = useI18n();
  const c = t.servicesPage.catalog;
  const { openBooking } = useUI();

  return (
    <Reveal as="li" delay={i * 60}>
      <article
        className={cn(
          "group overflow-hidden rounded-[24px] border transition-all duration-[420ms] ease-lux",
          open ? "border-gold-500/50 bg-white shadow-lift" : "border-primary-900/8 bg-white shadow-ambient hover:-translate-y-1 hover:border-gold-500/35",
        )}
      >
        <h3>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`service-${it.id}`}
            className="flex w-full items-center gap-4 p-5 text-start sm:gap-5 sm:p-6"
          >
            <span
              className={cn(
                "grid h-14 w-14 shrink-0 place-items-center rounded-[18px] transition-all duration-[420ms] ease-lux sm:h-16 sm:w-16",
                open
                  ? "bg-gradient-to-br from-gold-400 to-gold-600 text-primary-950 shadow-gold"
                  : "border border-gold-500/25 bg-gold-50 text-gold-600 group-hover:border-gold-500/50 group-hover:bg-gold-500 group-hover:text-primary-950",
              )}
            >
              <Icon name={it.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] font-semibold text-primary-950 sm:text-[18px]">{it.title}</span>
              <span className="mt-0.5 block truncate text-[12px] text-gold-600">{it.tagline}</span>
            </span>
            <span className="num select-none text-[26px] font-bold leading-none text-primary-900/8 sm:text-[32px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon
              name="chevron"
              className={cn("h-5 w-5 shrink-0 text-gold-600 transition-transform duration-[420ms] ease-lux", open && "rotate-180")}
            />
          </button>
        </h3>

        <div
          id={`service-${it.id}`}
          className={cn("grid transition-all duration-[420ms] ease-lux", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
        >
          <div className="overflow-hidden">
            <div className="border-t border-dashed border-gold-500/25 px-5 pb-6 pt-5 sm:px-6">
              <p className="max-w-3xl text-[13.8px] leading-[1.85] text-body/88">{it.desc}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-[18px] border border-primary-900/8 bg-porcelain p-4">
                  <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <span className="block text-[11px] font-medium tracking-[0.08em] text-muted">{c.durationLabel}</span>
                    <span className="mt-0.5 block text-[13.5px] font-semibold text-primary-950">{it.duration}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[18px] border border-primary-900/8 bg-porcelain p-4">
                  <Icon name="sparkle" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <span className="block text-[11px] font-medium tracking-[0.08em] text-muted">{c.resultLabel}</span>
                    <span className="mt-0.5 block text-[13.5px] font-semibold text-primary-950">{it.result}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[18px] border border-gold-500/25 bg-gold-50/60 p-4">
                <span className="flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] text-gold-700">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  {c.includesLabel}
                </span>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {it.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-body/90">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openBooking({ department: it.id })}
                className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full border border-gold-500/40 bg-gold-50 px-7 py-3.5 text-[13.5px] font-semibold text-gold-700 transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gradient-to-l hover:from-gold-600 hover:via-gold-500 hover:to-gold-400 hover:text-primary-950 hover:shadow-gold sm:w-auto"
              >
                <Icon name="calendar" className="h-4 w-4" />
                {c.book}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Catalog() {
  const { t } = useI18n();
  const c = t.servicesPage.catalog;
  const [open, setOpen] = useState<string | null>(c.items[0]?.id ?? null);

  return (
    <section id="catalog" className="scroll-mt-28 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={c.eyebrow}
          icon="tooth"
          title={<>{c.title} <span className="text-gold-gradient">{c.titleGold}</span></>}
          lead={c.lead}
        />

        <ol className="mx-auto mt-14 max-w-4xl space-y-4">
          {c.items.map((it, i) => (
            <CatalogRow key={it.id} it={it} i={i} open={open === it.id} onToggle={() => setOpen(open === it.id ? null : it.id)} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ============ GUARANTEES (dark) ============ */
function Guarantees() {
  const { t } = useI18n();
  const g = t.servicesPage.guarantees;

  return (
    <section id="guarantees" className="relative scroll-mt-28 overflow-hidden bg-primary-950 py-20 lg:py-28">
      <GoldGlow className="-top-40 left-[12%] h-[460px] w-[460px] bg-primary-800/40" />
      <GoldGlow className="bottom-[-25%] right-[-10%] h-[520px] w-[520px] bg-gold-500/10" />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow={g.eyebrow}
          icon="shield"
          title={<>{g.title} <span className="text-gold-gradient">{g.titleGold}</span></>}
          lead={g.lead}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {g.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:border-gold-500/45 hover:bg-white/[0.065]">
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[650ms] ease-lux group-hover:bg-gold-500/10" />
                <span className="num relative select-none text-[30px] font-bold leading-none text-gold-500/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative mt-5 grid h-14 w-14 place-items-center rounded-[18px] border border-gold-500/30 bg-gold-500/10 text-gold-400 transition-all duration-[420ms] ease-lux group-hover:border-gold-500/60 group-hover:bg-gold-500 group-hover:text-primary-950">
                  <Icon name={it.icon} className="h-7 w-7" />
                </span>
                <h3 className="relative mt-6 text-[16.5px] font-semibold text-white">{it.title}</h3>
                <p className="relative mt-2.5 text-[13.2px] leading-[1.8] text-primary-100/75">{it.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2.5 rounded-[22px] border border-gold-500/20 bg-gold-500/[0.07] px-6 py-4 text-center text-[13px] leading-[1.8] text-primary-100/80">
            <Icon name="sparkle" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            {g.note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============ COMPARISON TABLE ============ */
function Comparison() {
  const { t } = useI18n();
  const c = t.servicesPage.comparison;

  return (
    <section id="comparison" className="scroll-mt-28 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={c.eyebrow}
          icon="precision"
          title={<>{c.title} <span className="text-gold-gradient">{c.titleGold}</span></>}
          lead={c.lead}
        />

        <Reveal delay={140}>
          <div className="mt-14 overflow-hidden rounded-[26px] border border-primary-900/8 bg-white shadow-lift">
            <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-3 border-b border-gold-500/20 bg-primary-950 bg-gradient-to-l from-gold-400/75 via-gold-600/25 to-gold-500/55 px-8 py-5 sm:grid">
              <span className="text-[11px] font-medium tracking-[0.14em] text-gold-300/80 sm:text-xs">{c.rowsLabel}</span>
              <span className="flex items-center justify-center gap-2 text-[13.5px] font-bold text-white">
                <Icon name="crown" className="h-4 w-4 text-gold-400" />
                {c.teejanCol}
              </span>
              <span className="text-center text-[13px] font-medium text-primary-100/55">{c.classicCol}</span>
            </div>

            {c.rows.map((r, i) => (
              <div
                key={r.label}
                className={cn(
                  "grid grid-cols-1 gap-3 px-5 py-5 transition-colors duration-300 hover:bg-gold-50/50 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] sm:items-center sm:gap-3 sm:px-8",
                  i !== c.rows.length - 1 && "border-b border-primary-900/6",
                )}
              >
                <span className="text-[13px] font-semibold text-primary-950 sm:text-[14px]">
                  <span className="me-2 sm:hidden inline-flex h-1.5 w-1.5 rounded-full bg-gold-500 align-middle" />
                  {r.label}
                </span>
                <span className="flex items-start gap-2.5 rounded-[14px] border border-gold-500/30 bg-gold-50/70 p-3 text-[11.5px] font-medium leading-[1.6] text-primary-950 sm:text-[13px]">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  <span>
                    <span className="mb-1 block text-[10px] font-semibold tracking-[0.08em] text-gold-700 sm:hidden">{c.teejanCol}</span>
                    {r.teejan}
                  </span>
                </span>
                <span className="flex items-start gap-2 text-[11.5px] leading-[1.6] text-muted/80 sm:text-[12.5px]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted/40" />
                  <span>
                    <span className="mb-1 block text-[10px] font-semibold tracking-[0.08em] text-muted/70 sm:hidden">{c.classicCol}</span>
                    {r.classic}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============ FINANCING STRIP ============ */
function FinancingStrip() {
  const { t } = useI18n();
  const f = t.servicesPage.financing;
  const { openBooking } = useUI();

  return (
    <section id="payments" className="scroll-mt-28 bg-porcelain py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-50 px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-gold-600 sm:text-xs">
                <Icon name="card" className="h-3.5 w-3.5" />
                {f.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 text-[24px] font-semibold leading-[1.3] text-primary-950 sm:text-[32px] lg:text-[36px]">
                {f.title} <span className="text-gold-gradient">{f.titleGold}</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 text-[14.5px] leading-[1.8] text-body sm:text-[16px]">{f.lead}</p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {f.items.map((it, i) => (
                <Reveal key={it.title} delay={210 + i * 80}>
                  <div className="group flex gap-4 rounded-[22px] border border-primary-900/8 bg-white p-5 shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-1 hover:border-gold-500/40 sm:p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-50 text-gold-600 transition-all duration-[420ms] ease-lux group-hover:bg-gold-500 group-hover:text-primary-950">
                      <Icon name={it.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold text-primary-950">{it.title}</h3>
                      <p className="mt-1.5 text-[13.2px] leading-[1.75] text-body/85">{it.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={480}>
              <GoldButton onClick={() => openBooking()} className="mt-8 px-8 py-4">
                {f.cta}
              </GoldButton>
            </Reveal>
          </div>

          <Reveal delay={200} className="order-first lg:order-none">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[34px] border border-gold-500/20" />
              <div className="relative overflow-hidden rounded-[28px] shadow-lift">
                <img
                  src={heroSuite}
                  alt={t.servicesPage.hero.imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-1/2 w-[92%] -translate-x-1/2 rounded-[22px] border border-gold-500/30 bg-white/95 px-5 py-4 shadow-lift backdrop-blur-xl">
                <p className="text-center text-[11px] font-medium tracking-[0.1em] text-muted">{f.partnersNote}</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {FINANCE_PARTNERS.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-primary-900/10 bg-porcelain px-3.5 py-1.5 text-[11.5px] font-semibold text-primary-900"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ============ SERVICES FAQ ============ */
function ServicesFaq() {
  const { t } = useI18n();
  const f = t.servicesPage.faq;
  const [open, setOpen] = useState<number | null>(0);
  const { openBooking } = useUI();

  return (
    <section id="services-faq" className="scroll-mt-28 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={f.eyebrow}
          icon="chat"
          title={<>{f.title} <span className="text-gold-gradient">{f.titleGold}</span></>}
          lead={f.lead}
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {f.items.map((item, i) => {
            const on = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={cn(
                    "overflow-hidden rounded-[22px] border bg-white transition-all duration-[420ms] ease-lux",
                    on ? "border-gold-500/45 shadow-ambient" : "border-primary-900/8 hover:border-gold-500/30",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(on ? null : i)}
                      aria-expanded={on}
                      aria-controls={`sfaq-${i}`}
                      className="flex w-full items-center gap-4 p-5 text-start sm:p-6"
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-[420ms] ease-lux",
                          on ? "bg-gold-500 text-primary-950" : "bg-porcelain text-gold-600",
                        )}
                      >
                        <Icon name="chat" className="h-5 w-5" />
                      </span>
                      <span className={cn("flex-1 text-[14.5px] font-semibold leading-snug sm:text-[16px]", on ? "text-primary-950" : "text-primary-950/85")}>
                        {item.q}
                      </span>
                      <Icon name="chevron" className={cn("h-5 w-5 shrink-0 text-gold-600 transition-transform duration-[420ms] ease-lux", on && "rotate-180")} />
                    </button>
                  </h3>
                  <div id={`sfaq-${i}`} className={cn("grid transition-all duration-[420ms] ease-lux", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <p className="border-t border-dashed border-gold-500/25 px-5 pb-6 pt-5 text-[13.5px] leading-[1.85] text-body/88 sm:px-6 sm:text-[14.5px]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={160}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-[24px] border border-gold-500/25 bg-white p-7 text-center shadow-ambient sm:flex-row sm:text-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-950 text-gold-400">
              <Icon name="tooth" className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="text-[16.5px] font-semibold text-primary-950">{f.moreTitle}</h3>
              <p className="mt-1 text-[13px] text-muted">{f.moreText}</p>
            </div>
            <button
              type="button"
              onClick={() => openBooking()}
              className="shrink-0 rounded-full bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 px-7 py-3 text-[13.5px] font-semibold text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:shadow-gold-lg"
            >
              {f.moreCta}
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============ CTA ============ */
function ServicesCta({ onBook }: { onBook: () => void }) {
  const { t } = useI18n();
  const a = t.servicesPage.cta;

  return (
    <section className="py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[34px] border border-gold-500/40 bg-[linear-gradient(160deg,#faf6ef_0%,#f5eede_48%,#efe4cf_100%)] px-7 py-14 text-center shadow-lift sm:px-12 lg:py-20">
            <div aria-hidden="true" className="absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-gold-400/25 blur-[110px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />
            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-600/45 bg-white/70 px-4 py-2 text-[11.5px] font-medium tracking-[0.14em] text-gold-700">
                <Icon name="sparkle" className="h-3.5 w-3.5" />
                {a.badge}
              </span>
              <h2 className="mt-6 text-[24px] font-semibold leading-[1.3] text-primary-950 sm:text-[34px] lg:text-[40px]">
                {a.title}
                <br className="hidden sm:block" />
                <span className="text-gold-gradient">{a.titleGold}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-[1.85] text-body sm:text-[16px]">{a.lead}</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <GoldButton onClick={onBook} className="w-full px-8 py-4 sm:w-auto">
                  {a.cta}
                </GoldButton>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-whatsapp/45 bg-whatsapp/10 px-8 py-4 text-base font-semibold text-whatsapp transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:bg-whatsapp hover:text-primary-950 sm:w-auto"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  {a.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-9 text-center">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-gold-700"
            >
              <Icon name="arrow" className="h-4 w-4 text-gold-600" />
              {a.backHome}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Services() {
  const { openBooking } = useUI();
  return (
    <main id="main">
      <ServicesHero onBook={() => openBooking()} />
      <Philosophy />
      <Catalog />
      <Guarantees />
      <Comparison />
      <FinancingStrip />
      <ServicesFaq />
      <ServicesCta onBook={() => openBooking()} />
    </main>
  );
}
