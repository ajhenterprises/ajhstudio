import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-display text-7xl text-primary/30">404</span>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Page not found.</h1>
        <p className="max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button href="/">Back to Home</Button>
      </Container>
    </section>
  );
}
