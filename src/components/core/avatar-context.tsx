"use client";

import * as React from "react";

interface AvatarContextValue {
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
}

const AvatarContext = React.createContext<AvatarContextValue>({
  avatar: null,
  setAvatar: () => {},
});

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [avatar, setAvatar] = React.useState<string | null>(null);

  // Load avatar from localStorage on mount
  React.useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  // Save avatar to localStorage when it changes
  React.useEffect(() => {
    if (avatar) {
      localStorage.setItem('userAvatar', avatar);
    } else {
      localStorage.removeItem('userAvatar');
    }
  }, [avatar]);

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
} 