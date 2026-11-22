import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
			// prerender: {
			// 	enabled: true,
			// 	crawlLinks: true, // Discovers all linkable pages
			// },
			sitemap: {
				enabled: true,
				host: "https://www.madewithpocketbase.com",
			},
		}),
    viteReact(),
  ],
})

export default config
