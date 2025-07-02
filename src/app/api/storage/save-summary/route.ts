import { NextRequest, NextResponse } from 'next/server';
import type { SaveSummaryRequest } from '@/app/dashboard/ai-summarize/service';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/lib/auth0/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const auth0Client = createClient();
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: SaveSummaryRequest = await request.json();

    // Save the summary to the database with authenticated user
    // Parse JSON string for JSONB storage in PostgreSQL
    const summaryJson = JSON.parse(data.summary);
    
    const savedFile = await prisma.summary.create({
      data: {
        userId: session.user.sub,
        strataNumber: data.strataNumber,
        summary: summaryJson, // Store as JSONB object in PostgreSQL
        pdfPath: data.pdfPath,
        developer: data.developer ?? null,
        city: data.city ?? null,
        building: data.building ?? null,
        unitNumber: data.unitNumber ?? null,
        streetNumber: data.streetNumber ?? null,
      },
    });

    console.log(`Summary saved successfully for user ${session.user.sub}: ${savedFile.id}`);

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