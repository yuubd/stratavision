"use client";

import * as React from 'react';
import { LoginModalProvider } from './login-modal-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LoginModalProvider>
      {children}
    </LoginModalProvider>
  );
} 