import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditional class names with Tailwind conflict resolution.
 *
 * Plain string concatenation breaks when a component sets a default class and
 * a caller overrides it — both survive and the later one in the stylesheet
 * wins, not the one you intended. twMerge resolves the conflict correctly.
 *
 *   cn("px-4 py-2", isLarge && "px-8")   ->  "py-2 px-8"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pads an editorial section number: 3 -> "03". */
export function sectionNumber(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Formats an ISO date for display: "2026-03-14" -> "14 March 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}