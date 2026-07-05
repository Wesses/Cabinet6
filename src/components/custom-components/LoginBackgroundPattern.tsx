import { ReactNode, useId } from "react";
import { cn } from "@/lib/utils";
import { bro4Tag, chteTag, izmteploTag } from "@/utils/constants";

/**
 * Telegram-style decorative background pattern for the login left panel.
 * Icons are outline-only (stroke = currentColor) and rendered at low opacity
 * over the themed `bg-primary` panel, so the panel colour tints them per alias.
 * The icon set (water / heating / housing) is chosen by the build-time alias.
 */

// Each icon is drawn around the origin (0,0), roughly spanning -12..12.
const WATER_ICONS: ReactNode[] = [
  // droplet
  <path d="M0 -11 C0 -11 -7 -2 -7 3 A7 7 0 1 0 7 3 C7 -2 0 -11 0 -11 Z" />,
  // waves
  <>
    <path d="M-10 -3 q3 -4 6 0 t6 0" />
    <path d="M-10 3 q3 -4 6 0 t6 0" />
  </>,
  // fish
  <>
    <path d="M-4 0 Q4 -8 12 0 Q4 8 -4 0 Z" />
    <path d="M-4 0 L-11 -5 L-11 5 Z" />
    <circle cx="7" cy="-1.5" r="1.2" />
  </>,
  // faucet
  <>
    <path d="M-8 -6 H-3 V-2 H4 A4 4 0 0 1 8 2 V4" />
    <path d="M8 4 v3" />
    <circle cx="9" cy="9" r="1.4" />
    <circle cx="-8" cy="-6" r="2" />
  </>,
  // pipe elbow
  <>
    <path d="M-8 -10 V-5 A13 13 0 0 0 5 8 H10" />
    <path d="M-11 -8 H-5" />
    <path d="M8 11 V5" />
  </>,
  // bubbles
  <>
    <circle cx="-4" cy="3" r="4" />
    <circle cx="4" cy="-3" r="2.6" />
    <circle cx="7" cy="5" r="1.6" />
  </>,
];

const HEATING_ICONS: ReactNode[] = [
  // radiator
  <>
    <rect x="-11" y="-7" width="22" height="14" rx="2" />
    <path d="M-6 -7 V7 M-2 -7 V7 M2 -7 V7 M6 -7 V7" />
    <path d="M-8 7 V10 M8 7 V10" />
    <path d="M11 -5 H14" />
  </>,
  // flame
  <path d="M0 -12 C5 -5 6 -1 3 3 C2 5 4 7 0 10 C-4 7 -3 4 -3 1 C-5 3 -6 -1 -2 -5 C-1 -3 -1 -6 0 -12 Z" />,
  // thermometer
  <>
    <path d="M-2 3 V-8 A2 2 0 0 1 2 -8 V3" />
    <circle cx="0" cy="7" r="3.5" />
    <path d="M0 6 V-4" />
  </>,
  // snowflake
  <>
    <path d="M0 -12 V12 M-10.4 -6 L10.4 6 M-10.4 6 L10.4 -6" />
    <path d="M0 -12 l-3 4 M0 -12 l3 4 M0 12 l-3 -4 M0 12 l3 -4" />
  </>,
  // house
  <>
    <path d="M-10 0 L0 -9 L10 0" />
    <path d="M-7 -2 V9 H7 V-2" />
    <path d="M-2 9 V3 H2 V9" />
  </>,
  // steam
  <>
    <path d="M-4 9 Q-8 4 -4 0 Q0 -4 -4 -9" />
    <path d="M5 9 Q1 4 5 0 Q9 -4 5 -9" />
  </>,
];

const HOUSING_ICONS: ReactNode[] = [
  // house with window
  <>
    <path d="M-11 0 L0 -10 L11 0" />
    <path d="M-8 -2 V10 H8 V-2" />
    <path d="M-3 10 V3 H3 V10" />
    <rect x="-7.5" y="0" width="4" height="4" />
  </>,
  // key
  <>
    <circle cx="-6" cy="-6" r="4.5" />
    <circle cx="-6" cy="-6" r="1.6" />
    <path d="M-3 -3 L9 9" />
    <path d="M9 9 l2.5 -2.5 M5.5 5.5 l2.5 -2.5" />
  </>,
  // document
  <>
    <path d="M-7 -11 H4 L8 -7 V11 H-7 Z" />
    <path d="M4 -11 V-7 H8" />
    <path d="M-4 -3 H5 M-4 1 H5 M-4 5 H2" />
  </>,
  // coin stack
  <>
    <ellipse cx="0" cy="-3" rx="8" ry="3.2" />
    <path d="M-8 -3 V3 A8 3.2 0 0 0 8 3 V-3" />
  </>,
  // wrench
  <path d="M8 -8 A4.5 4.5 0 0 0 2 -2 L-9 9 A1.8 1.8 0 0 0 -6.5 11.5 L4 1 A4.5 4.5 0 0 0 10 -5 L6 -1 L3 -1 L3 -4 Z" />,
  // lightbulb
  <>
    <path d="M-5 2 A6 6 0 1 1 5 2 Q4 4 3 6 H-3 Q-4 4 -5 2 Z" />
    <path d="M-3 6 V8 H3 V6" />
    <path d="M-2 10 H2" />
  </>,
];

// Scattered placement within the repeating tile (132 x 132).
const POSITIONS = [
  { x: 26, y: 28, r: -12, s: 1.3 },
  { x: 92, y: 20, r: 10, s: 1.15 },
  { x: 60, y: 70, r: 4, s: 1.45 },
  { x: 114, y: 82, r: -16, s: 1.2 },
  { x: 24, y: 108, r: 14, s: 1.15 },
  { x: 98, y: 118, r: -6, s: 1.3 },
];

const HEATING_ALIASES = [izmteploTag, chteTag];
const HOUSING_ALIASES = [bro4Tag];

const getIconSet = (alias: string): ReactNode[] => {
  if (HEATING_ALIASES.includes(alias)) return HEATING_ICONS;
  if (HOUSING_ALIASES.includes(alias)) return HOUSING_ICONS;
  return WATER_ICONS;
};

type Props = {
  className?: string;
};

const LoginBackgroundPattern = ({ className }: Props) => {
  const rawId = useId();
  const patternId = `lbp-${rawId.replace(/:/g, "")}`;
  const icons = getIconSet(import.meta.env.VITE_ALIAS);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "absolute inset-0 w-full h-full text-primary-foreground opacity-[0.07] pointer-events-none",
        className
      )}
    >
      <defs>
        <pattern
          id={patternId}
          width="132"
          height="132"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {POSITIONS.map((p, i) => (
              <g
                key={i}
                transform={`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`}
              >
                {icons[i]}
              </g>
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

export default LoginBackgroundPattern;
