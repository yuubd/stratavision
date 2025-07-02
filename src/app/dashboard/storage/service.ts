export interface FileData {
  id: string;
  title: string;
  strataNumber: string;
  developer: string;   // e.g. developer name or firm
  city: string;        // e.g. city name
  building: string;    // e.g. building name
  unitNumber: string;  // e.g. apartment/unit number
  streetNumber: string;// e.g. street number and name
  createdAt: string;
}

/**
 * Fetch files from the storage API for the authenticated user.
 */
export async function getFiles(): Promise<FileData[]> {
  const response = await fetch('/api/storage', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Please log in to view your files');
    }
    throw new Error('Failed to fetch files');
  }

  return response.json();
}

export async function deleteFile(id: string): Promise<void> {
  const response = await fetch(`/api/storage/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Please log in to delete files');
    }
    if (response.status === 404) {
      throw new Error('File not found');
    }
    throw new Error('Failed to delete file');
  }
}