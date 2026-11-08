import type { ReactNode } from "react";
import { useEffect } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "./Icons";
import { useInView } from "@/lib/hooks";
import { useI18n } from "@/i18n";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "footer" | "header" | "main";
}) {
  return (
    <As className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10", className)}>
      {children}
    </As>
  );
}

/** Fade-up reveal wrapper driven by IntersectionObserver. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "article" | "h2" | "p";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = As as "div";
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  icon = "sparkle",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  icon?: Parameters<typeof Icon>[0]["name"];
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] sm:text-xs",
        tone === "light"
          ? "border-gold-500/35 bg-gold-50 text-gold-600"
          : "border-gold-500/30 bg-gold-500/10 text-gold-400",
      )}
    >
      <Icon name={icon} className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "center",
  icon,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  tone?: "light" | "dark";
  align?: "center" | "start";
  icon?: Parameters<typeof Icon>[0]["name"];
  id?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-start",
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone} icon={icon}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={90}>
        <h2
          id={id}
          className={cn(
            "mt-5 text-[26px] font-semibold leading-[1.3] sm:text-[32px] lg:text-[38px]",
            tone === "light" ? "text-primary-950" : "text-white",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p
            className={cn(
              "mt-4 text-[15px] leading-[1.75] sm:text-[17px] sm:leading-[1.8]",
              tone === "light" ? "text-body" : "text-primary-100/80",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
      <Reveal delay={220}>
        <div
          className={cn(
            "gold-hairline mt-7 h-px w-32",
            align === "center" && "mx-auto",
          )}
        />
      </Reveal>
    </div>
  );
}

type BtnProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: Parameters<typeof Icon>[0]["name"];
  type?: "button" | "submit";
  disabled?: boolean;
  full?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full text-center text-[14.5px] font-semibold leading-snug transition-all duration-[280ms] ease-lux disabled:cursor-not-allowed disabled:opacity-60 sm:text-base";

export function GoldButton({
  children,
  className,
  onClick,
  href,
  icon = "calendar",
  type = "button",
  disabled,
  full,
  ariaLabel,
}: BtnProps) {
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-[140%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent group-hover:animate-shine" />
      <Icon name={icon} className="relative h-[18px] w-[18px]" />
      <span className="relative">{children}</span>
    </>
  );
  const cls = cn(
    base,
    "bg-gradient-to-l from-gold-600 via-gold-500 to-gold-400 px-7 py-3.5 text-primary-950 shadow-gold hover:-translate-y-0.5 hover:shadow-gold-lg active:translate-y-0",
    full && "w-full",
    className,
  );
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

export function OutlineButton({
  children,
  className,
  onClick,
  href,
  icon,
  type = "button",
  full,
  tone = "light",
  ariaLabel,
}: BtnProps & { tone?: "light" | "dark" }) {
  const cls = cn(
    base,
    "px-7 py-3.5",
    tone === "light"
      ? "border border-primary-900/15 bg-white/70 text-primary-900 hover:-translate-y-0.5 hover:border-gold-500/60 hover:bg-white hover:shadow-ambient"
      : "border border-gold-500/40 bg-white/5 text-gold-300 backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/10",
    full && "w-full",
    className,
  );
  const inner = (
    <>
      {icon && <Icon name={icon} className="h-[18px] w-[18px]" />}
      <span>{children}</span>
    </>
  );
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/** Brand mark — tooth monogram in champagne gold. Bilingual wordmark. */
export function Logo({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const { isAr } = useI18n();
  return (
    <span className="inline-flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600 shadow-gold">
        <Icon name="tooth" className="h-6 w-6 text-primary-950" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "brand-name text-[19px] font-bold tracking-tight",
              tone === "dark" ? "text-primary-950" : "text-white",
            )}
          >
            {isAr ? (
              <>تيجان <span className="text-gold-gradient">دنت</span></>
            ) : (
              <>Teejan <span className="text-gold-gradient">Dent</span></>
            )}
          </span>
          <span
            className={cn(
              "mt-1 text-[9.5px] font-medium tracking-[0.24em]",
              tone === "dark" ? "text-muted" : "text-primary-100/60",
            )}
          >
            {isAr ? "TEEJAN DENT" : "DENTAL CLINICS"}
          </span>
        </span>
      )}
    </span>
  );
}

/** Subtle ambient gold glow blob used behind dark sections. */
export function GoldGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-[110px]",
        className,
      )}
    />
  );
}

/** Auto-dismissable nothing — helper to keep focus inside dialogs. */
export function useAutoFocus(open: boolean) {
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        const el = document.querySelector<HTMLElement>("[data-autofocus]");
        el?.focus();
      }, 220);
      return () => clearTimeout(t);
    }
  }, [open]);
}
