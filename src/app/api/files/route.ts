import { NextResponse } from 'next/server';
import type { FileData } from '@/app/dashboard/files/service';

export async function GET() {
  try {
    // Here you would typically:
    // 1. Query your database for all files
    // 2. Return the files data
    
    // For now, we'll return a mock response
    const files: FileData[] = [
      {
        id: '1',
        title: 'EPS5144_W1_By.pdf',
        strataNumber: 'EPS5144',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'EPS4296_W3_By.pdf',
        strataNumber: 'EPS0326',
        createdAt: new Date(Date.now() - 26400000).toISOString()
      },
      {
        id: '3',
        title: 'EPS2296_W3_By.pdf',
        strataNumber: 'EPS3496',
        createdAt: new Date(Date.now() - 16400000).toISOString()
      },
      {
        id: '4',
        title: 'EPS1296_W3_By.pdf',
        strataNumber: 'EPS4096',
        createdAt: new Date(Date.now() - 36400000).toISOString()
      }
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