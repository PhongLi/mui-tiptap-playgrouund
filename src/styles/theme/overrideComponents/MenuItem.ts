import { menuItemClasses } from "@mui/material";
import type { Theme } from '@mui/material/styles';
import type { Components } from '@mui/material/styles/components';

export default function MenuItem(theme: Theme): Components {
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
