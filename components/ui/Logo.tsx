import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
export function LogoMark({ className }: { className?: string }) {
  return <Image src={siteConfig.logo.icon} alt="" width={580} height={380} className={cn("h-auto w-16 shrink-0", className)} />;
}
export default function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return compact ? <LogoMark /> : <Image src={light ? siteConfig.logo.light : siteConfig.logo.primary} alt={`${siteConfig.name} — ${siteConfig.tagline}`} width={1980} height={380} sizes="235px" priority className="h-auto w-[210px] max-w-full sm:w-[235px]" />;
}
