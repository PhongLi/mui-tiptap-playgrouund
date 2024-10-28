import {
    findParentNodeClosestToPos,
    isActive,
    posToDOMRect,
} from '@tiptap/core'
import { useMemo } from 'react'
import type { Except } from 'type-fest'

import type { ControlledBubbleMenuProps } from '@/components/ControlledBubbleMenu'
import ControlledBubbleMenu from '@/components/ControlledBubbleMenu'
import type { TableMenuControlsProps } from '@/extensions/Table/TableMenuControls'
import TableMenuControls from '@/extensions/Table/TableMenuControls'
import { useRichTextEditorContext } from '@/store/context'

export type TableBubbleMenuProps = {
    labels?: TableMenuControlsProps['labels']
} & Partial<Except<ControlledBubbleMenuProps, 'open' | 'editor' | 'children'>>

export default function TableBubbleMenu({
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

    if (!editor?.isEditable) return null
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
            <TableMenuControls labels={labels} />
        </ControlledBubbleMenu>
    )
}
