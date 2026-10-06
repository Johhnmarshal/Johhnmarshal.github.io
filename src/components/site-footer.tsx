import { socials } from "@/data/portfolio";

const navigate = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <p className="font-serif text-5xl leading-none tracking-tight sm:text-7xl lg:text-8xl">Olabode</p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-paper/60">Navigate</p>
            <ul className="mt-3">
              {navigate.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-11 items-center text-sm text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-paper/60">Elsewhere</p>
            <ul className="mt-3">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center text-sm text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-paper/60">Colophon</p>
            <p className="mt-4 text-sm leading-normal text-paper/80">
              Tobi John Olabode. Senior FinOps, Wales. Set in Fraunces and Outfit.
            </p>
            <p className="mt-4 text-sm text-paper/60">© 2026 tobiolabode.tech</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
