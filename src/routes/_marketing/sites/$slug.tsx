import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
	ArrowLeft,
	Calendar,
	ExternalLink,
	Folder,
	Github,
	Star,
	Tag,
	Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { getSiteBySlug } from "@/lib/pocketbase";
import type { SitesResponse } from "@/lib/pocketbase/types";
import { seo } from "@/lib/seo";

type SiteData = SitesResponse<Record<string, never>>;

const fetchSiteBySlug = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(async ({ data: slug }): Promise<{ site: SiteData | null }> => {
		try {
			const site = await getSiteBySlug(slug);
			return { site: site as SiteData | null };
		} catch {
			return { site: null };
		}
	});

export const Route = createFileRoute("/_marketing/sites/$slug")({
	component: SiteDetailPage,
	loader: async ({ params }) => {
		return fetchSiteBySlug({ data: params.slug });
	},
	head: ({ loaderData, params }) => {
		const site = loaderData?.site;
		if (!site) {
			return {
				meta: seo({
					title: `Project Not Found | ${siteConfig.name}`,
					description: "This project could not be found.",
					url: `https://www.madewithpocketbase.com/sites/${params.slug}`,
				}),
			};
		}

		const screenshotUrl = site.screenshot
			? `https://api.madewithpocketbase.com/api/files/${site.collectionId}/${site.id}/${site.screenshot}`
			: "https://www.madewithpocketbase.com/og-image.png";

		return {
			meta: seo({
				title: `${site.name} | ${siteConfig.name}`,
				description:
					site.description || `${site.name}, A project built with PocketBase`,
				keywords: [site.tags, site.techStack, "pocketbase"]
					.filter(Boolean)
					.join(", "),
				image: screenshotUrl,
				url: `https://www.madewithpocketbase.com/sites/${site.slug}`,
			}),
			links: [
				{
					rel: "canonical",
					href: `https://www.madewithpocketbase.com/sites/${site.slug}`,
				},
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "SoftwareApplication",
						name: site.name,
						description: site.description,
						url: site.url,
						applicationCategory: site.category || "WebApplication",
						operatingSystem: "Web",
						...(site.screenshot && {
							image: screenshotUrl,
						}),
						...(site.github && {
							codeRepository: site.github,
						}),
						offers: {
							"@type": "Offer",
							price: "0",
							priceCurrency: "USD",
						},
					}),
				},
			],
		};
	},
});

function SiteDetailPage() {
	const { site } = Route.useLoaderData();

	if (!site) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
				<h1 className="font-heading text-2xl">Project Not Found</h1>
				<p className="text-muted-foreground">
					This project doesn't exist or may have been removed.
				</p>
				<Link to="/">
					<Button variant="outline" className="gap-2">
						<ArrowLeft className="size-4" />
						Back to Projects
					</Button>
				</Link>
			</div>
		);
	}

	const screenshotUrl = site.screenshot
		? `https://api.madewithpocketbase.com/api/files/${site.collectionId}/${site.id}/${site.screenshot}`
		: null;

	return (
		<div className="flex flex-col gap-6 py-6">
			{/* Back link */}
			<Link
				to="/"
				className="inline-flex w-fit items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4" />
				Back to projects
			</Link>

			{/* Main content grid */}
			<div className="grid gap-6 lg:grid-cols-3">
				{/* Screenshot - takes 2 cols on large screens */}
				<div className="lg:col-span-2">
					<div className="overflow-hidden rounded-lg border bg-muted">
						{screenshotUrl ? (
							<img
								src={screenshotUrl}
								alt={`Screenshot of ${site.name}`}
								className="aspect-video w-full object-cover"
							/>
						) : (
							<div className="flex aspect-video items-center justify-center">
								<span className="font-heading text-6xl text-muted-foreground/20">
									{site.name.charAt(0).toUpperCase()}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Sidebar info */}
				<div className="flex flex-col gap-4">
					{/* Header info */}
					<div className="rounded-lg border bg-card p-5">
						<div className="flex items-start justify-between gap-2">
							<h1 className="font-heading text-xl">{site.name}</h1>
							{site.isFeatured && (
								<Badge variant="secondary" className="shrink-0 gap-1">
									<Star className="size-3" />
									Featured
								</Badge>
							)}
						</div>

						{site.tagline && (
							<p className="mt-2 text-muted-foreground text-sm">
								{site.tagline}
							</p>
						)}

						<div className="mt-4 flex flex-col gap-2">
							<a
								href={site.url}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full"
							>
								<Button className="w-full gap-2 font-semibold">
									<ExternalLink className="size-4" />
									Visit Project
								</Button>
							</a>
							{site.github && (
								<a
									href={site.github}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full"
								>
									<Button variant="outline" className="w-full gap-2">
										<Github className="size-4" />
										Source Code
									</Button>
								</a>
							)}
						</div>
					</div>

					{/* Details card */}
					<div className="rounded-lg border bg-card p-5">
						<h2 className="mb-3 font-semibold text-sm">Details</h2>
						<div className="flex flex-col gap-3 text-sm">
							{site.category && (
								<div className="flex items-center gap-2">
									<Folder className="size-4 text-muted-foreground" />
									<span className="text-muted-foreground">Category:</span>
									<span className="font-medium">{site.category}</span>
								</div>
							)}
							{site.techStack && (
								<div className="flex items-start gap-2">
									<Wrench className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
									<span className="text-muted-foreground">Tech:</span>
									<span className="font-medium">{site.techStack}</span>
								</div>
							)}
							{site.tags && (
								<div className="flex items-start gap-2">
									<Tag className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
									<span className="text-muted-foreground">Tags:</span>
									<span className="font-medium">{site.tags}</span>
								</div>
							)}
							{site.created && (
								<div className="flex items-center gap-2">
									<Calendar className="size-4 text-muted-foreground" />
									<span className="text-muted-foreground">Added:</span>
									<span className="font-medium">
										{new Date(site.created).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Description section */}
			<div className="rounded-lg border bg-card p-5">
				<h2 className="mb-3 font-semibold">About this project</h2>
				<p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
					{site.description}
				</p>
			</div>
		</div>
	);
}
