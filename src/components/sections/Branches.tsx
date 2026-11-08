import { useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

const mapSrc = (b: { area: string; city: string; name: string }) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(`Teejan Dent ${b.area} ${b.city}`)}&hl=${"en"}&z=15&output=embed`;

export default function Branches() {
  const [active, setActive] = useState("yasmin");
  const { openBooking } = useUI();
  const { t, lang } = useI18n();
  const branch = t.branches.items.find((b) => b.id === active)!;

  return (
    <section id="branches" className="scroll-mt-24 bg-porcelain py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.branches.eyebrow} icon="pin" title={t.branches.title} lead={t.branches.lead} />

        <div className="mt-14 grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-9">
          <div className="space-y-4">
            {t.branches.items.map((b, i) => {
              const on = b.id === active;
              return (
                <Reveal key={b.id} delay={i * 90}>
                  <button type="button" onClick={() => setActive(b.id)} aria-pressed={on}
                    className={cn("w-full overflow-hidden rounded-[24px] border p-5 text-start transition-all duration-[420ms] ease-lux sm:p-6",
                      on ? "border-gold-500 bg-white shadow-gold" : "border-primary-900/8 bg-white/70 hover:border-gold-500/45 hover:bg-white")}>
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-950 px-3 py-1 text-[10px] font-semibold tracking-wide text-gold-400 sm:text-[10.5px]">
                          <Icon name="pin" className="h-3 w-3" />
                          {b.label}
                        </span>
                        <h3 className="mt-3 text-[17px] font-semibold text-primary-950 sm:text-[18.5px]">{b.name}</h3>
                        <p className="mt-1 text-[12.5px] text-muted sm:text-[13px]">{b.city} — {b.area}</p>
                      </div>
                      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition-colors duration-300 sm:h-11 sm:w-11", on ? "bg-gold-500 text-primary-950" : "bg-porcelain text-muted")}>
                        <Icon name="tooth" className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-4 text-[12.8px] leading-[1.75] text-body/85 sm:text-[13.2px]">{b.note}</p>
                    <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-porcelain px-3.5 py-3 sm:px-4">
                      <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      <span className="text-[11.8px] leading-relaxed text-muted sm:text-[12.2px]">{b.hours}</span>
                    </div>
                    <div className={cn("mt-4 grid grid-cols-3 gap-2 transition-opacity duration-[420ms] ease-lux", on ? "opacity-100" : "opacity-75")}>
                      <a href={`tel:${b.phone}`} onClick={(e) => e.stopPropagation()}
                        className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-primary-900/12 py-2.5 text-primary-900 transition-colors hover:border-gold-500/60 hover:bg-gold-50">
                        <Icon name="phone" className="h-4 w-4 text-gold-600" />
                        <span className="num text-[11px] font-semibold">{b.phone}</span>
                      </a>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Teejan Dent ${b.area} ${b.city}`)}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                        className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-primary-900/12 py-2.5 text-[11.5px] font-semibold text-primary-900 transition-colors hover:border-gold-500/60 hover:bg-gold-50">
                        <Icon name="pin" className="h-4 w-4 text-gold-600" />
                        {t.branches.location}
                      </a>
                      <button type="button" onClick={(e) => { e.stopPropagation(); openBooking({ branch: b.id }); }}
                        className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-gold-500 py-2.5 text-[11.5px] font-semibold text-primary-950 transition-all duration-[280ms] ease-lux hover:bg-gold-400">
                        <Icon name="calendar" className="h-4 w-4" />
                        {t.branches.book}
                      </button>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140}>
            <div className="overflow-hidden rounded-[26px] border border-primary-900/10 bg-primary-950 shadow-lift lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-3 border-b border-white/8 bg-primary-950 px-4 py-3 sm:px-5">
                <span className="flex items-center gap-2 text-[12px] font-medium text-white">
                  <Icon name="pin" className="h-4 w-4 text-gold-400" />
                  {branch.name} — {branch.area}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 text-[10px] text-gold-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
                  {t.branches.live}
                </span>
              </div>
              <div className="relative h-[290px] w-full bg-primary-900 sm:h-[400px] lg:h-[500px]">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500/30 border-t-gold-500" />
                    <span className="text-[11.5px] text-primary-100/60">{t.branches.loading}</span>
                  </div>
                </div>
                <iframe key={branch.id + lang} title={`${branch.name} map`} src={mapSrc(branch)} loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gold-500/25 bg-primary-950/92 px-4 py-3 backdrop-blur-xl sm:inset-x-4 sm:bottom-4">
                  <div>
                    <div className="text-[10.5px] text-primary-100/60">{t.branches.phoneLabel}</div>
                    <a href={`tel:${branch.phone}`} className="num pointer-events-auto text-[15px] font-semibold text-gold-400">{branch.phone}</a>
                  </div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Teejan Dent ${branch.area} ${branch.city}`)}`} target="_blank" rel="noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-[11.5px] font-semibold text-white transition-colors hover:bg-gold-500 hover:text-primary-950">
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                    {t.branches.openMaps}
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-white/8 p-4 sm:flex-row sm:p-5">
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Teejan Dent ${branch.area} ${branch.city}`)}`} target="_blank" rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 py-3 text-[13px] font-semibold text-primary-950 transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:bg-gold-400 sm:text-[13.5px]">
                  <Icon name="pin" className="h-4 w-4" />
                  {t.branches.viewOnMap}
                </a>
                <button type="button" onClick={() => openBooking({ branch: branch.id })}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-[13px] font-semibold text-white transition-all duration-[280ms] ease-lux hover:border-gold-500/50 hover:bg-white/5 sm:text-[13.5px]">
                  <Icon name="calendar" className="h-4 w-4 text-gold-400" />
                  {t.branches.bookHere}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
