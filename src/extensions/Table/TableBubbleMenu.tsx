import { styled } from '@mui/material'
import {
    findParentNodeClosestToPos,
    isActive,
    posToDOMRect,
} from '@tiptap/core'
import { useMemo } from 'react'
import type { Except } from 'type-fest'

import type { ControlledBubbleMenuProps } from '@/components/ControlledBubbleMenu'
import ControlledBubbleMenu from '@/components/ControlledBubbleMenu'
import type { TableMenuControlsProps } from '@/controls/Table/TableMenuControls'
import TableMenuControls from '@/controls/Table/TableMenuControls'
import { useRichTextEditorContext } from '@/store/context'
import DebounceRender, {
    type DebounceRenderProps,
} from '@/utils/DebounceRender'

export type TableBubbleMenuProps = {
    disableDebounce?: boolean
    DebounceProps?: Except<DebounceRenderProps, 'children'>
    labels?: TableMenuControlsProps['labels']
} & Partial<Except<ControlledBubbleMenuProps, 'open' | 'editor' | 'children'>>

const StyledTableMenuControls = styled(TableMenuControls)(({ theme }) => ({
    maxWidth: '90vw',
    padding: theme.spacing(0.5, 1),
}))

export default function TableBubbleMenu({
    disableDebounce = false,
    DebounceProps,
    labels,
    ...controlledBubbleMenuProps
}: TableBubbleMenuProps) {
    const editor = useRichTextEditorContext()

    const bubbleMenuAnchorEl = useMemo(
        () =>
            editor
                ? {
                      getBoundingClientRect: () => {
                          const nearestTableParent = editor.isActive('table')
                              ? findParentNodeClosestToPos(
                                    editor.state.selection.$anchor,
                                    node => node.type.name === 'table',
                                )
                              : null

                          if (nearestTableParent) {
                              const wrapperDomNode = editor.view.nodeDOM(
                                  nearestTableParent.pos,
                              ) as HTMLElement | null | undefined

                              const tableDomNode =
                                  wrapperDomNode?.querySelector('table')
                              if (tableDomNode) {
                                  return tableDomNode.getBoundingClientRect()
                              }
                          }

                          // Since we weren't able to find a table from the current user position, that means the user
                          // hasn't put their cursor in a table. We'll be hiding the table in this case, but we need
                          // to return a bounding rect regardless (can't return `null`), so we use the standard logic
                          // based on the current cursor position/selection instead.
                          const { ranges } = editor.state.selection
                          const from = Math.min(
                              ...ranges.map(range => range.$from.pos),
                          )
                          const to = Math.max(
                              ...ranges.map(range => range.$to.pos),
                          )
                          return posToDOMRect(editor.view, from, to)
                      },
                  }
                : null,
        [editor],
    )

    if (!editor?.isEditable) {
        return null
    }

    const controls = <StyledTableMenuControls labels={labels} />

    return (
        <ControlledBubbleMenu
            editor={editor}
            open={isActive(editor.view.state, 'table')}
            anchorEl={bubbleMenuAnchorEl}
            placement='top-start'
            fallbackPlacements={[
                'bottom-start',
                'top',
                'bottom',
                'top-end',
                'bottom-end',
            ]}
            flipPadding={{ top: 35, left: 8, right: 8, bottom: -Infinity }}
            {...controlledBubbleMenuProps}
        >
            {disableDebounce ? (
                controls
            ) : (
                <DebounceRender {...DebounceProps}>{controls}</DebounceRender>
            )}
        </ControlledBubbleMenu>
    )
}
