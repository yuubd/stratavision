import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { X as CloseIcon } from '@phosphor-icons/react/dist/ssr/X';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight';

interface LoginModalProps {
  onClose: () => void;
  onSignUp: () => void;
}

export function LoginModal({ onClose, onSignUp }: LoginModalProps): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement login logic
    console.log('Login submitted:', { email, password });
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'var(--mui-palette-background-backdrop)',
          backdropFilter: 'blur(8px)',
          zIndex: 1200,
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 480,
          bgcolor: 'var(--mui-palette-background-paper)',
          borderRadius: 3,
          boxShadow: 'var(--mui-shadows-24)',
          p: 4,
          zIndex: 1300,
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'var(--mui-palette-text-secondary)',
            '&:hover': {
              color: 'var(--mui-palette-text-primary)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        <Typography variant="h4" sx={{ mb: 1, color: 'var(--mui-palette-text-primary)' }}>
          Sign In
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'var(--mui-palette-text-secondary)' }}>
          Summarize your strata documents
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'var(--mui-palette-background-level1)',
                color: 'var(--mui-palette-text-primary)',
                '& fieldset': {
                  borderColor: 'var(--mui-palette-divider)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--mui-palette-primary-main)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'var(--mui-palette-text-secondary)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--mui-palette-primary-main)',
              },
            }}
          />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'var(--mui-palette-background-level1)',
                  color: 'var(--mui-palette-text-primary)',
                  '& fieldset': {
                    borderColor: 'var(--mui-palette-divider)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--mui-palette-primary-main)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--mui-palette-text-secondary)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'var(--mui-palette-primary-main)',
                },
              }}
            />
            <Box sx={{ alignSelf: 'flex-end' }}>
              <Button
                variant="text"
                sx={{ 
                  color: 'var(--mui-palette-text-primary)',
                  '&:hover': {
                    color: 'var(--mui-palette-primary-main)',
                  },
                }}
              >
                Forgot Password?
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={onSignUp}
              sx={{ 
                borderRadius: 2,
                borderColor: 'var(--mui-palette-divider)',
                color: 'var(--mui-palette-text-primary)',
                '&:hover': {
                  borderColor: 'var(--mui-palette-primary-main)',
                  backgroundColor: 'var(--mui-palette-action-hover)',
                },
              }}
            >
              Sign up
            </Button>
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowRight weight="bold" />}
              sx={{ 
                borderRadius: 2,
                bgcolor: 'var(--mui-palette-primary-main)',
                color: 'var(--mui-palette-primary-contrastText)',
                '&:hover': {
                  bgcolor: 'var(--mui-palette-primary-dark)',
                },
              }}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
} 