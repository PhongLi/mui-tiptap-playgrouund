import {
    Button,
    ClickAwayListener,
    Fade,
    Paper,
    Popper,
    type PopperProps,
    Stack,
    Tooltip,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'

import { Z_INDEXES } from '@/constants/theme'

import { ColorPicker } from './ColorPicker'
import type { MenuButtonColorPickerProps } from './MenuButtonColorPicker'

export interface ColorPickerPopperProps
    extends PopperProps,
        ColorPickerPopperBodyProps {}

export interface ColorPickerPopperBodyProps
    extends Pick<
        MenuButtonColorPickerProps,
        'swatchColors' | 'labels' | 'ColorPickerProps'
    > {
    /** The current color value. Must be a valid CSS color string. */
    value: string
    /** Callback when the user is saving/changing the current color. */
    onSave: (newColor: string) => void
    /** Callback when the user is canceling updates to the current color. */
    onCancel: () => void
}

const StyledPopper = styled(Popper)(() => ({
    zIndex: Z_INDEXES.BUBBLE_MENU,
    width: 235,
}))

export function ColorPickerPopperBody({
    value,
    onCancel,
    onSave,
    swatchColors,
    labels = {},
    ColorPickerProps,
}: ColorPickerPopperBodyProps) {
    const {
        removeColorButton = 'None',
        removeColorButtonTooltipTitle = '',
        cancelButton = 'Cancel',
        saveButton = 'OK',
    } = labels

    // Because color can change rapidly as the user drags the color in the
    // ColorPicker gradient, we'll wait until "Save" to call the onSave prop, and
    // we'll store an internal localColor until then. (This could alternatively be
    // implemented such that we "save" directly whenever a swatch preset is
    // clicked, by looking at the `source` from `ColorPicker.onChange`, but it may
    // be useful to tweak a color from a swatch before saving.)
    const [localColor, setLocalColor] = useState<string>(value)
    // Update our internal value whenever the `color` prop changes (since this is
    // a controlled component)
    useEffect(() => {
        setLocalColor(value)
    }, [value])

    return (
        <>
            <ColorPicker
                swatchColors={swatchColors}
                value={localColor}
                onChange={newColor => {
                    setLocalColor(newColor)
                }}
                labels={labels}
                {...ColorPickerProps}
            />

            <Stack
                direction='row'
                justifyContent='space-between'
                sx={{ mt: 1 }}
            >
                <Tooltip title={removeColorButtonTooltipTitle} arrow>
                    <Button
                        onClick={() => {
                            // No color being specified can mean "none" in some scenarios
                            // (e.g. highlighting) and "default color"/reset in others (text)
                            onSave('')
                        }}
                        size='small'
                    >
                        {removeColorButton}
                    </Button>
                </Tooltip>

                <Button onClick={onCancel} size='small'>
                    {cancelButton}
                </Button>

                <Button
                    onClick={() => {
                        onSave(localColor)
                    }}
                    size='small'
                >
                    {saveButton}
                </Button>
            </Stack>
        </>
    )
}

export const ColorPickerPopper = ({
    value,
    onSave,
    onCancel,
    swatchColors,
    ColorPickerProps,
    labels,
    ...popperProps
}: ColorPickerPopperProps) => {
    return (
        <StyledPopper
            transition
            placement='bottom-start'
            {...popperProps}
            className={popperProps.className}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={100}>
                    <div>
                        <ClickAwayListener
                            mouseEvent='onMouseDown'
                            touchEvent='onTouchStart'
                            onClickAway={onCancel}
                        >
                            <Paper elevation={5} sx={{ p: 2.5, pb: 1 }}>
                                <ColorPickerPopperBody
                                    value={value || ''}
                                    onSave={onSave}
                                    onCancel={onCancel}
                                    swatchColors={swatchColors}
                                    ColorPickerProps={ColorPickerProps}
                                    labels={labels}
                                />
                            </Paper>
                        </ClickAwayListener>
                    </div>
                </Fade>
            )}
        </StyledPopper>
    )
}
