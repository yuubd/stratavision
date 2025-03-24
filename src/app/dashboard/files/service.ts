export interface FileData {
  id: string;
  name: string;
  uploadedAt: string;
  size: number;
  status: 'processed' | 'processing' | 'failed';
  type: string;
}

export async function getFiles(): Promise<FileData[]> {
    const response = await fetch('/api/files', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }
  // const response = JSON.parse("[]");
  return response.json();
}

export interface SaveSummaryRequest {
  pdfPath: string;
  fileName: string;
}

export async function saveSummary(data: SaveSummaryRequest): Promise<FileData> {
  const response = await fetch('/api/files/save-summary', {
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