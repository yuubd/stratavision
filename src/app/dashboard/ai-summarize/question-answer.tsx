"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import type { PageHighlightData } from "./types";

interface QuestionAnswerProps {
  question: string;
  answer: string;
  location?: string;
  onSelect?: (answer: string) => void;
  selected?: boolean;
  highlightData?: PageHighlightData[];
}

export function QuestionAnswer({ question, answer, location, onSelect, selected, highlightData }: QuestionAnswerProps): React.JSX.Element {
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
          boxShadow: '0 0 0 1px',
          borderColor: 'divider',
          borderRadius: 1,
        } : {},
        bgcolor: selected ? 'action.selected' : 'transparent',
        borderRadius: 1,
        transition: 'all 0.2s ease',
        ...(selected && {
          boxShadow: '0 0 0 2px',
          borderColor: 'primary.main',
        })
      }}
      onClick={handleClick}
    >
      <Typography 
        variant="subtitle1" 
        gutterBottom
        sx={{ 
          fontWeight: selected ? 'bold' : 'normal',
          color: selected ? 'primary.main' : 'text.primary'
        }}
      >
        {question}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography 
          variant="body1" 
          color={selected ? 'text.primary' : 'text.secondary'} 
          sx={{ flex: 1 }}
        >
          {answer}
        </Typography>
        {location && (
          <Chip 
            label={location} 
            size="small" 
            color={selected ? "primary" : "default"} 
            variant={selected ? "filled" : "outlined"} 
            sx={{ 
              ml: 1, 
              height: 20, 
              fontSize: '0.7rem',
              transition: 'all 0.2s ease',
              fontWeight: selected ? 'bold' : 'normal',
            }} 
          />
        )}
      </Box>
    </Box>
  );
} 