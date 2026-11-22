import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Plus, Squirrel } from "lucide-react";
import { Footer } from "@/components/footer";
import { ThemeToggleButton } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_marketing")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mx-auto min-h-screen max-w-6xl px-4 sm:px-6">
			<nav className="flex h-16 items-center justify-between border-b border-transparent">
				<Link
					to="/"
					className="flex items-center gap-2 font-heading text-lg transition-colors hover:text-primary"
				>
					<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
						<Squirrel className="size-4 text-primary" />
					</div>
					<span className="hidden sm:inline">Made with PocketBase</span>
				</Link>
				<div className="flex items-center gap-2">
					<ThemeToggleButton />
					<Link to="/submit">
						<Button size="sm" className="gap-2 font-semibold">
							<Plus className="size-3.5" />
							<span>Add Project</span>
						</Button>
					</Link>
				</div>
			</nav>
			<main className="pb-16 pt-4">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
