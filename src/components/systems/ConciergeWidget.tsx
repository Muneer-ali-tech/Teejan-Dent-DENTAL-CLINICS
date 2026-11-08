import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { CONTACT, WHATSAPP_URL } from "@/data/clinic";
import { useMediaQuery, useScrollY } from "@/lib/hooks";
import { useI18n } from "@/i18n";
import { useUI } from "@/lib/store";
import { Icon } from "@/components/ui/Icons";

type Msg = { from: "bot" | "user"; text: string; cta?: { label: string; action: number }[] };

/* Greeting bubble timings (ms) */
const HINT_DELAY = 15000; // first appearance — 15s after load
const HINT_VISIBLE = 8000; // stays on screen for 8s
const HINT_COOLDOWN = 60000; // then waits 60s before reappearing

/* Bottom-bar geometry */
const BAR_HEIGHT = 68; // mobile quick action bar
const RIBBON_HEIGHT = 52; // mobile offer ribbon
const RIBBON_BOTTOM = 80; // ribbon's own bottom offset
const LIFT_GAP = 16; // breathing room above a bar
const STACK_GAP = 70; // panel / bubble above the launcher (60 + 10)

export default function ConciergeWidget() {
  const { chatOpen, setChatOpen, openBooking, offerRibbon } = useUI();
  const { t } = useI18n();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const scrollY = useScrollY();

  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: t.concierge.welcome }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const hideTimer = useRef(0);
  const nextTimer = useRef(0);

  /* ——— Dynamic vertical anchoring ———
     desktop      → 24px (clean corner)
     mobile       → 24px
     + action bar → bar height + 16px
     + offer band → above the ribbon + 16px                       */
  const barVisible = !isDesktop && scrollY > 500;
  let base = 24;
  if (barVisible) base = BAR_HEIGHT + LIFT_GAP; // 84
  if (!isDesktop && offerRibbon)
    base = Math.max(base, RIBBON_BOTTOM + RIBBON_HEIGHT + LIFT_GAP); // 148

  const safe = "env(safe-area-inset-bottom, 0px)";
  const launcherBottom = isDesktop ? "24px" : `calc(${base}px + ${safe})`;
  const stackBottom = isDesktop
    ? `calc(24px + ${STACK_GAP}px + ${safe})`
    : `calc(${base + STACK_GAP}px + ${safe})`;

  /* ——— Greeting bubble scheduler (15s → 8s visible → 60s cooldown) ——— */
  const scheduleNext = (delay: number) => {
    window.clearTimeout(nextTimer.current);
    nextTimer.current = window.setTimeout(() => {
      setHint(true);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        setHint(false);
        scheduleNext(HINT_COOLDOWN);
      }, HINT_VISIBLE);
    }, delay);
  };

  useEffect(() => {
    if (chatOpen) {
      setHint(false);
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(nextTimer.current);
      return;
    }
    scheduleNext(HINT_DELAY);
    return () => {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(nextTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen]);

  const dismissHint = () => {
    setHint(false);
    window.clearTimeout(hideTimer.current);
    scheduleNext(HINT_COOLDOWN);
  };

  useEffect(() => {
    setMsgs([{ from: "bot", text: t.concierge.welcome }]);
  }, [t.concierge.welcome]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const pushBot = (m: Msg) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((p) => [...p, m]); }, 850);
  };

  const handleQuick = (i: number) => {
    const q = t.concierge.quick[i];
    setMsgs((p) => [...p, { from: "user", text: q.label }]);
    pushBot({
      from: "bot",
      text: t.concierge.replies[i].text,
      cta: t.concierge.replies[i].cta.map((label, k) => ({ label, action: k })),
    });
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    setMsgs((p) => [...p, { from: "user", text: v }]);
    setInput("");
    pushBot({
      from: "bot",
      text: t.concierge.fallback,
      cta: t.concierge.fallbackCta.map((label, k) => ({ label, action: k })),
    });
  };

  const run = (i: number, action: number) => {
    const map: Action[][] = [
      [action === 0 ? "financing" : "booking", "booking"],
      ["booking", "booking"],
      [action === 0 ? "branches" : "call", "call"],
      [action === 0 ? "call" : "whatsapp", "whatsapp"],
    ];
    const a = (map[i] ?? ["booking"])[action === 0 ? 0 : 1] as Action;
    if (a === "booking") { setChatOpen(false); openBooking(); }
    else if (a === "financing" || a === "branches") {
      setChatOpen(false);
      document.getElementById(a === "financing" ? "financing" : "branches")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (a === "call") { window.location.href = `tel:${CONTACT.mainPhone}`; }
    else { window.open(WHATSAPP_URL, "_blank"); }
  };

  return (
    <>
      {/* Launcher — anchored to the corner, glides above active bottom bars */}
      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label={chatOpen ? t.concierge.close : t.concierge.open}
        aria-expanded={chatOpen}
        style={{ bottom: launcherBottom }}
        className={cn(
          "concierge-anchor fixed left-6 z-[75] grid h-[60px] w-[60px] place-items-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-primary-950 shadow-gold-lg transition-[transform,bottom] duration-300 ease-in-out hover:scale-105",
          chatOpen && "scale-95",
        )}
      >
        {!chatOpen && <span className="absolute inset-0 animate-pulse-gold rounded-full" />}
        <Icon name={chatOpen ? "close" : "chat"} className="relative h-6 w-6" />
        {!chatOpen && (
          <span className="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full bg-whatsapp text-[10px] font-bold text-primary-950">
            1
          </span>
        )}
      </button>

      {/* Greeting bubble */}
      {!chatOpen && hint && (
        <div
          role="status"
          style={{ bottom: stackBottom }}
          className="concierge-anchor pop-in fixed left-6 z-[75] flex max-w-[min(250px,calc(100vw-48px))] items-center gap-2.5 rounded-2xl rounded-bl-md border border-gold-500/40 bg-primary-950/96 px-4 py-3 shadow-lift backdrop-blur-md"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-primary-950">
            <Icon name="chat" className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1 text-[12.5px] font-medium leading-snug text-white">
            {t.concierge.bubble}
          </span>
          <button
            type="button"
            onClick={dismissHint}
            aria-label={t.nav.close}
            className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-white/15 text-white/60 transition-colors hover:border-gold-500/50 hover:text-white"
          >
            <Icon name="close" className="h-3 w-3" />
          </button>
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-l border-gold-500/40 bg-primary-950"
          />
        </div>
      )}

      {/* Dialog */}
      {chatOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={t.concierge.title}
          style={{ bottom: stackBottom }}
          className="concierge-anchor pop-in fixed left-6 z-[80] flex max-h-[min(560px,calc(100vh-200px))] w-[min(380px,calc(100vw-48px))] flex-col overflow-hidden rounded-[26px] border border-gold-500/30 bg-white shadow-2xl"
        >
          <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-l from-primary-900 to-primary-950 px-5 py-4">
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/20 blur-2xl" />
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gold-500 text-primary-950">
              <Icon name="tooth" className="h-5.5 w-5.5" />
            </span>
            <div className="relative min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[14px] font-semibold text-white">{t.concierge.title}</span>
                <Icon name="crown" className="h-3.5 w-3.5 shrink-0 text-gold-400" />
              </div>
              <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-primary-100/65">
                <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
                {t.concierge.online}
              </span>
            </div>
          </div>

          <div ref={scroller} className="flex-1 space-y-3.5 overflow-y-auto bg-porcelain px-4 py-5">
            {msgs.map((m, i) => (
              <MsgBubble key={i} m={m} onCta={(a) => run(i - 1, a)} />
            ))}
            {typing && (
              <div className="flex justify-end">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gold-500/20 bg-white px-4 py-3.5 shadow-ambient">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-500" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gold-500/18 bg-white px-4 pt-3">
            <p className="mb-2 text-[10.5px] font-medium tracking-wide text-muted">{t.concierge.quickLabel}</p>
            <div className="flex flex-wrap gap-2 pb-2">
              {t.concierge.quick.map((q, i) => (
                <button key={q.label} type="button" onClick={() => handleQuick(i)}
                  className="rounded-full border border-primary-900/12 bg-porcelain px-3.5 py-2 text-[11.5px] font-medium text-body transition-all duration-[280ms] ease-lux hover:border-gold-500/60 hover:bg-gold-50 hover:text-primary-950">
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-gold-500/18 bg-white px-4 py-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.concierge.placeholder} aria-label={t.concierge.placeholder}
              className="min-w-0 flex-1 rounded-full border border-primary-900/12 bg-base px-4 py-2.5 text-[13px] text-primary-950 placeholder:text-muted/70 focus:border-gold-500 focus:outline-none" />
            <button type="submit" aria-label={t.concierge.send}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-primary-950 shadow-gold transition-transform duration-[280ms] ease-lux hover:scale-105">
              <Icon name="send" className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

type Action = "booking" | "financing" | "branches" | "call" | "whatsapp";

function MsgBubble({ m, onCta }: { m: Msg; onCta: (a: number) => void }) {
  return (
    <div className={cn("flex", m.from === "user" ? "justify-start" : "justify-end")}>
      <div className={cn("max-w-[86%] rounded-2xl px-4 py-3 text-[13px] leading-[1.75]",
        m.from === "user" ? "rounded-br-md bg-primary-950 text-white" : "rounded-bl-md border border-gold-500/20 bg-white text-body shadow-ambient")}>
        <p>{m.text}</p>
        {m.cta && (
          <div className="mt-3 flex flex-wrap gap-2">
            {m.cta.map((c) => (
              <button key={c.label} type="button" onClick={() => onCta(c.action)}
                className="rounded-full bg-gold-500 px-3.5 py-1.5 text-[11.5px] font-semibold text-primary-950 transition-all duration-[280ms] ease-lux hover:bg-gold-400">
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
