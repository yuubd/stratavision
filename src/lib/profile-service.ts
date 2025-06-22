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

export async function updateUserProfile(data: { brokerage: string; license: string }): Promise<void> {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
} 