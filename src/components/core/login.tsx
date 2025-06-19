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
import { SettingsDialog } from "./settings-dialog";

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

  const handleSettingsClick = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);

  const renderProfileButton = () => (
    <Box
      component="button"
      onClick={handleSettingsClick}
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
  );

  const renderSignInOutButton = () => (
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
  );
  
  return (
    <Box 
      sx={{ 
        p: 2, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'var(--NavItem-children-border)'
      }}
    >
      {renderProfileButton()}
      {renderSignInOutButton()}
      <SettingsDialog open={settingsOpen} onClose={handleSettingsClose} user={user} />
    </Box>
  );
} 