import { useState } from "react";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

const money = (v: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v);

const MIN = 500;
const MAX = 60000;

export default function Financing() {
  const [amount, setAmount] = useState(8000);
  const { openBooking } = useUI();
  const { t, dir } = useI18n();

  /* The fill is anchored to the slider's logical start so it always tracks
     the thumb: RTL grows right → left, LTR grows left → right. */
  const pct = ((amount - MIN) / (MAX - MIN)) * 100;
  const fillDirection = dir === "rtl" ? "to left" : "to right";

  return (
    <section id="financing" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t.financing.eyebrow} icon="card" title={t.financing.title} lead={t.financing.lead} />

        {/* Seamless infinite marquee — 4 duplicated copies travel exactly one
            copy per cycle, so the loop has no seam, jump or blank reset.
            The wrapper is scrollable for touch swipes / trackpad dragging. */}
        <Reveal delay={110}>
          <div
            className="marquee-wrap mt-12 touch-pan-x overflow-x-auto overscroll-x-contain rounded-[24px] border border-gold-500/20 bg-porcelain py-6 hide-scrollbar"
            aria-label={t.financing.eyebrow}
          >
            <div
              className="marquee-track gap-4 px-4"
              style={{ "--marquee-duration": "42s" } as React.CSSProperties}
            >
              {[0, 1, 2, 3].flatMap((copy) =>
                t.financing.partners.map((p) => (
                  <span
                    key={`${copy}-${p}`}
                    className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-primary-900/8 bg-white px-6 py-3 text-[13px] font-semibold text-primary-900 shadow-ambient"
                  >
                    <Icon name="check" className="h-3.5 w-3.5 text-gold-600" />
                    {p}
                  </span>
                )),
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="space-y-4">
            {t.financing.items.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <div className="group flex gap-4 rounded-[22px] border border-primary-900/8 bg-white p-5 shadow-ambient transition-all duration-[420ms] ease-lux hover:-translate-y-1 hover:border-gold-500/40 sm:p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-50 text-gold-600 transition-all duration-[420ms] ease-lux group-hover:bg-gold-500 group-hover:text-primary-950">
                    <Icon name={b.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-[16.5px] font-semibold text-primary-950">{b.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.75] text-body/85">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-primary-900 to-primary-950 p-6 shadow-lift sm:p-8">
              <div aria-hidden="true" className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gold-500/12 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-[11.5px] font-semibold text-gold-300">
                  <Icon name="card" className="h-3.5 w-3.5" />
                  {t.financing.calcBadge}
                </span>
                <h3 className="mt-4 text-[19px] font-semibold text-white sm:text-[23px]">{t.financing.calcTitle}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-primary-100/70">{t.financing.calcSub}</p>

                <div className="mt-7 rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
                  <label htmlFor="cost" className="flex items-center justify-between gap-3 text-[12.5px] text-primary-100/70">
                    <span>{t.financing.costLabel}</span>
                    <span className="num text-[16px] font-bold text-gold-400 sm:text-[17px]">
                      {money(amount)} <span className="text-[12px]">SAR</span>
                    </span>
                  </label>
                  <input
                    id="cost"
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={500}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    aria-valuetext={`${money(amount)} SAR`}
                    className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-gold-500"
                    style={{
                      background: `linear-gradient(${fillDirection}, #C5A880 0%, #C5A880 ${pct}%, rgba(255,255,255,.15) ${pct}%, rgba(255,255,255,.15) 100%)`,
                    }}
                  />
                  <div className="num mt-2 flex justify-between text-[10.5px] text-primary-100/45">
                    <span>500</span><span>60,000</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-[18px] border border-gold-500/25 bg-gold-500/10 p-4 text-center">
                    <div className="text-[11px] text-gold-300/80">{t.financing.firstPayment}</div>
                    <div className="num mt-1.5 text-[20px] font-bold text-gold-400 sm:text-[22px]">{money(Math.round(amount * 0.25))}</div>
                    <div className="text-[10.5px] text-primary-100/55">{t.financing.riyal}</div>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4 text-center">
                    <div className="text-[11px] text-primary-100/70">{t.financing.eachPayment}</div>
                    <div className="num mt-1.5 text-[20px] font-bold text-white sm:text-[22px]">{money(Math.round(amount / 4))}</div>
                    <div className="text-[10.5px] text-primary-100/55">{t.financing.monthly}</div>
                  </div>
                </div>

                <button type="button" onClick={() => openBooking()}
                  className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-[26px] bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 px-5 py-4 text-center text-[13.5px] font-semibold leading-snug text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:shadow-gold-lg sm:rounded-full sm:text-[14.5px]">
                  <Icon name="send" className="h-[18px] w-[18px]" />
                  {t.financing.cta}
                </button>
                <p className="mt-3.5 text-center text-[11px] leading-relaxed text-primary-100/50">{t.financing.disclaimer}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
