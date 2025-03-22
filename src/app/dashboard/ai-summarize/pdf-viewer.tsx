"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { MagnifyingGlassPlus as ZoomInIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassPlus";
import { MagnifyingGlassMinus as ZoomOutIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassMinus";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

export function PDFViewer({ pdfUrl }: PDFViewerProps): React.JSX.Element {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [scale, setScale] = React.useState(1.2);
  const [error, setError] = React.useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setError(error.message);
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.8));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        borderLeft: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Controls */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 1,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={handleZoomOut} size="small" disabled={!numPages}>
            <ZoomOutIcon />
          </IconButton>
          <IconButton onClick={handleZoomIn} size="small" disabled={!numPages}>
            <ZoomInIcon />
          </IconButton>
        </Box>
      </Box>

      {/* PDF Container */}
      <Box
        sx={{
          flex: 1,
          mt: "48px", // Height of controls
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          bgcolor: "#f5f5f5",
          "& .react-pdf__Document": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          },
          "& .react-pdf__Page": {
            marginBottom: 2,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          },
          "& .react-pdf__Page__canvas": {
            maxWidth: "auto",
            height: "auto !important",
          }
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
              Loading PDF...
            </Box>
          }
          error={
            <Box sx={{ p: 2, color: "error.main" }}>
              {error || 'Failed to load PDF. Please try again.'}
            </Box>
          }
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              loading={null}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          ))}
        </Document>
      </Box>
    </Box>
  );
} 