import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";

const faqs = [
  { q: "How much does a custom app cost?", a: "Every project is different, so we start with a free discovery call and give you a fixed-price quote before any work begins. No surprise invoices." },
  { q: "How long does a typical project take?", a: "Most SME projects go from discovery to launch in 8–16 weeks. We deliver in fortnightly sprints, so you see working software early and often." },
  { q: "Who owns the code and intellectual property?", a: "You do. Once the project is paid for, the source code, designs and IP belong to your business." },
  { q: "Can you connect to the tools we already use?", a: "Yes. We regularly integrate with Xero, MYOB, Shopify, HubSpot, Microsoft 365 and most systems that offer an API." },
  { q: "What happens after launch?", a: "We offer ongoing support, hosting and improvement plans from our Australian-based team, so your software keeps working and growing with your business." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" align="left" />
        </Reveal>
        <Reveal delay={100} className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="py-6 text-base hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
