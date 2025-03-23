export interface FileData {
  id: string;
  name: string;
  uploadedAt: string;
  size: number;
  status: 'processed' | 'processing' | 'failed';
  type: string;
}

export async function getFiles(): Promise<FileData[]> {
//   const response = await fetch('/api/files', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch files');
//   }
  const response = JSON.parse("[]");
  return response.json();
}