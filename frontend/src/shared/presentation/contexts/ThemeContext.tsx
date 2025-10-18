import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

/**
 * Theme context value interface
 * @property {ThemeMode} mode - Current theme mode
 * @property {Function} toggleTheme - Toggle between light and dark mode
 * @property {Function} setTheme - Set specific theme mode
 */
interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = 'qt-theme-preference';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme provider component props
 * @property {React.ReactNode} children - Child components
 * @property {ThemeMode} defaultMode - Default theme mode
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

/**
 * Get initial theme from localStorage or system preference
 * @returns {ThemeMode} Initial theme mode
 */
const getInitialTheme = (): ThemeMode => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

/**
 * Theme Provider component for managing application theme state
 * @param {React.ReactNode} children - Child components
 * @param {ThemeMode} defaultMode - Default theme mode
 * @returns {JSX.Element} Theme provider component
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode || getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const value: ThemeContextValue = {
    mode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * @returns {ThemeContextValue} Theme context value
 * @throws {Error} If used outside ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};