"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface QuestionAnswerProps {
  question: string;
  answer: string;
  onSelect?: (answer: string) => void;
}

export function QuestionAnswer({ question, answer, onSelect }: QuestionAnswerProps): React.JSX.Element {
  return (
    <Box 
      sx={{ 
        mb: 2,
        cursor: onSelect ? 'pointer' : 'default',
        '&:hover': onSelect ? {
          bgcolor: 'action.hover',
        } : {},
      }}
      onClick={() => onSelect?.(answer)}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: "var(--mui-palette-text-primary)",
          mb: 0.5,
        }}
      >
        {question}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "var(--mui-palette-text-secondary)",
          pl: 2,
        }}
      >
        {answer}
      </Typography>
    </Box>
  );
} 