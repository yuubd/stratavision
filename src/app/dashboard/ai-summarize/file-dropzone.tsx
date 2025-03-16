"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useDropzone } from "react-dropzone";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { ProgressIndicator } from "./progress-indicator";
import { DocumentSummary } from "./document-summary";
import type { DropzoneOptions, FileWithPath } from "react-dropzone";

export type File = FileWithPath;

export interface FileDropzoneProps extends DropzoneOptions {
	title: string;
	description: string;
	subtitle: string;
	onAnswerSelect?: (answer: string) => void;
}

export function FileDropzone({ title, description, subtitle, onAnswerSelect, ...props }: FileDropzoneProps): React.JSX.Element {
	const [isUploading, setIsUploading] = React.useState(false);
	const [isAnalyzed, setIsAnalyzed] = React.useState(false);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		...props,
		onDrop: async (acceptedFiles, rejectedFiles, event) => {
			setIsUploading(true);
			// Simulate 2 second processing time
			setTimeout(() => {
				setIsUploading(false);
				setIsAnalyzed(true);
			}, 2000);
			// Call the original onDrop if provided
			props.onDrop?.(acceptedFiles, rejectedFiles, event);
		},
	});

	if (isAnalyzed) {
		return <DocumentSummary onAnswerSelect={onAnswerSelect} />;
	}

	if (isUploading) {
		return <ProgressIndicator />;
	}

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
			<Stack spacing={2} alignItems="center">
				<Avatar
					sx={{
						bgcolor: "var(--mui-palette-background-paper)",
						boxShadow: "var(--mui-shadows-8)",
						color: "var(--mui-palette-text-primary)",
						height: 56,
						width: 56,
					}}
				>
					<PlusIcon fontSize="var(--icon-fontSize-xl)" />
				</Avatar>
				<Typography variant="h6" align="center">
					{title}
				</Typography>
				<Typography variant="body2" align="center" color="text.secondary">
					{description}
				</Typography>
				<Typography variant="body2" align="center" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
					{subtitle}
				</Typography>
			</Stack>
		</Box>
	);
}
