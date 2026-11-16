import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Placeholder } from "./Placeholder";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

const prompts = [
  { q: "Which jobs are running over budget this month?", a: "Job Cost Table", text: "Three jobs are tracking over their quoted hours. Here's the breakdown:" },
  { q: "Summarise last quarter's sales by state", a: "Sales by State Chart", text: "NSW and VIC led sales last quarter. Here's the split by state:" },
  { q: "Draft a quote for a returning customer", a: "Draft Quote Document", text: "Here's a draft based on their last three orders and your current price list:" },
];

export function AIChat() {
  const [active, setActive] = useState(0);
  const p = prompts[active] ?? prompts[0]!;

  return (
    <section id="ai" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 rounded-3xl border bg-surface p-6 md:p-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="AI & automation"
              title="Put AI to work inside your business"
              sub="We build custom AI assistants and automations that plug into your own systems and data."
              align="left"
            />
            <ul className="mt-8 space-y-3 text-sm">
              {["Ask questions of your own business data in plain English", "Automate quoting, reporting and repetitive admin", "Secure, Australian-hosted and built to your privacy requirements"].map((t) => (
                <li key={t} className="flex gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {prompts.map((pr, i) => (
                <button
                  key={pr.q}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    i === active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-accent",
                  )}
                >
                  {pr.q}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex min-h-[460px] flex-col rounded-2xl border bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <div className="h-6 w-6 rounded-md bg-placeholder-strong" />
                <span className="font-mono text-xs text-muted-foreground">[AI Assistant]</span>
              </div>
              <div key={active} className="flex flex-1 flex-col gap-4 p-4">
                <div className="ml-auto max-w-[80%] animate-in fade-in slide-in-from-right-2 rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground duration-300">
                  {p.q}
                </div>
                <div className="max-w-[90%] animate-in fade-in slide-in-from-left-2 space-y-3 rounded-2xl rounded-bl-sm bg-surface p-4 text-sm delay-150 duration-500 fill-mode-both">
                  <p>{p.text}</p>
                  <Placeholder variant="dashed" label={p.a} className="h-40 bg-card" />
                </div>
              </div>
              <div className="m-4 mt-0 flex items-center gap-2 rounded-xl border bg-background p-2 pl-4">
                <span className="flex-1 text-sm text-muted-foreground">Ask about your jobs, sales or customers…</span>
                <Button size="icon" aria-label="Send">
                  <ArrowUp />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
