"use client";

/**
 * Single entry point for GSAP in the storefront (decision D-17).
 * Components import gsap / ScrollTrigger / useGSAP from here, never from "gsap"
 * directly, so plugins are registered once and motion rules stay in one place.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Every non-essential animation is registered under this media query. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Parallax and other large-screen-only effects. */
export const MOTION_OK_DESKTOP = `${MOTION_OK} and (min-width: 1024px)`;

export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
} as const;

export const DURATION = {
  base: 0.9,
  media: 1.2,
} as const;

/** Stagger between elements that enter the viewport together (seconds). */
export const STAGGER = 0.09;

export { gsap, ScrollTrigger, useGSAP };
