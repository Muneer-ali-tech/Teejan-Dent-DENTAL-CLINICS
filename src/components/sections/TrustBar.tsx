import { Fragment } from "react";
import { cn } from "@/utils/cn";
import { useCountUp, useInView } from "@/lib/hooks";
import { useI18n } from "@/i18n";
import { Container, Reveal } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icons";

type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: string;
};

const CORNERS: Array<[string, string]> = [
  ["top-3 right-3 border-t border-r", "top-5 right-5 border-t border-r"],
  ["top-3 left-3 border-t border-l", "top-5 left-5 border-t border-l"],
  ["bottom-3 right-3 border-b border-r", "bottom-5 right-5 border-b border-r"],
  ["bottom-3 left-3 border-b border-l", "bottom-5 left-5 border-b border-l"],
];

function MetricCell({ m, active, index }: { m: Metric; active: boolean; index: number }) {
  const n = useCountUp(m.value, active, 1500 + index * 200);
  const display =
    m.value >= 10000 ? new Intl.NumberFormat("en-US").format(n) : String(n);

  return (
    <div
      className={cn(
        "group relative px-6 py-7 sm:px-7 lg:px-8 lg:py-9",
        index !== 0 && "max-sm:border-t max-sm:border-white/[0.07]",
        index >= 2 && "sm:max-lg:border-t sm:max-lg:border-white/[0.07]",
        index % 2 === 1 && "sm:max-lg:border-s sm:max-lg:border-white/[0.07]",
      )}
    >
      {index !== 0 && (
        <Fragment>
          <span className="pointer-events-none absolute inset-y-7 start-0 hidden w-px bg-gradient-to-b from-transparent via-gold-500/35 to-transparent lg:block" />
          <span className="pointer-events-none absolute top-1/2 start-0 ms-[-3.5px] hidden h-[7px] w-[7px] -translate-y-1/2 rotate-45 rounded-[1.5px] bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-[0_0_12px_rgba(197,168,128,0.55)] lg:block" />
        </Fragment>
      )}

      <span className="pointer-events-none absolute -left-24 -top-24 h-52 w-52 rounded-full bg-gold-500/0 blur-3xl transition-all duration-[700ms] ease-lux group-hover:bg-gold-500/[0.12]" />
      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-right scale-x-0 bg-gradient-to-l from-transparent via-gold-500/60 to-transparent transition-transform duration-[650ms] ease-lux group-hover:scale-x-100 lg:inset-x-8" />

      <div className="relative flex items-center gap-4 lg:gap-5">
        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-500/40 bg-[radial-gradient(circle_at_32%_28%,rgba(216,191,155,0.16),rgba(255,255,255,0.015)_62%)] text-gold-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_22px_-10px_rgba(0,0,0,0.6)] transition-all duration-[500ms] ease-lux group-hover:-translate-y-0.5 group-hover:scale-[1.06] group-hover:border-gold-300 group-hover:bg-gradient-to-br group-hover:from-gold-400 group-hover:to-gold-600 group-hover:text-primary-950 group-hover:shadow-gold lg:h-14 lg:w-14">
          <span className="pointer-events-none absolute inset-[3.5px] rounded-full border border-gold-500/20 transition-colors duration-[500ms] group-hover:border-primary-950/25" />
          <Icon name={m.icon} className="h-5 w-5 lg:h-6 lg:w-6" />
        </span>

        <span className="num text-gold-gradient flex items-baseline text-[34px] font-bold leading-none tracking-tight drop-shadow-[0_2px_14px_rgba(197,168,128,0.3)] sm:text-[40px] lg:text-[46px]">
          {m.prefix && <span className="text-[0.6em]">{m.prefix}</span>}
          {display}
          {m.suffix && <span className="text-[0.6em]">{m.suffix}</span>}
        </span>
      </div>

      <p className="relative mt-4 text-[12.3px] font-medium leading-[1.8] text-white/75 sm:text-[12.8px] lg:text-[13.4px]">
        {m.label}
      </p>
    </div>
  );
}

export default function TrustBar() {
  const { t } = useI18n();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const items = t.metrics.items;

  return (
    <section aria-label={t.metrics.label} className="relative z-20 -mt-12 lg:-mt-16">
      <Container>
        <Reveal>
          <div ref={ref} className="relative">
            <div
              className="relative rounded-[25px] bg-gradient-to-b from-gold-400/75 via-gold-600/25 to-gold-500/55 p-px sm:rounded-[31px]"
              style={{
                boxShadow:
                  "0 42px 90px -34px rgba(3,14,16,0.8), 0 26px 70px -36px rgba(197,168,128,0.4), 0 10px 28px -14px rgba(3,14,16,0.55)",
              }}
            >
              <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(158deg,#12414b_0%,#0c3038_46%,#082227_100%)] shadow-[inset_0_0_70px_rgba(3,14,16,0.4)] sm:rounded-[30px]">
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-gold-500/[0.13] blur-[60px]" />
                <div className="pointer-events-none absolute -bottom-28 right-[8%] h-64 w-64 rounded-full bg-primary-700/30 blur-[90px]" />
                <div className="pointer-events-none absolute -top-20 left-[6%] h-52 w-52 rounded-full bg-primary-800/40 blur-[80px]" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.045]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(115deg, rgba(216,191,155,0.6) 0 1px, transparent 1px 9px)",
                  }}
                />
                <Icon
                  name="tooth"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 text-gold-500/[0.05]"
                />

                <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
                <span className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                  style={
                    inView
                      ? { animation: "shine 2.8s cubic-bezier(0.16,1,0.3,1) 0.35s both" }
                      : undefined
                  }
                />

                {CORNERS.map(([o, i]) => (
                  <Fragment key={o}>
                    <span
                      aria-hidden="true"
                      className={cn("pointer-events-none absolute h-4 w-4 border-gold-400/55", o)}
                    />
                    <span
                      aria-hidden="true"
                      className={cn("pointer-events-none absolute h-2 w-2 border-gold-500/40", i)}
                    />
                  </Fragment>
                ))}

                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((m, i) => (
                    <MetricCell key={i} m={m} active={inView} index={i} />
                  ))}
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent sm:w-16" />
              <span className="relative grid h-11 w-11 rotate-45 place-items-center rounded-[13px] bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-gold sm:h-12 sm:w-12">
                <span className="absolute inset-[3px] rounded-[10px] border border-primary-950/25" />
                <Icon name="tooth" className="h-5 w-5 -rotate-45 text-primary-950 sm:h-[22px] sm:w-[22px]" />
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent sm:w-16" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
