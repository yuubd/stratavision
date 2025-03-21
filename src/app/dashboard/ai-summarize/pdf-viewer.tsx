"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { MagnifyingGlassPlus as ZoomInIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassPlus";
import { MagnifyingGlassMinus as ZoomOutIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlassMinus";

interface PDFViewerProps {
  pdfUrl: string;
}

export function PDFViewer({ pdfUrl }: PDFViewerProps): React.JSX.Element {
  const [scale, setScale] = React.useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
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
      {/* Zoom Controls */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          display: "flex",
          gap: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 0.5,
          boxShadow: 1,
        }}
      >
        <IconButton onClick={handleZoomOut} size="small">
          <ZoomOutIcon />
        </IconButton>
        <IconButton onClick={handleZoomIn} size="small">
          <ZoomInIcon />
        </IconButton>
      </Box>

      {/* PDF Container */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          "& iframe": {
            width: "100%",
            height: "100%",
            border: "none",
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease",
          },
        }}
      >
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          title="PDF Viewer"
        />
      </Box>
    </Box>
  );
} 