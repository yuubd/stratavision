import { NextResponse } from 'next/server';
import { mockDocumentSummary } from '@/app/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('touched here')
    // const id = params.id;
    
    // Here you would typically:
    // 1. Query your database for the specific file summary
    // 2. Return the summary data
    
    // Return the entire mock summary data for any ID
    // This will make it identical to what's shown in the AI summarize tab

    return NextResponse.json({ summary: JSON.stringify(mockDocumentSummary) });
  } catch (error) {
    console.error('Failed to fetch summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      { status: 500 }
    );
  }
} 