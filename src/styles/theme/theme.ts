'use client'

import type { PaletteMode, ThemeOptions } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import { DARK } from '@/constants/theme'

// Create a theme instance.
const lightTheme: ThemeOptions  = {
  palette: {
    mode: 'light',
  },
}

const darkTheme: ThemeOptions  = {
  palette: {
    mode: 'dark' ,
  },
}

export const getActiveTheme = (mode: PaletteMode) => {
  const selectedTheme = mode === DARK ? darkTheme : lightTheme

  const theme = responsiveFontSizes(createTheme({ ...selectedTheme }))
  return theme
}
