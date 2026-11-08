import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import hero from "@/assets/hero-suite.jpg";
import reception from "@/assets/clinic-reception.jpg";
import sterilization from "@/assets/clinic-sterilization.jpg";
import suite from "@/assets/clinic-suite.jpg";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, GoldButton, Reveal } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

const IMGS = [suite, sterilization, reception, hero];

export default function Experience() {
  const [active, setActive] = useState(0);
  const { openBooking } = useUI();
  const { t } = useI18n();
  const gallery = t.experience.gallery;

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % gallery.length), 5200);
    return () => clearInterval(id);
  }, [gallery.length]);

  return (
    <section className="relative overflow-hidden bg-porcelain py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[34px] border border-gold-500/20" />
              <div className="relative overflow-hidden rounded-[28px] shadow-lift">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-900">
                  {IMGS.map((src, i) => (
                    <img key={src} src={src} alt={gallery[i].alt} loading="lazy" decoding="async"
                      className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-lux", i === active ? "animate-kenburns opacity-100" : "opacity-0")} />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center gap-2.5 rounded-2xl border border-gold-500/25 bg-primary-950/70 px-4 py-3 backdrop-blur-xl">
                    <Icon name="pin" className="h-4 w-4 shrink-0 text-gold-400" />
                    <span className="text-[12.5px] font-medium text-white">{gallery[active].caption}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                {IMGS.map((src, i) => (
                  <button key={src} type="button" onClick={() => setActive(i)} aria-label={gallery[i].caption} aria-current={i === active}
                    className={cn("relative h-16 flex-1 overflow-hidden rounded-2xl border transition-all duration-[420ms] ease-lux sm:h-20", i === active ? "border-gold-500 shadow-gold" : "border-white/60 opacity-60 hover:opacity-100")}>
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-50 px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-gold-600 sm:text-xs">
                <Icon name="sparkle" className="h-3.5 w-3.5" />
                {t.experience.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 text-[24px] font-semibold leading-[1.3] text-primary-950 sm:text-[32px] lg:text-[38px]">
                {t.experience.title} <span className="text-gold-gradient">{t.experience.titleGold}</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 text-[14.5px] leading-[1.8] text-body sm:text-[17px]">{t.experience.lead}</p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {t.experience.features.map((f, i) => (
                <Reveal as="li" key={f.title} delay={200 + i * 90}>
                  <div className="group flex gap-4 rounded-[22px] border border-transparent bg-white/70 p-5 transition-all duration-[420ms] ease-lux hover:border-gold-500/35 hover:bg-white hover:shadow-ambient">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-950 text-gold-400 transition-transform duration-[420ms] ease-lux group-hover:scale-105">
                      <Icon name={f.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-[16.5px] font-semibold text-primary-950">{f.title}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-[1.75] text-body/85">{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={520}>
              <div className="mt-9">
                <GoldButton onClick={() => openBooking()} className="w-full rounded-[26px] px-5 py-4 sm:w-auto sm:rounded-full sm:px-7">
                  {t.experience.cta}
                </GoldButton>
              </div>
            </Reveal>
            <Reveal delay={580}>
              <blockquote className="mt-8 border-s-2 border-gold-500/50 ps-5 text-[14px] italic leading-[1.85] text-muted">
                {t.experience.quote}
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
