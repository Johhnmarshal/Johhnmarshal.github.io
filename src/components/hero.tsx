export function Hero() {
  const figures = [
    { value: "6+", label: "Years in FinOps" },
    { value: "33.3%", label: "Cloud waste cut" },
    { value: "3", label: "Clouds in practice" },
    { value: "50+", label: "Engineers trained" },
  ];

  return (
    <section className="border-b border-line" aria-labelledby="intro-heading">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <p className="enter text-xs font-medium uppercase tracking-widest text-accent">
          01 — tobiolabode.tech · Wales
        </p>
        <h1
          id="intro-heading"
          className="enter enter-delay mt-6 max-w-4xl font-serif text-5xl font-medium leading-display text-ink sm:text-6xl lg:text-7xl"
        >
          The bill
          <span className="block italic text-accent">is a dataset.</span>
        </h1>
        <p className="enter enter-delay mt-6 max-w-xl text-lg text-muted">
          Senior FinOps across Azure, AWS and GCP. I design the frameworks, the
          dashboards and the habits that turn a cloud bill into a decision —
          including the token economics of generative AI.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center bg-ink px-5 text-sm font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            Selected work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-line underline-offset-4"
          >
            Start a note
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 divide-x divide-y divide-line border border-line md:grid-cols-4 md:divide-y-0">
          {figures.map((figure) => (
            <div key={figure.label} className="bg-paper px-4 py-5 md:px-6">
              <dd className="font-serif text-3xl text-ink md:text-4xl">{figure.value}</dd>
              <dt className="mt-2 text-xs font-medium uppercase tracking-widest text-muted">
                {figure.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
