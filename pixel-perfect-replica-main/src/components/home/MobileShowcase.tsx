import { CalendarDays, LayoutGrid, Ticket } from "lucide-react";
import { Placeholder, Line } from "./Placeholder";
import { Reveal, SectionHeading } from "./Reveal";

const callouts = [
  { icon: CalendarDays, title: "Customer bookings", desc: "Let customers book, pay and reschedule without a phone call." },
  { icon: LayoutGrid, title: "Staff & field tools", desc: "Job schedules, checklists and sign-offs that work offline on site." },
  { icon: Ticket, title: "Push notifications", desc: "Reminders, updates and offers that bring customers back." },
];

function Phone() {
  return (
    <div className="relative mx-auto h-[620px] w-[300px] rounded-[3rem] border-[10px] border-device bg-device shadow-2xl">
      <div className="absolute left-1/2 top-2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-device" />
      <div className="flex h-full flex-col gap-3 overflow-hidden rounded-[2.2rem] bg-background p-4 pt-10">
        <div className="flex items-center justify-between">
          <Placeholder label="Logo" className="h-7 w-20 rounded-md" />
          <div className="h-8 w-8 rounded-full bg-placeholder-strong" />
        </div>

        <div className="rounded-xl border bg-card p-3">
          <p className="font-mono text-[0.6rem] text-placeholder-foreground">[Booking Calendar]</p>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div
                key={i}
                className={
                  i === 2
                    ? "flex aspect-square items-center justify-center rounded-md bg-primary text-[0.6rem] text-primary-foreground"
                    : "flex aspect-square items-center justify-center rounded-md bg-surface text-[0.6rem] text-muted-foreground"
                }
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-3">
          <p className="font-mono text-[0.6rem] text-placeholder-foreground">[Job Schedule]</p>
          <div className="mt-2 space-y-1.5">
            {["07:00", "08:30", "10:00"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 rounded-md bg-surface p-2">
                <span className="font-mono text-[0.6rem]">{t}</span>
                <Line className="w-16" />
                <span
                  className={
                    i === 1
                      ? "ml-auto h-4 w-10 rounded-full bg-placeholder-strong"
                      : "ml-auto h-4 w-10 rounded-full border border-placeholder-border"
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.6rem] text-placeholder-foreground">[Quick Actions]</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Placeholder key={i} label={`Action ${i + 1}`} className="h-16 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="mt-auto flex justify-around rounded-xl bg-surface p-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-5 w-5 rounded-md bg-placeholder-strong" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileShowcase() {
  return (
    <section id="app" className="overflow-hidden bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Mobile apps"
            title="iOS and Android apps your customers will actually use"
            sub="Cross-platform apps designed around your customers and staff, built once and published to both app stores."
          />
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal className="order-2 space-y-4 lg:order-1">
            {callouts.slice(0, 2).map((c) => (
              <Callout key={c.title} {...c} />
            ))}
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <Phone />
          </Reveal>
          <Reveal delay={200} className="order-3 space-y-4">
            <Callout {...callouts[2]!} />
            <div className="flex gap-3">
              <Placeholder label="App Store Badge" className="h-12 flex-1" />
              <Placeholder label="Google Play Badge" className="h-12 flex-1" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Callout({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof CalendarDays;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <Icon className="h-5 w-5" />
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
