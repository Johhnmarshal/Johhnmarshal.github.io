import { credentials, skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">04 — Skills</p>
        <h2 id="skills-heading" className="mt-3 max-w-xl font-serif text-4xl text-ink md:text-5xl">
          What the practice is made of
        </h2>

        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <li key={group.title} className="bg-paper p-6">
              <p className="font-serif text-sm italic text-accent">{group.index}</p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="border-t border-line pt-2 text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <h3 className="text-xs font-medium uppercase tracking-widest text-muted">Credentials</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {credentials.map((item) => (
              <li key={item} className="border-t border-line pt-3 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
