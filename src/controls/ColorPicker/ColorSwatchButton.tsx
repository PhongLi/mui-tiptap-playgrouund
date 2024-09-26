import Check from '@mui/icons-material/Check'
import { styled, useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import {
    type ComponentPropsWithoutRef,
    type ElementRef,
    forwardRef,
} from 'react'
import type { Except } from 'type-fest'

import { DARK } from '@/constants/theme'

export interface ColorSwatchButtonProps
    // Omit the default "color" prop so that it can't be confused for the `value`
    // prop
    extends Except<ComponentPropsWithoutRef<'button'>, 'color'> {
    /**
     * What color is shown with this swatch. If not provided, shows a checkerboard
     * pattern, typically used as "not set" or "transparent".
     */
    value?: string
    /**
     * An optional human-friendly name for this color, used as an aria-label for
     * the button.
     */
    label?: string
    /**
     * Whether this swatch color is the currently active color. If true, shows an
     * overlaid checkmark as a visual indicator.
     */
    active?: boolean
    /** If given, sets the padding between the color and the border of the swatch. */
    padding?: string | number
}

const classPrefix = 'ColorSwatchButton'
const classes = {
    root: `${classPrefix}-root`,
    activeIcon: `${classPrefix}-activeIcon`,
    colorNotSet: `${classPrefix}-colorNotSet`,
}

const StyledSwatchButton = styled('button')(({ theme }) => ({
    [`&.${classes.root}`]: {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
        minWidth: theme.spacing(2.5),
        borderRadius: theme.shape.borderRadius,
        borderColor:
            theme.palette.mode === DARK
                ? theme.palette.grey[700]
                : theme.palette.grey[400],
        borderStyle: 'solid',
        borderWidth: 1,
        cursor: 'pointer',
        // Use background-clip with content-box so that if a `padding` is specified by the
        // user, it adds a gap between the color and the border.
        padding: 0,
        backgroundClip: 'content-box',
    },
    [`&.${classes.colorNotSet}`]: {
        // To indicate that a color hasn't been chosen, we'll use a checkerboard pattern
        // (https://stackoverflow.com/a/65129916/4543977)
        background: `repeating-conic-gradient(
                    ${theme.palette.grey[400]} 0% 25%, ${theme.palette.common.white} 0% 50%)
                    50% / 12px 12px`,
        backgroundClip: 'content-box',
    },
    [`& .${classes.activeIcon}`]: {
        height: '100%',
        width: '80%',
        verticalAlign: 'middle',
    },
}))

export const ColorSwatchButton = forwardRef<
    ElementRef<'button'>,
    ColorSwatchButtonProps
>(({ value: colorValue, label, padding, active, ...buttonProps }, ref) => {
    const theme = useTheme()
    return (
        <StyledSwatchButton
            ref={ref}
            type='button'
            style={{ backgroundColor: colorValue, padding }}
            aria-label={label ?? colorValue}
            value={colorValue}
            {...buttonProps}
            className={clsx(
                classes.root,
                !colorValue && classes.colorNotSet,
                buttonProps.className,
            )}
        >
            {active && (
                <Check
                    fontSize='small'
                    className={classes.activeIcon}
                    style={{
                        color: colorValue
                            ? theme.palette.getContrastText(colorValue)
                            : undefined,
                    }}
                />
            )}
        </StyledSwatchButton>
    )
})

ColorSwatchButton.displayName = 'ColorSwatchButton'
