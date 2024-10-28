import AddIcon from '@mui/icons-material/Add'
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset'
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
    onSave,
    swatchColors,
    labels = {},
    ColorPickerProps,
}: ColorPickerPopperBodyProps) {
    const {
        removeColorButton = 'None',
        removeColorButtonTooltipTitle = '',
        saveButton = 'OK',
    } = labels

    const [localColor, setLocalColor] = useState<string>(value)

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
                spacing={1}
                sx={{ mt: 1 }}
            >
                <Tooltip title={removeColorButtonTooltipTitle} arrow>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={() => {
                            onSave('')
                        }}
                        size='small'
                        startIcon={<FormatColorResetIcon />}
                    >
                        {removeColorButton}
                    </Button>
                </Tooltip>

                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => {
                        onSave(localColor)
                    }}
                    size='small'
                    startIcon={<AddIcon />}
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
