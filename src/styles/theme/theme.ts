'use client'

import type { PaletteMode, ThemeOptions } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import { DARK } from '@/constants/theme'

import OverrideComponents from './overrideComponents';
import palette from './palette';
import typography from './typography';

// Create a theme instance.
const lightTheme: ThemeOptions  = {
  palette: {
    mode: 'light',
    ...palette.light
  },
  typography: {...typography},
  spacing: (factor: number) => `${0.5 * factor}rem`,
}

const darkTheme: ThemeOptions  = {
  palette: {
    mode: 'dark',
    ...palette.dark
  },
  spacing: (factor: number) => `${0.5 * factor}rem`,
}

export const getActiveTheme = (mode: PaletteMode) => {
  const selectedTheme = mode === DARK ? darkTheme : lightTheme

  const theme = responsiveFontSizes(createTheme({ ...selectedTheme }))
  theme.components = OverrideComponents(theme)
  return theme
}
