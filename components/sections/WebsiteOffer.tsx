import { Check, HeartHandshake, Smartphone, Wrench } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const benefits = [
  { icon: Smartphone, title: "Built for every screen", text: "A fast, welcoming experience on phones, tablets, and computers." },
  { icon: HeartHandshake, title: "Built with you", text: "You work directly with me from discovery through launch." },
  { icon: Wrench, title: "Supported after launch", text: "Hosting, updates, and practical help are available when you need them." },
];

const included = [
  "Strategy and discovery",
  "Custom, mobile-friendly design",
  "Clear page structure and calls to action",
  "Content guidance and basic SEO",
  "Launch setup and testing",
  "Optional ongoing hosting and care",
];

export default function WebsiteOffer() {
  return (
    <section className="border-y border-border bg-ink py-20 text-background sm:py-24 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <Reveal>
            <Eyebrow className="text-accent">Website Design &amp; Support</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl text-background sm:text-4xl lg:text-5xl">
              Your website should make the next step obvious.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/70">
              I build clear, professional websites for small businesses, entrepreneurs,
              nonprofits, professional services, community groups, churches, and other
              organizations that need to be understood, trusted, and easy to contact.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-background/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/website-discovery" size="lg">See How It Works</Button>
              <Button href="/websites" variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10">
                View Website Work
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 90}>
                <div className="flex gap-4 rounded-2xl border border-background/15 bg-background/[0.06] p-5 backdrop-blur-sm">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <benefit.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-background">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-background/65">{benefit.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
