import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/auth0/client";

// Function to get Management API access token
async function getManagementToken() {
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get management token');
  }

  const data = await response.json();
  return data.access_token;
}

// Function to update user profile via Management API
async function updateUserProfile(userId: string, updates: any) {
  const token = await getManagementToken();
  
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_metadata: updates,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update user: ${error}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    const auth0Client = createClient();
    
    // Try to get session without passing the request object
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user metadata from Management API
    let userMetadata: { brokerage?: string; license?: string } = {};
    try {
      const token = await getManagementToken();
      const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${session.user.sub}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        userMetadata = userData.user_metadata || {};
      }
    } catch (error) {
      console.error("Error fetching user metadata:", error);
    }

    const profile = {
      id: session.user.sub,
      name: session.user.name,
      email: session.user.email,
      picture: session.user.picture,
      brokerage: userMetadata.brokerage || "",
      license: userMetadata.license || "",
      emailVerified: session.user.email_verified || false,
      updatedAt: new Date().toISOString()
    };
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth0Client = createClient();
    
    // Try to get session without passing the request object
    const session = await auth0Client.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { brokerage, license } = body;

    // Validate required fields
    if (!brokerage || !license) {
      return NextResponse.json(
        { error: "Brokerage and license are required" },
        { status: 400 }
      );
    }

    // Update user profile via Management API
    await updateUserProfile(session.user.sub, {
      brokerage,
      license,
    });

    console.log("Profile updated successfully:", { brokerage, license, userId: session.user.sub });

    return NextResponse.json({ 
      success: true,
      message: "Profile updated successfully"
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 