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
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { File as FileIcon } from "@phosphor-icons/react/dist/ssr/File";
import { WarningDiamond as ErrorIcon } from "@phosphor-icons/react/dist/ssr/WarningDiamond";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import IconButton from "@mui/material/IconButton";

export type File = FileWithPath;

export interface FileDropzoneProps extends DropzoneOptions {
	title: string;
	description: string;
	subtitle: string;
	onAnswerSelect?: (answer: string | null) => void;
	onFileUploaded?: (val: boolean) => void;
}

export function FileDropzone({ title, description, subtitle, onAnswerSelect, ...props }: FileDropzoneProps): React.JSX.Element {
	const [files, setFiles] = React.useState<{
		file: FileWithPath;
		status: "uploading" | "uploaded" | "error";
		progress: number;
		error?: string;
	}[]>([]);
	const [isAnalyzed, setIsAnalyzed] = React.useState(false);

	const uploadFile = (fileObj: { file: FileWithPath; status: string; progress: number }) => {
		// Simulate upload with progress
		setFiles(prev =>
			prev.map(f =>
				f.file.name === fileObj.file.name ? { ...f, status: "uploading", progress: 0, error: undefined } : f
			)
		);
		let progress = 0;
		const interval = setInterval(() => {
			progress += Math.random() * 30 + 10;
			if (progress >= 100) {
				clearInterval(interval);
				// Simulate random error
				if (Math.random() < 0.2) {
					setFiles(prev =>
						prev.map(f =>
							f.file.name === fileObj.file.name
								? { ...f, status: "error", progress: 0, error: "Upload failed" }
								: f
						)
					);
				} else {
					setFiles(prev =>
						prev.map(f =>
							f.file.name === fileObj.file.name ? { ...f, status: "uploaded", progress: 100 } : f
						)
					);
				}
			} else {
				setFiles(prev =>
					prev.map(f =>
						f.file.name === fileObj.file.name ? { ...f, progress: Math.min(progress, 100) } : f
					)
				);
			}
		}, 400);
	};

	const handleDrop = React.useCallback(
		(acceptedFiles: FileWithPath[]) => {
			const allowedExtensions = [
				".pdf", ".png", ".jpg", ".jpeg", ".doc", ".docx"
			];
			const allowedTypes = [
				"application/pdf",
				"image/png", "image/jpeg",
				"application/msword",
			];
			const filteredFiles = acceptedFiles.filter(f =>
				allowedTypes.includes(f.type) || allowedExtensions.some(ext => f.name.toLowerCase().endsWith(ext))
			);
			const newFiles = filteredFiles.map(file => ({ file, status: "uploading" as const, progress: 0 }));
			setFiles(prev => [...prev, ...newFiles]);
			newFiles.forEach(uploadFile);
			props.onDrop?.(acceptedFiles, [], undefined as any);
		},
		[props]
	);

	const retryUpload = (fileObj: { file: FileWithPath }) => {
		uploadFile({ ...fileObj, status: "uploading", progress: 0 });
	};

	const allDone = files.length > 0 && files.every(f => f.status === "uploaded" || f.status === "error");
	const hasUploading = files.some(f => f.status === "uploading");

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		...props,
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpg", ".jpeg"],
			"application/msword": [".doc", ".docx"],
		},
		onDrop: handleDrop,
		multiple: true,
	});

	const handleRemoveFile = (fileName: string) => {
		setFiles(prev => prev.filter(f => f.file.name !== fileName));
	};

	if (isAnalyzed) {
		return <DocumentSummary onAnswerSelect={onAnswerSelect} />;
	}

	return (
		<Box
			sx={{
				border: "2px dashed var(--mui-palette-divider)",
				borderRadius: 2,
				cursor: files.length === 0 ? "pointer" : "default",
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
				maxWidth: 600,
				mx: "auto",
			}}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
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
				{files.length > 0 && (
					<Box sx={{ width: "100%", mt: 2 }}>
						{files.map((f, idx) => (
							<Box key={f.file.name + idx} sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
								<Avatar sx={{ bgcolor: "var(--mui-palette-background-paper)", color: "var(--mui-palette-text-primary)", width: 32, height: 32 }}>
									<FileIcon size={20} />
								</Avatar>
								<Box sx={{ flex: 1 }}>
									<Typography variant="body2" sx={{ fontWeight: 500, color: "var(--mui-palette-text-primary)" }} noWrap>
										{f.file.name}
									</Typography>
									{f.status === "uploading" && (
										<LinearProgress variant="determinate" value={f.progress} sx={{ height: 6, borderRadius: 2, mt: 0.5 }} />
									)}
									{f.status === "uploaded" && (
										<Typography variant="caption" color="success.main">Uploaded</Typography>
									)}
									{f.status === "error" && (
										<Typography variant="caption" color="error.main" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
											<ErrorIcon size={16} weight="fill" /> Error
										</Typography>
									)}
								</Box>
								<IconButton
									size="small"
									color="error"
									onClick={e => {
										e.stopPropagation();
										handleRemoveFile(f.file.name);
									}}
									sx={{ ml: 1 }}
								>
									<TrashIcon size={18} />
								</IconButton>
								{f.status === "error" && (
									<Button size="small" color="error" onClick={e => { e.stopPropagation(); retryUpload(f); }} sx={{ ml: 1 }}>
										Retry
									</Button>
								)}
							</Box>
						))}
					</Box>
				)}
				<Button
					variant="contained"
					sx={{ mt: 2, width: "100%" }}
					disabled={!allDone || files.length === 0}
					onClick={e => {
						e.stopPropagation();
						setIsAnalyzed(true);
						props.onFileUploaded?.(true);
					}}
				>
					Next
				</Button>
			</Stack>
		</Box>
	);
}
