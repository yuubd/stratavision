export interface SaveSummaryRequest {
  userId?: string; // Optional since handled by API authentication
  summary: string;
  pdfPath: string;
  strataNumber: string;
  developer?: string;
  city?: string;
  building?: string;
  unitNumber?: string;
  streetNumber?: string;
}

export async function saveSummary(data: SaveSummaryRequest): Promise<any> {
  const response = await fetch('/api/storage/save-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save summary');
  }

  return response.json();
} 