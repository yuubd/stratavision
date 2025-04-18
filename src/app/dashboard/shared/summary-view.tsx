import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SummarySection } from "../ai-summarize/summary-section";
import { QuestionAnswer as QuestionAnswerComponent } from "../ai-summarize/question-answer";
import { CaretDown as ExpandIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretUp as CollapseIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import type { DocumentSummaryData, QuestionAnswer } from "../ai-summarize/types";
import { PDFViewer } from "../ai-summarize/pdf-viewer";

export interface SummaryViewProps {
  data: DocumentSummaryData;
  pdfUrl: string;
  showHeader?: boolean;
  showCompactHeader?: boolean;
  onSave?: () => void;
  isSaving?: boolean;
}

export function SummaryView({ 
  data, 
  pdfUrl,
  showHeader = true,
  showCompactHeader = false,
  onSave,
  isSaving = false 
}: SummaryViewProps): React.JSX.Element {
  const [globalExpandState, setGlobalExpandState] = React.useState(true);
  const [lastToggleTime, setLastToggleTime] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [selectedQA, setSelectedQA] = React.useState<QuestionAnswer | null>(null);

  const handleGlobalToggle = () => {
    setGlobalExpandState(!globalExpandState);
    setLastToggleTime(Date.now());
  };

  const handleAnswerSelect = (answer: string, qa: QuestionAnswer) => {
    if (selectedAnswer === answer) {
      // If clicking the same answer, deselect it
      setSelectedAnswer(null);
      setSelectedQA(null);
    } else {
      // If clicking a different answer, select it
      setSelectedAnswer(answer);
      setSelectedQA(qa);
    }
  };

  return (
    <Box>
      {/* Full Header */}
      {showHeader && (
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
              {onSave && (
                <Button
                  variant="contained"
                  onClick={onSave}
                  sx={{ borderRadius: 24 }}
                >
                  {isSaving ? 'Saving...' : 'Save AI Summary'}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* Compact Header */}
      {showCompactHeader && !showHeader && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Typography variant="h6">
            Strata #: {data.strataNumber}
          </Typography>
          <Button
            variant="text"
            size="small"
            startIcon={globalExpandState ? <CollapseIcon /> : <ExpandIcon />}
            onClick={handleGlobalToggle}
          >
            {globalExpandState ? "Collapse All" : "Expand All"}
          </Button>
        </Box>
      )}

      {/* Content Area - Splits into Two */}
      <Box sx={{ 
        display: 'flex',
        position: 'relative',
        minHeight: showHeader ? 'calc(100vh - 73px)' : 'auto',
        maxHeight: showHeader ? undefined : '800px',
      }}>
        {/* Summary Content */}
        <Box sx={{ 
          width: selectedAnswer ? "50%" : "100%",
          transition: "width 0.3s ease",
          p: 3,
          overflow: 'auto',
          maxHeight: showHeader ? undefined : '800px',
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
                    <QuestionAnswerComponent
                      key={index}
                      question={qa.question}
                      answer={qa.answer}
                      location={qa.location}
                      highlightData={qa.highlightData}
                      onSelect={(answer) => handleAnswerSelect(answer, qa)}
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
            height: showHeader ? "calc(100vh - 100px)" : '800px',
            position: "sticky",
            top: showHeader ? 100 : 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}>
            <PDFViewer 
              pdfUrl={pdfUrl}
              highlightedLocation={selectedQA?.location}
              highlightText={selectedQA?.answer}
              highlightData={selectedQA?.highlightData}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
} 