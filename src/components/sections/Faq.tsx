import { useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { openBooking } = useUI();
  const { t } = useI18n();

  return (
    <section id="faq" className="scroll-mt-24 bg-porcelain py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.faq.eyebrow} icon="chat" title={t.faq.title} lead={t.faq.lead} />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {t.faq.items.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 70}>
                <div className={cn("overflow-hidden rounded-[22px] border bg-white transition-all duration-[420ms] ease-lux",
                  on ? "border-gold-500/45 shadow-ambient" : "border-primary-900/8 hover:border-gold-500/30")}>
                  <h3>
                    <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} aria-controls={`faq-${i}`}
                      className="flex w-full items-center gap-4 p-5 text-start sm:p-6">
                      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-[420ms] ease-lux", on ? "bg-gold-500 text-primary-950" : "bg-porcelain text-gold-600")}>
                        <Icon name="chat" className="h-5 w-5" />
                      </span>
                      <span className={cn("flex-1 text-[14.5px] font-semibold leading-snug transition-colors sm:text-[16px]", on ? "text-primary-950" : "text-primary-950/85")}>
                        {f.q}
                      </span>
                      <Icon name="chevron" className={cn("h-5 w-5 shrink-0 text-gold-600 transition-transform duration-[420ms] ease-lux", on && "rotate-180")} />
                    </button>
                  </h3>
                  <div id={`faq-${i}`} className={cn("grid transition-all duration-[420ms] ease-lux", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <p className="border-t border-dashed border-gold-500/25 px-5 pb-6 pt-5 text-[13.5px] leading-[1.85] text-body/88 sm:px-6 sm:text-[14.5px]">{f.a}</p>
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
              <h3 className="text-[16.5px] font-semibold text-primary-950">{t.faq.moreTitle}</h3>
              <p className="mt-1 text-[13px] text-muted">{t.faq.moreText}</p>
            </div>
            <button type="button" onClick={() => openBooking()}
              className="shrink-0 rounded-full bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 px-7 py-3 text-[13.5px] font-semibold text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:shadow-gold-lg">
              {t.faq.moreCta}
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
