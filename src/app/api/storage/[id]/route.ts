import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/lib/auth0/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    const auth0Client = createClient();
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    
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
        title: `${fileRecord.unitNumber}-${fileRecord.streetNumber}`,
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
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    const auth0Client = createClient();
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;

    // Check if the file exists and belongs to the user
    const existingFile = await prisma.summary.findFirst({
      where: {
        id: id,
        userId: session.user.sub
      }
    });

    if (!existingFile) {
      return NextResponse.json(
        { error: 'File not found or access denied' },
        { status: 404 }
      );
    }

    // Delete the file
    await prisma.summary.delete({
      where: {
        id: id
      }
    });

    console.log(`File ${id} deleted by user ${session.user.sub}`);

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