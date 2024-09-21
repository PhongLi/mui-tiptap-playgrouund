import type { Theme } from "@mui/material/styles";

import CssBaseline from "./CssBaseline";

const OverrideComponents = (theme: Theme) => {
    return CssBaseline(theme)
}
 
export default OverrideComponents;