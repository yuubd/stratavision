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
import { saveSummary } from "../files/service";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

export interface DocumentSummaryProps {
  data?: DocumentSummaryData;
  onAnswerSelect?: (answer: string | null) => void;
}

export function DocumentSummary({ data = mockDocumentSummary, onAnswerSelect }: DocumentSummaryProps): React.JSX.Element {
  const [globalExpandState, setGlobalExpandState] = React.useState(true);
  const [lastToggleTime, setLastToggleTime] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();

  const handleGlobalToggle = () => {
    setGlobalExpandState(!globalExpandState);
    setLastToggleTime(Date.now());
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer === answer) {
      // If clicking the same answer, deselect it
      setSelectedAnswer(null);
      onAnswerSelect?.(null);
    } else {
      // If clicking a different answer, select it
      setSelectedAnswer(answer);
      onAnswerSelect?.(answer);
    }
  };

  const handleSave = async () => {
    if (!selectedAnswer) return;
    
    setIsSaving(true);
    try {
      await saveSummary({
        summary: selectedAnswer,
        pdfPath: '/assets/EPS5144_W1_By.pdf',
        fileName: 'EPS5144_W1_By.pdf'
      });
      
      // Navigate to files tab after successful save
      router.push(paths.dashboard.files);
    } catch (error) {
      console.error('Failed to save summary:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box>
      {/* Header - Always Full Width */}
      <Box sx={{ 
        position: "sticky",
        top: 1,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        zIndex: 1100,
        px: { xs: 6, lg: 3 },
        py: 2,
        "::before": {
          content: '""',
          position: "absolute",
          top: -500,
          left: 0,
          width: "100%",
          height: 500,
          bgcolor: "background.paper",
          zIndex: -1,
        }
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
              onClick={handleSave}
            >
              {isSaving ? 'Saving...' : 'Save AI Summary'}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Content Area - Splits into Two */}
      <Box sx={{ 
        display: 'flex',
        position: 'relative',
        minHeight: 'calc(100vh - 73px)',
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
                      selected={selectedAnswer === qa.answer}
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
            height: "calc(100vh - 100px)",
            position: "sticky",
            top: 100,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          }}>
            <PDFViewer pdfUrl="/assets/EPS5144_W1_Bylaws.pdf" />
          </Box>
        )}
      </Box>
    </Box>
  );
}