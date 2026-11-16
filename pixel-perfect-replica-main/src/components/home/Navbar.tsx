import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Placeholder } from "./Placeholder";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#run" },
  { label: "Industries", href: "#industries" },
  { label: "Our Work", href: "#testimonials" },
  { label: "AI & Automation", href: "#ai" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled || open ? "border-border bg-background/90 backdrop-blur" : "border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#top" aria-label="Home">
          <Placeholder label="Logo Placeholder" className="h-9 w-36" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a href="#login" className="px-3 py-2 text-sm font-medium hover:underline">
            Client login
          </a>
          <Button asChild>
            <a href="#pricing">Book a free consult</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div className="animate-in fade-in slide-in-from-top-2 border-t bg-background px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b py-3 text-base"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" asChild>
              <a href="#login" onClick={() => setOpen(false)}>
                Client login
              </a>
            </Button>
            <Button asChild>
              <a href="#pricing" onClick={() => setOpen(false)}>
                Book a free consult
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
