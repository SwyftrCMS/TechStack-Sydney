import { Star } from "lucide-react";
import { Placeholder } from "./Placeholder";
import { Reveal, SectionHeading } from "./Reveal";

const reviews = [
  { name: "Director, Electrical Contractor (Brisbane)", badge: "Google", text: "Our job sheets used to live on paper and in group chats. The field app they built has our sparkies quoting and invoicing from site." },
  { name: "Owner, Online Homewares Store (Melbourne)", badge: "Clutch", text: "They connected our Shopify store, warehouse and Xero. Orders now flow through without anyone re-typing them." },
  { name: "Practice Manager, Allied Health Clinic (Perth)", badge: "Google", text: "The patient booking app paid for itself within months. No-shows dropped, reception stopped drowning in calls, and the team actually enjoys using it." },
  { name: "Founder, Logistics Startup (Sydney)", badge: "Clutch", text: "On time and on budget." },
  { name: "CEO, Manufacturing Business (Adelaide)", badge: "Google", text: "They took the time to understand how our factory really runs before writing a line of code. The dashboard gives us numbers we used to wait a week for." },
  { name: "GM, Hospitality Group (Gold Coast)", badge: "Clutch", text: "One ordering and rostering system across four venues. Support has been fast and genuinely local whenever we needed them." },
  { name: "Owner, Accounting Firm (Hobart)", badge: "Google", text: "The client portal replaced endless email chains. Clients upload documents and sign off in one place." },
  { name: "Operations Lead, Not-for-profit (Canberra)", badge: "Clutch", text: "A small team with a tight budget, and they still treated us like their biggest client. Our volunteer app saves hours every single week." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Client stories"
            title="Trusted by Australian business owners"
            sub="4.9 average rating across Google and Clutch reviews."
          />
        </Reveal>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 80} className="mb-4 break-inside-avoid">
              <figure className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-foreground text-foreground" />
                    ))}
                  </div>
                  <Placeholder label={r.badge} className="h-8 w-16 rounded-md" />
                </div>
                <blockquote className="mt-4 text-pretty">“{r.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-placeholder-strong" />
                  <div>
                    <p className="text-sm font-medium">[Author Name]</p>
                    <p className="text-xs text-muted-foreground">{r.name}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
