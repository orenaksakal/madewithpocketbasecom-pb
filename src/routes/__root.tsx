import * as Sentry from "@sentry/tanstackstart-react";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/providers/theme";
import { Toaster } from "@/components/ui/sonner";
import appCss from "@/index.css?url";
import { siteConfig } from "@/lib/config";
import { seo } from "@/lib/seo";

export interface RouterAppContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: siteConfig.title,
				description: siteConfig.description,
				keywords: siteConfig.keywords,
				image: "https://www.madewithpocketbase.com/og-image.png",
				url: "https://www.madewithpocketbase.com",
			}),
			{ name: "robots", content: "index, follow" },
			{ name: "author", content: "Made with PocketBase" },
			{ name: "theme-color", content: "#b8dbe4" },
		],
		links: [
			{
				rel: "preconnect",
				href: "https://assets.onedollarstats.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href: appCss,
				as: "style",
			},
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "canonical", href: "https://www.madewithpocketbase.com" },
		],
		scripts: [
			{
				src: "https://assets.onedollarstats.com/stonks.js",
				type: "text/javascript",
				defer: true,
			},
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: siteConfig.name,
					description: siteConfig.description,
					url: "https://www.madewithpocketbase.com",
					potentialAction: {
						"@type": "SearchAction",
						target: {
							"@type": "EntryPoint",
							urlTemplate:
								"https://www.madewithpocketbase.com/?search={search_term_string}",
						},
						"query-input": "required name=search_term_string",
					},
				}),
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<ThemeProvider>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</ThemeProvider>
	);
}

Sentry.init({
	dsn: "https://ac76ae4af5c753401d958f1feabab82f@o4509331084410880.ingest.us.sentry.io/4509331158138880",
	sendDefaultPii: true,
	integrations: [],
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen font-default antialiased">
				{children}

				{import.meta.env.DEV && (
					<TanStackRouterDevtools position="bottom-left" />
				)}
				{import.meta.env.DEV && (
					<ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
				)}
				<Toaster richColors />
				<Scripts />
			</body>
		</html>
	);
}
