import { useState } from "react";
import { roles } from "@/data/portfolio";

type Role = (typeof roles)[number];

function RoleItem({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const hasAchievements = "achievements" in role && (role as { achievements?: string[] }).achievements?.length;

  return (
    <li className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-4">
      <p className="text-xs font-medium uppercase tracking-widest text-muted md:col-span-4">
        {role.dates}
      </p>
      <div className="md:col-span-8">
        <p className="font-serif text-xl text-ink">{role.org}</p>
        <p className="text-sm text-accent">{role.title}</p>
        <p className="mt-1 text-sm text-muted">{role.note}</p>
        {hasAchievements ? (
          <>
            {open ? (
              <ul className="mt-3 space-y-1.5">
                {(role as { achievements: string[] }).achievements.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink">
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mt-2 text-xs font-medium text-accent underline decoration-1 underline-offset-4"
            >
              {open ? "Less" : "Achievements"}
            </button>
          </>
        ) : null}
      </div>
    </li>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">03 — About</p>
          <h2 id="about-heading" className="sr-only">
            About
          </h2>
          <div className="mt-5 border border-line">
            <img
              src="/Headshot/1691263405587.jpg"
              alt="Tobi John Olabode"
              className="block w-full object-cover"
              loading="eager"
              style={{ aspectRatio: "4/5", objectPosition: "center top" }}
            />
          </div>
          <blockquote className="mt-6 font-serif text-3xl leading-tight text-ink md:text-4xl">
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
              <RoleItem key={role.org} role={role} />
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
