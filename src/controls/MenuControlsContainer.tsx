import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { Except } from 'type-fest'

import type { DebounceRenderProps } from '@/utils/DebounceRender'
import DebounceRender from '@/utils/DebounceRender'

const StyledRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    rowGap: theme.spacing(0.3),
    columnGap: theme.spacing(0.3),
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
}))

export type MenuControlsContainerProps = {
    /** The set of controls (buttons, etc) to include in the menu bar. */
    children?: React.ReactNode
    className?: string
    /**
     * If true, the rendering of the children content here will be debounced, as a
     * way to improve performance. If this component is rendered in the same
     * context as Tiptap's `useEditor` and *not* debounced, then upon every editor
     * interaction (caret movement, character typed, etc.), the entire controls
     * content will re-render, which can bog down the editor, so debouncing is
     * usually recommended. Controls are often expensive to render since they need
     * to check a lot of editor state, with `editor.can()` commands and whatnot.
     */
    debounced?: boolean
    /**
     * Override the props/options used with debounce rendering such as the wait
     * interval, if `debounced` is true.
     */
    DebounceProps?: Except<DebounceRenderProps, 'children'>
}

export default function MenuControlsContainer({
    children,
    className,
    debounced,
    DebounceProps,
}: MenuControlsContainerProps) {
    const content = <StyledRoot className={className}>{children}</StyledRoot>
    return debounced ? (
        <DebounceRender {...DebounceProps}>{content}</DebounceRender>
    ) : (
        content
    )
}
