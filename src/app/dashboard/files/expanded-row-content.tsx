"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import type { FileData } from "./service";
import { PDFViewer } from '../ai-summarize/pdf-viewer';
import { SummarySection } from '../ai-summarize/summary-section';
import { QuestionAnswer } from '../ai-summarize/question-answer';
import type { DocumentSummaryData } from '../ai-summarize/types';
import { CaretDown as ExpandIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretUp as CollapseIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";

interface ExpandedRowContentProps {
  file: FileData;
}

export const ExpandedRowContent = ({ file }: ExpandedRowContentProps) => {
  // Always use the hardcoded PDF file
  const pdfUrl = '/assets/EPS5144_W1_Bylaws.pdf';
  const [summaryData, setSummaryData] = React.useState<DocumentSummaryData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [globalExpandState, setGlobalExpandState] = React.useState(true);
  const [lastToggleTime, setLastToggleTime] = React.useState(0);

  const handleGlobalToggle = () => {
    setGlobalExpandState(!globalExpandState);
    setLastToggleTime(Date.now());
  };

  // Fetch the summary when the component mounts
  React.useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/files/${file.id}/summary`);
        if (response.ok) {
          const data = await response.json();
          // Parse the stringified JSON summary
          setSummaryData(JSON.parse(data.summary));
        } else {
          console.error('Failed to fetch summary');
        }
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [file.id]);

  return (
    <Box sx={{ pt: 2, pb: 3, px: 3, bgcolor: 'background.default' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              height: '100%', 
              maxHeight: 800,
              overflow: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Strata #: {summaryData?.strataNumber || file.strataNumber}
              </Typography>
              <Button
                variant="text"
                size="small"
                onClick={handleGlobalToggle}
                startIcon={globalExpandState ? <CollapseIcon /> : <ExpandIcon />}
              >
                {globalExpandState ? 'Collapse All' : 'Expand All'}
              </Button>
            </Box>
            {loading ? (
              <Typography>Loading summary...</Typography>
            ) : summaryData ? (
              <Box sx={{ mt: 2 }}>
                {summaryData.sections.map((section) => (
                  <SummarySection 
                    key={section.title} 
                    title={section.title}
                    defaultExpanded={true}
                    globalExpandState={globalExpandState}
                    lastToggleTime={lastToggleTime}
                  >
                    {section.subsections.map((subsection) => (
                      <SummarySection 
                        key={subsection.title} 
                        title={subsection.title}
                        defaultExpanded={true}
                        globalExpandState={globalExpandState}
                        lastToggleTime={lastToggleTime}
                      >
                        {subsection.questions.map((qa, index) => (
                          <QuestionAnswer
                            key={index}
                            question={qa.question}
                            answer={qa.answer}
                            selected={false}
                          />
                        ))}
                      </SummarySection>
                    ))}
                  </SummarySection>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">No summary available</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              maxHeight: 800, // Match the summary section height
              overflow: 'hidden',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <PDFViewer pdfUrl={pdfUrl} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 