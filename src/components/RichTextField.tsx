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
    /** Optional additional className to provide to the root element. */
    className?: string
}

export type RichTextFieldProps = {
    /**
     * Which style to use for the field. "outlined" shows a border around the controls,
     * editor, and footer, which updates depending on hover/focus states, like MUI's
     * OutlinedInput. "standard" does not include any outer border.
     */
    variant?: 'outlined' | 'standard'
    /** Class applied to the root element. */
    className?: string
    /**
     * Whether the outlined field should appear as disabled. Typically the
     * editor's `editable` field would also be set to `false` when setting this to
     * true.
     */
    disabled?: boolean
    /**
     * Any additional content to render inside the outlined field, below the
     * editor content.
     */
    footer?: React.ReactNode
    /**
     * The controls content to show inside the menu bar. Typically will be set to
     * a <MenuControlsContainer> containing several MenuButton* components,
     * depending on what controls you want to include in the menu bar (and what
     * extensions you've enabled).
     */
    controls?: React.ReactNode
    /**
     * If true, the controls rendered via `controls` will not be debounced. If not
     * debounced, then upon every editor interaction (caret movement, character
     * typed, etc.), the entire controls content will re-render, which tends to be
     * very expensive and can bog down the editor performance, so debouncing is
     * generally recommended. Controls are often expensive since they need to
     * check a lot of editor state, with `editor.can()` commands and whatnot. By
     * default false.
     */
    disableDebounceRenderControls?: boolean
    /**
     * Override any props for the child MenuBar component (rendered if `controls`
     * is provided).
     */
    /**
     * Override any props for the child MenuBar component (rendered if `controls`
     * is provided).
     */
    MenuBarProps?: Partial<MenuBarProps>
    /**
     * Override any props for the child RichTextContent component.
     */
    RichTextContentProps?: Partial<RichTextContentProps>
}

const StyledRoot = styled(Box)(({ theme }) => ({
    [`&.${classes.root}`]: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
    },
    [`&.${classes.outlined}`]: {
        padding: theme.spacing(2),
        border: '1px solid #ccc',
    },
    [`&.${classes.standard}`]: {
        padding: theme.spacing(1.5, 0),
    },
    [`& .${classes.menuBarContent}`]: {
        padding: theme.spacing(1, 0),
    },
    [`& .${classes.content}`]: {
        padding: theme.spacing(1.5),
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
