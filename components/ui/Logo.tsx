import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * Which wordmark colour to show.
   *   "light" — white wordmark, for dark surfaces (navbar over hero, footer)
   *   "dark"  — charcoal wordmark, for light surfaces (scrolled navbar)
   */
  variant?: "light" | "dark";
  /** Rendered height in px. Width follows the 3.28:1 aspect ratio. */
  height?: number;
  className?: string;
  /** Set true for the navbar instance — it is above the fold. */
  priority?: boolean;
}

/* Intrinsic dimensions of the source SVG. */
const ASPECT = 738 / 225;

/**
 * Alpha wordmark.
 *
 * Both colour variants are rendered and cross-faded via opacity rather than
 * swapping the `src`. Swapping the source would cause a visible flash on
 * every navbar state change, because the browser treats it as a new image
 * load. Two stacked layers cost one extra request on first paint and then
 * transition for free.
 *
 * The green swoosh is identical in both files — #3fa35b holds contrast on
 * light and dark surfaces alike, so only the wordmark needed a second
 * version.
 *
 * Presentational only. The navbar and footer wrap this in their own link,
 * since the destination and accessible label differ by context.
 */
export function Logo({
  variant = "dark",
  height = 34,
  className,
  priority = false,
}: LogoProps) {
  const width = Math.round(height * ASPECT);

  return (
    <span
      className={cn("relative block shrink-0", className)}
      style={{ width, height }}
    >
      <Image
        src="/logos/alpha-logo.svg"
        alt="Alpha Automation & Controls"
        width={width}
        height={height}
        priority={priority}
        /* SVGs are already minimal — running them through the optimiser adds
           a request and returns the same bytes. */
        unoptimized
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-[--duration-ui] ease-[--ease-out-quart]",
          variant === "dark" ? "opacity-100" : "opacity-0",
        )}
      />
      <Image
        src="/logos/alpha-logo-light.svg"
        /* Empty alt: the layer above already carries the accessible name.
           Announcing it twice would be noise for screen reader users. */
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-[--duration-ui] ease-[--ease-out-quart]",
          variant === "light" ? "opacity-100" : "opacity-0",
        )}
      />
    </span>
  );
}