#!/bin/bash
# Deploy the web app using wrangler
pnpm install
pnpm run build
pnpx wrangler@latest deploy
