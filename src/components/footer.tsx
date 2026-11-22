import { Link } from "@tanstack/react-router";
import { Github, Squirrel, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
	return (
		<footer className="border-t py-12">
			<div className="flex flex-col gap-8">
				{/* Main footer content */}
				<div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
					{/* Brand */}
					<div className="flex flex-col items-center gap-3 sm:items-start">
						<Link
							to="/"
							className="flex items-center gap-2 font-heading text-lg"
						>
							<Squirrel className="size-5 text-primary" />
							<span>{siteConfig.name}</span>
						</Link>
						<p className="max-w-xs text-center text-muted-foreground text-sm sm:text-left">
							A curated collection of projects powered by PocketBase.
						</p>
					</div>

					{/* Links */}
					<div className="flex flex-wrap justify-center gap-8 text-sm sm:justify-end">
						<div className="flex flex-col gap-3">
							<span className="font-semibold text-foreground">Resources</span>
							<a
								href="https://pocketbase.io"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								PocketBase
							</a>
							<a
								href="https://pocketbase.io/docs"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								Documentation
							</a>
							<Link
								to="/submit"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								Add Project
							</Link>
						</div>
						<div className="flex flex-col gap-3">
							<span className="font-semibold text-foreground">Legal</span>
							<Link
								to="/privacy"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								Privacy
							</Link>
							<Link
								to="/tos"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								Terms
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
					<p className="text-muted-foreground text-sm">
						{new Date().getFullYear()} {siteConfig.name}
					</p>
					<div className="flex items-center gap-4">
						<a
							href="https://twitter.com/orenaksakal"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							aria-label="Follow on Twitter"
						>
							<Twitter className="size-4" />
						</a>
						<a
							href="https://github.com/pocketbase/pocketbase"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							aria-label="PocketBase on GitHub"
						>
							<Github className="size-4" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
