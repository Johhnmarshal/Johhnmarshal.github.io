import { roles } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">03 — About</p>
          <h2 id="about-heading" className="sr-only">
            About
          </h2>
          <blockquote className="mt-5 font-serif text-3xl leading-tight text-ink md:text-4xl">
            A green advisor is not the same thing as a clean bill.
          </blockquote>
          <p className="mt-6 text-sm text-muted">Based in Wales, United Kingdom.</p>
        </div>

        <div className="md:col-span-7">
          <div className="space-y-4 text-base text-ink">
            <p>
              I work between a cloud bill and the people who can change it. At Next that has meant standing up FinOps from a blank page: policy, product tagging, showback, and a hub of monthly, daily and AI cost views that domain managers actually open.
            </p>
            <p>
              Before that, at Taylor & Eyre, the estate was AWS. Cloud waste came down by a quarter. A Python reporting system retired most of the manual pack. Tagging and service control policies made allocation something finance could trust.
            </p>
            <p>
              The years before cloud were in banking — at FBNQuest, leading a team of six through equity trades, reconciliation, and MiFID II compliance at 99%+ accuracy. The discipline of a figure that has to survive audit. An MSc in Data Science at Cardiff is why I treat the bill as a dataset, not a spreadsheet that happens to be large. The same habit now covers generative AI: tokens, models, and who owns the cost. In 2026, named contributor to the FinOps Foundation working group on practical scenarios for data-cloud cost.
            </p>
          </div>

          <ol className="mt-10 border-t border-line">
            {roles.map((role) => (
              <li key={role.org} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-4">
                <p className="text-xs font-medium uppercase tracking-widest text-muted md:col-span-4">
                  {role.dates}
                </p>
                <div className="md:col-span-8">
                  <p className="font-serif text-xl text-ink">{role.org}</p>
                  <p className="text-sm text-accent">{role.title}</p>
                  <p className="mt-1 text-sm text-muted">{role.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Education</p>
              <p className="mt-2 font-serif text-lg text-ink">MSc Data Science & Analytics</p>
              <p className="text-sm text-muted">Cardiff University</p>
              <p className="mt-3 font-serif text-lg text-ink">B.Tech Management & Accounting</p>
              <p className="text-sm text-muted">Ladoke Akintola University of Technology</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Membership</p>
              <p className="mt-2 font-serif text-lg text-ink">Operational Research Society</p>
              <p className="text-sm text-muted">Candidate Associate · No. 65050</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
