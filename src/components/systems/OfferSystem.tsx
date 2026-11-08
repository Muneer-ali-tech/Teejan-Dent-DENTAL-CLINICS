import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useMediaQuery, useScrollProgress } from "@/lib/hooks";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Icon } from "@/components/ui/Icons";

const FLAG = "teejan-offer-shown";

export default function OfferSystem() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [ribbon, setRibbon] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const { openBooking, setOfferRibbon } = useUI();
  const { t } = useI18n();
  const o = t.offerPopup;

  const alreadyShown = () => {
    try { return sessionStorage.getItem(FLAG) === "1"; } catch { return false; }
  };
  const markShown = () => { try { sessionStorage.setItem(FLAG, "1"); } catch { /* ignore */ } };

  /* ── Desktop modal ── fires on scroll depth ≥ 50% OR exit-intent.
        No timers. Hard-capped to once per session via sessionStorage. ── */
  useEffect(() => {
    if (!isDesktop || open || alreadyShown()) return;
    if (progress >= 0.5) {
      markShown();
      setOpen(true);
    }
  }, [isDesktop, progress, open]);

  useEffect(() => {
    if (!isDesktop) return;
    const onLeave = (e: MouseEvent) => {
      // Exit-intent: pointer leaves the document through the top edge
      if (e.clientY > 0 || alreadyShown()) return;
      markShown();
      setOpen(true);
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [isDesktop]);

  /* ── Mobile ribbon ── scroll depth ≥ 50% only. Never an intrusive modal. ── */
  useEffect(() => {
    if (isDesktop || dismissed) {
      setRibbon(false);
      return;
    }
    setRibbon(progress >= 0.5);
  }, [isDesktop, dismissed, progress]);

  useEffect(() => {
    setOfferRibbon(!isDesktop && ribbon && !dismissed);
  }, [isDesktop, ribbon, dismissed, setOfferRibbon]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3) return setErr(o.eName);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setErr(o.eMail);
    setErr("");
    setSent(true);
  };

  /* ——— Desktop modal ——— */
  if (isDesktop && open) {
    return (
      <div className="fixed inset-0 z-[85] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-primary-950/72 backdrop-blur-[10px]" onClick={() => setOpen(false)} aria-hidden="true" />
        <div role="dialog" aria-modal="true" aria-labelledby="exit-title"
          className="pop-in relative w-[560px] max-w-full overflow-hidden rounded-[24px] border border-gold-500/35 bg-gradient-to-br from-primary-900 via-primary-950 to-primary-950 shadow-2xl">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-500/18 blur-[90px]" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-primary-700/35 blur-[90px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />

          <button type="button" onClick={() => setOpen(false)} aria-label={t.nav.close}
            className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-gold-500/50 hover:text-white">
            <Icon name="close" className="h-4 w-4" />
          </button>

          <div className="relative p-9 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/12 px-3.5 py-1.5 text-[11px] font-semibold text-gold-300">
              <Icon name="sparkle" className="h-3.5 w-3.5" />
              {o.badge}
            </span>

            <h2 id="exit-title" className="mt-5 text-[22px] font-semibold leading-[1.4] text-white sm:text-[25px]">
              {o.title}
            </h2>
            <p className="mt-3 text-[13.5px] leading-[1.8] text-primary-100/72">{o.sub}</p>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {t.offer.perks.slice(0, 4).map((p) => (
                <span key={p} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-[11.5px] text-primary-100/85">
                  <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-gold-400" />
                  {p}
                </span>
              ))}
            </div>

            {sent ? (
              <div className="mt-7 rounded-2xl border border-gold-500/30 bg-gold-500/10 p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500 text-primary-950 shadow-gold">
                  <Icon name="check" className="h-7 w-7" />
                </span>
                <p className="mt-4 text-[13.5px] leading-relaxed text-gold-200">{o.done}</p>
                <p className="num mt-3 text-[13px] font-bold text-gold-300">{o.code} TJ-SMILE</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-7 space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={o.name} aria-label={o.name}
                  className="w-full rounded-2xl border border-white/15 bg-primary-950/50 px-5 py-3.5 text-[14px] text-white placeholder:text-primary-100/35 transition-colors focus:border-gold-500/60 focus:outline-none" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" dir="ltr" placeholder="name@email.com" aria-label={o.email}
                  className={cn("w-full rounded-2xl border bg-primary-950/50 px-5 py-3.5 text-start text-[14px] text-white placeholder:text-primary-100/35 transition-colors focus:outline-none",
                    err ? "border-alert/70" : "border-white/15 focus:border-gold-500/60")} />
                {err && <p className="text-[11.5px] text-red-300">{err}</p>}
                <button type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 py-3.5 text-[14px] font-semibold text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:shadow-gold-lg">
                  <Icon name="card" className="h-4 w-4" />
                  {o.cta}
                </button>
                <button type="button" onClick={() => setOpen(false)}
                  className="w-full text-[12px] text-primary-100/50 underline-offset-4 transition-colors hover:text-primary-100/80 hover:underline">
                  {o.dismiss}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ——— Mobile ribbon ——— */
  if (!isDesktop && ribbon && !dismissed) {
    return (
      <div role="complementary" aria-label={o.badge}
        className="offer-ribbon fixed inset-x-0 z-[60] flex h-[52px] items-center justify-between gap-2 border-t border-gold-500/35 bg-primary-950/92 px-3 backdrop-blur-md">
        <span className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gold-500 text-primary-950">
            <Icon name="sparkle" className="h-3.5 w-3.5" />
          </span>
          <span className="truncate text-[12px] font-medium text-gold-300">{o.ribbon}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <button type="button" onClick={() => { setDismissed(true); openBooking(); }}
            className="rounded-full bg-gold-500 px-4 py-2 text-[12px] font-semibold text-primary-950 transition-colors hover:bg-gold-400">
            {o.ribbonCta}
          </button>
          <button type="button" onClick={() => setDismissed(true)} aria-label={t.nav.close}
            className="grid h-8 w-8 place-items-center rounded-full text-primary-100/50 transition-colors hover:text-white">
            <Icon name="close" className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>
    );
  }

  return null;
}
