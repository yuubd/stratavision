import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import { mockDocumentSummary } from '@/app/mock-data';
import { SummaryDataResponse } from '@/types/api';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,
    maxTotalFileSize: 300 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      res.status(500).json({ error: 'Failed to parse form data' });
      return;
    }

    // Log uploaded file info for demonstration
    if (files && Object.keys(files).length > 0) {
      Object.entries(files).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(file => {
            const f = file as FormidableFile;
            console.log(`Received file: ${f.originalFilename} (${f.mimetype}, ${f.size} bytes)`);
          });
        } else if (value) {
          const f = value as FormidableFile;
          console.log(`Received file: ${f.originalFilename} (${f.mimetype}, ${f.size} bytes)`);
        }
      });
    }

    // createmock SummaryDataResponse
    const mockSummaryData: SummaryDataResponse = {
      ...mockDocumentSummary,
      pdfUrl: "/assets/EPS5144_W1_Bylaws.pdf"
    };
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Always return the mock summary data
    res.status(200).json(mockSummaryData);
  });
} 