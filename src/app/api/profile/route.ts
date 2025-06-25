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
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to update user. Status: ${response.status}. Body: ${errorBody}`);
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
    let userFromApi: any = null;
    let userMetadata: { brokerage?: string; license?: string } = {};
    try {
      const token = await getManagementToken();
      const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${session.user.sub}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        userFromApi = await response.json();
        userMetadata = userFromApi.user_metadata || {};
      }
    } catch (error) {
      console.error("Error fetching user metadata:", error);
    }

    const profile = {
      id: session.user.sub,
      name: userFromApi?.name || session.user.name,
      email: userFromApi?.email || session.user.email,
      picture: userFromApi?.picture || session.user.picture,
      brokerage: userMetadata.brokerage || "",
      license: userMetadata.license || "",
      emailVerified: userFromApi?.email_verified ?? session.user.email_verified,
      updatedAt: userFromApi?.updated_at || session.user.updated_at,
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
    const { name, email, brokerage, license } = body;
    const { sub, email: originalEmail } = session.user;

    // A user's `sub` (subject) claim is prefixed with their connection type.
    // e.g., 'google-oauth2|12345' for Google or 'auth0|67890' for a database user.
    const isDatabaseUser = sub.startsWith('auth0|');

    const payloadToUpdate: {
      name?: string;
      email?: string;
      user_metadata?: { brokerage?: string; license?: string };
    } = {};

    if (name) payloadToUpdate.name = name;

    // Only attempt to update email for database connections.
    // Social connections like Google often lock this field.
    if (email && isDatabaseUser) {
      payloadToUpdate.email = email;
    }

    const metadata: { brokerage?: string; license?:string } = {};
    if (brokerage) metadata.brokerage = brokerage;
    if (license) metadata.license = license;
    
    if (Object.keys(metadata).length > 0) {
      payloadToUpdate.user_metadata = metadata;
    }

    if (Object.keys(payloadToUpdate).length === 0) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }

    // Update user profile via Management API
    await updateUserProfile(session.user.sub, payloadToUpdate);

    console.log("Profile update requested:", { payload: payloadToUpdate, userId: session.user.sub });
    
    let message = "Profile updated successfully";
    // Provide feedback if a social user tried to change their email
    if (email && email !== originalEmail && !isDatabaseUser) {
      message = "Profile updated. Email cannot be changed for accounts created via Google.";
    }

    return NextResponse.json({ 
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 