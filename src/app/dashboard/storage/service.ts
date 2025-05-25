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
 * Mock getFiles for demo: returns 15 example FileData entries.
 */
export async function getFiles(): Promise<FileData[]> {
  const streetNames = [
    'King St', 'Queen St', 'Main St', 'Elm St', 'Maple Ave',
    'Oak St', 'Pine Rd', 'Cedar Blvd', 'Park Ln', 'Lakeview Dr',
    'Sunset Blvd', 'Hillcrest Rd', 'Riverside Dr', 'West End Ave', 'Broadway'
  ];
  const cityNames = ['Vancouver', 'Toronto', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City'];
  const buildingNames = ['Alpha Tower', 'Beta Building', 'Gamma Complex', 'Delta House', 'Epsilon Plaza'];
  return Array.from({ length: 15 }, (_v, i) => {
    const unit = (i % 20) + 1;
    const streetNumber = 100 + i * 5;
    const streetName = streetNames[i % streetNames.length];
    return {
      id: `file-${i + 1}`,
      title: `Example_File_${i + 1}.pdf`, // placeholder
      strataNumber: `EPS${(1000 + i).toString().padStart(4, '0')}`,
      developer: i % 2 === 0 ? 'DevCorp' : 'BuildInc',
      city: cityNames[i % cityNames.length],
      building: buildingNames[i % buildingNames.length],
      unitNumber: `${unit}`,
      streetNumber: `${streetNumber} ${streetName}`,
      createdAt: new Date(2025, 4, 2, 8 + (i % 12), 0).toISOString(),
    };
  });
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