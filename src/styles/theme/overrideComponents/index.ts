import type { Theme } from "@mui/material/styles";
import { merge } from "lodash";

import CssBaseline from "./CssBaseline";
import Input from "./Input";
import MenuItem from "./MenuItem";
import Select from "./Select";

const OverrideComponents = (theme: Theme) => {
    return merge(CssBaseline(theme), MenuItem(theme), Select(theme), Input(theme))
}
 
export default OverrideComponents;