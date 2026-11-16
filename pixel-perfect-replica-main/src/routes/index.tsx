import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { IndustryTabs } from "@/components/home/IndustryTabs";
import { FeaturePillar } from "@/components/home/FeaturePillar";
import { MobileShowcase } from "@/components/home/MobileShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { AIChat } from "@/components/home/AIChat";
import { FAQ } from "@/components/home/FAQ";
import { Footer } from "@/components/home/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Custom Web & Mobile App Development for Australian SMEs — Homepage Wireframe" },
      {
        name: "description",
        content:
          "Homepage wireframe for an Australian studio that designs, builds and supports bespoke web and mobile apps for small and medium businesses.",
      },
      { property: "og:title", content: "Custom Web & Mobile App Development for Australian SMEs" },
      {
        property: "og:description",
        content: "Bespoke software that fits the way your business works — designed, built and supported in Australia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const runSteps = [
  { title: "Discovery & Strategy", desc: "We map your processes, goals and budget, then scope a clear, fixed-price plan." },
  { title: "Sprint Planning", desc: "Your project is broken into fortnightly sprints with a shared timeline you can follow." },
  { title: "Design & Build", desc: "UX/UI design and development of your web or mobile app, with a demo every sprint." },
  { title: "Integrations", desc: "Connect your new software to Xero, MYOB, Shopify, your CRM and other existing tools." },
  { title: "Testing & Launch", desc: "Thorough QA, a smooth go-live and training for your team." },
];

const growSteps = [
  { title: "Hosting & Monitoring", desc: "Secure, Australian-hosted infrastructure watched around the clock." },
  { title: "Support & Maintenance", desc: "A local team on call for fixes, updates and security patches." },
  { title: "Analytics & Insights", desc: "Dashboards that show how your software is used and where to improve." },
  { title: "New Features", desc: "A shared roadmap so your app keeps pace as your business grows." },
  { title: "AI & Automation", desc: "Add smart assistants and automated workflows when you're ready." },
];

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <IndustryTabs />
        <FeaturePillar
          id="run"
          eyebrow="How we build"
          title="From idea to launch, without the guesswork"
          sub="A proven, transparent process that keeps your project on time and on budget."
          steps={runSteps}
          kind="Project"
        />
        <FeaturePillar
          id="grow"
          eyebrow="Support & scale"
          title="Software that keeps getting better after launch"
          sub="Ongoing partnership plans that keep your app fast, secure and growing with you."
          steps={growSteps}
          kind="Platform"
          reverse
        />
        <MobileShowcase />
        <Testimonials />
        <AIChat />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
