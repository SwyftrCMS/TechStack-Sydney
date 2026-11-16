import { useState } from "react";
import { Placeholder, Line } from "./Placeholder";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

const industries = [
  "Retail & eCommerce",
  "Trades & Construction",
  "Healthcare",
  "Hospitality",
  "Professional Services",
  "Logistics",
  "Manufacturing",
  "Education",
  "Not-for-profit",
];

export function IndustryTabs() {
  const [active, setActive] = useState(0);
  const name = industries[active] ?? "Retail & eCommerce";

  return (
    <section id="industries" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Industries"
            title="Software built around your industry"
            sub="Pick your industry to see the kinds of apps we build for businesses like yours."
          />
        </Reveal>

        <Reveal delay={100}>
          <div
            role="tablist"
            aria-label="Business categories"
            className="mt-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center"
          >
            {industries.map((ind, i) => (
              <button
                key={ind}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm transition-all",
                  active === i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {ind}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div
            key={name}
            role="tabpanel"
            className="mt-8 grid animate-in fade-in zoom-in-[0.98] gap-4 rounded-2xl border bg-surface p-4 duration-500 md:grid-cols-3 md:p-6"
          >
            <div className="flex flex-col justify-between gap-6 rounded-xl border bg-card p-6">
              <div>
                <p className="eyebrow">Selected industry</p>
                <h3 className="mt-2 text-2xl font-semibold">{name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Customer portals, staff apps, booking systems and integrations tailored to {name} businesses.
                </p>
              </div>
              <div className="space-y-2">
                <Line className="w-full" />
                <Line className="w-4/5" />
                <Line className="w-3/5" />
              </div>
            </div>
            <Placeholder
              label={`${name} Case Study Image`}
              className="aspect-video md:col-span-2 md:aspect-auto md:min-h-72"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
