// Hand-drawn line icons in a consistent "technical drawing" style (thin
// stroke, rounded caps, occasional dashed measurement lines) so the icon set
// itself reinforces the blueprint/vergunningtekening theme instead of
// looking like a generic off-the-shelf icon library.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ExtensionIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20V9.5L9 5l6 4.5V20" />
      <path d="M9 20v-6h4v6" />
      <path d="M15 12h4a2 2 0 0 1 2 2v6h-6" />
      <path d="M15 12V9.8" strokeDasharray="1.5 2" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="8" width="10" height="12" rx="0.5" />
      <path d="M13.5 20h4a2.5 2.5 0 0 0 2.5-2.5V12" strokeDasharray="1.8 2.2" />
      <path d="M14 8h6M14 8v6" strokeDasharray="none" />
      <path d="M6.5 12h5M6.5 15h5" />
    </svg>
  );
}

export function DormerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20V11L12 4l9 7v9" />
      <path d="M3 20h18" />
      <path d="M9 20v-5h6v5" />
      <path d="M9.5 11V8.5L12 6.5l2.5 2V11" />
      <rect x="10.5" y="8.6" width="3" height="2.4" />
    </svg>
  );
}

export function GarageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 20V10L12 4l9.5 6v10" />
      <path d="M2.5 20h19" />
      <path d="M5 20v-8h14v8" />
      <path d="M5 15h14M5 12h14" strokeDasharray="1.5 1.8" />
    </svg>
  );
}

export function ClipboardCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="4.5" width="14" height="17" rx="1.5" />
      <path d="M9 4.5V3.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 3.5v1" />
      <path d="M8.5 13.5l2.2 2.2 4.8-4.8" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5l7.5 3v6c0 5-3.2 8.3-7.5 10-4.3-1.7-7.5-5-7.5-10v-6l7.5-3z" />
      <path d="M8.7 12.3l2.2 2.2 4.4-4.6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6.5-5.9-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.1-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5h16v11H9l-4.5 4V16.5H4v-11z" />
      <path d="M7.5 9.5h9M7.5 12.5h6" />
    </svg>
  );
}

export function NoStringsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
      <circle cx="17" cy="16.5" r="3.4" />
      <path d="M15.6 16.5l1 1 2-2" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5l8.5 7 8.5-7" />
    </svg>
  );
}

export function RulerPencilIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15l5-9 11 6.2-5 9-11-6.2z" />
      <path d="M8 7.8l1.3 2.3M11 6.2l1.3 2.3M6.6 10.3l1.3 2.3" />
      <path d="M13.3 18.3L18 21l-1.2-5.3" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.3l2.4 2.4 5-5.2" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.34a9.8 9.8 0 004.63 1.16h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 17.86h-.01a8.4 8.4 0 01-4.24-1.16l-.3-.18-2.9.72.72-2.88-.2-.31a8.36 8.36 0 01-1.28-4.48c0-4.62 3.76-8.38 8.4-8.38 2.24 0 4.35.87 5.93 2.45a8.32 8.32 0 012.46 5.93c0 4.62-3.76 8.38-8.38 8.38zm4.6-6.28c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.79.98-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

export function FileCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V8h4" />
      <path d="M8.7 14.3l2.1 2.1 4.2-4.4" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3.5M16 3v3.5" />
      <path d="M8.5 13.5l1.6 1.6 3.4-3.6" />
    </svg>
  );
}

export function WaveIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="10" rx="1" strokeDasharray="1.5 2" />
      <path d="M3 20c1.8-1.6 3.6-1.6 5.4 0 1.8 1.6 3.6 1.6 5.4 0 1.8-1.6 3.6-1.6 5.4 0" />
      <path d="M6 11h12" />
    </svg>
  );
}

export function TerraceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20V11l6-5 6 5v9" strokeDasharray="none" />
      <path d="M15 20v-6h6v6" />
      <path d="M3 20h18" />
      <path d="M3 15h6M6 15v5" strokeDasharray="1.4 1.8" />
    </svg>
  );
}

export function SmallHouseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V12l6-4.5 6 4.5v8" />
      <path d="M4 20h12" />
      <path d="M8 20v-5h4v5" />
      <path d="M14 12h4a1.5 1.5 0 0 1 1.5 1.5V20H14" strokeDasharray="1.4 1.8" />
    </svg>
  );
}

export function HeartHomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V11l8-6 8 6v9" />
      <path d="M4 20h16" />
      <path d="M12 17.5c-2.4-1.5-3.6-2.8-3.6-4.3a2 2 0 0 1 3.6-1.2 2 2 0 0 1 3.6 1.2c0 1.5-1.2 2.8-3.6 4.3z" />
    </svg>
  );
}

export function LightningIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2.5L5 13.5h5.5L10.5 21.5 19 10.5h-5.5L13 2.5z" />
    </svg>
  );
}

export function EuroIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17 6.5a7 7 0 1 0 0 11" />
      <path d="M4.5 10.5h8M4.5 13.5h7" />
    </svg>
  );
}
