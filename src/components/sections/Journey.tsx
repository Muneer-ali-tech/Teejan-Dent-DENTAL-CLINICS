import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

export default function Journey() {
  const section = useRef<HTMLElement | null>(null);
  const [fill, setFill] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const { t } = useI18n();
  const items = t.journey.items;

  /* All five steps must be lit once 75% of the section has been scrolled. */
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = section.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travelled = vh * 0.85 - r.top;
      const total = r.height * 0.75;
      setFill(Math.max(0, Math.min(1, travelled / total)));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const lit = Math.ceil(fill * items.length);
  const width = fill * 100;
  const activeOf = (i: number) => (hover !== null ? hover >= i : lit > i);

  return (
    <section id="journey" ref={section} className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.journey.eyebrow} icon="calendar" title={t.journey.title} lead={t.journey.lead} />

        <div className="relative mt-20 hidden lg:block">
          <div className="absolute inset-x-[10%] top-[37px] h-[3px] overflow-hidden rounded-full bg-primary-900/8">
            <div className="h-full rounded-full bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 shadow-[0_0_12px_rgba(197,168,128,.55)]"
              style={{ width: `${width}%`, transition: "width .35s linear" }} />
          </div>
          <ol className="relative grid grid-cols-5 gap-5">
            {items.map((s, i) => {
              const on = activeOf(i);
              return (
                <Reveal as="li" key={s.n} delay={i * 90}>
                  <div onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="group flex flex-col items-center text-center">
                    <div className={cn("num relative z-10 grid h-[74px] w-[74px] place-items-center rounded-full border text-[21px] font-bold transition-all duration-[520ms] ease-lux",
                      on ? "-translate-y-0.5 border-gold-500 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-primary-950 shadow-gold-lg"
                         : "border-primary-900/10 bg-white text-primary-900/35 group-hover:border-gold-500/50 group-hover:text-gold-600")}>
                      {s.n}
                      {on && <span className="pointer-events-none absolute inset-0 animate-pulse-gold rounded-full" />}
                    </div>
                    <div className={cn("mt-6 w-full rounded-[22px] border p-6 transition-all duration-[520ms] ease-lux",
                      on ? "border-gold-500/40 bg-white shadow-ambient"
                         : "border-primary-900/8 bg-white/60 group-hover:-translate-y-1.5 group-hover:border-gold-500/35 group-hover:bg-white group-hover:shadow-ambient")}>
                      <span className={cn("mx-auto grid h-11 w-11 place-items-center rounded-xl transition-all duration-[520ms] ease-lux",
                        on ? "bg-primary-950 text-gold-400" : "bg-porcelain text-muted group-hover:bg-gold-500 group-hover:text-primary-950")}>
                        <Icon name={s.icon} className="h-5.5 w-5.5" />
                      </span>
                      <h3 className="mt-4 text-[15.5px] font-semibold leading-snug text-primary-950">{s.title}</h3>
                      <p className="mt-2.5 text-[12.8px] leading-[1.75] text-body/82">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <ol className="relative mt-12 space-y-4 lg:hidden">
          <span aria-hidden="true" className="absolute inset-y-4 w-[2px] overflow-hidden rounded bg-primary-900/8"
            style={{ insetInlineStart: "27px" }}>
            <span className="block w-full rounded bg-gradient-to-b from-gold-500 to-gold-400" style={{ height: `${width}%`, transition: "height .35s linear" }} />
          </span>
          {items.map((s, i) => {
            const on = activeOf(i);
            return (
              <Reveal as="li" key={s.n} delay={i * 80}>
                <div className="relative flex gap-4">
                  <span className={cn("num relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border text-[15px] font-bold transition-all duration-[520ms] ease-lux",
                    on ? "border-gold-500 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-primary-950 shadow-gold" : "border-primary-900/10 bg-white text-primary-900/35")}>
                    {s.n}
                  </span>
                  <div className={cn("flex-1 rounded-[20px] border p-5 transition-all duration-[520ms] ease-lux", on ? "border-gold-500/40 bg-white shadow-ambient" : "border-primary-900/8 bg-white/70")}>
                    <div className="flex items-center gap-2.5">
                      <Icon name={s.icon} className={cn("h-5 w-5 shrink-0", on ? "text-gold-600" : "text-muted")} />
                      <h3 className="text-[15px] font-semibold text-primary-950">{s.title}</h3>
                    </div>
                    <p className="mt-2 text-[12.8px] leading-[1.75] text-body/82">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
