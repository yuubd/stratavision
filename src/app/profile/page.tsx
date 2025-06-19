"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Camera as CameraIcon } from "@phosphor-icons/react/dist/ssr/Camera";
import { useUser } from "@auth0/nextjs-auth0";

export default function ProfilePage() {
  const { user } = useUser();
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [brokerage, setBrokerage] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  // Handle avatar upload and preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Stub save handler
  const handleSave = async () => {
    setSaving(true);
    // TODO: Save brokerage and license to backend
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 6, p: 3, bgcolor: "background.paper", borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Account
      </Typography>
      <Stack spacing={3} alignItems="center">
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={avatar || user?.picture || undefined}
            sx={{ width: 80, height: 80, fontSize: 36, bgcolor: "#1565c0" }}
          >
            {(!avatar && !user?.picture && user?.name) ? user.name[0].toUpperCase() : null}
          </Avatar>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "background.paper", boxShadow: 1 }}
          >
            <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
            <CameraIcon size={20} />
          </IconButton>
        </Box>
        <TextField
          label="Name"
          value={user?.name || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Email"
          value={user?.email || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Real Estate Brokerage Name"
          value={brokerage}
          onChange={e => setBrokerage(e.target.value)}
          fullWidth
        />
        <TextField
          label="Realtor License Number"
          value={license}
          onChange={e => setLicense(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{ mt: 2, width: "100%" }}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </Stack>
    </Box>
  );
} 