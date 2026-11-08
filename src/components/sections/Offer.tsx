import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";
import { Icon } from "@/components/ui/Icons";

function endOfWeek() {
  const now = new Date();
  const diff = (4 - now.getDay() + 7) % 7;
  const t = new Date(now);
  t.setDate(now.getDate() + diff);
  t.setHours(23, 59, 59, 0);
  if (t.getTime() <= now.getTime()) t.setDate(t.getDate() + 7);
  return t;
}

export default function Offer() {
  const [left, setLeft] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    const target = endOfWeek().getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s = Math.floor(left / 1000);
  const parts = [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3) return setErr(t.offerPopup.eName);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setErr(t.offerPopup.eMail);
    setErr("");
    setSent(true);
  };

  return (
    <section id="offer" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <div className="relative overflow-hidden rounded-[26px] border border-gold-500/30 bg-gradient-to-br from-primary-900 via-primary-950 to-primary-950 p-6 shadow-lift sm:rounded-[32px] sm:p-10 lg:p-12">
          <div aria-hidden="true" className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold-500/14 blur-[110px]" />
          <div aria-hidden="true" className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-primary-700/40 blur-[110px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/12 px-4 py-2 text-[11px] font-semibold text-gold-300 sm:text-xs">
                <Icon name="sparkle" className="h-3.5 w-3.5" />
                {t.offer.badge}
              </span>
              <h2 className="mt-5 text-[22px] font-semibold leading-[1.3] text-white sm:text-[30px] lg:text-[34px]">{t.offer.title}</h2>
              <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-primary-100/78 sm:text-[16px]">
                {t.offer.lead} <span className="font-semibold text-gold-300">{t.offer.leadGold}</span>.
              </p>

              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {t.offer.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-[12.5px] text-primary-100/85">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-primary-950">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <p className="text-[12.5px] font-medium tracking-wide text-gold-300/85">{t.offer.limited}</p>
                {/* Countdown — always centred and symmetrically balanced */}
                <div className="mx-auto mt-4 flex w-full max-w-md items-center justify-center gap-2 sm:gap-4">
                  {parts.map((v, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center">
                      <div className="relative w-full overflow-hidden rounded-xl border border-gold-500/25 bg-primary-950/70 py-2.5 text-center backdrop-blur-md sm:rounded-2xl sm:py-4">
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold-500/12 to-transparent" />
                        <span className="num relative block text-[22px] font-bold leading-none text-gold-400 sm:text-[32px]">
                          {String(v).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 text-center text-[10px] text-primary-100/60 sm:text-[11.5px]">{t.offer.units[i]}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3.5 text-[12px] text-primary-100/55">{t.offer.endsIn}</p>
              </div>
            </div>

            <div className="rounded-[26px] border border-gold-500/22 bg-white/[0.05] p-6 backdrop-blur-md sm:p-7">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-500 text-primary-950 shadow-gold-lg">
                    <Icon name="check" className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold text-white">{t.offer.successTitle}</h3>
                  <p className="mt-2.5 max-w-xs text-[13px] leading-relaxed text-primary-100/72">{t.offer.successText}</p>
                  <div className="num mt-5 rounded-full border border-gold-500/30 bg-gold-500/10 px-5 py-2 text-[12px] text-gold-300">
                    {t.offer.codeLabel} <span className="font-bold">TJ-FREE</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 className="text-[18px] font-semibold text-white">{t.offer.formTitle}</h3>
                  <p className="mt-1.5 text-[12.5px] text-primary-100/65">{t.offer.formSub}</p>
                  <div className="mt-6 space-y-3.5">
                    <div>
                      <label htmlFor="offer-name" className="mb-1.5 block text-[12px] text-primary-100/70">{t.offer.name}</label>
                      <input id="offer-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.offer.namePh}
                        className="w-full rounded-2xl border border-white/12 bg-primary-950/40 px-4 py-3.5 text-[14px] text-white placeholder:text-primary-100/35 transition-colors duration-300 focus:border-gold-500/60 focus:outline-none" />
                    </div>
                    <div>
                      <label htmlFor="offer-email" className="mb-1.5 block text-[12px] text-primary-100/70">{t.offer.email}</label>
                      <input id="offer-email" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com"
                        className={cn("w-full rounded-2xl border bg-primary-950/40 px-4 py-3.5 text-start text-[14px] text-white placeholder:text-primary-100/35 transition-colors duration-300 focus:outline-none",
                          err ? "border-alert/70" : "border-white/12 focus:border-gold-500/60")} />
                    </div>
                  </div>
                  {err && <p className="mt-3 flex items-start gap-2 text-[12px] text-red-300"><Icon name="close" className="mt-0.5 h-3.5 w-3.5" />{err}</p>}
                  <button type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-[26px] bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 px-5 py-4 text-center text-[13.5px] font-semibold leading-snug text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:shadow-gold-lg sm:rounded-full sm:text-[14.5px]">
                    <Icon name="sparkle" className="h-[18px] w-[18px]" />
                    {t.offer.cta}
                  </button>
                  <p className="mt-3.5 text-center text-[11px] leading-relaxed text-primary-100/45">{t.offer.privacy}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
