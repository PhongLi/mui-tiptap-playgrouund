import { Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useRef } from 'react'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'

import { colorToHex as colorToHexDefault } from '@/utils/color'

import { ColorSwatchButton } from './ColorSwatchButton'

const classPrefix = 'MenuButtonColorPicker'
const classes = {
    gradientPicker: `${classPrefix}-gradientPicker`,
    colorTextInput: `${classPrefix}-colorTextInput`,
    swatchContainer: `${classPrefix}-swatchContainer`,
}

const StyledGradientPicker = styled(HexColorPicker)(() => ({
    width: '100%',
}))

const StyledAlphaGradientPicker = styled(HexAlphaColorPicker)(() => ({
    width: '100%',
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(1),
}))

const SwatchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: theme.spacing(1),
}))

export type ColorChangeSource = 'gradient' | 'text' | 'swatch'

export type SwatchColorOptionObject = {
    value?: string
    label?: string
}
export type SwatchColorOption = string | SwatchColorOptionObject

export type ColorPickerProps = {
    value: string
    onChange: (color: string, source: ColorChangeSource) => void
    colorToHex?: (color: string) => string | null
    swatchColors?: SwatchColorOption[]
    disableAlpha?: boolean
    labels?: {
        textFieldPlaceholder?: string
    }
}

export function ColorPicker({
    value,
    onChange,
    swatchColors,
    colorToHex = colorToHexDefault,
    disableAlpha = false,
    labels = {},
}: ColorPickerProps) {
    const { textFieldPlaceholder = 'Ex: "#7cb5ec"' } = labels

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (inputRef.current && inputRef.current !== document.activeElement) {
            inputRef.current.value = value
        }
    }, [value])

    const swatchColorObjects: SwatchColorOptionObject[] = (
        swatchColors ?? []
    ).map(swatchColor =>
        typeof swatchColor === 'string' ? { value: swatchColor } : swatchColor,
    )

    const colorValueAsHex = colorToHex(value)
    return (
        <>
            {disableAlpha ? (
                <StyledGradientPicker
                    color={colorValueAsHex ?? '#000000'}
                    onChange={color => onChange(color, 'gradient')}
                    className={classes.gradientPicker}
                />
            ) : (
                <StyledAlphaGradientPicker
                    color={colorValueAsHex ?? '#000000'}
                    onChange={color => onChange(color, 'gradient')}
                    className={classes.gradientPicker}
                />
            )}

            <StyledTextField
                placeholder={textFieldPlaceholder}
                variant='outlined'
                size='small'
                className={classes.colorTextInput}
                defaultValue={value || ''}
                inputRef={inputRef}
                spellCheck={false}
                onChange={event => {
                    const newColor = event.target.value
                    const newHexColor = colorToHex(newColor)
                    if (newHexColor) {
                        onChange(newHexColor, 'text')
                    }
                }}
                fullWidth
            />

            {swatchColorObjects.length > 0 && (
                <SwatchContainer className={classes.swatchContainer}>
                    {swatchColorObjects.map(swatchColor => (
                        <ColorSwatchButton
                            key={swatchColor.value}
                            value={swatchColor.value}
                            label={swatchColor.label}
                            onClick={() =>
                                onChange(swatchColor.value ?? '', 'swatch')
                            }
                            active={
                                swatchColor.value == value ||
                                (!swatchColor.value && !value) ||
                                (!!swatchColor.value &&
                                    !!colorValueAsHex &&
                                    colorToHex(swatchColor.value) ===
                                        colorValueAsHex)
                            }
                        />
                    ))}
                </SwatchContainer>
            )}
        </>
    )
}
