"use client";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
export default function InstallApp() {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null);
  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    const onPrompt = (event: Event) => { event.preventDefault(); setPrompt(event as InstallEvent); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);
  if (!prompt) return null;
  return <button className="mt-5 min-h-11 rounded-xl border border-white/40 px-4 py-2 text-sm text-white focus-visible:outline-white" onClick={async () => {await prompt.prompt(); await prompt.userChoice; setPrompt(null);}}>Install {siteConfig.name}</button>;
}
