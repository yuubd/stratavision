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
    
    // Query database for complete file information
    const fileRecord = await prisma.summary.findFirst({
      where: {
        id: id,
        userId: session.user.sub
      }
    });

    if (!fileRecord) {
      return NextResponse.json(
        { error: 'File not found or access denied' },
        { status: 404 }
      );
    }

    console.log(`Retrieved complete file data for ${id} by user ${session.user.sub}`);

    // Return complete file information
    return NextResponse.json({
      file: {
        id: fileRecord.id,
        title: `${fileRecord.unitNumber || ''}-${fileRecord.streetNumber || ''}`.replace(/^-|-$/g, '') || `Strata ${fileRecord.strataNumber}`,
        strataNumber: fileRecord.strataNumber,
        developer: fileRecord.developer ?? "",
        city: fileRecord.city ?? "",
        building: fileRecord.building ?? "",
        unitNumber: fileRecord.unitNumber ?? "",
        streetNumber: fileRecord.streetNumber ?? "",
        pdfPath: fileRecord.pdfPath,
        createdAt: fileRecord.createdAt.toISOString(),
      },
      summary: fileRecord.summary, // JSONB automatically returns as object
      pdfPath: fileRecord.pdfPath
    });
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

    // Delete the file from database
    const deletedFile = await prisma.summary.deleteMany({
      where: {
        id: id,
        userId: session.user.sub // Ensure user can only delete their own files
      }
    });

    if (deletedFile.count === 0) {
      return NextResponse.json(
        { error: 'File not found or access denied' },
        { status: 404 }
      );
    }

    console.log(`Successfully deleted file ${id} for user ${session.user.sub}`);

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