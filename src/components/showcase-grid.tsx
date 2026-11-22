import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useState } from "react";
import { ShowcaseCard } from "@/components/showcase-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function getPageUrl(page: number): string {
	return page === 1 ? "/" : `/page/${page}`;
}

interface ShowcaseSite {
	collectionId: string;
	id: string;
	name: string;
	slug: string;
	tagline?: string;
	description: string;
	url: string;
	screenshot?: string;
	category?: string;
	tags?: string;
	techStack?: string;
	github?: string;
	isFeatured?: boolean;
}

interface ShowcaseGridProps {
	sites: ShowcaseSite[];
	totalPages: number;
	currentPage: number;
	totalItems: number;
}

export function ShowcaseGrid({
	sites,
	totalPages,
	currentPage,
	totalItems,
}: ShowcaseGridProps) {
	const [search, setSearch] = useState("");

	const filteredSites = sites.filter((site) => {
		if (!search.trim()) return true;
		const searchLower = search.toLowerCase();
		return (
			site.name.toLowerCase().includes(searchLower) ||
			site.description.toLowerCase().includes(searchLower) ||
			site.tagline?.toLowerCase().includes(searchLower) ||
			site.tags?.toLowerCase().includes(searchLower) ||
			site.category?.toLowerCase().includes(searchLower)
		);
	});

	return (
		<div className="flex flex-col gap-8">
			{/* Search Bar */}
			<div className="mx-auto w-full max-w-md">
				<div className="relative">
					<Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search projects..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="h-11 rounded-full border-muted-foreground/20 bg-muted/30 pl-11 pr-10 text-sm shadow-sm transition-shadow focus:shadow-md"
						aria-label="Search projects"
					/>
					{search && (
						<button
							type="button"
							onClick={() => setSearch("")}
							className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							aria-label="Clear search"
						>
							<X className="size-4" />
						</button>
					)}
				</div>
			</div>

			{filteredSites.length === 0 ? (
				<div className="flex flex-col items-center gap-4 py-16 text-center">
					<div className="rounded-full bg-muted/50 p-4">
						<Search className="size-8 text-muted-foreground" />
					</div>
					<div>
						<p className="font-medium text-foreground">No matches found</p>
						<p className="mt-1 text-muted-foreground text-sm">
							We couldn't find any projects matching "{search}".
						</p>
					</div>
					<Button variant="outline" size="sm" onClick={() => setSearch("")}>
						Clear search
					</Button>
				</div>
			) : (
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{filteredSites.map((site) => (
						<ShowcaseCard key={site.id} site={site} />
					))}
				</div>
			)}

			{/* Pagination */}
			{totalPages > 1 && !search && (
				<nav
					className="flex items-center justify-center gap-1"
					aria-label="Pagination"
				>
					{currentPage > 1 ? (
						<Link to={getPageUrl(currentPage - 1)} aria-label="Previous page">
							<Button variant="ghost" size="icon" className="size-9">
								<ChevronLeft className="size-4" />
							</Button>
						</Link>
					) : (
						<Button
							variant="ghost"
							size="icon"
							disabled
							className="size-9"
							aria-label="Previous page"
						>
							<ChevronLeft className="size-4" />
						</Button>
					)}
					<div className="flex items-center gap-1">
						{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
							let pageNum: number;
							if (totalPages <= 5) {
								pageNum = i + 1;
							} else if (currentPage <= 3) {
								pageNum = i + 1;
							} else if (currentPage >= totalPages - 2) {
								pageNum = totalPages - 4 + i;
							} else {
								pageNum = currentPage - 2 + i;
							}
							return (
								<Link
									key={pageNum}
									to={getPageUrl(pageNum)}
									aria-label={`Page ${pageNum}`}
									aria-current={currentPage === pageNum ? "page" : undefined}
								>
									<Button
										variant={currentPage === pageNum ? "default" : "ghost"}
										size="icon"
										className="size-9"
									>
										{pageNum}
									</Button>
								</Link>
							);
						})}
					</div>
					{currentPage < totalPages ? (
						<Link to={getPageUrl(currentPage + 1)} aria-label="Next page">
							<Button variant="ghost" size="icon" className="size-9">
								<ChevronRight className="size-4" />
							</Button>
						</Link>
					) : (
						<Button
							variant="ghost"
							size="icon"
							disabled
							className="size-9"
							aria-label="Next page"
						>
							<ChevronRight className="size-4" />
						</Button>
					)}
				</nav>
			)}
		</div>
	);
}
