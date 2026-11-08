import { useCallback, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import after1 from "@/assets/case-1-after.jpg";
import before1 from "@/assets/case-1-before.jpg";
import after2 from "@/assets/case-2-after.jpg";
import before2 from "@/assets/case-2-before.jpg";
import after3 from "@/assets/case-3-after.jpg";
import before3 from "@/assets/case-3-before.jpg";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

const IMGS = [
  { before: before1, after: after1 },
  { before: before2, after: after2 },
  { before: before3, after: after3 },
];

export default function Transformations() {
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const { openBooking } = useUI();
  const { t } = useI18n();
  const c = t.transformations.items[idx];
  const img = IMGS[idx];

  const update = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((r.right - clientX) / r.width) * 100)));
  }, []);

  return (
    <section id="transformations" className="scroll-mt-24 bg-porcelain py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.transformations.eyebrow} icon="smile-design" title={t.transformations.title} lead={t.transformations.lead} />

        <Reveal delay={120}>
          <div role="tablist" aria-label="Cases" className="mt-12 grid grid-cols-3 gap-2 sm:gap-3">
            {t.transformations.items.map((x, i) => (
              <button key={x.id} role="tab" aria-selected={i === idx} onClick={() => { setIdx(i); setPos(50); }}
                className={cn("min-w-0 rounded-2xl border px-3 py-3 text-start transition-all duration-[420ms] ease-lux sm:px-5 sm:py-3.5",
                  i === idx ? "border-gold-500 bg-white shadow-gold" : "border-primary-900/8 bg-white/60 hover:border-gold-500/40 hover:bg-white")}>
                <span className="num block text-[10px] font-semibold tracking-widest text-gold-600 sm:text-[10.5px]">0{i + 1}</span>
                <span className="mt-1 block text-[11px] font-semibold leading-tight text-primary-950 sm:text-[13.5px] sm:leading-snug">{x.title}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <div ref={box} onPointerDown={(e) => { setDragging(true); (e.target as HTMLElement).setPointerCapture?.(e.pointerId); update(e.clientX); }}
              onPointerMove={(e) => dragging && update(e.clientX)}
              onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)}
              className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-[26px] bg-primary-950 shadow-lift">
              <img src={img.after} alt={`${t.transformations.after} — ${c.title}`} loading="lazy" draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
              <img src={img.before} alt={`${t.transformations.before} — ${c.title}`} loading="lazy" draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: `inset(0 0 0 ${100 - pos}%)` }} />
              <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 bg-gradient-to-l from-gold-500/25 via-gold-500/5 to-transparent transition-opacity duration-700", pos >= 92 ? "opacity-100" : "opacity-0")} />
              <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-primary-950/75 px-3.5 py-1.5 text-[11.5px] font-semibold text-white backdrop-blur-md">{t.transformations.before}</span>
              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-gold-500 px-3.5 py-1.5 text-[11.5px] font-semibold text-primary-950">{t.transformations.after}</span>
              <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-gradient-to-b from-gold-400 via-gold-500 to-gold-400" style={{ right: `${pos}%` }}>
                <span className="absolute inset-y-0 -right-2 w-4 bg-gold-500/25 blur-sm" />
                <button type="button" role="slider" aria-label="Before / after handle" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") setPos((p) => Math.min(98, p + 4));
                    if (e.key === "ArrowRight") setPos((p) => Math.max(2, p - 4));
                  }}
                  onPointerDown={(e) => { e.stopPropagation(); setDragging(true); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
                  onPointerMove={(e) => dragging && update(e.clientX)} onPointerUp={() => setDragging(false)}
                  className={cn("pointer-events-auto absolute top-1/2 right-1/2 grid h-12 w-12 translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-primary-950 shadow-gold-lg ring-4 ring-white/25 transition-transform duration-200", dragging && "scale-110")}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                    <path d="M9.5 7 6 12l3.5 5M14.5 7 18 12l-3.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-muted">
              <Icon name="arrow" className="h-3.5 w-3.5 text-gold-600" />
              {t.transformations.hint}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between rounded-[26px] border border-primary-900/8 bg-white p-7 shadow-ambient">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3.5 py-1.5 text-[11.5px] font-semibold text-gold-700">
                  <Icon name="sparkle" className="h-3.5 w-3.5" />
                  {c.tag}
                </span>
                <h3 className="mt-5 text-[21px] font-semibold leading-snug text-primary-950 sm:text-[24px]">{c.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-body/85">{c.detail}</p>
                <dl className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-porcelain p-4">
                    <dt className="text-[11px] text-muted">{t.transformations.duration}</dt>
                    <dd className="mt-1 text-[15px] font-semibold text-primary-950">{c.duration}</dd>
                  </div>
                  <div className="rounded-2xl bg-porcelain p-4">
                    <dt className="text-[11px] text-muted">{t.transformations.doctor}</dt>
                    <dd className="mt-1 text-[15px] font-semibold text-primary-950">{c.doctor}</dd>
                  </div>
                </dl>
              </div>
              <button type="button" onClick={() => openBooking()}
                className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-[26px] bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 px-5 py-4 text-center text-[14px] font-semibold leading-snug text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:shadow-gold-lg sm:rounded-full sm:text-[15px]">
                <Icon name="calendar" className="h-[18px] w-[18px]" />
                {t.transformations.cta}
              </button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
