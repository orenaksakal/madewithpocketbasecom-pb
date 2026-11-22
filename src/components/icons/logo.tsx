import { MousePointerClick } from "lucide-react";

import { cn } from "@/lib/utils";

export const Logo = ({ ...props }) => {
	return (
		<MousePointerClick
			{...props}
			className={cn(props.className, "text-orange-300")}
		/>
	);
};
