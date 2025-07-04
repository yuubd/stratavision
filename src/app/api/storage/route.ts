import { NextRequest, NextResponse } from 'next/server';
import type { FileData } from '@/app/dashboard/storage/service';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/lib/auth0/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const auth0Client = createClient();
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //  // Fetch summaries for the authenticated user only
    //  const summaries = await prisma.summary.findMany({
    //   where: {
    //     userId: session.user.sub
    //   },
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
    // });

    // console.log(`Fetched ${summaries.length} summaries for user ${session.user.sub}`);

    // // Transform to FileData format
    // const files: FileData[] = summaries.map(summary => ({
    //   id: summary.id,
    //   title: `${summary.unitNumber}-${summary.streetNumber}`, // TODO: might remove
    //   strataNumber: summary.strataNumber,
    //   pdfPath: summary.pdfPath,
    //   createdAt: summary.createdAt.toISOString(),
    //   developer: summary.developer ?? "",
    //   city: summary.city ?? "",
    //   building: summary.building ?? "",
    //   unitNumber: summary.unitNumber ?? "",
    //   streetNumber: summary.streetNumber ?? "",
    // }));

    // TEMPORARY: Return mock data while PostgreSQL is being set up
    console.log(`Returning mock storage data for user ${session.user.sub}`);

    const files: FileData[] = [
      {
        id: 'mock-1',
        title: '101-123 Main St',
        strataNumber: 'VIS123',
        createdAt: new Date('2024-01-15').toISOString(),
        developer: 'ABC Development',
        city: 'Vancouver',
        building: 'The Summit',
        unitNumber: '101',
        streetNumber: '123 Main St',
      },
      {
        id: 'mock-2', 
        title: '205-456 Oak Ave',
        strataNumber: 'VIS456',
        createdAt: new Date('2024-01-10').toISOString(),
        developer: 'XYZ Properties',
        city: 'Burnaby',
        building: 'Oak Tower',
        unitNumber: '205',
        streetNumber: '456 Oak Ave',
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