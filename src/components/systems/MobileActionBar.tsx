import { cn } from "@/utils/cn";
import { CONTACT, WHATSAPP_URL } from "@/data/clinic";
import { useI18n } from "@/i18n";
import { useScrollY } from "@/lib/hooks";
import { useUI } from "@/lib/store";
import { Icon } from "@/components/ui/Icons";

export default function MobileActionBar() {
  const y = useScrollY();
  const visible = y > 500;
  const { openBooking } = useUI();
  const { t } = useI18n();

  return (
    <nav
      aria-label={t.actionBar.book}
      dir="ltr"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[65] flex items-stretch gap-2 border-t border-gold-500/40 bg-[rgba(10,37,42,0.94)] px-3 pt-2.5 backdrop-blur-md transition-all duration-[520ms] ease-lux lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <a
        href={`tel:${CONTACT.mainPhone}`}
        aria-label={t.actionBar.call}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary-700/60 bg-primary-900 text-gold-400 transition-all duration-[280ms] ease-lux active:scale-95"
      >
        <Icon name="phone" className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={() => openBooking()}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 text-[15px] font-semibold text-primary-950 shadow-gold transition-all duration-[280ms] ease-lux active:scale-[0.98]"
      >
        <Icon name="calendar" className="h-[18px] w-[18px]" />
        {t.actionBar.book}
      </button>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={t.actionBar.whatsapp}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-whatsapp text-primary-950 transition-all duration-[280ms] ease-lux active:scale-95"
      >
        <Icon name="whatsapp" className="h-5 w-5" />
      </a>
    </nav>
  );
}
