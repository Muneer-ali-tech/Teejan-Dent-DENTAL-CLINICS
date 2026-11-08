import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { CONTACT } from "@/data/clinic";
import { isSaudiPhone, toSaudiDigits, useBodyLock } from "@/lib/hooks";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Icon } from "@/components/ui/Icons";

const KEY = "teejan-booking-draft";

type Draft = {
  name: string; phone: string; email: string; branch: string;
  department: string; doctor: string; date: string; time: string; notes: string;
};

const EMPTY: Draft = { name: "", phone: "", email: "", branch: "", department: "", doctor: "", date: "", time: "", notes: "" };

function load(): Draft {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Draft>) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function buildDays() {
  const out: { iso: string; label: string; month: string; num: number }[] = [];
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("ar-EG", { weekday: "long" }).format(d),
      month: new Intl.DateTimeFormat("ar-EG", { month: "long" }).format(d),
      num: d.getDate(),
    });
  }
  return out;
}

const MORNING = ["9:00", "10:00", "11:00", "12:00", "1:00"];
const EVENING = ["4:00", "5:00", "6:00", "7:00", "8:00", "9:00"];

export default function BookingModal() {
  const { bookingOpen, closeBooking, prefill } = useUI();
  const { t } = useI18n();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [guard, setGuard] = useState(false);
  const [ref, setRef] = useState("");
  const [done, setDone] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const days = useMemo(buildDays, []);

  useBodyLock(bookingOpen);

  useEffect(() => {
    if (!bookingOpen) return;
    setDraft({ ...load(), ...prefill });
    setDone(false); setError(""); setStep(1); setGuard(false);
  }, [bookingOpen, prefill]);

  useEffect(() => {
    if (!bookingOpen) return;
    try { sessionStorage.setItem(KEY, JSON.stringify(draft)); } catch { /* ignore */ }
  }, [draft, bookingOpen]);

  useEffect(() => {
    if (!bookingOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeBooking(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bookingOpen, closeBooking]);

  if (!bookingOpen) return null;

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const b = t.booking;
  const steps = [b.step1, b.step2, b.step3, b.step4];

  const docs = (t.doctors.items as { id: string; name: string; role: string; dept: string; branch: string; schedule: string }[])
    .filter((d) => (!draft.department || d.dept === draft.department) && (!draft.branch || d.branch === draft.branch));
  const docList = docs.length ? docs : t.doctors.items.filter((d) => !draft.branch || d.branch === draft.branch);

  const validate = () => {
    if (step === 1) {
      if (draft.name.trim().length < 3) { setError(b.e1); return false; }
      if (!isSaudiPhone(toSaudiDigits(draft.phone))) { setError(b.e2); return false; }
    }
    if (step === 2) {
      if (!draft.branch) { setError(b.e3); return false; }
      if (!draft.department) { setError(b.e4); return false; }
    }
    if (step === 3 && !draft.doctor) { setError(b.e5); return false; }
    if (step === 4) {
      if (!draft.date) { setError(b.e6); return false; }
      if (!draft.time) { setError(b.e7); return false; }
    }
    setError("");
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 4) { setStep(step + 1); return; }
    setRef(`TJ-${Math.floor(1000 + Math.random() * 8999)}`);
    setDone(true);
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
  };

  const chosenDoctor = t.doctors.items.find((d) => d.id === draft.doctor);
  const chosenBranch = t.branches.items.find((x) => x.id === draft.branch);
  const chosenDept = t.departments.items.find((d) => d.id === draft.department);
  const waText = encodeURIComponent(
    `${CONTACT.whatsappMessage}\n\n${b.fName}: ${draft.name}\n${b.summaryBranch}: ${chosenBranch?.name ?? "-"}\n${b.summaryDept}: ${chosenDept?.title ?? "-"}\n${b.summaryDoctor}: ${chosenDoctor?.name ?? b.summaryAny}\n${b.summaryDate}: ${draft.date} • ${draft.time}\nRef: ${ref}`,
  );

  const field = "w-full rounded-2xl border border-primary-900/12 bg-base px-4 py-3.5 text-[14.5px] text-primary-950 placeholder:text-muted/60 transition-colors duration-300 focus:border-gold-500 focus:outline-none";
  const label = "mb-1.5 block text-[12.5px] font-medium text-primary-950";

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-primary-950/70 backdrop-blur-[10px]" onClick={() => setGuard(true)} aria-hidden="true" />

      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="booking-title"
        className="pop-in relative flex max-h-[92vh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-[28px]">

        <div className="relative shrink-0 border-b border-gold-500/18 bg-white px-5 pt-5 pb-5 sm:px-8 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3.5 py-1.5 text-[11px] font-semibold text-gold-700">
                <Icon name="tooth" className="h-3.5 w-3.5" />
                {b.system}
              </span>
              <h2 id="booking-title" className="mt-3 text-[18px] font-semibold text-primary-950 sm:text-[22px]">
                {done ? b.titleDone : b.titleOpen}
              </h2>
            </div>
            <button type="button" onClick={closeBooking} aria-label={b.close}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary-900/10 text-muted transition-colors hover:border-gold-500/50 hover:text-primary-950">
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          {!done && (
            <div className="mt-5">
              <div className="flex items-center justify-between gap-2">
                <ol className="flex items-center gap-2 sm:gap-4">
                  {steps.map((s, i) => (
                    <li key={s} className={cn("flex items-center gap-1.5 text-[11.5px] font-medium transition-colors duration-300",
                      i + 1 === step ? "text-primary-950" : i + 1 < step ? "text-gold-600" : "text-muted/60")}>
                      <span className={cn("num grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold",
                        i + 1 < step ? "bg-gold-500 text-primary-950" : i + 1 === step ? "bg-primary-950 text-gold-400" : "bg-porcelain text-muted/70")}>
                        {i + 1}
                      </span>
                      <span className="hidden sm:inline">{s}</span>
                    </li>
                  ))}
                </ol>
                <span className="num shrink-0 text-[12px] font-semibold text-gold-600">{Math.round((step / 4) * 100)}%</span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-porcelain">
                <div className="h-full rounded-full bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 transition-[width] duration-[650ms] ease-lux"
                  style={{ width: `${(step / 4) * 100}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {done ? (
            <div className="py-4 text-center">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-primary-950 shadow-gold-lg">
                <Icon name="check" className="h-10 w-10" />
              </span>
              <h3 className="mt-6 text-[19px] font-semibold text-primary-950">{b.successTitle}</h3>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.85] text-body/85">
                {b.successRef} <span className="num font-bold text-gold-700">#{ref}</span> — {b.successText}
              </p>
              <div className="mx-auto mt-6 grid max-w-md gap-2.5 rounded-[20px] bg-porcelain p-5">
                {[
                  [b.summaryBranch, chosenBranch ? `${chosenBranch.name} — ${chosenBranch.city}` : "—"],
                  [b.summaryDept, chosenDept?.title ?? "—"],
                  [b.summaryDoctor, chosenDoctor?.name ?? b.summaryAny],
                  [b.summaryDate, `${draft.date} • ${draft.time}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="text-muted">{k}</span>
                    <span className="font-semibold text-primary-950">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a href={`https://wa.me/${CONTACT.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 py-3.5 text-[14.5px] font-semibold text-primary-950 transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 sm:w-auto">
                  <Icon name="whatsapp" className="h-[18px] w-[18px]" />
                  {b.sendWa}
                </a>
                <button type="button" onClick={closeBooking}
                  className="w-full rounded-full border border-primary-900/12 px-7 py-3.5 text-[14.5px] font-semibold text-primary-900 transition-colors hover:border-gold-500/50 sm:w-auto">
                  {b.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-[13px] text-muted">{b.s1}</p>
                  <div>
                    <label htmlFor="bk-name" className={label}>{b.fName} <span className="text-alert">*</span></label>
                    <input id="bk-name" value={draft.name} onChange={(e) => set("name", e.target.value)} className={field} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-phone" className={label}>{b.fPhone} <span className="text-alert">*</span></label>
                      <input id="bk-phone" inputMode="tel" dir="ltr" value={draft.phone} onChange={(e) => set("phone", e.target.value)} placeholder="05XXXXXXXX" className={cn(field, "num text-start")} />
                    </div>
                    <div>
                      <label htmlFor="bk-email" className={label}>{b.fEmail} <span className="text-muted/70">{b.optional}</span></label>
                      <input id="bk-email" type="email" dir="ltr" value={draft.email} onChange={(e) => set("email", e.target.value)} placeholder="name@email.com" className={cn(field, "text-start")} />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-[13px] text-muted">{b.s2}</p>
                  <fieldset>
                    <legend className={label}>{b.branchField} <span className="text-alert">*</span></legend>
                    <div className="mt-2 grid gap-3 sm:grid-cols-3">
                      {t.branches.items.map((x) => (
                        <button key={x.id} type="button" onClick={() => set("branch", x.id)} aria-pressed={draft.branch === x.id}
                          className={cn("rounded-2xl border p-4 text-start transition-all duration-[280ms] ease-lux",
                            draft.branch === x.id ? "border-gold-500 bg-gold-50 shadow-gold" : "border-primary-900/10 bg-white hover:border-gold-500/50")}>
                          <span className="flex items-center justify-between">
                            <span className="text-[14px] font-semibold text-primary-950">{x.name}</span>
                            <span className={cn("grid h-5 w-5 place-items-center rounded-full border", draft.branch === x.id ? "border-gold-500 bg-gold-500 text-primary-950" : "border-primary-900/15")}>
                              {draft.branch === x.id && <Icon name="check" className="h-3 w-3" />}
                            </span>
                          </span>
                          <span className="mt-1 block text-[11.5px] text-muted">{x.city} — {x.area}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className={label}>{b.deptField} <span className="text-alert">*</span></legend>
                    <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                      {t.departments.items.map((d) => (
                        <button key={d.id} type="button" onClick={() => set("department", d.id)} aria-pressed={draft.department === d.id}
                          className={cn("flex items-center gap-3 rounded-2xl border p-3.5 text-start transition-all duration-[280ms] ease-lux",
                            draft.department === d.id ? "border-gold-500 bg-gold-50" : "border-primary-900/10 bg-white hover:border-gold-500/50")}>
                          <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", draft.department === d.id ? "bg-gold-500 text-primary-950" : "bg-porcelain text-gold-600")}>
                            <Icon name={d.icon} className="h-4.5 w-4.5" />
                          </span>
                          <span className="text-[13px] font-medium leading-snug text-primary-950">{d.title}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-[13px] text-muted">
                    {b.s3} {chosenBranch ? `${b.s3b} ${chosenBranch.name}` : ""}.
                  </p>
                  <button type="button" onClick={() => set("doctor", "any")}
                    className={cn("flex w-full items-center gap-3.5 rounded-2xl border p-4 text-start transition-all duration-[280ms] ease-lux",
                      draft.doctor === "any" ? "border-gold-500 bg-gold-50 shadow-gold" : "border-primary-900/10 bg-white hover:border-gold-500/50")}>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-950 text-gold-400">
                      <Icon name="sparkle" className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-semibold text-primary-950">{b.anyDoctor}</span>
                      <span className="mt-0.5 block text-[12px] text-muted">{b.anyDoctorSub}</span>
                    </span>
                  </button>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {docList.map((d) => (
                      <button key={d.id} type="button" onClick={() => set("doctor", d.id)}
                        className={cn("flex items-center gap-3 rounded-2xl border p-3.5 text-start transition-all duration-[280ms] ease-lux",
                          draft.doctor === d.id ? "border-gold-500 bg-gold-50" : "border-primary-900/10 bg-white hover:border-gold-500/50")}>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-900 to-primary-950 text-[15px] font-bold text-gold-400">
                          {d.name.replace(/^(د\.|Dr\.)\s*/, "").slice(0, 1)}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[13.5px] font-semibold text-primary-950">{d.name}</span>
                          <span className="mt-0.5 block truncate text-[11.5px] text-muted">{d.role}</span>
                          <span className="mt-1 inline-flex items-center gap-1 text-[10.5px] text-gold-600">
                            <Icon name="clock" className="h-3 w-3" />
                            {d.schedule}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <p className="text-[13px] text-muted">{b.s4}</p>
                  <div>
                    <span className={label}>{b.dayField} <span className="text-alert">*</span></span>
                    <div className="mt-2 flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar">
                      {days.map((d) => (
                        <button key={d.iso} type="button" onClick={() => set("date", d.iso)}
                          className={cn("flex w-[74px] shrink-0 flex-col items-center rounded-2xl border py-3 transition-all duration-[280ms] ease-lux",
                            draft.date === d.iso ? "border-gold-500 bg-gold-500 text-primary-950 shadow-gold" : "border-primary-900/10 bg-white text-primary-950 hover:border-gold-500/50")}>
                          <span className="text-[11px] opacity-75">{d.label}</span>
                          <span className="num mt-0.5 text-[19px] font-bold">{d.num}</span>
                          <span className="text-[10px] opacity-70">{d.month}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[[b.morning, MORNING, b.am], [b.evening, EVENING, b.pm]].map(([title, arr, suffix]) => (
                      <fieldset key={title as string}>
                        <legend className={label}>{title as string}</legend>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(arr as string[]).map((x) => (
                            <button key={x} type="button" onClick={() => set("time", `${x} ${suffix}`)}
                              className={cn("num rounded-xl border px-3.5 py-2 text-[12.5px] font-medium transition-all duration-[280ms] ease-lux",
                                draft.time === `${x} ${suffix}` ? "border-gold-500 bg-gold-500 text-primary-950" : "border-primary-900/10 bg-white text-body hover:border-gold-500/50")}>
                              {x}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="bk-notes" className={label}>{b.notes} <span className="text-muted/70">{b.optional}</span></label>
                    <textarea id="bk-notes" rows={3} value={draft.notes} onChange={(e) => set("notes", e.target.value)} placeholder={b.notesPh}
                      className={cn(field, "resize-none leading-relaxed")} />
                  </div>
                </div>
              )}

              {error && (
                <p className="mt-5 flex items-start gap-2 rounded-2xl border border-alert/25 bg-alert/5 px-4 py-3 text-[12.5px] text-alert">
                  <Icon name="close" className="mt-0.5 h-3.5 w-3.5" />
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        {!done && (
          <div className="shrink-0 border-t border-gold-500/18 bg-porcelain px-5 py-4 sm:px-8">
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
                className="rounded-full border border-primary-900/12 bg-white px-5 py-3 text-[13.5px] font-semibold text-primary-900 transition-all duration-[280ms] ease-lux hover:border-gold-500/50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6">
                {b.prev}
              </button>
              <span className="hidden text-[11.5px] text-muted sm:block">{b.savedHint}</span>
              <button type="button" onClick={next}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 px-6 py-3 text-[13.5px] font-semibold text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:shadow-gold-lg sm:px-7">
                {step === 4 ? <><Icon name="check" className="h-4 w-4" />{b.confirm}</> : <>{b.next}<Icon name="arrow" className="h-4 w-4" /></>}
              </button>
            </div>
          </div>
        )}

        {guard && !done && (
          <div role="status" className="absolute inset-x-5 bottom-24 flex items-center gap-3 rounded-2xl border border-gold-500/35 bg-primary-950/95 px-5 py-4 text-white shadow-lift backdrop-blur-md sm:inset-x-auto sm:left-8 sm:max-w-sm">
            <Icon name="shield" className="h-5 w-5 shrink-0 text-gold-400" />
            <span className="text-[12.5px] leading-relaxed">{b.guard}</span>
            <button type="button" onClick={() => setGuard(false)} aria-label="Dismiss" className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/20">
              <Icon name="close" className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
