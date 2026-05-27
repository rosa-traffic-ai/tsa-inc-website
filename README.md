# TSA Inc. Static Website

Static, multipage marketing site for Traffic Survey Analysis Inc.

## Stack

- Next.js (App Router, deployed on Vercel)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- MDX content files under `content/pages`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content Source of Truth

- Each route is defined by one MDX file in `content/pages`.
- Frontmatter is validated with Zod (`lib/schema.ts`).
- Loader: `lib/content.ts`.

## Checks

```bash
npm run lint
npm run typecheck
npm run check:content
npm run test:e2e
```

## Contact Form Email (Resend)

The contact form posts to the `app/api/contact` route handler, which sends an
email via [Resend](https://resend.com). Set these server-side environment
variables (in Vercel project settings, or a local `.env.local`):

```bash
RESEND_API_KEY=re_xxxxxxxx          # required
CONTACT_TO_EMAIL=david@tsa-inc.ca   # required — inbox that receives inquiries
CONTACT_FROM_EMAIL="TSA Inc. <noreply@tsa-inc.ca>"  # optional; defaults to onboarding@resend.dev
```

`CONTACT_FROM_EMAIL` must use a domain verified in Resend. Until a domain is
verified, omit it to use Resend's `onboarding@resend.dev` sender.

## Important

`legacy/` is ignored and not part of this implementation.
