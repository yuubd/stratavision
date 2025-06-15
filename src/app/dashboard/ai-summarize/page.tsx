"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { FileDropzone } from "@/app/dashboard/ai-summarize/file-dropzone";

export default function AiSummarizePage(): React.JSX.Element {
	const [isFileUploaded, setIsFileUploaded] = React.useState(false);
	const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				minHeight: "calc(100vh - 64px)",
			}}
		>
			<Box sx={{ maxWidth: isFileUploaded ? "100%": 600, mx: "auto", width: "100%" }}>
				<FileDropzone
					accept={{ "application/pdf": [".pdf"] }}
					title="Summarize your strata documents"
					description="Upload files to analyze your document"
					subtitle={`Strata documents, property history,\nmeeting notes, and any additional documents`}
					onAnswerSelect={(answer) => setSelectedAnswer(answer)}
					onFileUploaded={(bool) => setIsFileUploaded(bool)}
				/>
			</Box>
		</Box>
	);
} 