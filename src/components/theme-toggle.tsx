import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const themeConfig: Record<"light" | "dark", { icon: string; label: string }> = {
	light: { icon: "☀️", label: "Light" },
	dark: { icon: "🌙", label: "Dark" },
};

export const ThemeToggle = () => {
	const { setTheme, appTheme } = useTheme();

	const getNextTheme = () => {
		const themes = Object.keys(themeConfig) as ("light" | "dark")[];
		const currentIndex = themes.indexOf(appTheme);
		const nextIndex = (currentIndex + 1) % themes.length;
		return themes[nextIndex];
	};

	return (
		<DropdownMenuItem
			className="cursor-pointer"
			onSelect={() => {
				setTheme(getNextTheme());
			}}
			suppressHydrationWarning
		>
			Set {themeConfig[getNextTheme()].label.toLowerCase()} theme{" "}
			<span className="ml-1">{themeConfig[getNextTheme()].icon}</span>
		</DropdownMenuItem>
	);
};

export function ThemeToggleButton() {
	const { appTheme, setTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(appTheme === "dark" ? "light" : "dark")}
			className="size-9"
			aria-label="Toggle theme"
			suppressHydrationWarning
		>
			{appTheme === "dark" ? (
				<Sun className="size-4" />
			) : (
				<Moon className="size-4" />
			)}
		</Button>
	);
}
