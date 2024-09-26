import { ToggleButton, type ToggleButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { ReactNode, RefObject } from 'react'
import type { Except, SetOptional } from 'type-fest'

import {
    MenuButtonTooltip,
    type MenuButtonTooltipProps,
} from './MenuButtonTooltip'

export interface MenuButtonProps
    extends SetOptional<
        Except<ToggleButtonProps, 'ref' | 'children'>,
        'value'
    > {
    tooltipLabel: MenuButtonTooltipProps['label']

    tooltipShortcutKeys?: MenuButtonTooltipProps['shortcutKeys']

    IconComponent?: React.ElementType<{ className: string }>

    children?: ReactNode

    buttonRef?: RefObject<HTMLButtonElement>
}

export const MENU_BUTTON_FONT_SIZE_DEFAULT = '1.25rem'

const classPrefix = 'MenuButton'
const classes = {
    root: `${classPrefix}-root`,
    menuButtonIcon: `${classPrefix}-menuButtonIcon`,
}

const StyledRoot = styled('span')(() => ({
    '&& .MuiToggleButton-root': {
        border: 'none',
        padding: 5,
    },
    [`& .${classes.menuButtonIcon}`]: {
        fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT,
    },
}))

export default function MenuButton({
    tooltipLabel,
    tooltipShortcutKeys,
    IconComponent,
    buttonRef,
    children,
    ...toggleButtonProps
}: MenuButtonProps) {
    return (
        <StyledRoot>
            <MenuButtonTooltip
                label={tooltipLabel}
                shortcutKeys={tooltipShortcutKeys}
            >
                <ToggleButton
                    ref={buttonRef}
                    size='small'
                    value={tooltipLabel}
                    {...toggleButtonProps}
                >
                    {children ??
                        (IconComponent && (
                            <IconComponent className={classes.menuButtonIcon} />
                        ))}
                </ToggleButton>
            </MenuButtonTooltip>
        </StyledRoot>
    )
}
