import { DEPARTMENTS } from "@/data/clinic";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

function DeptCard({ d, i, book }: { d: { title: string; desc: string; icon: string }; i: number; book: string }) {
  const { openBooking } = useUI();
  const id = DEPARTMENTS[i]?.id ?? DEPARTMENTS[0].id;
  return (
    <Reveal delay={i * 70} className="group flex w-[282px] shrink-0 snap-start sm:w-auto">
      <article className="relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-primary-900/8 bg-white p-6 shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:border-gold-500/45 hover:shadow-lift sm:p-7">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-right scale-x-0 bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 transition-transform duration-[520ms] ease-lux group-hover:scale-x-100" />
        <span className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[650ms] ease-lux group-hover:bg-gold-500/12" />
        <div className="relative flex items-start justify-between gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-[18px] border border-gold-500/25 bg-gold-50 text-gold-600 transition-all duration-[420ms] ease-lux group-hover:-rotate-3 group-hover:border-gold-500/50 group-hover:bg-gold-500 group-hover:text-primary-950 sm:h-16 sm:w-16">
            <Icon name={d.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
          </span>
          <span className="num select-none text-[34px] font-bold leading-none text-primary-900/8 transition-colors duration-[520ms] group-hover:text-gold-500/35 sm:text-[42px]">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="relative mt-5 text-[16.5px] font-semibold leading-snug text-primary-950 sm:mt-6 sm:text-[19px]">{d.title}</h3>
        <p className="relative mt-3 flex-1 text-[13px] leading-[1.8] text-body/85 sm:text-[13.5px]">{d.desc}</p>
        <button
          type="button"
          onClick={() => openBooking({ department: id })}
          className="relative mt-6 flex items-center justify-between gap-2 rounded-2xl border border-gold-500/30 bg-gold-50/60 px-4 py-3 text-[12.5px] font-semibold text-gold-700 transition-all duration-[280ms] ease-lux hover:border-gold-500 hover:bg-gold-500 hover:text-primary-950 sm:text-[13.5px]"
        >
          <span>{book}</span>
          <Icon name="arrow" className="h-4 w-4 shrink-0 transition-transform duration-[280ms] ease-lux group-hover:-translate-x-1" />
        </button>
      </article>
    </Reveal>
  );
}

export default function Departments() {
  const { t } = useI18n();
  const items = t.departments.items;
  return (
    <section id="departments" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.departments.eyebrow} icon="tooth" title={t.departments.title} lead={t.departments.lead} />
        <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-3">
          {items.slice(0, 3).map((d, i) => <DeptCard key={d.id} d={d} i={i} book={t.departments.book} />)}
        </div>
        <div className="mt-6 hidden gap-6 lg:grid lg:grid-cols-4">
          {items.slice(3).map((d, i) => <DeptCard key={d.id} d={d} i={i + 3} book={t.departments.book} />)}
        </div>
        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 hide-scrollbar sm:-mx-7 sm:px-7 lg:hidden">
          {items.map((d, i) => <DeptCard key={d.id} d={d} i={i} book={t.departments.book} />)}
        </div>
        <p className="mt-1 text-center text-[11.5px] text-muted/80 lg:hidden">{t.departments.swipe}</p>
      </Container>
    </section>
  );
}
