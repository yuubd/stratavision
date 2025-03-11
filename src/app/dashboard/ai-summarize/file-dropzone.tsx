"use client";

import type * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import type { DropzoneOptions, FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";

export type File = FileWithPath;

export interface FileDropzoneProps extends DropzoneOptions {
	title: string;
	description: string;
	subtitle: string;
}

export function FileDropzone({ title, description, subtitle, ...props }: FileDropzoneProps): React.JSX.Element {
	const { getRootProps, getInputProps, isDragActive } = useDropzone(props);

	return (
		<Box
			sx={{
				border: "2px dashed var(--mui-palette-divider)",
				borderRadius: 2,
				cursor: "pointer",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				outline: "none",
				py: 5,
				px: 3,
				minHeight: 360,
				...(isDragActive && {
					bgcolor: "var(--mui-palette-action-selected)",
					opacity: 0.5,
				}),
				"&:hover": {
					...(!isDragActive && {
						bgcolor: "var(--mui-palette-action-hover)",
					}),
				},
			}}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<Stack spacing={3} alignItems="center">
				<Typography
					variant="h4"
					sx={{
						fontSize: "1.75rem",
						fontWeight: 600,
						textAlign: "center",
					}}
				>
					{title}
				</Typography>
				<Avatar
					sx={{
						"--Avatar-size": "40px",
						bgcolor: "var(--mui-palette-background-paper)",
						boxShadow: "var(--mui-shadows-8)",
						color: "var(--mui-palette-text-primary)",
					}}
				>
					<PlusIcon weight="bold" />
				</Avatar>
				<Stack spacing={0.5} sx={{ textAlign: "center" }}>
					<Typography variant="body1" sx={{ fontWeight: 500 }}>
						{description}
					</Typography>
					<Typography 
						color="text.secondary" 
						variant="body2"
						sx={{ whiteSpace: "pre-line" }}
					>
						{subtitle}
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
}
