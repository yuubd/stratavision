"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import type { FileData } from "./service";
import type { DocumentSummaryData } from '../ai-summarize/types';
import { SummaryView } from "../shared/summary-view";

interface ExpandedRowContentProps {
  file: FileData;
}

export const ExpandedRowContent = ({ file }: ExpandedRowContentProps) => {
  // Always use the hardcoded PDF file
  const pdfUrl = '/assets/EPS5144_W1_Bylaws.pdf';
  const [summaryData, setSummaryData] = React.useState<DocumentSummaryData | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Fetch the summary when the component mounts
  React.useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/storage/${file.id}/summary`);
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
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              maxHeight: 800,
              overflow: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            {loading ? (
              <Box sx={{ p: 2 }}>
                <Typography>Loading summary...</Typography>
              </Box>
            ) : summaryData ? (
              <SummaryView
                data={summaryData}
                pdfUrl={pdfUrl}
                showHeader={false}
                showCompactHeader={true}
              />
            ) : (
              <Box sx={{ p: 2 }}>
                <Typography color="text.secondary">No summary available</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 