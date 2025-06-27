"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { FileDropzone } from "@/app/dashboard/ai-summarize/file-dropzone";
import { DocumentSummary } from "@/app/dashboard/ai-summarize/document-summary";

export default function AiSummarizePage(): React.JSX.Element {
	const [showSummary, setShowSummary] = useState(false);
	const [summaryData, setSummaryData] = useState<any>(null);

	const handleShowSummary = (show: boolean, summary?: any) => {
		setShowSummary(show);
		if (summary) setSummaryData(summary);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				minHeight: "calc(100vh - 64px)",
			}}
		>
			<Box sx={{ maxWidth: showSummary ? "100%" : 600, mx: "auto", width: "100%" }}>
				{showSummary ? (
					<DocumentSummary data={summaryData} />
				) : (
					<FileDropzone
						accept={{ "application/pdf": [".pdf"] }}
						title="Summarize your strata documents"
						description="Upload files to analyze your document"
						subtitle={`Strata documents, property history,\nmeeting notes, and any additional documents`}
						onShowSummary={handleShowSummary}
					/>
				)}
			</Box>
		</Box>
	);
} 