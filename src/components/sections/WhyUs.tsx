import { useI18n } from "@/i18n";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

export default function WhyUs() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-porcelain py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.why.eyebrow} icon="crown" title={t.why.title} lead={t.why.lead} />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.why.items.map((p, i) => (
            <Reveal key={p.n} delay={i * 100} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[26px] border border-primary-900/8 bg-white p-6 shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:shadow-lift sm:p-8">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-[650ms] ease-lux group-hover:opacity-100"
                  style={{ padding: "1.5px", background: "linear-gradient(160deg, rgba(197,168,128,.85), rgba(197,168,128,0) 45%, rgba(197,168,128,.55))", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gold-500/0 blur-3xl transition-all duration-700 group-hover:bg-gold-500/14" />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-16 w-16 place-items-center rounded-[22px] bg-primary-950 text-gold-400 transition-transform duration-[420ms] ease-lux group-hover:-rotate-3 group-hover:scale-105">
                    <Icon name={p.icon} className="h-8 w-8" />
                  </span>
                  <span className="num text-[38px] font-bold leading-none text-gold-500/25 transition-colors duration-500 group-hover:text-gold-500/50">{p.n}</span>
                </div>
                <h3 className="relative mt-7 text-[18px] font-semibold leading-snug text-primary-950 sm:text-[19px]">{p.title}</h3>
                <p className="relative mt-3 text-[13.8px] leading-[1.8] text-body/85">{p.lead}</p>
                <ul className="relative mt-6 space-y-3 border-t border-dashed border-gold-500/25 pt-5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      <span className="text-[13px] leading-[1.7] text-body/85">{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
