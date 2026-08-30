import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Positioning() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="The Problem"
            title="A website usually means finding four different people."
            description="A designer to build it. A host to keep it online. A writer for the words. Someone else again when something needs to change. Most businesses don't have time to manage all of that — or the patience to keep re-explaining themselves to a new person each time."
          />
        </Reveal>
        <Reveal delay={120} className="flex flex-col justify-center gap-6">
          <p className="text-lg leading-relaxed text-text">
            AJH Studio brings those pieces together under one roof. One studio designs and
            builds the site, hosts and maintains it, and writes the content that makes it
            worth visiting — so you&apos;re working with one point of contact instead of
            coordinating a handful of vendors who don&apos;t talk to each other.
          </p>
          <p className="text-lg leading-relaxed text-text">
            That&apos;s the whole idea: a website that stays online, stays current, and sounds
            like you — without becoming something you have to manage yourself.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
