import { Collapse } from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'

import { Z_INDEXES } from '@/constants/theme'

export type MenuBarProps = {
    hide?: boolean
    className?: string
    disableSticky?: boolean
    stickyOffset?: number
    children: React.ReactNode
}

const classPrefix = 'MenuBar'
const classes = {
    root: `${classPrefix}-root`,
    sticky: `${classPrefix}-sticky`,
    nonSticky: `${classPrefix}-nonSticky`,
}

const StyledRoot = styled(Collapse)(({ theme }) => ({
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    [`&.${classes.sticky}`]: {
        position: 'sticky',
        zIndex: Z_INDEXES.MENU_BAR,
        background: theme.palette.background.default,
    },
    [`&.${classes.nonSticky}`]: {},
}))

function MenuBar({
    hide,
    className,
    disableSticky,
    stickyOffset,
    children,
}: MenuBarProps) {
    return (
        <StyledRoot
            in={!hide}
            unmountOnExit
            className={clsx(
                classes.root,
                className,
                disableSticky ? classes.nonSticky : classes.sticky,
            )}
            sx={{
                [`&.${classes.sticky}`]: {
                    top: stickyOffset,
                },
            }}
        >
            {children}
        </StyledRoot>
    )
}

export default MenuBar
