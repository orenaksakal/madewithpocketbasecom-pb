import { Link } from "@tanstack/react-router";
import { ExternalLink, Github, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ShowcaseSiteData {
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

interface ShowcaseCardProps {
	site: ShowcaseSiteData;
}

export function ShowcaseCard({ site }: ShowcaseCardProps) {
	const screenshotUrl = site.screenshot
		? `https://api.madewithpocketbase.com/api/files/${site.collectionId}/${site.id}/${site.screenshot}`
		: null;

	return (
		<Link
			to="/sites/$slug"
			params={{ slug: site.slug }}
			className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:border-foreground/20"
		>
			{/* Screenshot */}
			<div className="relative aspect-video w-full overflow-hidden bg-muted">
				{screenshotUrl ? (
					<img
						src={screenshotUrl}
						alt={`${site.name} screenshot`}
						className="size-full object-cover"
						loading="lazy"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<span className="font-heading text-4xl text-muted-foreground/30">
							{site.name.charAt(0).toUpperCase()}
						</span>
					</div>
				)}
				{/* Featured badge */}
				{site.isFeatured && (
					<div className="absolute top-2 right-2">
						<Badge variant="secondary" className="gap-1 text-xs">
							<Star className="size-3" />
							Featured
						</Badge>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col gap-2 p-4">
				<div>
					<h3 className="font-bold leading-tight">{site.name}</h3>
					{site.tagline && (
						<p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
							{site.tagline}
						</p>
					)}
				</div>

				<p className="line-clamp-2 flex-1 text-muted-foreground text-sm">
					{site.description}
				</p>

				{/* Tech stack tags */}
				{site.techStack && (
					<div className="flex flex-wrap gap-1 pt-1">
						{site.techStack
							.split(",")
							.slice(0, 3)
							.map((tech) => (
								<span
									key={tech.trim()}
									className="text-muted-foreground text-xs"
								>
									{tech.trim()}
									{site.techStack &&
										site.techStack.split(",").indexOf(tech) <
											Math.min(site.techStack.split(",").length - 1, 2) &&
										" · "}
								</span>
							))}
						{site.techStack.split(",").length > 3 && (
							<span className="text-muted-foreground text-xs">
								+{site.techStack.split(",").length - 3}
							</span>
						)}
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between border-t px-4 py-2">
				{site.category && (
					<span className="text-muted-foreground text-xs">{site.category}</span>
				)}
				<div className="ml-auto flex items-center gap-1">
					{site.github && (
						<a
							href={site.github}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
							aria-label={`View ${site.name} on GitHub`}
						>
							<Github className="size-4" />
						</a>
					)}
					<a
						href={site.url}
						target="_blank"
						rel="noopener noreferrer"
						onClick={(e) => e.stopPropagation()}
						className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
						aria-label={`Visit ${site.name}`}
					>
						<ExternalLink className="size-4" />
					</a>
				</div>
			</div>
		</Link>
	);
}
