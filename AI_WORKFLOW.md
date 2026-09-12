# AJH Enterprises — Claude and Codex Workflow

This repository is intentionally compatible with both Claude and Codex. Neither tool owns the
project. Git, the files in this repository, and the current accepted client brief are the source
of truth.

## Before making changes

1. Read `AGENTS.md`, `CLAUDE.md`, this file, and the relevant source files completely.
2. Pull the latest default branch and inspect the current diff before editing.
3. Create a focused branch for substantial work. Do not overwrite unrelated changes.
4. Treat `lib/site-config.ts` as the source of truth for company URLs and public configuration.
5. Keep the marketing site static-first, accessible, mobile-first, and inexpensive to operate.

## Brand rules

- Public brand: **AJH Enterprises**
- Legal name: **AJH Enterprises, LLC**
- Founder: **Aaron Joseph Hall**
- Primary message: **Build What You’ve Been Called to Build.**
- Current service pillars: Websites & Technology and Communication
- The company is an umbrella that may support additional services and products later.
- Use clear, warm, practical language. Avoid generic agency jargon and exaggerated claims.

## Architecture rules

- Next.js App Router and TypeScript
- Tailwind CSS design tokens in `app/globals.css`
- Static content and MDX; no CMS or database in this marketing-site repository
- The website questionnaire and project records belong to AJH Business HQ
- All questionnaire CTAs use `siteConfig.questionnaireUrl`; never scatter hard-coded URLs
- Do not add paid APIs, AI APIs, or recurring services without Aaron's approval

## Client website workflow

AJH Business HQ should produce a platform-neutral, approved **Website Build Package**. That
package may then be used with Claude, Codex, or both. It should contain the approved creative
brief, sitemap, audience, goals, brand direction, page requirements, copy, features,
integrations, asset inventory, timeline, and constraints. Tool-specific prompts are derived
from that package; they are not the source of truth.

## Required verification

Run all of the following before handoff:

```bash
npm run lint
npm run typecheck
npm run build
```

Also review the changed pages at mobile and desktop widths whenever a browser runtime is
available. Report what changed, what was verified, and any remaining setup required.
