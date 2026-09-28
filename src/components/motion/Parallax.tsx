"use client";

import { useRef, type ReactNode } from "react";
import { MOTION_OK, MOTION_OK_DESKTOP, gsap, useGSAP } from "@/lib/motion/gsap";

/**
 * Subtle scroll-linked vertical drift, never with reduced motion. Full strength
 * from 1024px, half strength on smaller screens (transform-only, cheap on phones).
 *
 * `speed` is the drift in % of the element's own height over the full scroll
 * range (negative = moves up faster than the page). Keep it small (±5–20).
 */
type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Parallax({ children, speed = -10, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add({ desktop: MOTION_OK_DESKTOP, motion: MOTION_OK }, (context) => {
        if (!context.conditions?.motion) return;
        gsap.to(el, {
          yPercent: context.conditions.desktop ? speed : speed / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            // clamp() keeps above-the-fold elements at rest on load.
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: 0.6,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
