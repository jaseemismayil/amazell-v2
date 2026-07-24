'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextValue {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <PreloaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </PreloaderContext.Provider>
  );
}

/** Read whether the initial page-load sequence has finished. */
export function usePreloader() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return ctx;
}
