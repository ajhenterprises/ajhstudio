import { cn } from "@/lib/utils";

export default function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
