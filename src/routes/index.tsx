import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
