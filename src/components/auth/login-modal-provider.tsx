"use client";

import * as React from 'react';
import { LoginModal } from './login-modal';
import { SignUpModal } from './signup-modal';

interface LoginModalContextValue {
  openLoginModal: () => void;
}

const LoginModalContext = React.createContext<LoginModalContextValue | undefined>(undefined);

export function useLoginModal() {
  const context = React.useContext(LoginModalContext);
  if (!context) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
}

export function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [view, setView] = React.useState<'login' | 'signup'>('login');

  const openLoginModal = React.useCallback(() => {
    setIsOpen(true);
    setView('login');
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSignUp = React.useCallback(() => {
    setView('signup');
  }, []);

  const handleBackToLogin = React.useCallback(() => {
    setView('login');
  }, []);

  return (
    <LoginModalContext.Provider value={{ openLoginModal }}>
      {children}
      {isOpen && view === 'login' && (
        <LoginModal onClose={handleClose} onSignUp={handleSignUp} />
      )}
      {isOpen && view === 'signup' && (
        <SignUpModal onClose={handleClose} onBackToLogin={handleBackToLogin} />
      )}
    </LoginModalContext.Provider>
  );
} 