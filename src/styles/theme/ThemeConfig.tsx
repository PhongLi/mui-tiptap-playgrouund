'use client'

import { CssBaseline, type PaletteMode } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { DARK, DEFAULT_FONT_SIZE, LIGHT } from "@/constants/theme";

import { getActiveTheme } from "./theme";

type ThemeContextType = {
  togglePaletteMode: () => void;
  changeFontSize: (value: number) => void;
  fontSize: number;
}

export const ThemeContext = createContext<ThemeContextType>({
    changeFontSize: () => {},
    togglePaletteMode: () => {},
    fontSize: DEFAULT_FONT_SIZE,
  })

export const useThemeConfig = () => {
  return useContext(ThemeContext)
}

export const ThemeConfig: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(LIGHT)
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE)

  const themeConfig = useMemo(
    () => ({
      togglePaletteMode: () => {
        setMode(prevMode => {
          const newValue = prevMode === LIGHT ? LIGHT : DARK
          localStorage.setItem('themeMode', newValue)
          return newValue
        })
      },
      changeFontSize: (value: number) => {
        setFontSize(value ?? DEFAULT_FONT_SIZE)
      },
      fontSize,
    }),
    [fontSize],
  )

  const theme = useMemo(() => {
    return getActiveTheme(mode)
  }, [mode])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  useEffect(() => {
    const presetMode = localStorage.getItem('themeMode') as PaletteMode
    if (presetMode && [DARK, LIGHT].includes(presetMode)) {
      setMode(presetMode)
    }
  }, [])

  return (
  <ThemeContext.Provider value={themeConfig}>
    <ThemeProvider theme={theme}>
        <CssBaseline />
          {children}
      </ThemeProvider>
  </ThemeContext.Provider>
  );
}
