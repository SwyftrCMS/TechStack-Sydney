import { useState } from "react";
import { Placeholder, Line } from "./Placeholder";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

export type FeatureStep = { title: string; desc: string };

/** Mock dashboard whose inner layout changes per step so switching is visible. */
function DashboardMock({ index, title, kind }: { index: number; title: string; kind: string }) {
  const layout = index % 5;
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-card p-3 shadow-sm md:p-4">
      <div className="flex items-center gap-1.5 border-b pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-placeholder-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-placeholder-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-placeholder-strong" />
        <span className="ml-3 font-mono text-[0.68rem] text-placeholder-foreground">
          [{kind} Preview — {title}]
        </span>
      </div>
      <div
        key={index}
        className="mt-3 grid flex-1 animate-in fade-in slide-in-from-bottom-2 gap-3 duration-500"
      >
        {layout === 0 && (
          <div className="grid grid-cols-4 gap-3">
            <Placeholder variant="dashed" label="Backlog" className="col-span-1 min-h-64" />
            <div className="col-span-3 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-md bg-surface p-2">
                  <div className="h-7 w-7 rounded-full bg-placeholder-strong" />
                  <Line className="w-1/3" />
                  <Line className="ml-auto w-12" />
                </div>
              ))}
            </div>
          </div>
        )}
        {layout === 1 && (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-md",
                  i % 5 === 0 ? "bg-placeholder-strong" : "bg-surface",
                )}
              />
            ))}
          </div>
        )}
        {layout === 2 && (
          <div className="grid gap-3">
            <div className="grid grid-cols-3 gap-3">
              {["Uptime", "Active Users", "Releases"].map((k) => (
                <Placeholder key={k} label={k} className="h-20" />
              ))}
            </div>
            <Placeholder variant="dashed" label="Performance Chart" className="min-h-44" />
          </div>
        )}
        {layout === 3 && (
          <div className="grid grid-cols-2 gap-3">
            <Placeholder label="Architecture Diagram" className="min-h-64" />
            <div className="space-y-3">
              <Placeholder variant="dashed" label="API Integrations" className="h-20" />
              <Placeholder variant="dashed" label="Database" className="h-20" />
              <Placeholder variant="dashed" label="Cloud Hosting" className="h-20" />
            </div>
          </div>
        )}
        {layout === 4 && (
          <div className="grid gap-3">
            <Placeholder label="Product Demo Video" className="min-h-48" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 rounded-md bg-surface" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FeaturePillar({
  id,
  eyebrow,
  title,
  sub,
  steps,
  kind,
  reverse = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  sub: string;
  steps: FeatureStep[];
  kind: string;
  reverse?: boolean;
}) {
  const [active, setActive] = useState(0);

  return (
    <section id={id} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} sub={sub} align="left" />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className={cn("lg:col-span-5", reverse && "lg:order-2")}>
            <ol className="flex flex-col gap-2">
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.title}>
                    <button
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className={cn(
                        "group w-full rounded-xl border p-5 text-left transition-all",
                        isActive
                          ? "border-placeholder-border bg-accent"
                          : "border-transparent hover:bg-surface",
                      )}
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "font-mono text-xs",
                            isActive ? "text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <h3
                            className={cn(
                              "text-lg font-medium transition-colors",
                              !isActive && "text-muted-foreground group-hover:text-foreground",
                            )}
                          >
                            {s.title}
                          </h3>
                          <div
                            className={cn(
                              "grid transition-all duration-300",
                              isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                            )}
                          >
                            <p className="overflow-hidden text-sm text-muted-foreground">{s.desc}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={120} className={cn("lg:col-span-7", reverse && "lg:order-1")}>
            <div className="h-full rounded-3xl bg-surface p-3 md:p-6">
              <DashboardMock
                index={active + (reverse ? 3 : 0)}
                title={steps[active]?.title ?? ""}
                kind={kind}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
