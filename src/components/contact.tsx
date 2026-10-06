import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { z } from "zod";
import { EMAIL, socials } from "@/data/portfolio";

const noteSchema = z.object({
  name: z.string().trim().min(2, "Please add your name."),
  email: z.string().trim().min(1, "Please add an email.").email("That email does not look right."),
  message: z.string().trim().min(10, "A sentence or two is enough."),
});

type Fields = z.infer<typeof noteSchema>;
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", message: "" };

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = noteSchema.safeParse(fields);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "message") next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    const subject = encodeURIComponent(`Note from ${parsed.data.name}`);
    const body = encodeURIComponent(
      `${parsed.data.message}\n\n— ${parsed.data.name}\n${parsed.data.email}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line" aria-labelledby="contact-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">05 — Contact</p>
          <h2 id="contact-heading" className="mt-3 font-serif text-4xl text-ink md:text-5xl">
            A short note is enough.
          </h2>
          <p className="mt-4 max-w-sm text-muted">
            The form opens a draft in your mail app. Nothing is stored on this site.
          </p>
          <a href={`mailto:${EMAIL}`} className="mt-6 inline-block font-serif text-2xl text-ink underline decoration-line underline-offset-4">
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent"
          >
            {copied ? "Copied" : "Copy address"}
          </button>
          <ul className="mt-8 space-y-1">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 text-sm text-ink"
                >
                  {item.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-line bg-paper-2 p-6 md:col-span-7 md:p-8">
          {sent ? (
            <div>
              <p className="font-serif text-3xl text-ink">Draft ready.</p>
              <p className="mt-3 max-w-md text-muted">
                Your mail app should be holding the note. If nothing opened, write directly to {EMAIL}.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 inline-flex min-h-11 items-center bg-ink px-5 text-sm font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <Field
                id="name"
                label="Name"
                value={fields.name}
                error={errors.name}
                autoComplete="name"
                onChange={(value) => update("name", value)}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={fields.email}
                error={errors.email}
                autoComplete="email"
                onChange={(value) => update("email", value)}
              />
              <Field
                id="message"
                label="Message"
                value={fields.message}
                error={errors.message}
                multiline
                onChange={(value) => update("message", value)}
              />
              <button
                type="submit"
                className="mt-8 inline-flex min-h-11 items-center bg-ink px-5 text-sm font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Open mail draft
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const className =
    "w-full border-0 border-b border-line bg-transparent py-3 text-base text-ink outline-none focus:border-ink";
  return (
    <div className="mt-6 first:mt-0">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-widest text-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className={className}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
