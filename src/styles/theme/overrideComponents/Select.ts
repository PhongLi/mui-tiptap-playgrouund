import type { Theme } from '@mui/material/styles';
import type { Components } from '@mui/material/styles/components';
// ----------------------------------------------------------------------


export default function Select(theme : Theme): Components {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {},
        select: {
          fontSize: theme.typography.body2.fontSize,
          fontWeight: theme.typography.fontWeightMedium
        },
      },
    }
  };
}
