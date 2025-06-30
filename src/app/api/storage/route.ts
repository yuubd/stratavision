import { NextResponse } from 'next/server';
import type { FileData } from '@/app/dashboard/storage/service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all summaries from the database
    const summaries = await prisma.summary.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to FileData format
    const files: FileData[] = summaries.map(summary => ({
      id: summary.id,
      title: `${summary.strataNumber} Summary`,
      strataNumber: summary.strataNumber,
      pdfPath: summary.pdfPath,
      createdAt: summary.createdAt.toISOString(),
      developer: summary.developer ?? "",
      city: summary.city ?? "",
      building: summary.building ?? "",
      unitNumber: summary.unitNumber ?? "",
      streetNumber: summary.streetNumber ?? "",
    }));

    return NextResponse.json(files);
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
} 