import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

const DOCUMENT_TYPES = [
  'finances',
  'insurance',
  'formB',
  'engineering',
  'depreciation',
  'litigations',
  'insurance.certificate',
  'rules',
  'bylaw',
  'strata.plan',
  'unit.ent',
  'minutes',
  'agm',
  'sgm',
  'warranty',
  'misc',
];

function classifyFile(filename: string, buffer: Buffer): string {
  // TODO: Replace with real ML/AI logic
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

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: true, keepExtensions: true, maxFileSize: 20 * 1024 * 1024 });

  const files = await new Promise<any[]>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) return reject(err);
      const fileArr = Array.isArray(files.file) ? files.file : [files.file];
      resolve(fileArr.filter(Boolean));
    });
  });

  const classified = files.map(file => {
    const buffer = file._writeStream && file._writeStream.buffer ? file._writeStream.buffer : Buffer.alloc(0);
    const type = classifyFile(file.originalFilename || file.newFilename, buffer);
    return {
      filename: file.originalFilename || file.newFilename,
      type,
    };
  });

  // Find missing types (excluding 'misc')
  const presentTypes = new Set(classified.map(f => f.type));
  const requiredTypes = DOCUMENT_TYPES.filter(t => t !== 'misc');
  const missing_types = requiredTypes.filter(t => !presentTypes.has(t));

  return NextResponse.json({ classified, missing_types });
} 