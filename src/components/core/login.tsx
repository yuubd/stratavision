"use client";

import * as React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { paths } from "@/paths";
import { getAppUrl } from "@/lib/get-app-url";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Camera as CameraIcon } from "@phosphor-icons/react/dist/ssr/Camera";

function SettingsDialog({ open, onClose, user }: { open: boolean; onClose: () => void; user: any }) {
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [brokerage, setBrokerage] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [saving, setSaving] = React.useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Stack spacing={3} alignItems="center" sx={{ mt: 1 }}>
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
      </DialogContent>
    </Dialog>
  );
}

export function Login(): React.JSX.Element | null {
  const { user, isLoading } = useUser();
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  if (isLoading) return null;
  const appUrl = getAppUrl().toString();
  const returnToUrl = new URL(paths.dashboard.aiSummarize, appUrl).toString();
  const href = user
    ? `${paths.auth.auth0.signOut}?returnTo=${encodeURIComponent(returnToUrl)}`
    : paths.auth.auth0.signIn;
  const label = user ? "Sign out" : "Sign in";
  
  return (
    <Box 
      sx={{ 
        p: 2, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'var(--NavItem-children-border)'
      }}
    >
      {/* Profile button */}
      <Box
        component="button"
        onClick={() => setSettingsOpen(true)}
        sx={{
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
          mb: 1,
          width: '100%',
          background: 'none',
          border: 'none',
          p: 0,
          '&:hover': {
            backgroundColor: 'var(--NavItem-hover-background)',
          }
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            color: 'var(--NavItem-color)',
            px: 2,
            py: 1.5,
            '&:hover': {
              color: 'var(--NavItem-hover-color)'
            }
          }}
        >
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#1565c0', fontWeight: 600, fontSize: 16 }}>
            {user && user.name ? user.name[0].toUpperCase() : <User color="var(--NavItem-icon-color)" weight="regular" size={20} />}
          </Avatar>
          <Typography
            color="inherit"
            variant="subtitle2"
            sx={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: "28px", ml: "5px" }}
          >
            Settings
          </Typography>
        </Stack>
      </Box>
      <Box
        component="a"
        href={href}
        sx={{ 
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'block',
          '&:hover': {
            backgroundColor: 'var(--NavItem-hover-background)',
          }
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            color: 'var(--NavItem-color)',
            px: '21px',
            py: 1.5,
            '&:hover': {
              color: 'var(--NavItem-hover-color)'
            }
          }}
        >
          <User 
            color="var(--NavItem-icon-color)"
            weight="regular" 
          />
          <Typography
            color="inherit"
            variant="subtitle2"
            sx={{ 
              px: '13px',
              fontSize: "0.875rem", 
              fontWeight: 500, 
              lineHeight: "28px"
            }}
          >
            {label}
          </Typography>
        </Stack>
      </Box>
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} user={user} />
    </Box>
  );
} 