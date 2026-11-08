import { CONTACT, DEVELOPER_URL, WHATSAPP_URL } from "@/data/clinic";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Container, GoldButton, Logo, Reveal } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

const SOCIALS = ["instagram", "snapchat", "x"] as const;

export default function Footer() {
  const { openBooking } = useUI();
  const { t } = useI18n();
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
      <section className="relative overflow-hidden py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[34px] border border-gold-500/30 bg-gradient-to-br from-primary-900 via-primary-950 to-primary-950 px-7 py-14 text-center shadow-lift sm:px-12 lg:py-20">
              <div aria-hidden="true" className="absolute -top-40 right-1/2 h-[420px] w-[620px] translate-x-1/2 rounded-full bg-gold-500/12 blur-[120px]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/80 to-transparent" />
              <div className="relative mx-auto max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500/10 px-4 py-2 text-[11.5px] font-medium tracking-[0.14em] text-gold-300">
                  <Icon name="crown" className="h-3.5 w-3.5" />
                  {t.finalCta.badge}
                </span>
                <h2 className="mt-6 text-[24px] font-semibold leading-[1.3] text-white sm:text-[34px] lg:text-[40px]">
                  {t.finalCta.title}
                  <br className="hidden sm:block" />
                  <span className="text-gold-gradient">{t.finalCta.titleGold}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-[1.85] text-primary-100/75 sm:text-[16px]">{t.finalCta.lead}</p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <GoldButton onClick={() => openBooking()} className="w-full px-8 py-4 sm:w-auto">{t.finalCta.cta}</GoldButton>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-whatsapp/45 bg-whatsapp/10 px-8 py-4 text-base font-semibold text-whatsapp transition-all duration-[280ms] ease-lux hover:-translate-y-0.5 hover:bg-whatsapp hover:text-primary-950 sm:w-auto">
                    <Icon name="whatsapp" className="h-5 w-5" />
                    {t.finalCta.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <footer className="relative overflow-hidden bg-primary-950 pt-16 pb-28 lg:pb-8">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-primary-800/45 blur-[120px]" />
        <Container className="relative">
          <div className="grid gap-10 border-b border-white/8 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo tone="light" />
              <p className="mt-5 text-[13px] leading-[1.85] text-primary-100/70">{t.footer.about}</p>
              <div className="mt-6 flex gap-2.5">
                {SOCIALS.map((s, i) => (
                  <a key={s} href="#" aria-label={t.footer.socials[i]}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 text-primary-100/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/45 hover:text-gold-400">
                    <Icon name={s} className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label={t.footer.departments}>
              <h3 className="text-[15px] font-semibold text-white">{t.footer.departments}</h3>
              <span className="gold-hairline mt-3 block h-px w-16" />
              <ul className="mt-5 space-y-2.5">
                {t.departments.items.map((d) => (
                  <li key={d.id}>
                    <a href="#departments" className="group inline-flex items-center gap-2 text-[13px] text-primary-100/70 transition-colors duration-300 hover:text-gold-400">
                      <Icon name="tooth" className="h-3.5 w-3.5 text-gold-500/60 transition-colors group-hover:text-gold-400" />
                      {d.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-[15px] font-semibold text-white">{t.footer.branches}</h3>
              <span className="gold-hairline mt-3 block h-px w-16" />
              <ul className="mt-5 space-y-4">
                {t.branches.items.map((b) => (
                  <li key={b.id}>
                    <a href={`tel:${b.phone}`} className="group block rounded-2xl border border-white/8 bg-white/[0.025] p-4 transition-all duration-300 hover:border-gold-500/35">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold text-white">{b.name} ({b.city})</span>
                        <Icon name="phone" className="h-3.5 w-3.5 text-gold-500/70" />
                      </span>
                      <span className="num mt-1 block text-[13px] text-gold-400">{b.phone}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-primary-100/60">
                <Icon name="clock" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500/70" />
                {t.footer.hours}
              </p>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-white">{t.footer.blog}</h3>
              <span className="gold-hairline mt-3 block h-px w-16" />
              <ul className="mt-5 space-y-3">
                {t.footer.blogLinks.map((a) => (
                  <li key={a}>
                    <a href="#faq" className="group flex items-start gap-2.5 text-[13px] leading-relaxed text-primary-100/70 transition-colors duration-300 hover:text-gold-400">
                      <Icon name="arrow" className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-500/60 transition-transform duration-300 group-hover:-translate-x-1" />
                      {a}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${CONTACT.email}`} className="mt-6 flex items-center gap-2.5 rounded-2xl border border-gold-500/25 bg-gold-500/[0.07] p-4 transition-colors duration-300 hover:border-gold-500/50">
                <Icon name="send" className="h-4 w-4 text-gold-400" />
                <span dir="ltr" className="text-[12.5px] text-gold-300">{CONTACT.email}</span>
              </a>
              <nav aria-label="Quick links" className="mt-6">
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-[12px] text-primary-100/55 transition-colors hover:text-gold-400">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pt-7 text-center lg:flex-row lg:items-center lg:justify-between lg:text-start">
            <p className="text-[11.5px] leading-relaxed text-primary-100/55">
              Copyrights © <span className="num">2026</span> {t.footer.rights}
            </p>
            <p className="text-[12.5px] leading-relaxed text-primary-100/55">
              {t.footer.devBy}{" "}
              <a href={DEVELOPER_URL} target="_blank" rel="noreferrer"
                aria-label={`${t.footer.devName} — WhatsApp`}
                className="font-bold text-gold-gradient underline decoration-gold-500/40 decoration-2 underline-offset-4 transition-colors hover:decoration-gold-400">
                {t.footer.devName}
              </a>
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
