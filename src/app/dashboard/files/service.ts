export interface FileData {
  id: string;
  title: string;
  strataNumber: string;
  createdAt: string;
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
  summary: string;
  pdfPath: string;
  fileName: string;
  strataNumber: string;
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

export async function deleteFile(id: string): Promise<void> {
  const response = await fetch(`/api/files/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
}