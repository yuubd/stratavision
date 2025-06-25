import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const DOCUMENT_TYPES = [
  'finances', 'insurance', 'formB', 'engineering', 'depreciation', 'litigations',
  'insurance.certificate', 'rules', 'bylaw', 'strata.plan', 'unit.ent', 'minutes',
  'agm', 'sgm', 'warranty', 'misc',
];

function classifyFile(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('finance')) return 'finances';
  if (lower.includes('insurance') && lower.includes('certificate')) return 'insurance.certificate';
  if (lower.includes('insurance')) return 'insurance';
  if (lower.includes('formb') || lower.includes('form_b')) return 'formB';
  if (lower.includes('engineer')) return 'engineering';
  if (lower.includes('depreciation')) return 'depreciation';
  if (lower.includes('litigation')) return 'litigations';
  if (lower.includes('rules')) return 'rules';
  if (lower.includes('bylaw')) return 'bylaw';
  if (lower.includes('strata') && lower.includes('plan')) return 'strata.plan';
  if (lower.includes('unit') && lower.includes('ent')) return 'unit.ent';
  if (lower.includes('minutes')) return 'minutes';
  if (lower.includes('agm')) return 'agm';
  if (lower.includes('sgm')) return 'sgm';
  if (lower.includes('warranty')) return 'warranty';
  return 'misc';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,        // 100 MB per file
    maxTotalFileSize: 300 * 1024 * 1024,   // 300 MB total
  }); 

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      res.status(500).json({ error: 'Failed to parse form data' });
      return;
    }
    let fileArr: FormidableFile[] = [];
    if (Array.isArray(files.file)) {
      fileArr = files.file;
    } else if (files.file) {
      fileArr = [files.file];
    }
    const filtered = fileArr.filter(Boolean);
    if (filtered.length === 0) {
      res.status(400).json({ error: 'No files uploaded' });
      return;
    }
    const classified = filtered.map(file => {
      const filename = file.originalFilename || file.newFilename || 'unknown';
      const type = classifyFile(filename);
      return { filename, type };
    });
    const presentTypes = new Set(classified.map(f => f.type));
    const requiredTypes = DOCUMENT_TYPES.filter(t => t !== 'misc');
    const missing_types = requiredTypes.filter(t => !presentTypes.has(t));
    res.status(200).json({ classified, missing_types });
  });
} 