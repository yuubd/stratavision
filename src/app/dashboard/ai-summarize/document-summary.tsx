"use client";

import * as React from "react";
import type { SummaryDataResponse } from '@/types/api';
import { saveSummary } from "./service";
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
        summary: JSON.stringify(summaryData),
        pdfPath: summaryData.pdfPath,
        strataNumber: summaryData.strataNumber,
        // Use metadata extracted by AI, fallback to empty string if not available
        developer: summaryData.developer || '',
        city: summaryData.city || '',
        building: summaryData.building || '',
        unitNumber: summaryData.unitNumber || '',
        streetNumber: summaryData.streetNumber || '',
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