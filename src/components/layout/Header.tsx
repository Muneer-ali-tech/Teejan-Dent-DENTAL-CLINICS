import { useState } from "react";
import { cn } from "@/utils/cn";
import { CONTACT, WHATSAPP_URL } from "@/data/clinic";
import { useI18n } from "@/i18n";
import { useScrollY } from "@/lib/hooks";
import { useUI } from "@/lib/store";
import { Container, GoldButton, Logo } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";
import UtilityBar from "@/components/layout/UtilityBar";

export default function Header() {
  const y = useScrollY();
  const scrolled = y > 40;
  const [menu, setMenu] = useState(false);
  const { openBooking } = useUI();
  const { t, lang, setLang } = useI18n();

  const links = [
    { href: "#/about", label: t.aboutUs.nav },
    { href: "#/services", label: t.servicesPage.nav },
    { href: "#departments", label: t.nav.departments },
    { href: "#doctors", label: t.nav.doctors },
    { href: "#transformations", label: t.nav.results },
    { href: "#technology", label: t.nav.technology },
    { href: "#branches", label: t.nav.branches },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-950"
      >
        {t.nav.skip}
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Utility strip — desktop only, folds away on scroll */}
        <UtilityBar collapsed={scrolled} />

        <div
          className={cn(
            "transition-all duration-500 ease-lux",
            scrolled
              ? "border-b border-gold-500/15 bg-white/85 shadow-ambient backdrop-blur-xl"
              : "border-b border-transparent",
          )}
        >
        <Container
          className={cn(
            "flex items-center justify-between gap-3 transition-all duration-500 ease-lux",
            scrolled ? "py-2" : "py-4",
          )}
        >
          <a href="#top" aria-label="Teejan Dent — Home">
            <Logo tone={scrolled ? "dark" : "light"} />
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "group relative rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-300",
                  scrolled
                    ? "text-body hover:text-primary-950"
                    : "text-primary-100/85 hover:text-white",
                )}
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-gold-500 transition-transform duration-300 ease-lux group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              aria-label="Switch language"
              className={cn(
                "flex h-11 items-center gap-1.5 rounded-2xl border px-3 text-[12px] font-semibold transition-colors duration-300",
                scrolled
                  ? "border-primary-900/12 text-primary-900 hover:border-gold-500/60 hover:bg-gold-50"
                  : "border-white/20 text-white hover:border-gold-400/60 hover:bg-white/10",
              )}
            >
              <Icon name="sparkle" className="h-3.5 w-3.5 text-gold-500" />
              <span className="num tracking-wide">{t.langName}</span>
            </button>

            <a
              href={`tel:${CONTACT.mainPhone}`}
              className={cn(
                "hidden items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-lux md:inline-flex",
                scrolled
                  ? "border-primary-900/12 text-primary-900 hover:border-gold-500/60 hover:bg-gold-50"
                  : "border-white/20 text-white hover:border-gold-400/60 hover:bg-white/10",
              )}
              aria-label={`${t.nav.call} ${CONTACT.mainPhone}`}
            >
              <Icon name="phone" className="h-4 w-4 text-gold-500" />
              <span className="num hidden xl:inline">{CONTACT.mainPhone}</span>
            </a>

            <GoldButton
              onClick={() => openBooking()}
              className="hidden px-6 py-3 text-[14.5px] sm:inline-flex"
            >
              {t.nav.book}
            </GoldButton>

            <button
              type="button"
              onClick={() => openBooking()}
              aria-label={t.nav.book}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-primary-950 shadow-gold transition-transform duration-[280ms] ease-lux active:scale-95 sm:hidden"
            >
              <Icon name="calendar" className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label={t.nav.menu}
              aria-expanded={menu}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-2xl border transition-colors lg:hidden",
                scrolled
                  ? "border-primary-900/12 text-primary-950"
                  : "border-white/20 text-white",
              )}
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </Container>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          menu ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menu}
      >
        <div
          onClick={() => setMenu(false)}
          className={cn(
            "absolute inset-0 bg-primary-950/60 backdrop-blur-sm transition-opacity duration-500",
            menu ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className={cn(
            "absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-primary-950 px-6 py-6 shadow-2xl transition-transform duration-[520ms] ease-lux",
            menu ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => setMenu(false)}
              aria-label={t.nav.close}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-9 flex flex-col gap-1.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="flex items-center justify-between rounded-2xl border border-white/8 px-5 py-4 text-[15.5px] font-medium text-primary-100 transition-colors duration-300 hover:border-gold-500/40 hover:bg-white/5 hover:text-white"
              >
                {l.label}
                <Icon name="arrow" className="h-4 w-4 text-gold-500" />
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-6">
            <GoldButton
              full
              onClick={() => {
                setMenu(false);
                openBooking();
              }}
            >
              {t.nav.bookNow}
            </GoldButton>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-6 py-3.5 text-[15px] font-semibold text-whatsapp transition-all duration-300 hover:-translate-y-0.5 hover:bg-whatsapp hover:text-primary-950"
            >
              <Icon name="whatsapp" className="h-[18px] w-[18px]" />
              {t.nav.whatsapp}
            </a>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {t.branches.items.map((b) => (
                <a
                  key={b.phone}
                  href={`tel:${b.phone}`}
                  className="num rounded-xl border border-white/10 py-2.5 text-center text-[11px] text-primary-100/70 transition-colors hover:border-gold-500/40 hover:text-white"
                >
                  {b.phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
