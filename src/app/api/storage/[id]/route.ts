import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/lib/auth0/client';
import { mockDocumentSummary } from '@/app/mock-data';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get authenticated user
    const auth0Client = createClient();
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // // Query database for complete file information
    // const fileRecord = await prisma.summary.findFirst({
    //   where: {
    //     id: id,
    //     userId: session.user.sub
    //   }
    // });

    // if (!fileRecord) {
    //   return NextResponse.json(
    //     { error: 'File not found or access denied' },
    //     { status: 404 }
    //   );
    // }

    // console.log(`Retrieved complete file data for ${id} by user ${session.user.sub}`);

    // Return complete file information
    // return NextResponse.json({
    //   file: {
    //     id: fileRecord.id,
    //     title: `${fileRecord.unitNumber}-${fileRecord.streetNumber}`,
    //     strataNumber: fileRecord.strataNumber,
    //     developer: fileRecord.developer ?? "",
    //     city: fileRecord.city ?? "",
    //     building: fileRecord.building ?? "",
    //     unitNumber: fileRecord.unitNumber ?? "",
    //     streetNumber: fileRecord.streetNumber ?? "",
    //     pdfPath: fileRecord.pdfPath,
    //     createdAt: fileRecord.createdAt.toISOString(),
    //   },
    //   summary: fileRecord.summary, // JSONB automatically returns as object
    //   pdfPath: fileRecord.pdfPath
    // });
  

    // TEMPORARY: Return mock data while PostgreSQL is being set up
    console.log(`Returning mock file data for ${id} by user ${session.user.sub}`);

    // Mock file data for testing
    const mockFiles = {
      'mock-1': {
        file: {
          id: 'mock-1',
          title: '101-123 Main St',
          strataNumber: 'VIS123',
          developer: 'ABC Development',
          city: 'Vancouver',
          building: 'The Summit',
          unitNumber: '101',
          streetNumber: '123 Main St',
          pdfPath: '/assets/EPS5144_W1_Bylaws.pdf',
          createdAt: new Date('2024-01-15').toISOString(),
        },
        summary: mockDocumentSummary,
        pdfPath: '/assets/EPS5144_W1_Bylaws.pdf'
      },
      'mock-2': {
        file: {
          id: 'mock-2',
          title: '205-456 Oak Ave', 
          strataNumber: 'VIS456',
          developer: 'XYZ Properties',
          city: 'Burnaby',
          building: 'Oak Tower',
          unitNumber: '205',
          streetNumber: '456 Oak Ave',
          pdfPath: '/assets/EPS5144_W1_Bylaws.pdf',
          createdAt: new Date('2024-01-10').toISOString(),
        },
        summary: mockDocumentSummary,
        pdfPath: '/assets/EPS5144_W1_Bylaws.pdf'
      }
    };

    const fileData = mockFiles[id as keyof typeof mockFiles];
    
    if (!fileData) {
      return NextResponse.json(
        { error: 'File not found or access denied' },
        { status: 404 }
      );
    }

    // Return complete file information
    return NextResponse.json(fileData);
  } catch (error) {
    console.error('Failed to fetch file data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch file data' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get authenticated user
    const auth0Client = createClient();
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // TEMPORARY: Mock delete while PostgreSQL is being set up
    console.log(`Mock delete of file ${id} by user ${session.user.sub}`);

    // Check if it's one of our mock files
    if (!['mock-1', 'mock-2'].includes(id)) {
      return NextResponse.json(
        { error: 'File not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
} 