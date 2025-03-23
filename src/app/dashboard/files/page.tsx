"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { FileTable } from "./file-table";
import { getFiles, type FileData } from "./service";
import { FilesTable } from "./files-table";


export default function FilesPage() {
	const router = useRouter();
	const [files, setFiles] = useState<FileData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleStartUploading = () => {
        router.push('/dashboard/ai-summarize');
    };
	useEffect(() => {
		const fetchFiles = async () => {
			try {
				const data = await getFiles();
				setFiles(data);
				setError(null);
			} catch (err) {
				setError("Failed to fetch files. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchFiles();
	}, []);

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<CircularProgress />
			</Box>
		);
	}
	if (files.length === 0) {
		return (
			<Box sx={{ p: 3 }}>
				<FilesTable onStartUploading={handleStartUploading} />
			</Box>
		);
	}
	if (error) {
		return (
			<Box sx={{ p: 3 }}>
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Your Files
			</Typography>
			<FileTable files={files} />
		</Box>
	);
}