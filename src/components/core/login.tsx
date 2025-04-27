"use client";

import * as React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { paths } from "@/paths";

export function Login(): React.JSX.Element | null {
  const { user, isLoading } = useUser();
  if (isLoading) return null;
  const href = user
    ? `${paths.auth.auth0.signOut}?returnTo=${encodeURIComponent(paths.dashboard.aiSummarize)}`
    : paths.auth.auth0.signIn;
  const label = user ? "Sign out" : "Log in";
  
  return (
    <Box 
      sx={{ 
        p: 2, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'var(--NavItem-children-border)'
      }}
    >
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
            px: 2,
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
              fontSize: "0.875rem", 
              fontWeight: 500, 
              lineHeight: "28px"
            }}
          >
            {label}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
} 