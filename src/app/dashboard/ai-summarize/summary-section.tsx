"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";

interface SummarySectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  globalExpandState?: boolean;
  lastToggleTime?: number;
}

export function SummarySection({ 
  title, 
  children,
  defaultExpanded = true,
  globalExpandState = true,
  lastToggleTime = 0
}: SummarySectionProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const lastIndividualToggleTime = React.useRef(0);

  // Update expansion state when global state changes
  React.useEffect(() => {
    if (lastToggleTime > lastIndividualToggleTime.current) {
      setIsExpanded(globalExpandState);
    }
  }, [globalExpandState, lastToggleTime]);

  const handleToggle = () => {
    lastIndividualToggleTime.current = Date.now();
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        onClick={handleToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          py: 1,
          borderRadius: 1,
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
      <Collapse in={isExpanded} timeout="auto">
        <Box sx={{ pl: 4 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
} 