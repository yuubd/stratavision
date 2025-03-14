"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

interface SummarySectionProps {
  title: string;
  children: React.ReactNode;
}

export function SummarySection({ title, children }: SummarySectionProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          py: 1,
          "&:hover": {
            bgcolor: "var(--mui-palette-action-hover)",
          },
        }}
      >
        <CaretRightIcon
          style={{
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        />
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          pl: 4,
          overflow: "hidden",
          maxHeight: isExpanded ? "1000px" : "0",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 