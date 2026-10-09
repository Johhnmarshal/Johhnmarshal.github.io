import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

const blogLink = { href: "/blog", label: "Writing" };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const onBlog = location.pathname.startsWith("/blog");

  useEffect(() => {
    const onScroll = () => {
      const mark = window.scrollY + 120;
      let current = "";
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= mark) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="/" className="font-serif text-lg leading-none text-ink">
          Tobi John Olabode
          <span className="mt-1 block text-xs font-sans font-medium uppercase tracking-widest text-muted">
            FinOps · Wales
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Page">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={active === link.id ? "location" : undefined}
              className={`inline-flex min-h-11 items-center px-3 text-sm ${
                active === link.id ? "text-accent" : "text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={blogLink.href}
            aria-current={onBlog ? "page" : undefined}
            className={`inline-flex min-h-11 items-center px-3 text-sm ${onBlog ? "text-accent" : "text-ink"}`}
          >
            {blogLink.label}
          </a>
        </nav>

        <a
          href="/#contact"
          className="hidden min-h-11 items-center bg-ink px-4 text-sm font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.96] md:inline-flex"
        >
          Write
        </a>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-line text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line px-5 py-2 md:hidden" aria-label="Page">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="flex min-h-11 items-center border-b border-line text-base text-ink last:border-b-0"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={blogLink.href}
            aria-current={onBlog ? "page" : undefined}
            className={`flex min-h-11 items-center text-base ${onBlog ? "text-accent" : "text-ink"}`}
            onClick={() => setOpen(false)}
          >
            {blogLink.label}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
