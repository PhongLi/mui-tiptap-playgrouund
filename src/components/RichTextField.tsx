import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { EditorContent } from '@tiptap/react'
import clsx from 'clsx'

import useDebouncedFocus from '@/hooks/useDebouncedFocus'
import { useRichTextEditorContext } from '@/store/context'

import type { MenuBarProps } from './MenuBar'
import MenuBar from './MenuBar'

const classPrefix = 'RichTextField'
const classes = {
    root: `${classPrefix}-root`,
    outlined: `${classPrefix}-outlined`,
    standard: `${classPrefix}-standard`,
    menuBar: `${classPrefix}-menuBar`,
    menuBarContent: `${classPrefix}-menuBarContent`,
    content: `${classPrefix}-content`,
    disabled: `${classPrefix}-disabled`,
    focused: `${classPrefix}-focused`,
}

export type RichTextContentProps = {
    className?: string
}

export type RichTextFieldProps = {
    variant?: 'outlined' | 'standard'
    className?: string

    disabled?: boolean

    footer?: React.ReactNode

    controls?: React.ReactNode

    MenuBarProps?: Partial<MenuBarProps>
    RichTextContentProps?: Partial<RichTextContentProps>
}

const StyledRoot = styled(Box)(({ theme }) => ({
    [`&.${classes.root}`]: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
    },
    [`&.${classes.outlined}`]: {
        padding: theme.spacing(2),
        border: '1px solid',
        borderColor: theme.palette.grey[500],
    },
    [`&.${classes.standard}`]: {
        padding: theme.spacing(1.5, 0),
    },
    [`& .${classes.menuBarContent}`]: {
        padding: theme.spacing(1, 0),
    },
    [`& .${classes.content}`]: {
        padding: theme.spacing(1.5),
        paddingRight: theme.spacing(8.5),
    },
    [`& .${classes.disabled}`]: {},
    [`& .${classes.focused}`]: {},
}))

const StyledFieldContainer = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    color: theme.palette.text.primary,
    position: 'relative',
    textAlign: 'left',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
}))

const StyledFieldContent = styled(EditorContent)(() => ({
    position: 'relative',
    width: '100%',
    borderRadius: 5,
    tabSize: 1,
    maxHeight: 500,
    overflow: 'auto',
    '& .ProseMirror': {
        outline: 'none',
    },
}))

function RichTextField({
    variant = 'outlined',
    controls,
    disabled,
    className,
    footer,
    MenuBarProps,
    RichTextContentProps,
}: RichTextFieldProps) {
    const editor = useRichTextEditorContext()
    const isFieldFocused = useDebouncedFocus({ editor })
    return (
        <StyledRoot
            className={clsx(
                classes.root,
                variant === 'outlined' ? classes.outlined : classes.standard,
                disabled && classes.disabled,
                !disabled && isFieldFocused && classes.focused,
                className,
            )}
        >
            <StyledFieldContainer>
                {controls && <MenuBar {...MenuBarProps}>{controls}</MenuBar>}
                <StyledFieldContent
                    {...RichTextContentProps}
                    className={clsx(
                        classes.content,
                        RichTextContentProps?.className,
                    )}
                    editor={editor}
                />
                {footer}
            </StyledFieldContainer>
        </StyledRoot>
    )
}

export default RichTextField
