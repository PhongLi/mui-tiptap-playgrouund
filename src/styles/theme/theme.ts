'use client'

import type { PaletteMode, ThemeOptions } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import { DARK } from '@/constants/theme'

import palette from './config/palette';
import shadows, { customShadows } from './config/shadows';
import typography from './config/typography';
import OverrideComponents from './overrideComponents';

// Create a theme instance.
const lightTheme: ThemeOptions  = {
  palette: {
    mode: 'light',
    ...palette.light
  },
  typography: {...typography},
  shadows:   shadows.light,
  customShadows:  customShadows.light,

  spacing: (factor: number) => `${0.5 * factor}rem`,
}

const darkTheme: ThemeOptions  = {
  palette: {
    mode: 'dark',
    ...palette.dark
  },
  typography: {...typography},
  shadows:  shadows.dark ,
  customShadows:  customShadows.dark ,
  spacing: (factor: number) => `${0.5 * factor}rem`,
}

export const getActiveTheme = (mode: PaletteMode) => {
  const selectedTheme = mode === DARK ? darkTheme : lightTheme

  const theme = responsiveFontSizes(createTheme({ ...selectedTheme }))
  theme.components = OverrideComponents(theme)
  return theme
}
