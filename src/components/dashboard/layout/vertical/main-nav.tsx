"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { usePathname } from "next/navigation";

import type { NavItemConfig } from "@/types/nav";
import { MobileNav } from "../mobile-nav";
import { SearchBar } from "../../../../app/dashboard/files/search-bar";

export interface MainNavProps {
	items: NavItemConfig[];
}

export function MainNav({ items }: MainNavProps): React.JSX.Element {
	const [openNav, setOpenNav] = React.useState<boolean>(false);
	const pathname = usePathname();
	const isAiSummarizePage = pathname === "/dashboard/ai-summarize";
	const isFilesPage = pathname === "/dashboard/files";

	return isFilesPage ? (
		<React.Fragment>
			<Box
				component="header"
				sx={{
					"--MainNav-background": "var(--mui-palette-background-default)",
					"--MainNav-divider": "var(--mui-palette-divider)",
					bgcolor: "var(--MainNav-background)",
					left: 0,
					position: "sticky",
					pt: { lg: "var(--Layout-gap)" },
					top: 0,
					width: "100%",
					zIndex: "var(--MainNav-zIndex)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flex: "1 1 auto",
						minHeight: "var(--MainNav-height)",
						px: { xs: 2, lg: 3 },
						py: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<IconButton
						onClick={(): void => {
							setOpenNav(true);
						}}
						sx={{ display: { lg: "none" }, position: 'absolute', left: { xs: 2, lg: 3 } }}
					>
						<ListIcon />
					</IconButton>
					<Box sx={{ width: '50%' }}>
						<SearchBar />
					</Box>
				</Box>
				<Box
					sx={{
						borderBottom: isAiSummarizePage ? "none" : "1px solid var(--MainNav-divider)",
						height: 1,
					}}
				/>
			</Box>
			<MobileNav
				items={items}
				onClose={() => {
					setOpenNav(false);
				}}
				open={openNav}
			/>
		</React.Fragment>
	) : (
		<React.Fragment>
			<IconButton
				onClick={(): void => setOpenNav(true)}
				sx={{ display: { lg: "none" }, position: 'absolute', left: { xs: 2, lg: 3 } }}
			>
				<ListIcon />
			</IconButton>
			<MobileNav 
				items={items} 
				onClose={() => setOpenNav(false)} 
				open={openNav} 
			/>
		</React.Fragment>
	);
}
