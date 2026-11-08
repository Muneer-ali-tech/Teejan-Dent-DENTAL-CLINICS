import type { JSX, SVGProps } from "react";
import type { IconName } from "@/data/clinic";

const S = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const TOOTH_BODY =
  "M12 4.2c-2.1 0-2.5.95-4.4.95-1.7 0-3.3-.5-3.3 2.2 0 2.85 1.25 4.1 1.72 6.65.47 2.55.6 5.8 2.1 5.8 1.35 0 1.45-3.05 1.95-4.4.4-1.05.95-1.65 1.93-1.65s1.53.6 1.93 1.65c.5 1.35.6 4.4 1.95 4.4 1.5 0 1.63-3.25 2.1-5.8.47-2.55 1.72-3.8 1.72-6.65 0-2.7-1.6-2.2-3.3-2.2-1.9 0-2.3-.95-4.4-.95Z";

const ICONS: Record<IconName, JSX.Element> = {
  tooth: <path d={TOOTH_BODY} {...S} />,
  aligner: (
    <g {...S}>
      <path d={TOOTH_BODY} />
      <path d="M4.6 11.2h14.8" />
      <path d="M9 9.6v3.2M12 9.9v3.2M15 9.6v3.2" />
    </g>
  ),
  child: (
    <g {...S}>
      <circle cx="12" cy="11" r="6.6" />
      <path d="M9.4 9.6h.01M14.6 9.6h.01" strokeWidth={2} />
      <path d="M9.6 13.4c.65.9 1.45 1.35 2.4 1.35s1.75-.45 2.4-1.35" />
      <path d="M9.4 4.6C10.2 3 11 2.4 12 2.4s1.8.6 2.6 2.2" />
      <path d="M5 20.4c1.4-1.6 3.4-2.5 7-2.5s5.6.9 7 2.5" />
    </g>
  ),
  crown: (
    <g {...S}>
      <path d="M4 18.5h16" />
      <path d="M5.4 18.5 3.6 8.6l4.7 3.3L12 5.2l3.7 6.7 4.7-3.3-1.8 9.9z" />
      <path d="M8.6 15.4h6.8" />
    </g>
  ),
  implant: (
    <g {...S}>
      <path d="M8 3.6h8a1 1 0 0 1 1 1v3.2H7V4.6a1 1 0 0 1 1-1Z" />
      <path d="M8.4 7.8 9.6 20.4h4.8l1.2-12.6" />
      <path d="M8.2 11h7.6M8.6 14.2h6.8M9 17.4h6" />
    </g>
  ),
  nerve: (
    <g {...S}>
      <path d={TOOTH_BODY} />
      <path d="M12 7.6v3.1c0 1.1-1.4 1.4-1.4 2.9s.5 1.9.5 3.2" />
      <path d="M12 10.7c0 1.1 1.3 1.5 1.3 3s-.4 1.8-.4 3.1" />
    </g>
  ),
  gum: (
    <g {...S}>
      <path d="M6.4 9.4c0-1.9-.8-2.6-1.5-2.6s-1.5.7-1.5 2.6c0 2 .6 3 .9 4.6.3 1.5.4 3.4 1.3 3.4.9 0 .9-2 .9-2.9" />
      <path d="M17.6 9.4c0-1.9.8-2.6 1.5-2.6s1.5.7 1.5 2.6c0 2-.6 3-.9 4.6-.3 1.5-.4 3.4-1.3 3.4-.9 0-.9-2-.9-2.9" />
      <path d="M8.6 6.2c0 4.4.7 8.2 1.4 9.9.4.9.9 1.4 2 1.4s1.6-.5 2-1.4c.7-1.7 1.4-5.5 1.4-9.9" />
      <path d="M3.2 19.4c2.6 1.6 6.2 2.2 8.8 2.2s6.2-.6 8.8-2.2" />
    </g>
  ),
  surgery: (
    <g {...S}>
      <path d="M4.2 19.8 14.6 9.4" />
      <path d="M13.4 5.6 18.4 3.6l-1.6 5.2-3.4.6z" />
      <path d="M6.6 14.2 9 16.6" />
      <path d="M3.4 20.6h4" />
    </g>
  ),
  scanner: (
    <g {...S}>
      <path d="M4.4 4.4h3.2M4.4 4.4v3.2M19.6 4.4h-3.2M19.6 4.4v3.2M4.4 19.6h3.2M4.4 19.6v-3.2M19.6 19.6h-3.2M19.6 19.6v-3.2" />
      <path d="M8.2 8.6c1-1 2.3-1.6 3.8-1.6s2.8.6 3.8 1.6" />
      <path d="M9.6 15.4c.7.5 1.5.8 2.4.8s1.7-.3 2.4-.8" />
      <path d="M12 9.6v4.8" />
    </g>
  ),
  cbct: (
    <g {...S}>
      <circle cx="12" cy="12" r="8.6" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.6" />
      <path d="M3.4 12h17.2M5 7.6h14M5 16.4h14" />
    </g>
  ),
  "smile-design": (
    <g {...S}>
      <path d="M4 5.6 6.4 18.4h11.2L20 5.6" />
      <path d="M7.6 10.4c1.2 1.9 2.6 2.9 4.4 2.9s3.2-1 4.4-2.9" />
      <path d="M8.6 15.6h6.8" />
    </g>
  ),
  guided: (
    <g {...S}>
      <path d="M12 2.8 20 6v6c0 4.4-3.2 7.4-8 9.2-4.8-1.8-8-4.8-8-9.2V6z" />
      <path d="M12 8.2v7.6" />
      <path d="M8.6 12.4h6.8" />
      <circle cx="12" cy="6" r="1.4" />
    </g>
  ),
  microscope: (
    <g {...S}>
      <path d="M9.4 3.6h5.2v5.8l1.8 3.4H7.6l1.8-3.4z" />
      <path d="M6.4 12.8h11.2" />
      <path d="M9 16.4c-1.8 1-2.8 2.4-2.8 4h12.2c0-2.6-2.6-4.6-6.1-4.6" />
      <path d="M12 12.8v3.4" />
    </g>
  ),
  laser: (
    <g {...S}>
      <path d="M5.6 20.4 12 14l6.4 6.4" />
      <path d="M9.2 12.8 5.6 9.2l3.6-3.6 3.6 3.6z" />
      <path d="M13.4 8.6 17 5" />
      <path d="M15.4 12.2 19 11.4M14.6 5.8 13.8 2.2" />
    </g>
  ),
  shield: (
    <g {...S}>
      <path d="M12 2.8 20 6v6c0 4.4-3.2 7.4-8 9.2-4.8-1.8-8-4.8-8-9.2V6z" />
      <path d="m8.8 11.8 2.3 2.4 4.1-4.6" />
    </g>
  ),
  precision: (
    <g {...S}>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 1.6v3.6M12 18.8v3.6M1.6 12h3.6M18.8 12h3.6" />
    </g>
  ),
  comfort: (
    <g {...S}>
      <path d="M3.6 15.4c2.4 0 3.4-1.6 4.6-3.4C9.6 9.8 11 8 12 8s2.4 1.8 3.8 4c1.2 1.8 2.2 3.4 4.6 3.4" />
      <path d="M3.6 15.4c0 2.6 3.2 4.6 8.4 4.6s8.4-2 8.4-4.6" />
      <path d="M8.4 8.6C9 6.4 10.4 4.4 12 4.4s3 2 3.6 4.2" />
    </g>
  ),
  calendar: (
    <g {...S}>
      <rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.6" />
      <path d="M3.4 10h17.2M8.4 3.4v3.4M15.6 3.4v3.4" />
      <path d="M7.6 13.6h2M11 13.6h2M14.4 13.6h2M7.6 17h2M11 17h2" />
    </g>
  ),
  phone: (
    <g {...S}>
      <path d="M6.2 3.6h3l1.6 4-2 1.4a11.4 11.4 0 0 0 5.6 5.6l1.4-2 4 1.6v3c0 1.1-.9 2-2 2A16.4 16.4 0 0 1 4.2 5.6c0-1.1.9-2 2-2Z" />
    </g>
  ),
  whatsapp: (
    <g {...S}>
      <path d="M20.4 11.8a8.3 8.3 0 0 1-12.3 7.3L3.6 20.4l1.3-4.4a8.3 8.3 0 1 1 15.5-4.2Z" />
      <path d="M9.2 8.6c-.5.6-.6 1.5-.2 2.4.7 1.7 2.3 3.3 4 4 .9.4 1.8.3 2.4-.2l.5-.5-1.9-1.4-.9.6a5.6 5.6 0 0 1-2.1-2.1l.6-.9-1.4-1.9z" />
    </g>
  ),
  star: (
    <path
      d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  check: <path d="m5 12.6 4.6 4.6L19 7.4" {...S} strokeWidth={2} />,
  chevron: <path d="m6 9.6 6 6 6-6" {...S} strokeWidth={1.8} />,
  close: <path d="M6 6l12 12M18 6 6 18" {...S} strokeWidth={1.8} />,
  chat: (
    <g {...S}>
      <path d="M4 5.6h16v10.2h-8.8L6.4 20v-4.2H4z" />
      <path d="M8.4 9.6h7.2M8.4 12.6h4.4" />
    </g>
  ),
  pin: (
    <g {...S}>
      <path d="M12 21.4s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </g>
  ),
  clock: (
    <g {...S}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.4 2.2" />
    </g>
  ),
  card: (
    <g {...S}>
      <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.6" />
      <path d="M2.8 9.8h18.4M6.6 14.6h3.6M14.4 14.6h3" />
    </g>
  ),
  sparkle: (
    <g {...S}>
      <path d="M12 3.2c.9 3.9 1.9 4.9 5.8 5.8-3.9.9-4.9 1.9-5.8 5.8-.9-3.9-1.9-4.9-5.8-5.8 3.9-.9 4.9-1.9 5.8-5.8Z" />
      <path d="M17.8 15.4c.45 1.9.95 2.4 2.85 2.85-1.9.45-2.4.95-2.85 2.85-.45-1.9-.95-2.4-2.85-2.85 1.9-.45 2.4-.95 2.85-2.85Z" />
    </g>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" {...S} strokeWidth={1.8} />,
  arrow: <path d="M14 6l-6 6 6 6" {...S} strokeWidth={1.8} />,
  google: (
    <path
      d="M21.6 12.2c0-.7-.06-1.35-.18-2H12v3.9h5.4a4.7 4.7 0 0 1-2 3.05v2.5h3.2c1.9-1.75 2.9-4.32 2.9-7.45Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <g {...S}>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M16.9 7.2h.01" strokeWidth={2} />
    </g>
  ),
  linkedin: (
    <g {...S}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="3.4" />
      <path d="M7.9 10.6v6" />
      <path d="M7.9 7.3h.01" strokeWidth={2.2} />
      <path d="M11.7 16.6v-6" />
      <path d="M11.7 12.7c0-1.2.9-2.2 2.1-2.2s2.3 1 2.3 2.4v3.7" />
    </g>
  ),
  snapchat: (
    <g {...S}>
      <path d="M12 3.4c2.9 0 4.4 2.1 4.4 4.9 0 1.4-.3 2.2.6 2.4.7.2 1.3-.5 1.6.2.3.8-1.3 1.6-1.3 2.5 0 1.3 2.2 2.6 2.2 2.6-.4.9-2.2.5-3.1 1-.7.4-.7 1.6-2.1 1.6-1 0-1.4-.6-2.3-.6s-1.3.6-2.3.6c-1.4 0-1.4-1.2-2.1-1.6-.9-.5-2.7-.1-3.1-1 0 0 2.2-1.3 2.2-2.6 0-.9-1.6-1.7-1.3-2.5.3-.7.9 0 1.6-.2.9-.2.6-1 .6-2.4C7.6 5.5 9.1 3.4 12 3.4Z" />
    </g>
  ),
  x: <path d="M4 4l16 16M20 4 4 20" {...S} strokeWidth={1.8} />,
  send: (
    <g {...S}>
      <path d="M20.6 3.4 3.4 10.2l6.6 2.6 2.6 6.6z" />
      <path d="m10 12.8 4.6-4.6" />
    </g>
  ),
};

export type IconProps = SVGProps<SVGSVGElement> & { name: string };

export function Icon({ name, className, ...rest }: IconProps) {
  const glyph = (ICONS as Record<string, JSX.Element>)[name] ?? ICONS.tooth;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {glyph}
    </svg>
  );
}

export function StarRow({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className="h-3.5 w-3.5 text-gold-500" />
      ))}
    </span>
  );
}
