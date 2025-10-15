import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/config/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg border-2 border-primary-300 dark:border-primary-600 bg-white dark:bg-primary-800 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5 text-primary-700 dark:text-primary-300" />
      ) : (
        <Moon className="w-5 h-5 text-primary-700 dark:text-primary-300" />
      )}
    </motion.button>
  );
};