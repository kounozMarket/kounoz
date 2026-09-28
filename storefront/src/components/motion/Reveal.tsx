"use client";

import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { DURATION, EASE, MOTION_OK, STAGGER, ScrollTrigger, gsap, useGSAP } from "@/lib/motion/gsap";

/**
 * Scroll reveal scope.
 *
 * Mark descendants with `data-reveal="<preset>"`. They are revealed in small
 * batches as they enter the viewport (ScrollTrigger.batch), staggered in DOM
 * order, once. Markup stays server-rendered; this component only adds motion.
 *
 * Presets:
 * - "fade-up": opacity + short upward translate (text, cards)
 * - "fade":    opacity only
 * - "media":   clip-path opening + inner zoom-out. The element must contain a
 *              `[data-reveal-inner]` child that is safe to scale.
 *
 * With reduced motion nothing is registered and content is shown as-is.
 */
type Preset = "fade-up" | "fade" | "media";

const FROM: Record<Preset, gsap.TweenVars> = {
  "fade-up": { autoAlpha: 0, y: 32 },
  fade: { autoAlpha: 0 },
  media: { autoAlpha: 0, clipPath: "inset(10% 8% 10% 8% round 1.5rem)" },
};

const TO: Record<Preset, gsap.TweenVars> = {
  "fade-up": { autoAlpha: 1, y: 0, duration: DURATION.base, ease: EASE.out },
  fade: { autoAlpha: 1, duration: DURATION.base, ease: "power2.out" },
  media: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: DURATION.media, ease: EASE.inOut },
};

function presetOf(el: Element): Preset {
  const value = el.getAttribute("data-reveal");
  return value === "fade" || value === "media" ? value : "fade-up";
}

type Tag = "div" | "section" | "header" | "ul" | "ol";

type RevealProps = {
  as?: Tag;
  children: ReactNode;
  /** ScrollTrigger start position. */
  start?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

export function Reveal({ as = "div", children, start = "top 85%", ...rest }: RevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        if (!targets.length) return;

        targets.forEach((el) => {
          gsap.set(el, FROM[presetOf(el)]);
          if (presetOf(el) === "media") {
            const inner = el.querySelector("[data-reveal-inner]");
            if (inner) gsap.set(inner, { scale: 1.14 });
          }
        });

        ScrollTrigger.batch(targets, {
          start,
          once: true,
          onEnter: (batch) => {
            batch.forEach((el, i) => {
              const preset = presetOf(el);
              gsap.to(el, {
                ...TO[preset],
                delay: i * STAGGER,
                clearProps: "transform,clipPath",
              });
              if (preset === "media") {
                const inner = el.querySelector("[data-reveal-inner]");
                if (inner) {
                  gsap.to(inner, {
                    scale: 1,
                    duration: DURATION.media + 0.4,
                    ease: EASE.out,
                    delay: i * STAGGER,
                    clearProps: "transform",
                  });
                }
              }
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  // All allowed tags share the HTMLElement API used here; typed as div for the ref.
  const Tag = as as "div";
  return (
    <Tag ref={scope} {...rest}>
      {children}
    </Tag>
  );
}
