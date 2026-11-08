import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import { useI18n, type Lang } from "@/i18n";
import { Icon } from "@/components/ui/Icons";

const SOCIALS = [
  { icon: "instagram", href: "#" },
  { icon: "x", href: "#" },
  { icon: "snapchat", href: "#" },
  { icon: "linkedin", href: "#" },
] as const;

/* Clinic schedule — Saturday to Thursday, two sessions. Friday closed. */
const MORNING = { start: 9 * 60, end: 13 * 60 }; // 9:00 → 13:00
const EVENING = { start: 16 * 60, end: 22 * 60 }; // 16:00 → 22:00

const time = (hour: number, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2024, 0, 1, hour, 0));

type Status = { open: boolean; label: string; detail: string };

function computeStatus(
  lang: Lang,
  s: { openNow: string; closedNow: string; closesAt: string; opensAt: string },
): Status {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const isFriday = now.getDay() === 5;

  if (!isFriday) {
    if (mins >= MORNING.start && mins < MORNING.end)
      return { open: true, label: s.openNow, detail: `${s.closesAt} ${time(13, lang)}` };
    if (mins >= EVENING.start && mins < EVENING.end)
      return { open: true, label: s.openNow, detail: `${s.closesAt} ${time(22, lang)}` };
  }

  // Closed — work out the next opening session
  let hour = 9;
  if (!isFriday && mins >= MORNING.start && mins < EVENING.start) hour = 16;
  return { open: false, label: s.closedNow, detail: `${s.opensAt} ${time(hour, lang)}` };
}

export default function UtilityBar({ collapsed }: { collapsed: boolean }) {
  const { t, lang } = useI18n();
  const [tick, setTick] = useState(0);

  /* Keep the status honest — re-evaluate every 30 seconds */
  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 30000);
    return () => window.clearInterval(id);
  }, []);

  const status = useMemo(
    () => computeStatus(lang, t.topbar),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, t.topbar, tick],
  );

  return (
    <div
      aria-hidden={collapsed}
      className={cn(
        "hidden overflow-hidden border-b bg-primary-950/95 backdrop-blur-md transition-all duration-500 ease-lux lg:block",
        collapsed
          ? "invisible max-h-0 border-transparent opacity-0"
          : "visible max-h-11 border-gold-500/15 opacity-100",
      )}
    >
      <div className="mx-auto flex h-11 w-full max-w-[1240px] items-center justify-between gap-6 px-10">
        {/* ——— Side 1 · Social channels ——— */}
        <div className="flex items-center gap-1.5">
          <span className="me-1.5 text-[11px] font-medium text-primary-100/40">
            {t.topbar.follow}
          </span>
          {SOCIALS.map((s, i) => (
            <a
              key={s.icon}
              href={s.href}
              aria-label={t.topbar.socials[i]}
              title={t.topbar.socials[i]}
              className="grid h-7 w-7 place-items-center rounded-lg text-primary-100/55 transition-all duration-300 ease-lux hover:-translate-y-0.5 hover:bg-gold-500/12 hover:text-gold-400"
            >
              <Icon name={s.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* ——— Side 2 · Live status & essential info ——— */}
        <div className="flex items-center gap-4">
          {/* Live working status */}
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11.5px] font-semibold",
              status.open
                ? "bg-whatsapp/12 text-whatsapp"
                : "bg-white/[0.06] text-primary-100/65",
            )}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              {status.open && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-1.5 w-1.5 rounded-full",
                  status.open ? "bg-whatsapp" : "bg-gold-500/70",
                )}
              />
            </span>
            {status.label}
            <span className="font-normal text-primary-100/50">· {status.detail}</span>
          </span>

          <span aria-hidden="true" className="h-3.5 w-px shrink-0 bg-white/12" />

          {/* Branch locations */}
          <span className="hidden items-center gap-1.5 text-[11.5px] text-primary-100/60 xl:inline-flex">
            <Icon name="pin" className="h-3.5 w-3.5 text-gold-500/80" />
            {t.topbar.branches}
          </span>

          <span
            aria-hidden="true"
            className="hidden h-3.5 w-px shrink-0 bg-white/12 xl:block"
          />

          {/* Opening days */}
          <span className="hidden items-center gap-1.5 text-[11.5px] text-primary-100/60 xl:inline-flex">
            <Icon name="clock" className="h-3.5 w-3.5 text-gold-500/80" />
            {t.topbar.hours}
          </span>
        </div>
      </div>
    </div>
  );
}
