import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/cards/ProductCard";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/ui/Reveal";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Products AJH Enterprises builds and operates, including The Ministry Study and the AJH Real Estate CRM.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products | AJH Enterprises",
    description:
      "Products AJH Enterprises builds and operates, including The Ministry Study and the AJH Real Estate CRM.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Things I build and operate."
        description="Alongside client work, AJH Enterprises builds its own products — tools built to solve a specific, real problem. This list will grow over time."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta
        title="Have an idea for a product?"
        description="If you're working on something that needs to be built, let's talk about it."
      />
    </>
  );
}
