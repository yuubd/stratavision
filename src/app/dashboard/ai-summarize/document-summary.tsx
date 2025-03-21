"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SummarySection } from "./summary-section";
import { QuestionAnswer } from "./question-answer";
import { FloppyDisk as SaveIcon } from "@phosphor-icons/react/dist/ssr/FloppyDisk";
import { CaretDown as ExpandIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretUp as CollapseIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import { mockDocumentSummary } from "./mock-data";
import type { DocumentSummaryData } from "./types";
import { PDFViewer } from "./pdf-viewer";

export interface DocumentSummaryProps {
  data?: DocumentSummaryData;
  onAnswerSelect?: (answer: string) => void;
}

export function DocumentSummary({ data = mockDocumentSummary, onAnswerSelect }: DocumentSummaryProps): React.JSX.Element {
  const [globalExpandState, setGlobalExpandState] = React.useState(true);
  const [lastToggleTime, setLastToggleTime] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);

  const handleGlobalToggle = () => {
    setGlobalExpandState(!globalExpandState);
    setLastToggleTime(Date.now());
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswerSelect?.(answer);
  };

  return (
    <Box>
      {/* Header - Always Full Width */}
      <Box sx={{ 
        position: "sticky",
        top: 0,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        zIndex: 1100,
        px: { xs: 6, lg: 3 },
        py: 2,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Summary
            </Typography>
            <Typography variant="h4">
              {data.strataNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={globalExpandState ? <CollapseIcon /> : <ExpandIcon />}
              onClick={handleGlobalToggle}
              sx={{ borderRadius: 24 }}
            >
              {globalExpandState ? "Collapse All" : "Expand All"}
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ borderRadius: 24 }}
            >
              Save AI Summary
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Content Area - Splits into Two */}
      <Box sx={{ 
        display: 'flex',
        position: 'relative',
      }}>
        {/* Summary Content */}
        <Box sx={{ 
          width: selectedAnswer ? "50%" : "100%",
          transition: "width 0.3s ease",
          p: 3,
        }}>
          {/* Sections */}
          {data.sections.map((section) => (
            <SummarySection 
              key={section.title} 
              title={section.title}
              defaultExpanded={globalExpandState}
              globalExpandState={globalExpandState}
              lastToggleTime={lastToggleTime}
            >
              {section.subsections.map((subsection) => (
                <SummarySection 
                  key={subsection.title} 
                  title={subsection.title}
                  defaultExpanded={globalExpandState}
                  globalExpandState={globalExpandState}
                  lastToggleTime={lastToggleTime}
                >
                  {subsection.questions.map((qa, index) => (
                    <QuestionAnswer
                      key={index}
                      question={qa.question}
                      answer={qa.answer}
                      onSelect={handleAnswerSelect}
                    />
                  ))}
                </SummarySection>
              ))}
            </SummarySection>
          ))}
        </Box>

        {/* PDF Viewer */}
        {selectedAnswer && (
          <Box sx={{ 
            width: "50%",
            position: "sticky",
            top: 0,
            height: "calc(100vh - 64px)",
          }}>
            <PDFViewer pdfUrl="/assets/EPS5144_W1_Bylaws.pdf" />
          </Box>
        )}
      </Box>
    </Box>
  );
}