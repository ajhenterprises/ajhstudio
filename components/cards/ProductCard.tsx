import Button from "@/components/ui/Button";
import type { Product } from "@/lib/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-8 sm:p-9">
      <div className="flex flex-col gap-3">
        <span className="w-fit rounded-full bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
          {product.category}
        </span>
        <h3 className="font-display text-2xl text-ink">{product.name}</h3>
        <p className="leading-relaxed text-muted">{product.description}</p>
      </div>
      {product.url ? (
        <Button href={product.url} variant="outline" external className="self-start">
          {product.ctaLabel ?? `Visit ${product.name}`}
        </Button>
      ) : (
        <span className="text-sm text-muted">No public site yet</span>
      )}
    </div>
  );
}
