import type { PopperProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { type ReactNode, useState } from 'react'
import type { Except } from 'type-fest'

import MenuButton, {
    MENU_BUTTON_FONT_SIZE_DEFAULT,
    type MenuButtonProps,
} from '@/controls/MenuButton'
import { FormatColorBar } from '@/icons'

import type { ColorPickerProps, SwatchColorOption } from './ColorPicker'
import { ColorPickerPopper } from './ColorPickerPopper'

export interface MenuButtonColorPickerProps
    extends Except<MenuButtonProps, 'color' | 'value' | 'onChange'> {
    value: string | undefined
    onChange: (newColor: string) => void
    swatchColors?: SwatchColorOption[]
    hideColorIndicator?: boolean
    PopperProps?: Partial<PopperProps>
    /** Override the props for the color picker. */
    ColorPickerProps?: Partial<ColorPickerProps>
    popperId?: string
    /** Override the default labels for any of the content. */
    labels?: {
        removeColorButton?: ReactNode
        removeColorButtonTooltipTitle?: ReactNode
        cancelButton?: ReactNode
        saveButton?: ReactNode
        textFieldPlaceholder?: string
    }
}

const classPrefix = 'MenuButtonColorPicker'
const classes = {
    menuButtonIcon: `${classPrefix}-menuButtonIcon`,
    colorIndicatorIcon: `${classPrefix}-colorIndicatorIcon`,
    colorIndicatorIconDisabled: `${classPrefix}-colorIndicatorIconDisabled`,
}

const StyledMenuButton = styled(MenuButton)(({ theme }) => ({
    [`& .${classes.menuButtonIcon}`]: {
        fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT,
    },

    [`& .${classes.colorIndicatorIcon}`]: {
        position: 'absolute',
    },
    [`& .${classes.colorIndicatorIconDisabled}`]: {
        color: theme.palette.action.disabled,
    },
}))

export function MenuButtonColorPicker({
    value: colorValue,
    onChange,
    swatchColors,
    labels,
    hideColorIndicator = false,
    popperId,
    PopperProps,
    ColorPickerProps,
    ...menuButtonProps
}: MenuButtonColorPickerProps) {
    const { IconComponent, children, ...otherMenuButtonProps } = menuButtonProps

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleClose = () => setAnchorEl(null)
    return (
        <>
            <StyledMenuButton
                onClick={e =>
                    anchorEl ? handleClose() : setAnchorEl(e.currentTarget)
                }
                aria-describedby={popperId}
                {...otherMenuButtonProps}
            >
                {children ?? (
                    <>
                        {IconComponent && (
                            <IconComponent className={classes.menuButtonIcon} />
                        )}

                        {!hideColorIndicator && colorValue && (
                            <FormatColorBar
                                className={clsx(
                                    classes.menuButtonIcon,
                                    classes.colorIndicatorIcon,
                                    menuButtonProps.disabled &&
                                        classes.colorIndicatorIconDisabled,
                                )}
                                style={
                                    menuButtonProps.disabled
                                        ? undefined
                                        : { color: colorValue }
                                }
                            />
                        )}
                    </>
                )}
            </StyledMenuButton>

            <ColorPickerPopper
                id={popperId}
                open={!!anchorEl}
                anchorEl={anchorEl}
                value={colorValue ?? ''}
                onSave={newColor => {
                    onChange(newColor)
                    handleClose()
                }}
                onCancel={handleClose}
                swatchColors={swatchColors}
                ColorPickerProps={ColorPickerProps}
                labels={labels}
                {...PopperProps}
            />
        </>
    )
}
