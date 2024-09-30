// ----------------------------------------------------------------------

import type { TypographyOptions } from "@mui/material/styles/createTypography";

export function pxToRem(value: number): string {
    return `${value / 16}rem`;
}

interface ResponsiveFontSizesProps {
    sm: number;
    md: number;
    lg: number;
}

function responsiveFontSizes({ sm, md, lg }: ResponsiveFontSizesProps) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    };
}

// Font constants
const FONT_PRIMARY = 'Inter, Nunito Sans, Lexend, Noto Sans, sans-serif';

const FONT_WEIGHT_REGULAR = 400
const FONT_WEIGHT_MEDIUM = 500
const FONT_WEIGHT_BOLD = 600



const typography: TypographyOptions  = {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: FONT_WEIGHT_REGULAR,
    fontWeightMedium: FONT_WEIGHT_MEDIUM,
    fontWeightBold: FONT_WEIGHT_BOLD,
    h1: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 80 / 64,
        fontSize: pxToRem(64),
        ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 64 / 48,
        fontSize: pxToRem(48),
        ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.5,
        fontSize: pxToRem(32),
        ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.5,
        fontSize: pxToRem(24),
        ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    },
    h5: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.5,
        fontSize: pxToRem(20),
        ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 28 / 18,
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    subtitle1: {
        fontWeight: FONT_WEIGHT_MEDIUM,
        lineHeight: 1.5,
        fontSize: pxToRem(16),
        ...responsiveFontSizes({ sm: 16, md: 16, lg: 16 }),
    },
    subtitle2: {
        fontWeight: FONT_WEIGHT_MEDIUM,
        lineHeight: 22 / 14,
        fontSize: pxToRem(14),
    },
    body1: {
        lineHeight: 1.5,
        fontSize: pxToRem(16),
    },
    body2: {
        lineHeight: 22 / 14,
        fontSize: pxToRem(14),
    },
    caption: {
        lineHeight: 1.5,
        fontSize: pxToRem(12),
    },
    overline: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        textTransform: 'uppercase',
    },
    button: {
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 24 / 14,
        fontSize: pxToRem(14),
        textTransform: 'capitalize'
    }
};

export default typography;
