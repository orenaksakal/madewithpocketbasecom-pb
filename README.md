# Made With Pocket Base

Website for [madewithpocketbase.com](https://madewithpocketbase.com) — a gallery of projects built with [PocketBase](https://pocketbase.io).

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- [TanStack Router](https://tanstack.com/router) + Query + Form
- Tailwind CSS v4, shadcn/ui, Radix primitives
- [PocketBase](https://pocketbase.io) as backend; schema in [`pb_schema.json`](pb_schema.json), typed via `pnpm pb-typegen`
- Deployed to Cloudflare Workers via [Wrangler](https://developers.cloudflare.com/workers/) (`pnpm run deploy`)

## Development

```bash
pnpm install
pnpm run dev      # vite dev server on :3000
pnpm test         # vitest
pnpm run check    # biome lint + format
```

## Configuration

Copy `.env.example` to `.env` and set `VITE_POCKETBASE_URL`. The production value lives in Wrangler vars (`wrangler.jsonc`).
