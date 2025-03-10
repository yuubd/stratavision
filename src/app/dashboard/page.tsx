import type * as React from "react";
import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Briefcase as BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { FileCode as FileCodeIcon } from "@phosphor-icons/react/dist/ssr/FileCode";
import { Info as InfoIcon } from "@phosphor-icons/react/dist/ssr/Info";
import { ListChecks as ListChecksIcon } from "@phosphor-icons/react/dist/ssr/ListChecks";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Warning as WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";

import { appConfig } from "@/config/app";
import { dayjs } from "@/lib/dayjs";
import { AppChat } from "@/components/dashboard/overview/app-chat";
import { AppLimits } from "@/components/dashboard/overview/app-limits";
import { AppUsage } from "@/components/dashboard/overview/app-usage";
import { Events } from "@/components/dashboard/overview/events";
import { HelperWidget } from "@/components/dashboard/overview/helper-widget";
import { Subscriptions } from "@/components/dashboard/overview/subscriptions";
import { Summary } from "@/components/dashboard/overview/summary";

export const metadata = { title: `Overview | Dashboard | ${appConfig.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
	return (
		<Box
			sx={{
				maxWidth: "var(--Content-maxWidth)",
				m: "var(--Content-margin)",
				p: "var(--Content-padding)",
				width: "var(--Content-width)",
			}}
		>
			<Stack spacing={4}>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
					<Box sx={{ flex: "1 1 auto" }}>
						<Typography variant="h4">Overview</Typography>
					</Box>
				</Stack>
				<Grid container spacing={4}>
					{/* Components removed but structure maintained for future use */}
				</Grid>
			</Stack>
		</Box>
	);
}
