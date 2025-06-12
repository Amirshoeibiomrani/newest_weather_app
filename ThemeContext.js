'use client';
import { createContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const getThemeMode = (weatherCondition, isDarkMode) => {
  if (isDarkMode) {
    return 'dark';
  }

  // تنظیم تم بر اساس شرایط آب‌وهوا
  switch (weatherCondition?.toLowerCase()) {
    case 'rain':
    case 'drizzle':
      return 'rainy';
    case 'clouds':
      return 'cloudy';
    case 'clear':
      return 'sunny';
    default:
      return 'default';
  }
};

export const CustomThemeProvider = ({ children, weatherCondition }) => {
  const [darkMode, setDarkMode] = useState(false);

  const mode = getThemeMode(weatherCondition, darkMode);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        ...(mode === 'sunny' && {
          background: { default: '#fffde7' }, // رنگ آفتابی
        }),
        ...(mode === 'cloudy' && {
          background: { default: '#eceff1' }, // رنگ ابری
        }),
        ...(mode === 'rainy' && {
          background: { default: '#cfd8dc' }, // رنگ بارانی
        }),
      },
    });
  }, [mode, darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, darkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
