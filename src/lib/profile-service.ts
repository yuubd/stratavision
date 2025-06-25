export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  brokerage: string;
  license: string;
  emailVerified: boolean;
  updatedAt: string;
}

export async function fetchUserProfile(): Promise<UserProfile> {
  const response = await fetch('/api/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
}

export async function updateUserProfile(data: {
  name?: string;
  email?: string;
  brokerage?: string;
  license?: string;
}): Promise<void> {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => response.text());
    throw new Error(`@Failed to update user. Details: ${JSON.stringify(errorDetails)}`);
  }

  return response.json();
} 