"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import type { FileData } from "./service";
import type { SummaryDataResponse } from '@/types/api';
import { SummaryView } from "../../shared/summary-view";

interface ExpandedRowContentProps {
  file: FileData;
}

export const ExpandedRowContent = ({ file }: ExpandedRowContentProps) => {
  const [summaryData, setSummaryData] = React.useState<SummaryDataResponse | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Fetch complete file data (including summary) in a single API call
  React.useEffect(() => {
    const fetchFileData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/storage/${file.id}`);
        if (response.ok) {
          const data = await response.json();
          // Summary is already parsed in the API response
          setSummaryData(data.summary);
        } else {
          console.error('Failed to fetch file data');
        }
      } catch (error) {
        console.error('Error fetching file data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
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
                documentSummary={summaryData}
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