import { useRef } from "react";
import { useI18n } from "@/i18n";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

export default function Technology() {
  const { t } = useI18n();
  return (
    <section id="technology" className="relative scroll-mt-24 overflow-hidden bg-primary-950 py-20 lg:py-28">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-primary-800/40 blur-[130px]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: "linear-gradient(rgba(216,191,155,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(216,191,155,.7) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      <Container className="relative">
        <SectionHeading eyebrow={t.technology.eyebrow} icon="scanner" tone="dark" title={t.technology.title} lead={t.technology.lead} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.technology.items.map((x, i) => (
            <TechCard key={x.id} x={x} i={i} accuracy={t.technology.accuracy} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TechCard({ x, i, accuracy }: { x: { title: string; latin: string; desc: string; icon: string }; i: number; accuracy: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Reveal delay={i * 70} className="h-full">
      <div ref={ref} onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }} className="group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:border-gold-500/40 sm:p-7">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(197,168,128,0.16), transparent 65%)" }} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold-500/25 bg-gold-500/10 text-gold-400 transition-all duration-[420ms] ease-lux group-hover:border-gold-500/50 group-hover:bg-gold-500 group-hover:text-primary-950">
              <Icon name={x.icon} className="h-7 w-7" />
            </span>
            <span className="num text-[11px] font-semibold tracking-[0.2em] text-gold-500/40">0{i + 1}</span>
          </div>
          <h3 className="mt-6 text-[16.5px] font-semibold leading-snug text-white sm:text-[18px]">{x.title}</h3>
          <p className="mt-1.5 text-[11px] font-medium tracking-[0.16em] text-gold-500/70">{x.latin}</p>
          <p className="mt-4 text-[13.5px] leading-[1.8] text-primary-100/72">{x.desc}</p>
          <div className="mt-6 flex items-center gap-2 border-t border-white/8 pt-4 text-[11.5px] text-gold-500/80">
            <Icon name="precision" className="h-4 w-4" />
            {accuracy}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
