"use client";

import * as React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { fetchUserProfile, updateUserProfile } from "@/lib/profile-service";
import { CircularProgress, TextField, Paper } from "@mui/material";

export default function TestProfilePage(): React.JSX.Element {
  const { user, isLoading: isUserLoading } = useUser();
  const [profile, setProfile] = React.useState<any>(null);

  // Form state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [brokerage, setBrokerage] = React.useState("");
  const [license, setLicense] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleFetchProfile = React.useCallback(async () => {
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
  }, []);

  React.useEffect(() => {
    if (user) {
      handleFetchProfile();
    }
  }, [user, handleFetchProfile]);
  
  React.useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setBrokerage(profile.brokerage || "");
      setLicense(profile.license || "");
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await updateUserProfile({ name, email, brokerage, license });
      setSuccess("Profile updated successfully! Refreshing data...");
      // Refresh profile data
      await handleFetchProfile();
    } catch (err) {
      setError("Failed to update profile");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isUserLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
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
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
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

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>
        {profile ? (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Brokerage"
              value={brokerage}
              onChange={(e) => setBrokerage(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="License"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              margin="normal"
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleUpdateProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleFetchProfile}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh Data"}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}
      </Paper>

      {profile && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Profile Data (Raw):
          </Typography>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(profile, null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  );
} 