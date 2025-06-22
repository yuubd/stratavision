"use client";

import * as React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { fetchUserProfile, updateUserProfile } from "@/lib/profile-service";

export default function TestProfilePage(): React.JSX.Element {
  const { user, isLoading } = useUser();
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleFetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const profileData = await fetchUserProfile();
      setProfile(profileData);
      setSuccess("Profile fetched successfully!");
    } catch (err) {
      setError("Failed to fetch profile");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await updateUserProfile({
        brokerage: "Test Brokerage",
        license: "TEST123"
      });
      setSuccess("Profile updated successfully!");
      // Refresh profile data
      await handleFetchProfile();
    } catch (err) {
      setError("Failed to update profile");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Test Profile API
        </Typography>
        <Alert severity="warning">
          Please log in to test the profile API functionality.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Test Profile API
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Logged in as: {user.name} ({user.email})
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleFetchProfile}
          disabled={loading}
          sx={{ mr: 2 }}
        >
          {loading ? "Loading..." : "Fetch Profile"}
        </Button>
        
        <Button
          variant="outlined"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </Box>

      {profile && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile Data:
          </Typography>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(profile, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
} 