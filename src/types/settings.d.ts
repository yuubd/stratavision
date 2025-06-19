import type { PrimaryColor, DashboardNavColor, Mode } from "@/styles/theme/types";

export interface Settings {
	language?: string;
	primaryColor?: PrimaryColor;
	dashboardNavColor?: DashboardNavColor;
	theme?: Mode;
}
