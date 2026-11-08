import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

type Doc = {
  id: string; name: string; role: string; dept: string; branch: string; schedule: string; tier: "consultant" | "specialist" | "fellow";
};

function Card({ d, book, photoSoon, tier, branchName, cityName }: { d: Doc; book: string; photoSoon: string; tier: string; branchName: string; cityName: string }) {
  const { openBooking } = useUI();
  const mono = d.name.replace(/^(د\.|Dr\.)\s*/, "").trim().slice(0, 1);
  return (
    <article className="group relative flex h-full w-[272px] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border border-primary-900/8 bg-white shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-2 hover:border-gold-500/45 hover:shadow-lift sm:w-[300px]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-primary-800 via-primary-950 to-primary-900">
        <Icon name="tooth" className="absolute -bottom-8 -left-8 h-40 w-40 text-white/[0.045]" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="relative grid h-[86px] w-[86px] place-items-center rounded-full border border-gold-500/35 bg-white/[0.05] backdrop-blur-sm">
            <span className="absolute inset-0 animate-pulse-gold rounded-full" />
            <span className="relative text-[34px] font-bold text-gold-400">{mono}</span>
          </span>
        </div>
        <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-primary-950/75 px-3 py-2 text-[10px] text-primary-100/65 backdrop-blur-md">
          <Icon name="sparkle" className="h-3 w-3 text-gold-500/80" />
          {photoSoon}
        </span>
        <span className="absolute end-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold text-primary-950 shadow-gold">{tier}</span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary-950/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[16.5px] font-semibold leading-snug text-primary-950">{d.name}</h3>
        <p className="mt-1.5 text-[12.5px] leading-[1.7] text-body/80">{d.role}</p>
        <dl className="mt-4 space-y-2 border-t border-dashed border-gold-500/25 pt-4 text-[11.5px] text-muted">
          <div className="flex items-start gap-2">
            <Icon name="clock" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
            <dd className="leading-relaxed">{d.schedule}</dd>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="pin" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
            <dd className="leading-relaxed">{branchName} — {cityName}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => openBooking({ doctor: d.id, department: d.dept, branch: d.branch })}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-gold-50 py-3 text-[12.5px] font-semibold text-gold-700 transition-all duration-[280ms] ease-lux hover:bg-gold-500 hover:text-primary-950 hover:shadow-gold">
          <Icon name="calendar" className="h-4 w-4" />
          {book}
        </button>
      </div>
    </article>
  );
}

export default function Doctors() {
  const [dept, setDept] = useState("all");
  const [branch, setBranch] = useState("all");
  const [idx, setIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const moved = useRef(false);
  const { openBooking } = useUI();
  const { t } = useI18n();

  const list = useMemo(
    () => (t.doctors.items as Doc[]).filter((d) => (dept === "all" || d.dept === dept) && (branch === "all" || d.branch === branch)),
    [dept, branch, t.doctors.items],
  );

  useEffect(() => {
    const el = track.current;
    if (el) el.scrollTo({ left: 0 });
    setIdx(0);
  }, [dept, branch]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    el.scrollBy({ left: dir * -((card?.offsetWidth ?? 280) + 16), behavior: "smooth" });
  };

  const sync = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return setIdx(0);
    const sl = el.scrollLeft;
    const norm = sl < 0 ? -sl / max : 1 - sl / max;
    setIdx(Math.max(0, Math.min(list.length - 1, Math.round(norm * (list.length - 1)))));
  };

  const chip = (on: boolean) =>
    cn("shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-[280ms] ease-lux sm:text-[12.5px]",
      on ? "border-gold-500 bg-gold-500 text-primary-950 shadow-gold" : "border-primary-900/12 bg-white text-body hover:border-gold-500/50 hover:text-primary-950");

  return (
    <section id="doctors" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.doctors.eyebrow} icon="shield" title={t.doctors.title} lead={t.doctors.lead} />

        <Reveal delay={110}>
          <div className="mt-11 space-y-3">
            <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
              <button type="button" onClick={() => setDept("all")} className={chip(dept === "all")}>{t.doctors.allDepts}</button>
              {t.departments.items.map((d) => (
                <button key={d.id} type="button" onClick={() => setDept(d.id)} className={chip(dept === d.id)}>{d.title}</button>
              ))}
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
              <button type="button" onClick={() => setBranch("all")} className={chip(branch === "all")}>{t.doctors.allBranches}</button>
              {t.branches.items.map((b) => (
                <button key={b.id} type="button" onClick={() => setBranch(b.id)} className={chip(branch === b.id)}>{b.name}</button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <button type="button" onClick={() => go(1)} aria-label={t.doctors.next}
              className="grid h-11 w-11 place-items-center rounded-full border border-primary-900/12 bg-white text-primary-900 shadow-ambient transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-primary-950">
              <Icon name="arrow" className="h-4.5 w-4.5" />
            </button>
            <button type="button" onClick={() => go(-1)} aria-label={t.doctors.prev}
              className="grid h-11 w-11 place-items-center rounded-full border border-primary-900/12 bg-white text-primary-900 shadow-ambient transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-primary-950">
              <Icon name="arrow" className="h-4.5 w-4.5 rotate-180" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="num text-[11.5px] font-semibold text-muted">
              {String(idx + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
            </span>
            <div className="flex max-w-[180px] flex-wrap items-center justify-end gap-1.5">
              {list.map((d, i) => (
                <button key={d.id} type="button" onClick={() => {
                  const el = track.current;
                  if (!el) return;
                  const max = el.scrollWidth - el.clientWidth;
                  el.scrollTo({ left: -(max > 0 ? (i / (list.length - 1)) * max : 0), behavior: "smooth" });
                }} aria-label={d.name}
                  className={cn("h-1.5 rounded-full transition-all duration-[420ms] ease-lux", i === idx ? "w-6 bg-gold-500" : "w-1.5 bg-primary-900/15 hover:bg-gold-500/50")} />
              ))}
            </div>
          </div>
        </div>

        {list.length > 0 ? (
          <div ref={track} onScroll={sync}
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") return;
              const el = track.current;
              if (!el) return;
              drag.current = { x: e.clientX, left: el.scrollLeft };
              setDragging(true);
            }}
            onPointerMove={(e) => {
              const el = track.current;
              if (!el || !drag.current) return;
              const dx = e.clientX - drag.current.x;
              if (Math.abs(dx) > 4) moved.current = true;
              el.scrollLeft = drag.current.left + dx;
            }}
            onPointerUp={() => { drag.current = null; setDragging(false); setTimeout(() => (moved.current = false), 80); }}
            onPointerLeave={() => { drag.current = null; setDragging(false); }}
            onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); } }}
            className={cn("-mx-5 mt-5 flex gap-4 overflow-x-auto px-5 pb-4 pt-2 hide-scrollbar sm:-mx-7 sm:px-7 lg:mx-0 lg:px-0", dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory")}
            style={{ scrollSnapType: dragging ? "none" : "x mandatory" }}>
            {list.map((d) => (
              <Card key={d.id} d={d} book={t.doctors.book} photoSoon={t.doctors.photoSoon} tier={t.doctors.tier[d.tier]}
                branchName={t.branches.items.find((b) => b.id === d.branch)?.name ?? ""} cityName={t.branches.items.find((b) => b.id === d.branch)?.city ?? ""} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[24px] border border-dashed border-gold-500/40 bg-porcelain p-8 text-center sm:p-10">
            <Icon name="calendar" className="mx-auto h-8 w-8 text-gold-600" />
            <p className="mt-4 text-[15px] font-semibold text-primary-950">{t.doctors.empty}</p>
            <p className="mt-2 text-[13px] text-muted">{t.doctors.emptySub}</p>
            <button type="button" onClick={() => { setDept("all"); setBranch("all"); }}
              className="mt-5 rounded-full border border-gold-500/50 px-6 py-2.5 text-[13px] font-semibold text-gold-700 transition-colors hover:bg-gold-500 hover:text-primary-950">
              {t.doctors.emptyCta}
            </button>
          </div>
        )}

        <Reveal delay={120}>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-gold-500/25 bg-gradient-to-l from-primary-950 to-primary-900 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-500/15 text-gold-400">
                  <Icon name="tooth" className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[15.5px] font-semibold text-white sm:text-[16.5px]">{t.doctors.generalTitle}</h3>
                  <p className="mt-1 text-[12px] text-primary-100/65">{t.doctors.generalSub}</p>
                </div>
              </div>
              <button type="button" onClick={() => openBooking()}
                className="rounded-full bg-gold-500 px-6 py-3 text-[13px] font-semibold text-primary-950 transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-gold">
                {t.doctors.generalCta}
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {t.doctors.general.map((n) => (
                <span key={n} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11.5px] text-primary-100/80 transition-colors duration-300 hover:border-gold-500/40 hover:text-white">{n}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
