"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FileTable } from "./file-table";
import { getFiles, type FileData } from "./service";

export default function FilesPage() {
	const router = useRouter();
	const [files, setFiles] = useState<FileData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleStartUploading = () => {
		router.push('/dashboard/ai-summarize');
	};

	const fetchFiles = async () => {
		try {
			setLoading(true);
			const data = await getFiles();
			setFiles(data);
			setError(null);
		} catch (err) {
			setError("Failed to fetch files. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFiles();
	}, []);

	const handleDelete = (id: string) => {
		setFiles(files.filter(file => file.id !== id));
	};

	if (loading && files.length === 0) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<CircularProgress />
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
		<Box 
			sx={{ 
				height: '100%',
				backgroundColor: '#1a1c2a'
			}}
		>
			<FileTable 
				files={files} 
				onDelete={handleDelete} 
				onStartUploading={handleStartUploading}
				isEmpty={files.length === 0}
			/>
		</Box>
	);
}