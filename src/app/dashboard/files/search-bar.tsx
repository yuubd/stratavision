"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";

export function SearchBar(): React.JSX.Element {
	const [searchValue, setSearchValue] = React.useState("");

	const handleClear = () => {
		setSearchValue("");
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				bgcolor: 'var(--mui-palette-background-paper)',
				borderRadius: 24,
				px: 2,
				height: 40,
				width: '100%',
				border: '1px solid var(--mui-palette-divider)',
				'&:hover': {
					bgcolor: 'var(--mui-palette-action-hover)',
				},
			}}
		>
			<MagnifyingGlassIcon weight="bold" />
			<InputBase
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				placeholder="Search"
				sx={{
					ml: 1,
					flex: 1,
					fontSize: '0.875rem',
					height: '100%',
					'& .MuiInputBase-input': {
						height: '100%',
						p: 0,
						display: 'flex',
						alignItems: 'center',
					},
				}}
			/>
			{searchValue && (
				<IconButton
					onClick={handleClear}
					size="small"
					sx={{ p: 0.5, ml: 0.5 }}
				>
					<XIcon />
				</IconButton>
			)}
		</Box>
	);
} 