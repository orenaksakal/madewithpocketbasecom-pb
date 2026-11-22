import { Loader2 } from "lucide-react";
import { Logo } from "@/components/icons/logo";

export const Loader = () => {
	return (
		<div className="fixed mx-auto flex h-full w-full items-center justify-center gap-2">
			<div className="flex flex-col items-center justify-center gap-2">
				<Logo className="size-8" />
				<div className="flex flex-row items-center justify-center gap-2">
					<div className="flex flex-row items-center justify-center gap-2">
						<Loader2 className="size-6 animate-spin" />
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</div>
			</div>
		</div>
	);
};
