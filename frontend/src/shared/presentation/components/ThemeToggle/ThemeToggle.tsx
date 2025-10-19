import React from 'react';
import { IconMoon, IconSun } from '../../icons';
import { Button } from '../Button';
import { useTheme } from '../../../../contexts/ThemeContext';

/**
 * Theme toggle component for switching between light and dark modes
 * @returns {JSX.Element} Theme toggle button
 */
export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Button
      size="sm"
      variant="primary"
      onClick={toggleTheme}
      className="relative w-9 h-9 p-0"
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
