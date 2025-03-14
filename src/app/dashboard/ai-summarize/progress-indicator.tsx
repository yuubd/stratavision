"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Robot as RobotIcon } from "@phosphor-icons/react/dist/ssr/Robot";

export function ProgressIndicator(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: "var(--mui-palette-background-level1)",
          position: "relative",
        }}
      >
        <RobotIcon weight="fill" fontSize="var(--icon-fontSize-xl)" />
        <CircularProgress
          size={64}
          sx={{
            position: "absolute",
            color: "var(--mui-palette-primary-main)",
          }}
        />
      </Box>
      <Typography variant="h6" sx={{ color: "var(--mui-palette-text-primary)" }}>
        AI summarization in progress
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "var(--mui-palette-text-secondary)",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        Our AI is analyzing your document to extract key information and create a structured summary. This may take a few minutes.
      </Typography>
    </Box>
  );
} 