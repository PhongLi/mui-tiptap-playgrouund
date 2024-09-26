import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'

import { Z_INDEXES } from '@/constants/theme'
import DebounceRender from '@/utils/DebounceRender'

export type MenuBarProps = {
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

const StyledRoot = styled(Box)(({ theme }) => ({
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
    className,
    disableSticky,
    stickyOffset,
    children,
}: MenuBarProps) {
    return (
        <StyledRoot
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
            <DebounceRender>{children}</DebounceRender>
        </StyledRoot>
    )
}

export default MenuBar
