import type { Sitemap } from "tanstack-router-sitemap";
import type { FileRouteTypes } from "@/routeTree.gen";

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes["fullPaths"];

// Define your sitemap
export const sitemap: Sitemap<TRoutes> = {
	siteUrl: "https://www.madewithpocketbase.com",
	defaultPriority: 0.5,
	defaultChangeFreq: "weekly",
	routes: {
		"/": {
			priority: 1.0,
		},
		"/submit": {
			priority: 0.8,
		},
		"/privacy": {
			priority: 0.3,
		},
		"/tos": {
			priority: 0.3,
		},
	},
};
