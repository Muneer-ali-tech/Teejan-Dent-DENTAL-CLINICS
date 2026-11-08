import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import heroSuite from "@/assets/hero-suite.jpg";
import reception from "@/assets/clinic-reception.jpg";
import suiteImg from "@/assets/clinic-suite.jpg";
import sterilizationImg from "@/assets/clinic-sterilization.jpg";
import { WHATSAPP_URL } from "@/data/clinic";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { useCountUp, useInView } from "@/lib/hooks";
import { Container, GoldButton, GoldGlow, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

type Stat = { value: number; prefix?: string; suffix?: string; label: string };

function scrollToStory() {
  document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
}

function AboutHero({ onBook }: { onBook: () => void }) {
  const { t } = useI18n();
  const a = t.aboutUs.hero;

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
                onClick={scrollToStory}
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
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="h-3 w-3 text-gold-500" />
                  ))}
                  <span className="num ms-1 text-[12px] font-semibold text-white">4.9/5</span>
                </span>
                <span className="text-[11.5px] text-primary-100/60">{t.hero.rating}</span>
              </div>
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <span className="inline-flex items-center gap-2 text-[12.5px] text-primary-100/75">
                <Icon name="shield" className="h-4 w-4 text-gold-500" />
                {t.hero.moh}
              </span>
              <span className="inline-flex items-center gap-2 text-[12.5px] text-primary-100/75">
                <Icon name="sparkle" className="h-4 w-4 text-gold-500" />
                {t.hero.painless}
              </span>
            </div>
          </div>

          <div className="relative" style={{ animation: "reveal-up 1.1s .25s var(--ease-lux) both" }}>
            <div className="relative mx-auto max-w-[520px]">
              <div className="absolute -inset-4 rounded-[38px] border border-gold-500/20" />
              <div className="relative overflow-hidden rounded-[32px] border border-gold-500/25 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]">
                <img
                  src={reception}
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
                <div className="num text-xl font-bold text-gold-400">19+</div>
                <div className="text-[10.5px] text-primary-100/70">{a.chipDoctors}</div>
              </div>
              <div
                className="absolute -left-5 bottom-28 hidden animate-float-slow rounded-2xl border border-gold-500/25 bg-primary-950/85 px-4 py-3 backdrop-blur-xl md:block"
                style={{ animationDelay: "3.4s" }}
              >
                <div className="num text-xl font-bold text-gold-400">45,000+</div>
                <div className="text-[10.5px] text-primary-100/70">{a.chipSmiles}</div>
              </div>

              <img
                src={suiteImg}
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

function Story() {
  const { t } = useI18n();
  const a = t.aboutUs.story;

  return (
    <section id="story" className="scroll-mt-28 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mb-10">
              <div className="absolute -inset-3 rounded-[34px] border border-gold-500/20" />
              <div className="relative overflow-hidden rounded-[28px] shadow-lift">
                <img
                  src={heroSuite}
                  alt={a.imgMainAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/55 via-transparent to-transparent" />
              </div>
              <img
                src={sterilizationImg}
                alt={a.imgSideAlt}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-10 start-8 w-44 rounded-[22px] border-4 border-white shadow-2xl sm:w-52"
              />
              <div className="absolute -top-5 end-6 rounded-2xl border border-gold-500/30 bg-primary-950/90 px-4 py-2.5 backdrop-blur-xl">
                <span className="num text-[13px] font-bold text-gold-300">2016 → 2026</span>
                <span className="mt-0.5 block text-[10.5px] text-primary-100/70">{a.sinceChip}</span>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-50 px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-gold-600 sm:text-xs">
                <Icon name="sparkle" className="h-3.5 w-3.5" />
                {a.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 text-[24px] font-semibold leading-[1.3] text-primary-950 sm:text-[32px] lg:text-[36px]">
                {a.title} <span className="text-gold-gradient">{a.titleGold}</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 text-[14.5px] leading-[1.8] text-body sm:text-[16px]">{a.lead}</p>
            </Reveal>
            {a.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={210 + i * 90}>
                <span className="mt-4 block text-[13.8px] leading-[1.9] text-body/85">{p}</span>
              </Reveal>
            ))}
            <Reveal delay={440}>
              <blockquote className="mt-8 border-s-2 border-gold-500/50 ps-5 text-[14px] italic leading-[1.85] text-muted">
                {a.quote}
              </blockquote>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-6 flex items-center gap-3">
                <span className="gold-hairline block h-px w-10" />
                <span className="text-[12.5px] font-semibold text-primary-950">{a.signature}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pillars() {
  const { t } = useI18n();
  const p = t.aboutUs.pillars;

  return (
    <section id="pillars" className="scroll-mt-28 bg-porcelain py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={p.eyebrow} icon="crown" title={p.title} lead={p.lead} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {p.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 100} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[26px] border border-primary-900/8 bg-white p-7 shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:border-gold-500/45 hover:shadow-lift sm:p-8">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-right scale-x-0 bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 transition-transform duration-[520ms] ease-lux group-hover:scale-x-100" />
                <span className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[650ms] ease-lux group-hover:bg-gold-500/12" />
                <span className="relative grid h-16 w-16 place-items-center rounded-[20px] bg-primary-950 text-gold-400 transition-transform duration-[420ms] ease-lux group-hover:-rotate-3 group-hover:scale-105">
                  <Icon name={it.icon} className="h-8 w-8" />
                </span>
                <h3 className="relative mt-7 text-[18px] font-semibold text-primary-950 sm:text-[19px]">{it.title}</h3>
                <p className="relative mt-3 text-[13.8px] leading-[1.8] text-body/85">{it.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Values() {
  const { t } = useI18n();
  const v = t.aboutUs.values;

  return (
    <section id="values" className="scroll-mt-28 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={v.eyebrow} icon="shield" title={v.title} lead={v.lead} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {v.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 70} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[24px] border border-primary-900/8 bg-white p-6 shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:border-gold-500/45 hover:shadow-lift sm:p-7">
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[650ms] ease-lux group-hover:bg-gold-500/12" />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-[18px] border border-gold-500/25 bg-gold-50 text-gold-600 transition-all duration-[420ms] ease-lux group-hover:border-gold-500/60 group-hover:bg-gold-500 group-hover:text-primary-950">
                    <Icon name={it.icon} className="h-7 w-7" />
                  </span>
                  <span className="num select-none text-[32px] font-bold leading-none text-primary-900/8 transition-colors duration-[520ms] group-hover:text-gold-500/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative mt-6 text-[16.5px] font-semibold text-primary-950 sm:text-[18px]">{it.title}</h3>
                <p className="relative mt-2.5 text-[13.2px] leading-[1.8] text-body/85">{it.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatsStrip() {
  const { t } = useI18n();
  const s = t.aboutUs.stats;
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const items = s.items as Stat[];

  return (
    <div ref={ref} className="relative mt-20 rounded-[25px] bg-gradient-to-b from-gold-400/75 via-gold-600/25 to-gold-500/55 p-px">
      <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(158deg,#12414b_0%,#0c3038_46%,#082227_100%)] px-6 py-9 lg:px-10">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-80 -translate-x-1/2 rounded-full bg-gold-500/[0.13] blur-[60px]" />
        <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
        <span className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

        <p className="relative text-center text-[11px] font-medium tracking-[0.22em] text-gold-300/85 sm:text-xs">{s.title}</p>

        <div className="relative mt-7 grid grid-cols-2 lg:grid-cols-4">
          {items.map((m, i) => (
            <StatCell key={i} m={m} active={inView} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCell({ m, active, i }: { m: Stat; active: boolean; i: number }) {
  const n = useCountUp(m.value, active, 1500 + i * 200);
  const display = m.value >= 10000 ? new Intl.NumberFormat("en-US").format(n) : String(n);

  return (
    <div
      className={cn(
        "group relative px-4 py-5 text-center sm:py-6",
        i !== 0 && "max-sm:border-t max-sm:border-white/[0.07]",
        i % 2 === 1 && "max-sm:border-s max-sm:border-white/[0.07]",
        i >= 2 && "sm:max-lg:border-t sm:max-lg:border-white/[0.07]",
        i % 2 === 1 && "sm:max-lg:border-s sm:max-lg:border-white/[0.07]",
        i !== 0 && "lg:border-s lg:border-white/[0.07]",
      )}
    >
      <span className="num text-gold-gradient flex items-baseline justify-center text-[30px] font-bold leading-none tracking-tight sm:text-[36px] lg:text-[40px]">
        {m.prefix && <span className="text-[0.6em]">{m.prefix}</span>}
        {display}
        {m.suffix && <span className="text-[0.6em]">{m.suffix}</span>}
      </span>
      <p className="mt-3 text-[12px] font-medium leading-relaxed text-white/75 sm:text-[12.8px]">{m.label}</p>
    </div>
  );
}

function Timeline() {
  const { t } = useI18n();
  const a = t.aboutUs.timeline;
  const section = useRef<HTMLElement | null>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = section.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travelled = vh * 0.85 - r.top;
      const total = r.height * 0.8;
      setFill(Math.max(0, Math.min(1, travelled / total)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const width = fill * 100;

  return (
    <section id="timeline" ref={section} className="relative scroll-mt-28 overflow-hidden bg-primary-950 py-20 lg:py-28">
      <GoldGlow className="-top-40 left-[15%] h-[460px] w-[460px] bg-primary-800/40" />
      <GoldGlow className="bottom-[-25%] right-[-10%] h-[520px] w-[520px] bg-gold-500/10" />

      <Container className="relative">
        <SectionHeading tone="dark" eyebrow={a.eyebrow} icon="calendar" title={a.title} lead={a.lead} />

        <div className="relative mt-20 hidden lg:block">
          <span className="absolute inset-y-3 left-1/2 w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
            <span
              className="block w-full rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_12px_rgba(197,168,128,.55)]"
              style={{ height: `${width}%`, transition: "height .35s linear" }}
            />
          </span>
          <ol className="space-y-14">
            {a.items.map((it, i) => (
              <Reveal as="li" key={it.year} delay={i * 90}>
                <div className="relative grid grid-cols-2 items-center">
                  <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                    <span className="relative grid h-[64px] w-[64px] place-items-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 shadow-gold-lg">
                      <span className="absolute inset-[3px] rounded-full border border-primary-950/25" />
                      <span className="num text-[14.5px] font-bold text-primary-950">{it.year}</span>
                    </span>
                  </span>
                  <div className={cn(i % 2 === 0 ? "col-start-1 pe-20" : "col-start-2 ps-20")}>
                    <article className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-[420ms] ease-lux hover:-translate-y-1.5 hover:border-gold-500/45 hover:bg-white/[0.065]">
                      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[650ms] ease-lux group-hover:bg-gold-500/10" />
                      <div className="relative flex items-center gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-primary-950 shadow-gold transition-transform duration-[420ms] ease-lux group-hover:scale-105">
                          <Icon name={it.icon} className="h-6 w-6" />
                        </span>
                        <div>
                          <span className="num text-[11px] font-semibold tracking-[0.22em] text-gold-400">{it.year}</span>
                          <h3 className="mt-0.5 text-[17px] font-semibold text-white">{it.title}</h3>
                        </div>
                      </div>
                      <p className="relative mt-4 text-[13.8px] leading-[1.85] text-primary-100/75">{it.desc}</p>
                    </article>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <ol className="relative mt-14 space-y-6 lg:hidden">
          <span
            aria-hidden="true"
            className="absolute inset-y-3 w-[2px] overflow-hidden rounded bg-white/10"
            style={{ insetInlineStart: "31px" }}
          >
            <span
              className="block w-full rounded bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600"
              style={{ height: `${width}%`, transition: "height .35s linear" }}
            />
          </span>
          {a.items.map((it, i) => (
            <Reveal as="li" key={it.year} delay={i * 80}>
              <div className="relative flex gap-4">
                <span className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 shadow-gold">
                  <span className="absolute inset-[2.5px] rounded-full border border-primary-950/25" />
                  <span className="num text-[13px] font-bold text-primary-950">{it.year}</span>
                </span>
                <article className="flex-1 rounded-[20px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5">
                    <Icon name={it.icon} className="h-5 w-5 shrink-0 text-gold-400" />
                    <h3 className="text-[15.5px] font-semibold text-white">{it.title}</h3>
                  </div>
                  <p className="mt-2 text-[12.8px] leading-[1.8] text-primary-100/75">{it.desc}</p>
                </article>
              </div>
            </Reveal>
          ))}
        </ol>

        <StatsStrip />
      </Container>
    </section>
  );
}

function AboutCta({ onBook }: { onBook: () => void }) {
  const { t } = useI18n();
  const a = t.aboutUs.cta;

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

export default function AboutUs() {
  const { openBooking } = useUI();
  return (
    <main id="main">
      <AboutHero onBook={() => openBooking()} />
      <Story />
      <Pillars />
      <Values />
      <Timeline />
      <AboutCta onBook={() => openBooking()} />
    </main>
  );
}
