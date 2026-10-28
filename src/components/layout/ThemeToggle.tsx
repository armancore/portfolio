import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, currentTheme } from '../../lib/theme';
import { NAV_COPY } from '../../constants';

const ThemeToggle = () => (
  <button
    type="button"
    className="theme-toggle"
    onClick={() => applyTheme(currentTheme() === 'light' ? 'dark' : 'light')}
    aria-label={NAV_COPY.toggleTheme}
    title={NAV_COPY.toggleTheme}
  >
    <Sun size={18} aria-hidden="true" className="theme-toggle__dark" />
    <Moon size={18} aria-hidden="true" className="theme-toggle__light" />
  </button>
);

export default ThemeToggle;
