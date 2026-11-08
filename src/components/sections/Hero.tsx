import { useRef, useState } from "react";
import heroSuite from "@/assets/hero-suite.jpg";
import { WHATSAPP_URL } from "@/data/clinic";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, GoldButton, GoldGlow } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

export default function Hero() {
  const { openBooking } = useUI();
  const { t } = useI18n();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  return (
    <section
      id="top"
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative overflow-hidden bg-primary-950 pt-28 pb-24 sm:pt-32 lg:pt-48 lg:pb-32"
    >
      <GoldGlow className="-top-40 right-[-10%] h-[520px] w-[520px] bg-primary-800/50" />
      <GoldGlow className="bottom-[-30%] left-[-12%] h-[560px] w-[560px] bg-gold-500/12" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,191,155,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(216,191,155,.6) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(ellipse 70% 60% at 70% 30%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 70% 30%, #000 20%, transparent 75%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <div
              className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 backdrop-blur-sm"
              style={{ animation: "reveal-up .9s var(--ease-lux) both" }}
            >
              <Icon name="tooth" className="h-4 w-4 shrink-0 text-gold-400" />
              <span className="min-w-0 break-words text-[10.5px] font-medium leading-snug text-gold-300 sm:text-xs">
                {t.hero.badge}
              </span>
            </div>

            <h1
              className="mt-7 text-[30px] font-bold leading-[1.3] text-white sm:text-[40px] lg:text-[52px] lg:leading-[1.25]"
              style={{ animation: "reveal-up .95s .1s var(--ease-lux) both" }}
            >
              {t.hero.titleA}{" "}
              <span className="text-gold-gradient">{t.hero.titleB}</span>..
              <br className="hidden sm:block" />
              {t.hero.titleC}{" "}
              <span className="relative inline-block">
                {t.hero.titleD}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 right-0 h-2.5 w-full text-gold-500/70"
                  preserveAspectRatio="none"
                >
                  <path d="M2 8c60-6 120-6 180-3s80 4 116 1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p
              className="mt-7 max-w-xl text-[14.5px] leading-[1.85] text-primary-100/78 sm:text-[17px] sm:leading-[1.8]"
              style={{ animation: "reveal-up .95s .2s var(--ease-lux) both" }}
            >
              {t.hero.lead}
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animation: "reveal-up .95s .3s var(--ease-lux) both" }}
            >
              <GoldButton onClick={() => openBooking()} className="w-full px-8 py-4 sm:w-auto">
                {t.hero.cta}
              </GoldButton>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-whatsapp/45 bg-whatsapp/10 px-8 py-4 text-base font-semibold text-whatsapp backdrop-blur-sm transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:bg-whatsapp hover:text-primary-950 sm:w-auto"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                {t.hero.whatsapp}
              </a>
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/8 pt-7"
              style={{ animation: "reveal-up .95s .4s var(--ease-lux) both" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex -space-x-2 space-x-reverse">
                  {["T", "M", "A", "S"].map((c, i) => (
                    <span
                      key={c}
                      className="grid h-8 w-8 place-items-center rounded-full border border-primary-950 bg-gradient-to-br from-primary-800 to-primary-900 text-[11px] font-semibold text-gold-300"
                      style={{ zIndex: 4 - i }}
                    >
                      {c}
                    </span>
                  ))}
                </span>
                <div className="leading-tight">
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className="h-3 w-3 text-gold-500" />
                    ))}
                    <span className="num mr-1 text-[12px] font-semibold text-white">4.9/5</span>
                  </span>
                  <span className="text-[11.5px] text-primary-100/60">{t.hero.rating}</span>
                </div>
              </div>
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <span className="inline-flex items-center gap-2 text-[12.5px] text-primary-100/75">
                <Icon name="shield" className="h-4 w-4 text-gold-500" />
                {t.hero.moh}
              </span>
              <span className="inline-flex items-center gap-2 text-[12.5px] text-primary-100/75">
                <Icon name="sparkle" className="h-4 w-4 text-gold-500" />
                {t.hero.painless}
              </span>
            </div>
          </div>

          <div className="relative" style={{ animation: "reveal-up 1.1s .25s var(--ease-lux) both" }}>
            <div
              className="relative mx-auto max-w-[520px] transition-transform duration-[900ms] ease-lux will-change-transform"
              style={{
                transform: `perspective(1200px) rotateY(${tilt.x * -3.2}deg) rotateX(${tilt.y * 2.6}deg) translate3d(${tilt.x * -10}px, ${tilt.y * -8}px, 0)`,
              }}
            >
              <div className="absolute -inset-4 rounded-[38px] border border-gold-500/20" />
              <div className="relative overflow-hidden rounded-[32px] border border-gold-500/25 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]">
                <img
                  src={heroSuite}
                  alt={t.experience.gallery[0].alt}
                  width={880}
                  height={1100}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent" />

                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="group absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-gold-500/25 bg-white/10 p-3.5 text-start backdrop-blur-xl transition-all duration-[420ms] ease-lux hover:border-gold-400/60 hover:bg-white/16 sm:inset-x-6 sm:bottom-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-400 text-primary-950 shadow-gold">
                    <Icon name="calendar" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-semibold text-white">
                      {t.hero.quickTitle}
                    </span>
                    <span className="block text-[11.5px] text-primary-100/70">
                      {t.hero.quickSub}
                    </span>
                  </span>
                  <Icon name="arrow" className="h-5 w-5 shrink-0 text-gold-400 transition-transform duration-300 group-hover:-translate-x-1" />
                </button>
              </div>

              <div
                className="absolute -right-4 top-10 hidden animate-float-slow rounded-2xl border border-gold-500/25 bg-primary-950/85 px-4 py-3 backdrop-blur-xl sm:block"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="num text-xl font-bold text-gold-400">60</div>
                <div className="text-[10.5px] text-primary-100/70">{t.hero.chipScan}</div>
              </div>
              <div
                className="absolute -left-5 bottom-28 hidden animate-float-slow rounded-2xl border border-gold-500/25 bg-primary-950/85 px-4 py-3 backdrop-blur-xl md:block"
                style={{ animationDelay: "3.4s" }}
              >
                <div className="num text-xl font-bold text-gold-400">7</div>
                <div className="text-[10.5px] text-primary-100/70">{t.hero.chipSterile}</div>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
