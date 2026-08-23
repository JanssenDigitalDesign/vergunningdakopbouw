"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const VARIANTS = {
  up: { hidden: "translate-y-6 opacity-0", shown: "translate-y-0 opacity-100" },
  scale: { hidden: "scale-95 opacity-0", shown: "scale-100 opacity-100" },
  none: { hidden: "opacity-0", shown: "opacity-100" },
} as const;

// Fades/slides content in the first time it scrolls into view. Server-
// rendered markup is unaffected (SSR/SEO see the full content immediately);
// this only toggles opacity/transform client-side after hydration.
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: keyof typeof VARIANTS;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { hidden, shown } = VARIANTS[variant];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? shown : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
