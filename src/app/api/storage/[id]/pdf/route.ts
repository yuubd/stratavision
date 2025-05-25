import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // For now, always redirect to the hardcoded PDF file in the public directory
    // In a real application, you would:
    // 1. Query your database for the specific file's path
    // 2. Return or redirect to the actual PDF file

    // Redirect to the public PDF file
    return NextResponse.redirect(new URL('/assets/EPS5144_W1_Bylaws.pdf', request.url));
  } catch (error) {
    console.error('Failed to fetch PDF:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDF' },
      { status: 500 }
    );
  }
} 