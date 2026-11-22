import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ShowcaseGrid } from "@/components/showcase-grid";
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

export const Route = createFileRoute("/_marketing/page/$pageNum")({
	component: RouteComponent,
	beforeLoad: ({ params }) => {
		const pageNum = Number.parseInt(params.pageNum, 10);
		if (pageNum === 1 || Number.isNaN(pageNum) || pageNum < 1) {
			throw redirect({ to: "/" });
		}
	},
	head: ({ params }) => {
		const pageNum = Number.parseInt(params.pageNum, 10);
		return {
			meta: [
				...seo({
					title: `Page ${pageNum} | ${siteConfig.name}`,
					description: `Browse PocketBase projects - Page ${pageNum}. ${siteConfig.description}`,
					keywords: siteConfig.keywords,
					image: "https://www.madewithpocketbase.com/og-image.png",
					url: `https://www.madewithpocketbase.com/page/${pageNum}`,
				}),
			],
			links: [
				{
					rel: "canonical",
					href: `https://www.madewithpocketbase.com/page/${pageNum}`,
				},
			],
		};
	},
	loader: async ({ params }) => {
		const page = Number.parseInt(params.pageNum, 10);
		return fetchSites({ data: page });
	},
});

function RouteComponent() {
	const { sites, totalPages, currentPage, totalItems } = Route.useLoaderData();

	return (
		<div className="py-8">
			<ShowcaseGrid
				sites={sites}
				totalPages={totalPages}
				currentPage={currentPage}
				totalItems={totalItems}
			/>
		</div>
	);
}
