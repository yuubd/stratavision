"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Camera as CameraIcon } from "@phosphor-icons/react/dist/ssr/Camera";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

import { OptionsPrimaryColor } from "@/components/core/settings/options-primary-color";
import { OptionsColorScheme } from "@/components/core/settings/options-color-scheme";
import { OptionsNavColor } from "@/components/core/settings/options-nav-color";
import { useSettings } from "@/components/core/settings/settings-context";
import { Mode } from "@/styles/theme/types";
import { Settings } from "@/types/settings";
import { setSettings as setPersistedSettings } from "@/lib/settings";
import { fetchUserProfile, updateUserProfile, type UserProfile } from "@/lib/profile-service";

import { useColorScheme } from "@mui/material/styles";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

export function SettingsDialog({ open, onClose, user }: SettingsDialogProps) {
  const [tab, setTab] = React.useState(0);
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [brokerage, setBrokerage] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const { mode, setMode } = useColorScheme();
  const { settings, setSettings } = useSettings();
  const theme = useTheme();
  const router = useRouter();

  // Fetch profile data when dialog opens
  React.useEffect(() => {
    if (open && !profile) {
      fetchProfileData();
    }
  }, [open, profile]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await fetchUserProfile();
      setProfile(profileData);
      setBrokerage(profileData.brokerage);
      setLicense(profileData.license);
    } catch (err) {
      setError("Failed to load profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: Partial<Settings> & { theme?: Mode }): Promise<void> => {
    const { theme, ...other } = values;

    if (theme) {
      setMode(theme);
    }

    const updatedSettings = { ...settings, ...other } satisfies Settings;
    await setPersistedSettings(updatedSettings);
    router.refresh();
  };

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
    try {
      setSaving(true);
      setError(null);
      await updateUserProfile({ brokerage, license });
      // Refresh profile data after update
      await fetchProfileData();
    } catch (err) {
      setError("Failed to save profile");
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAppSettingChange = React.useCallback(
    (field: keyof Settings | "theme", value: unknown) => {
      handleUpdate?.({ [field]: value });
    },
    [handleUpdate]
  );

  const renderProfileTab = () => (
    <Stack spacing={3} alignItems="center" sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={avatar || profile?.picture || user?.picture || undefined}
          sx={{ width: 80, height: 80, fontSize: 36, bgcolor: "#1565c0" }}
        >
          {(!avatar && !profile?.picture && !user?.picture && (profile?.name || user?.name)) 
            ? (profile?.name || user?.name)[0].toUpperCase() 
            : null}
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
        value={profile?.name || user?.name || ""}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextField
        label="Email"
        value={profile?.email || user?.email || ""}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextField
        label="Real Estate Brokerage Name"
        value={brokerage}
        onChange={e => setBrokerage(e.target.value)}
        fullWidth
        disabled={loading}
      />
      <TextField
        label="Realtor License Number"
        value={license}
        onChange={e => setLicense(e.target.value)}
        fullWidth
        disabled={loading}
      />
      <Button
        variant="contained"
        onClick={handleSave}
        disabled={saving || loading}
        sx={{ mt: 2, width: "100%" }}
      >
        {saving ? "Saving..." : "Save"}
      </Button>
    </Stack>
  );

  const renderAppSettingsTab = () => (
    <Stack spacing={4} sx={{ mt: 2 }}>
      <OptionsPrimaryColor
        value={settings.primaryColor}
        onChange={v => handleAppSettingChange("primaryColor", v)}
      />
      <OptionsColorScheme
        value={mode}
        onChange={v => handleAppSettingChange("theme", v)}
      />
      <OptionsNavColor
        value={settings.dashboardNavColor}
        onChange={v => handleAppSettingChange("dashboardNavColor", v)}
      />
    </Stack>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)} variant="fullWidth">
          <Tab label="Profile" />
          <Tab label="App Settings" />
        </Tabs>
      </DialogTitle>
      <DialogContent sx={{ minHeight: 420 }}>
        {tab === 0 && renderProfileTab()}
        {tab === 1 && renderAppSettingsTab()}
      </DialogContent>
    </Dialog>
  );
} 