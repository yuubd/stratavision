import { NextResponse } from 'next/server';
import type { FileData } from '@/app/dashboard/files/service';

export async function GET() {
  try {
    // Here you would typically:
    // 1. Query your database for all files
    // 2. Return the files data
    
    // For now, we'll return a mock response
    const files: FileData[] = [
      // {
      //   id: '1',
      //   name: 'EPS5144_W1_By.pdf',
      //   uploadedAt: new Date().toISOString(),
      //   size: 1024 * 1024,
      //   status: 'processed',
      //   type: 'application/pdf'
      // }
    ];

    return NextResponse.json(files);
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
} 