# News From Space

An editorial front page for spaceflight news, launch schedules, mission status,
and dispatches from the organizations working beyond Earth.

**Live site:** [newsfromspace.vercel.app](https://newsfromspace.vercel.app/)

## Features

- Latest spaceflight reporting and agency blogs
- Upcoming and past launch manifests with live countdowns
- Mission Control view for near-term launches and status updates
- Section-specific search, source and provider filters, and pagination
- Responsive broadsheet layout with light, dark, and system themes
- Keyboard-accessible navigation, reduced-motion support, and semantic metadata
- RSS feed, sitemap, robots directives, and social sharing metadata

## Technology

- [Next.js 15](https://nextjs.org/) and [React 19](https://react.dev/)
- [NextUI](https://nextui.org/) and [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest) for client-side data caching
- [Spaceflight News API](https://thespacedevs.com/snapi)
- [Launch Library 2](https://thespacedevs.com/llapi)

## Local development

The project uses Node.js 24 and pnpm 9.15.9.

```bash
corepack enable
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

Optional environment variables:

```bash
NEXT_PUBLIC_LAUNCH_API=https://lldev.thespacedevs.com/2.2.0
NEXT_PUBLIC_SITE_URL=https://newsfromspace.vercel.app
```

## Available commands

```bash
pnpm dev        # Start the development server
pnpm build      # Create a production build
pnpm start      # Serve the production build
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript checks
pnpm test       # Run the unit tests
```
