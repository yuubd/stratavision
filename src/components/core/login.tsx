import * as React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { paths } from "@/paths";

export function Login(): React.JSX.Element {
  return (
    <Box 
      sx={{ 
        p: 2, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'var(--NavItem-children-border)'
      }}
    >
      <RouterLink href={paths.auth.login} style={{ textDecoration: 'none' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            color: 'var(--NavItem-color)',
            cursor: 'pointer',
            px: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: 'var(--NavItem-hover-background)',
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
            Log in
          </Typography>
        </Stack>
      </RouterLink>
    </Box>
  );
} 