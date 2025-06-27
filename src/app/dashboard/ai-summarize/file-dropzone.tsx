"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useDropzone } from "react-dropzone";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { ProgressIndicator } from "./progress-indicator";
import Button from "@mui/material/Button";
import { File as FileIcon } from "@phosphor-icons/react/dist/ssr/File";
import { WarningDiamond as ErrorIcon } from "@phosphor-icons/react/dist/ssr/WarningDiamond";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import IconButton from "@mui/material/IconButton";
import type { DropzoneOptions, FileWithPath } from "react-dropzone";

export interface FileDropzoneProps extends DropzoneOptions {
	title: string;
	description: string;
	subtitle: string;
	onShowSummary?: (val: boolean, summaryData?: any) => void;
}

export function FileDropzone({ title, description, subtitle, onShowSummary, ...props }: FileDropzoneProps): React.JSX.Element {
	const [files, setFiles] = React.useState<{
		file: FileWithPath;
		status: "uploading" | "uploaded" | "error";
		progress: number;
		error?: string;
	}[]>([]);
	const [classified, setClassified] = React.useState<any[] | null>(null);
	const [missingTypes, setMissingTypes] = React.useState<string[] | null>(null);
	const [isAnalyzed, setIsAnalyzed] = React.useState(false);
	const [isSummarizing, setIsSummarizing] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

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
			const newFiles = filteredFiles.map(file => ({ file, status: "uploaded" as const, progress: 100 }));
			setFiles(prev => [...prev, ...newFiles]);
			props.onDrop?.(acceptedFiles, [], undefined as any);
		},
		[props]
	);

	const allDone = files.length > 0 && files.every(f => f.status === "uploaded" || f.status === "error");

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

	const handleNext = async (e: React.MouseEvent) => {
		e.stopPropagation();
		setLoading(true);
		setError(null);
		try {
			const formData = new FormData();
			files.forEach(f => {
				if (f.status === "uploaded") {
					formData.append("file", f.file, f.file.name);
				}
			});
			const res = await fetch("/api/ai-summarize", {
				method: "POST",
				body: formData,
			});
			if (!res.ok) throw new Error("Classification failed");
			const data = await res.json();
			setClassified(data.classified);
			setMissingTypes(data.missing_types);
			setIsAnalyzed(true);
		} catch (err) {
			setError("Failed to classify files");
		} finally {
			setLoading(false);
		}
	};

	const handleSummarize = async () => {
		setIsSummarizing(true);
		setError(null);
		try {
			const formData = new FormData();
			files.forEach(f => {
				if (f.status === "uploaded") {
					formData.append("file", f.file, f.file.name);
				}
			});
			const res = await fetch("/api/ai-summarize/summary", {
				method: "POST",
				body: formData,
			});
			if (!res.ok) throw new Error("Summary failed");
			const summaryData = await res.json();
			onShowSummary?.(true, summaryData);
		} catch (err) {
			setError("Failed to summarize files");
		} finally {
			setIsSummarizing(false);
		}
	};

	function shortenFileName(name: string, maxLength = 30) {
		if (name.length <= maxLength) return name;
		const extIndex = name.lastIndexOf('.');
		const ext = extIndex !== -1 ? name.slice(extIndex) : '';
		const base = name.slice(0, maxLength - ext.length - 3);
		return `${base}...${ext}`;
	}

	if (isSummarizing) {
		return <ProgressIndicator />;
	}

	if (isAnalyzed && classified) {
		return (
			<Box
				sx={{
					border: "2px dashed var(--mui-palette-divider)",
					borderRadius: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					outline: "none",
					py: 5,
					px: 3,
					minHeight: 360,
					maxWidth: 600,
					mx: "auto",
				}}
			>
				<Typography variant="h6" align="center" sx={{ mb: 2 }}>
					Document Review
				</Typography>
				<Box sx={{ width: "100%", mb: 2 }}>
					{classified.map((f, idx) => (
						<Box key={f.filename + idx} sx={{ display: "flex", alignItems: "center", mb: 1, gap: 2 }}>
							<Avatar sx={{ bgcolor: "var(--mui-palette-background-paper)", color: "var(--mui-palette-text-primary)", width: 32, height: 32 }}>
								<FileIcon size={20} />
							</Avatar>
							<Typography variant="body2" sx={{ fontWeight: 500, color: "var(--mui-palette-text-primary)", flex: 1 }} noWrap>
								{shortenFileName(f.filename)}
							</Typography>
							<Typography variant="caption" color="primary" sx={{ ml: 1 }}>
								{f.type}
							</Typography>
						</Box>
					))}
				</Box>
				{missingTypes && missingTypes.length > 0 && (
					<Box sx={{ width: "100%", mb: 2 }}>
						<Typography variant="body2" color="error" sx={{ mb: 1 }}>
							Missing required document types:
						</Typography>
						<ul style={{ margin: 0, paddingLeft: 20 }}>
							{missingTypes.map(type => (
								<li key={type} style={{ color: "#e57373" }}>{type}</li>
							))}
						</ul>
						<Typography variant="body2" sx={{ mt: 1 }}>
							Please upload the missing files.<br />
							<span style={{ color: '#888' }}>Or continue to analyze with the current files.</span>
						</Typography>
						<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
							<Button
								variant="outlined"
								sx={{ width: "100%" }}
								onClick={() => setIsAnalyzed(false)}
							>
								Upload More Files
							</Button>
							<Button
								variant="contained"
								sx={{ width: "100%" }}
								onClick={handleSummarize}
							>
								Next
							</Button>
						</Box>
					</Box>
				)}
				{missingTypes && missingTypes.length === 0 && (
					<Button
						variant="contained"
						sx={{ mt: 2, width: "100%" }}
						onClick={handleSummarize}
					>
						Continue
					</Button>
				)}
			</Box>
		);
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
										{shortenFileName(f.file.name)}
									</Typography>
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
							</Box>
						))}
					</Box>
				)}
				<Button
					variant="contained"
					sx={{ mt: 2, width: "100%" }}
					disabled={!allDone || files.length === 0 || loading}
					onClick={handleNext}
				>
					{loading ? "Reviewing..." : "Next"}
				</Button>
				{error && (
					<Typography color="error" sx={{ mt: 1 }}>{error}</Typography>
				)}
			</Stack>
		</Box>
	);
}
