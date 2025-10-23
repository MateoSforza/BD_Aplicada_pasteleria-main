import React, { useMemo } from "react";
import "./shiny-text.css";
import { useTheme } from '@/config/ThemeContext';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gradient = useMemo(() => {
    return isDark
      ? 'linear-gradient(90deg, #ffd3bf, #f5e6d9, #f7c9a9, #ffd3bf)'
      : 'linear-gradient(90deg, #ec6b2d, #ffd3bf, #f5b279, #ec6b2d)';
  }, [isDark]);

  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundImage: gradient,
    backgroundSize: '200% auto',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
  };

  return (
    <div className={`shiny-text ${className}`} style={baseStyle} aria-hidden={disabled ? true : undefined}>
      {text}
    </div>
  );
};
