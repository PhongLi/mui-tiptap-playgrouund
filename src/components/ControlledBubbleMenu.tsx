import {
    Fade,
    Paper,
    type PaperProps,
    Popper,
    type PopperProps,
    useTheme,
} from '@mui/material'
import { type Editor, isNodeSelection, posToDOMRect } from '@tiptap/core'
import { useCallback } from 'react'

import { Z_INDEXES } from '@/constants/theme'

export type ControlledBubbleMenuProps = {
    editor: Editor
    open: boolean
    children: React.ReactNode
    anchorEl?: PopperProps['anchorEl']
    /**
     * To override the HTML element into which the bubble menu Popper portal
     * children (DOM content) are appended. Uses MUI's Popper default if not
     * provided (the body of the top-level document object).
     *
     * Can be useful to override with a reference to a modal/dialog's element
     * (like the `ref` of a MUI <Dialog />), for instance, so that this bubble
     * menu can still appear on top of that, without needing to use messy z-index
     * overrides.
     *
     * Example:
     *
     * <Dialog open={open} ref={dialogRef}>
     *   <RichTextEditor ...>
     *     {() => (
     *       <>
     *         <MyControlledBubbleMenu container={dialogRef.current} />
     *         <LinkBubbleMenu container={dialogRef.current} />
     *         <TableBubbleMenu container={dialogRef.current} />
     *       </>
     *     )}
     *   </RichTextEditor>
     * </Dialog>
     */
    container?: PopperProps['container']
    /**
     * If true, the `children` will be under the DOM hierarchy of the parent
     * component of the ControlledBubbleMenu.
     */
    disablePortal?: PopperProps['disablePortal']
    placement?: PopperProps['placement']
    fallbackPlacements?: PopperProps['placement'][]
    flipPadding?:
        | number
        | { top?: number; right?: number; bottom?: number; left?: number }
    /** Class applied to the root Popper element. */
    className?: string
    PaperProps?: Partial<PaperProps>
}

export default function ControlledBubbleMenu({
    editor,
    open,
    className,
    children,
    anchorEl,
    container,
    disablePortal,
    placement = 'top',
    fallbackPlacements = [
        'top',
        'bottom',
        'top-start',
        'bottom-start',
        'top-end',
        'bottom-end',
    ],
    flipPadding = 8,
    PaperProps,
}: ControlledBubbleMenuProps) {
    const theme = useTheme()

    const defaultAnchorEl = useCallback(() => {
        // The logic here is taken from the positioning implementation in Tiptap's BubbleMenuPlugin
        // https://github.com/ueberdosis/tiptap/blob/16bec4e9d0c99feded855b261edb6e0d3f0bad21/packages/extension-bubble-menu/src/bubble-menu-plugin.ts#L183-L193
        const { ranges } = editor.state.selection
        const from = Math.min(...ranges.map(range => range.$from.pos))
        const to = Math.max(...ranges.map(range => range.$to.pos))

        return {
            getBoundingClientRect: () => {
                if (isNodeSelection(editor.state.selection)) {
                    const node = editor.view.nodeDOM(from)

                    if (node instanceof HTMLElement) {
                        return node.getBoundingClientRect()
                    }
                }

                return posToDOMRect(editor.view, from, to)
            },
        }
    }, [editor])

    return (
        <Popper
            open={open}
            placement={placement}
            modifiers={[
                {
                    name: 'offset',
                    options: {
                        // Add a slight vertical offset for the popper from the current selection
                        offset: [0, 6],
                    },
                },
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        // We'll reposition (to one of the below fallback placements) whenever our Popper goes
                        // outside of the editor. (This is necessary since our children aren't actually rendered
                        // here, but instead with a portal, so the editor DOM node isn't a parent.)
                        boundary: editor.options.element,
                        fallbackPlacements: fallbackPlacements,
                        padding: flipPadding,
                    },
                },
                {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                        altAxis: true,
                        boundary: 'clippingParents',
                        padding: 8,
                    },
                },
            ]}
            anchorEl={anchorEl ?? defaultAnchorEl}
            className={className}
            container={container}
            disablePortal={disablePortal}
            transition
            sx={{ zIndex: Z_INDEXES.BUBBLE_MENU }}
        >
            {({ TransitionProps }) => (
                <Fade
                    {...TransitionProps}
                    timeout={{
                        enter: theme.transitions.duration.enteringScreen,
                        exit: 0,
                    }}
                >
                    <Paper
                        elevation={7}
                        {...PaperProps}
                        className={PaperProps?.className}
                    >
                        {children}
                    </Paper>
                </Fade>
            )}
        </Popper>
    )
}
