import { menuItemClasses } from "@mui/material";
import type { Theme } from "@mui/material/styles";


export default function MenuItem(theme: Theme) {
  return {
    MuiMenuItem: {
        styleOverrides: {
        root: {
            margin: theme.spacing(0, 0.75),
            borderRadius: theme.shape.borderRadius,
            justifyContent: 'center',
            [`&&&.${menuItemClasses.selected}`]: {
                backgroundColor: theme.palette.action.selected,
            },
        },
      }
    }
  };
}
