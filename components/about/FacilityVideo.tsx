"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

/* --------------------------------------------------------------------------
   ABOUT · FACILITY VIDEO

   Click-to-load YouTube embed.

   WHY NOT A PLAIN IFRAME: embedding YouTube directly pulls roughly half a
   megabyte of player scripts on every page load, whether or not anyone
   presses play, and it sets cookies before the visitor has chosen to watch.
   Loading on click costs nothing until it is wanted.

   The thumbnail comes from YouTube's own CDN, derived from the video ID —
   no separate image file to keep in sync with the video.

   SCROLL-DRIVEN SCALE: the frame starts slightly inset and grows to full
   width as it enters. Tying the growth to scroll position rather than a
   timed animation means the visitor is driving it, which is what makes it
   read as cinematic rather than decorative.
   -------------------------------------------------------------------------- */

const VIDEO_ID = "E7CFrSot-Xk";
const EASE = [0.16, 1, 0.3, 1] as const;

export function FacilityVideo() {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  /* Frame grows from 88% to full as it travels into view. Held at 1 when
     reduced motion is set — a static frame, no scroll coupling. */
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [0.88, 1],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [16, 16] : [40, 16],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-950 py-20 text-ink-000 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(63,163,91,0.08)_0%,rgba(8,9,10,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-15"
      />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="eyebrow inline-flex items-center gap-3 text-ink-500"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.5), ease: EASE }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-ink-700" />
            Inside Alpha
            <span aria-hidden="true" className="h-px w-8 bg-ink-700" />
          </motion.p>

          <h2 className="mt-7 text-display-md font-semibold tracking-[-0.03em]">
            <motion.span
              className="block overflow-hidden pb-[0.12em]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "105%" },
                  visible: {
                    y: "0%",
                    transition: { duration: d(0.9), ease: EASE },
                  },
                }}
              >
                See the floor{" "}
                <span className="italic text-ink-500">for yourself.</span>
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-ink-400"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.7), delay: d(0.18), ease: EASE }}
          >
            A walk through the Coimbatore facility — design, assembly, testing
            and dispatch.
          </motion.p>
        </div>
      </div>

      {/* ---- FRAME ---------------------------------------------------- */}
      <div className="shell relative mt-14">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative mx-auto aspect-video max-w-6xl overflow-hidden border border-ink-800 bg-ink-900"
        >
          {isPlaying ? (
            <iframe
              /* autoplay is safe here because the visitor pressed play — it
                 is not an unrequested autoplay. */
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Alpha Automation & Controls — facility tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="Play the Alpha Automation facility tour"
              className="group absolute inset-0 h-full w-full"
            >
              <Image
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 72rem"
                /* unoptimized: the file lives on YouTube's CDN, which already
                   serves it compressed — routing it through the optimiser
                   adds a hop for no gain. */
                unoptimized
                className="object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />

              {/* Scrim lifts on hover, so the frame brightens as you reach
                  for it. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-ink-950/45 transition-colors duration-700 group-hover:bg-ink-950/25"
              />

              {/* Play control. The ring pulses continuously — the one piece
                  of looping motion on the page, and it earns it by being the
                  only thing here the visitor is meant to click. */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:h-24 md:w-24"
              >
                <span className="absolute inset-0 animate-[playPulse_2.6s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full border border-accent-500/60" />
                <span className="absolute inset-0 rounded-full border border-accent-500/30" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 shadow-[0_12px_40px_-8px_rgba(63,163,91,0.7)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 md:h-20 md:w-20">
                  {/* translate-x nudges the triangle to sit optically centred
                      — a play glyph looks off-centre when set geometrically. */}
                  <Play
                    className="ml-1 h-6 w-6 fill-ink-000 text-ink-000 md:h-7 md:w-7"
                    strokeWidth={1}
                  />
                </span>
              </span>

              <span className="eyebrow absolute bottom-6 left-6 text-ink-300 md:bottom-8 md:left-8">
                Company profile · Facility tour
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}