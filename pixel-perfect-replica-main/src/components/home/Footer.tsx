import { Placeholder } from "./Placeholder";

const columns = [
  { title: "Services", links: ["Web App Development", "Mobile App Development", "UX/UI Design", "Systems Integration", "AI & Automation", "Support & Hosting", "Discovery Workshops"] },
  { title: "Industries", links: ["Retail & eCommerce", "Trades & Construction", "Healthcare", "Hospitality", "Professional Services", "Logistics", "Manufacturing", "Education", "Not-for-profit"] },
  { title: "Resources", links: ["Case Studies", "Blog", "Guides", "Project Cost Calculator", "Grants & Funding", "FAQ"] },
  { title: "Locations", links: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Remote across Australia"] },
  { title: "Studio", links: ["About", "Our Process", "Careers", "Contact", "Client Login"] },
];

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Placeholder label="Logo Placeholder" className="h-10 w-40" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Bespoke web and mobile software for Australian small and medium businesses.
            </p>
            <div className="mt-6 flex gap-2">
              {["X", "IG", "in", "YT"].map((s) => (
                <Placeholder key={s} label={s} className="h-9 w-9 rounded-md" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="eyebrow">{c.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 [Studio Name] · ABN XX XXX XXX XXX · Wireframe prototype.</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-foreground">Privacy</a>
            <a href="#top" className="hover:text-foreground">Terms</a>
            <a href="#top" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
