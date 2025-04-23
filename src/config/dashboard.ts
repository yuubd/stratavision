import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

// NOTE: We did not use React Components for Icons, because
//  you may one to get the config from the server.

// NOTE: First level elements are groups.

export interface DashboardConfig {
	// Overriden by Settings Context.
	navColor: "blend_in" | "discrete" | "evident";
	navItems: NavItemConfig[];
}

export const dashboardConfig = {
	navColor: "evident",
	navItems: [
		{
			key: "main",
			items: [
				{ key: "ai-summarize", title: "AI Summarize", href: paths.dashboard.aiSummarize, icon: "file-text" },
				{ key: "files", title: "Files", href: paths.dashboard.files, icon: "database" }
			],
		},
	],
} satisfies DashboardConfig;
