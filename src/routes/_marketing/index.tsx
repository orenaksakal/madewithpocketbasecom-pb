import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Plus } from "lucide-react";
import { ShowcaseGrid } from "@/components/showcase-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { getPublicSites } from "@/lib/pocketbase";
import type { SitesResponse } from "@/lib/pocketbase/types";
import { seo } from "@/lib/seo";

const ITEMS_PER_PAGE = 12;

type SiteData = SitesResponse<Record<string, never>>;

interface LoaderData {
	sites: SiteData[];
	totalPages: number;
	currentPage: number;
	totalItems: number;
}

const fetchSites = createServerFn({ method: "GET" })
	.inputValidator((page: number) => page)
	.handler(async ({ data: page }): Promise<LoaderData> => {
		try {
			const result = await getPublicSites({
				page,
				perPage: ITEMS_PER_PAGE,
				sort: "-isFeatured,-created",
			});

			const sites = result.items as SiteData[];
			const totalPages = result.totalPages;
			const totalItems = result.totalItems;

			return { sites, totalPages, currentPage: page, totalItems };
		} catch {
			return { sites: [], totalPages: 0, currentPage: page, totalItems: 0 };
		}
	});

export const Route = createFileRoute("/_marketing/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			...seo({
				title: `${siteConfig.name} | ${siteConfig.title}`,
				description: siteConfig.description,
				keywords: siteConfig.keywords,
				image: "https://www.madewithpocketbase.com/og-image.png",
				url: "https://www.madewithpocketbase.com",
			}),
		],
	}),
	loader: async () => {
		return fetchSites({ data: 1 });
	},
});

function RouteComponent() {
	const { sites, totalPages, currentPage, totalItems } = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-12">
			{/* Hero Section */}
			<section className="flex flex-col items-center gap-6 py-12 text-center sm:py-16">
				<h1 className="font-heading text-3xl tracking-tight sm:text-4xl md:text-5xl">
					Made with PocketBase
				</h1>
				<p className="max-w-xl text-muted-foreground">
					A curated collection of projects built with PocketBase, the
					open-source backend in a single file.
				</p>
				<Link to="/submit">
					<Button className="gap-2 font-semibold">
						<Plus className="size-4" />
						Add Your Project
					</Button>
				</Link>
			</section>

			{/* Projects Grid or Empty State */}
			{sites.length > 0 ? (
				<ShowcaseGrid
					sites={sites}
					totalPages={totalPages}
					currentPage={currentPage}
					totalItems={totalItems}
				/>
			) : (
				<div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
					<h3 className="font-heading text-xl">No projects yet</h3>
					<p className="text-muted-foreground">
						Be the first to share what you've built with PocketBase.
					</p>
					<Link to="/submit">
						<Button className="gap-2">
							<Plus className="size-4" />
							Add Your Project
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
