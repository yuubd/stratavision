"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { FilesTable } from "./files-table";

export default function FilesPage(): React.JSX.Element {
	const router = useRouter();

	const handleStartUploading = () => {
		router.push('/dashboard/ai-summarize');
	};

	return (
		<Box sx={{ p: 3 }}>
			<FilesTable onStartUploading={handleStartUploading} />
		</Box>
	);
} 