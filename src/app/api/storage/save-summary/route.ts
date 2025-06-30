import { NextResponse } from 'next/server';
import type { SaveSummaryRequest } from '@/app/dashboard/ai-summarize/service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data: SaveSummaryRequest = await request.json();

    // Save the summary to the database
    const savedFile = await prisma.summary.create({
      data: {
        userId: data.userId || 'mock-user',
        strataNumber: data.strataNumber,
        summary: data.summary,
        pdfPath: data.pdfPath,
        developer: data.developer ?? null,
        city: data.city ?? null,
        building: data.building ?? null,
        unitNumber: data.unitNumber ?? null,
        streetNumber: data.streetNumber ?? null,
      },
    });

    return NextResponse.json({
      id: savedFile.id,
      strataNumber: savedFile.strataNumber,
      pdfPath: savedFile.pdfPath,
      developer: savedFile.developer,
      city: savedFile.city,
      building: savedFile.building,
      unitNumber: savedFile.unitNumber,
      streetNumber: savedFile.streetNumber,
      createdAt: savedFile.createdAt,
    });
  } catch (error) {
    console.error('Failed to save summary:', error);
    return NextResponse.json(
      { error: 'Failed to save summary' },
      { status: 500 }
    );
  }
} 