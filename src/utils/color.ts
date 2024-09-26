import { rgbToHex } from '@mui/material'

export function colorToHex(color: string): string | null {
    try {
        // Though this function is named `rgbToHex`, it supports colors in various
        // formats (rgba, hex, hsl, etc.) as well
        return rgbToHex(color)
    } catch (err) {
        return null
    }
}
