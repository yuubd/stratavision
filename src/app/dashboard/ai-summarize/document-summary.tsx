"use client";

import * as React from "react";
import type { SummaryDataResponse } from '@/types/api';
import { saveSummary } from "../storage/service";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { SummaryView } from "../../shared/summary-view";

export interface DocumentSummaryProps {
  summaryData: SummaryDataResponse;
}

export function DocumentSummary({ summaryData }: DocumentSummaryProps): React.JSX.Element {
  const [isSaving, setIsSaving] = React.useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSummary({
        summary: 'test',
        pdfPath: '/assets/EPS5144_W1_By.pdf',
        fileName: 'EPS5144_W1_By.pdf',
        strataNumber: 'EPS5144'
      });
      
      // Navigate to files tab after successful save
      router.push(paths.dashboard.storage);
    } catch (error) {
      console.error('Failed to save summary:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SummaryView
      documentSummary={summaryData}
      onSave={handleSave}
      isSaving={isSaving}
    />
  );
}