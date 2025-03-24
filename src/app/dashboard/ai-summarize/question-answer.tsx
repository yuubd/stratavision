"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface QuestionAnswerProps {
  question: string;
  answer: string;
  onSelect?: (answer: string) => void;
  selected?: boolean;
}

export function QuestionAnswer({ question, answer, onSelect, selected }: QuestionAnswerProps): React.JSX.Element {
  const handleClick = () => {
    onSelect?.(answer);
  };

  return (
    <Box 
      sx={{
        p: 1, 
        cursor: onSelect ? 'pointer' : 'default',
        '&:hover': onSelect ? {
          bgcolor: 'action.hover',
        } : {},
        bgcolor: selected ? 'action.selected' : 'transparent',
      }}
      onClick={handleClick}
    >
      <Typography variant="subtitle1" gutterBottom>
        {question}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {answer}
      </Typography>
    </Box>
  );
} 