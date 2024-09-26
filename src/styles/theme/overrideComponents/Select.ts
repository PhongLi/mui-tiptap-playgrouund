
// ----------------------------------------------------------------------

import type { Theme } from "@mui/material/styles";

export default function Select(theme : Theme) {
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
