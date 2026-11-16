import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";

const partners = Array.from({ length: 10 }, (_, i) => `Client Logo ${i + 1}`);

/** Scroll distance (px) over which the hero box shrinks from full-bleed to inset. */
const SHRINK_DISTANCE = 420;

/**
 * Drives the 1club-style hero box: full screen at the top of the page, then insets
 * from the sides and rounds its corners as the user scrolls. Writes CSS variables
 * directly so scrolling never re-renders React.
 */
function useShrinkingHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(Math.max(window.scrollY / SHRINK_DISTANCE, 0), 1);
      const maxInset = window.innerWidth < 768 ? 12 : 36;
      el.style.setProperty("--hero-inset", `${(p * maxInset).toFixed(2)}px`);
      el.style.setProperty("--hero-radius", `${(p * 28).toFixed(2)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}

export function Hero() {
  const boxRef = useShrinkingHero();

  return (
    <section id="top" className="relative">
      <div
        ref={boxRef}
        style={{ ["--hero-inset" as string]: "0px", ["--hero-radius" as string]: "0px" }}
        className="px-(--hero-inset)"
      >
        <div className="relative isolate flex min-h-svh items-center overflow-hidden rounded-(--hero-radius) pt-16">
          <Placeholder
            label="Hero Background Video / Image"
            className="absolute inset-0 -z-10 items-end justify-end rounded-[inherit] bg-surface p-5"
          />

          <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center md:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                Australian web & mobile app studio
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-7xl">
                Bespoke software that fits the way your business works
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
                We design, build and support custom web and mobile apps for Australian SMEs —
                replacing spreadsheets and clunky off-the-shelf tools with software made for you.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div
                id="pricing"
                className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:justify-between sm:p-3 sm:pl-6"
              >
                <div className="text-left">
                  <p className="eyebrow">Projects</p>
                  <p className="text-sm">
                    From <span className="text-lg font-semibold">$XX,XXX</span>
                    <span className="text-muted-foreground"> · fixed-price quotes</span>
                  </p>
                </div>
                <Button size="lg" className="w-full sm:w-auto">
                  Book a free consult <ArrowRight />
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Free 30-minute discovery call · No obligation
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={320} className="mt-16 md:mt-20">
        <p className="eyebrow text-center">Trusted by 100+ Australian businesses</p>
        <div className="mask-fade-x mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((p, i) => (
              <Placeholder key={i} label={p} className="h-14 w-40 shrink-0" />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
