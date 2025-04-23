import type { PrimaryColor } from "@/styles/theme/types";

export type DashboardNavColor = "blend_in" | "discrete" | "evident";

export interface Settings {
	language?: string;
	primaryColor?: PrimaryColor;
	dashboardNavColor?: DashboardNavColor;
}
