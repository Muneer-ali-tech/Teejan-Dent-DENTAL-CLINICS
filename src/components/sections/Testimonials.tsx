import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon, StarRow } from "@/components/ui/Icons";

const GAP = 20;
const AUTOPLAY = 4500;

export default function Testimonials() {
  const [doc, setDoc] = useState("all");
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const auto = useRef(0);
  const settle = useRef<number | undefined>(undefined);
  const { t, isAr } = useI18n();

  const doctors = useMemo(
    () => Array.from(new Set(t.testimonials.items.map((x) => x.doctor))),
    [t],
  );
  const list =
    doc === "all" ? t.testimonials.items : t.testimonials.items.filter((x) => x.doctor === doc);

  const step = () => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("figure");
    return (card?.offsetWidth ?? 300) + GAP;
  };

  const scrollTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const target = i * step();
    el.scrollTo({ left: isAr ? -target : target, behavior: "smooth" });
  };

  const commit = (i: number) => {
    auto.current = i;
    setIdx(i);
  };

  const go = (d: 1 | -1) => {
    const n = list.length;
    if (!n) return;
    const target = (idx + d + n) % n;
    commit(target);
    scrollTo(target);
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      const raw = isAr ? -el.scrollLeft : el.scrollLeft;
      commit(Math.max(0, Math.min(list.length - 1, Math.round(raw / step()))));
    }, 140);
  };

  useEffect(() => {
    if (paused || list.length < 2) return;
    const id = window.setInterval(() => {
      const target = (auto.current + 1) % list.length;
      commit(target);
      scrollTo(target);
    }, AUTOPLAY);
    return () => window.clearInterval(id);
  }, [paused, list.length, isAr]);

  useEffect(() => {
    const el = track.current;
    if (el) el.scrollTo({ left: 0 });
    commit(0);
  }, [doc]);

  const chip = (on: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all duration-[280ms] ease-lux",
      on
        ? "border-gold-500 bg-gold-500 text-primary-950 shadow-gold"
        : "border-primary-900/12 bg-white text-body hover:border-gold-500/50 hover:text-primary-950",
    );

  return (
    <section id="reviews" className="scroll-mt-24 bg-porcelain py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          icon="star"
          title={t.testimonials.title}
          lead={t.testimonials.lead}
        />

        {/* Doctor filter */}
        <Reveal delay={110}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            <button type="button" onClick={() => setDoc("all")} aria-pressed={doc === "all"} className={chip(doc === "all")}>
              {t.testimonials.all}
            </button>
            {doctors.map((d) => (
              <button key={d} type="button" onClick={() => setDoc(d)} aria-pressed={doc === d} className={chip(doc === d)}>
                {d}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="num text-[11.5px] font-semibold text-muted">
              {String(idx + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
            </span>
            <div className="flex max-w-[170px] flex-wrap items-center gap-1.5">
              {list.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => { commit(i); scrollTo(i); }}
                  aria-label={r.author}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-[420ms] ease-lux",
                    i === idx ? "w-6 bg-gold-500" : "w-1.5 bg-primary-900/15 hover:bg-gold-500/50",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button type="button" onClick={() => go(1)} aria-label={t.testimonials.next}
              className="grid h-11 w-11 place-items-center rounded-full border border-primary-900/12 bg-white text-primary-900 shadow-ambient transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-primary-950">
              <Icon name="arrow" className={cn("h-4.5 w-4.5", !isAr && "rotate-180")} />
            </button>
            <button type="button" onClick={() => go(-1)} aria-label={t.testimonials.prev}
              className="grid h-11 w-11 place-items-center rounded-full border border-primary-900/12 bg-white text-primary-900 shadow-ambient transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-primary-950">
              <Icon name="arrow" className={cn("h-4.5 w-4.5", isAr && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Track — one card + a third of the next on every screen below desktop */}
        <div
          ref={track}
          onScroll={onScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
          className="-mx-5 mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-5 hide-scrollbar sm:-mx-7 sm:scroll-px-7 sm:px-7 lg:mx-0 lg:scroll-px-0 lg:px-0"
        >
          {list.map((r) => (
            <figure
              key={r.id}
              className="group relative flex w-[70%] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border border-primary-900/8 bg-white shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-1.5 hover:border-gold-500/45 hover:shadow-lift lg:w-[31.5%]"
            >
              {/* Gold accent that sweeps in on hover */}
              <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] origin-right scale-x-0 bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 transition-transform duration-[520ms] ease-lux group-hover:scale-x-100" />
              {/* Soft corner glow */}
              <span className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[650ms] ease-lux group-hover:bg-gold-500/12" />
              {/* Decorative quotation mark */}
              <span
                aria-hidden="true"
                className="en-display pointer-events-none absolute -top-7 start-4 select-none text-[104px] leading-none text-gold-500/12"
              >
                &rdquo;
              </span>

              <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1.5">
                    <StarRow />
                    <span className="num text-[10.5px] font-semibold tracking-wide text-muted">
                      5.0 / 5.0
                    </span>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary-900/8 bg-porcelain px-2.5 py-1.5 text-[10px] font-medium text-muted">
                    <Icon name="google" className="h-3.5 w-3.5 text-primary-800" />
                    <span className="hidden sm:inline">{t.testimonials.verified}</span>
                    <span className="sm:hidden">Google</span>
                  </span>
                </div>

                <blockquote className="mt-4 flex-1 text-[12.9px] leading-[1.95] text-body/92 sm:text-[13.8px]">
                  {r.text}
                </blockquote>

                <figcaption className="mt-5 border-t border-dashed border-gold-500/30 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary-900 to-primary-950 text-[16px] font-bold text-gold-400 ring-2 ring-gold-500/25">
                      {r.author.trim().slice(0, 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-[14.5px] font-semibold text-primary-950">{r.author}</span>
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold-500 text-primary-950" title={t.testimonials.verified}>
                          <Icon name="check" className="h-2.5 w-2.5" />
                        </span>
                      </div>
                      <span className="mt-0.5 block truncate text-[11.5px] text-muted">{r.treatment}</span>
                    </div>
                  </div>

                  <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-gold-50 px-3 py-2.5">
                    <Icon name="tooth" className="h-4 w-4 shrink-0 text-gold-600" />
                    <span className="truncate text-[11px] font-medium text-gold-700">
                      {t.testimonials.praised} {r.doctor}
                    </span>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-4 text-center text-[12.5px] text-muted">
            <span className="num font-semibold text-primary-950">4.9</span> / 5 — {t.testimonials.average}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
