import { mergeAttributes } from '@tiptap/core'
import TiptapTable from '@tiptap/extension-table'
import { columnResizing, tableEditing } from '@tiptap/pm/tables'

const Table = TiptapTable.extend({
    addProseMirrorPlugins() {
        const isResizable = this.options.resizable

        const columnResizingPlugin = columnResizing({
            handleWidth: this.options.handleWidth,
            cellMinWidth: this.options.cellMinWidth,
            View: this.options.View,
            lastColumnResizable: this.options.lastColumnResizable,
        })

        return [
            ...(isResizable ? [columnResizingPlugin] : []),

            tableEditing({
                allowTableNodeSelection: this.options.allowTableNodeSelection,
            }),
        ]
    },
    addAttributes() {
        return {
            style: {
                default: null,
            },
        }
    },
    renderHTML({ node, HTMLAttributes }) {
        let totalWidth = 0
        let fixedWidth = true
        try {
            // use first row to determine width of table
            // @ts-ignore
            const tr = node.content.content[0]
            tr.content.content.forEach(
                (td: { attrs: { colwidth: any[]; colspan: any } }) => {
                    if (td.attrs.colwidth) {
                        td.attrs.colwidth.forEach((col: number) => {
                            if (!col) {
                                fixedWidth = false
                                totalWidth += this.options.cellMinWidth
                            } else {
                                totalWidth += col
                            }
                        })
                    } else {
                        fixedWidth = false
                        const colspan = td.attrs.colspan ? td.attrs.colspan : 1
                        totalWidth += this.options.cellMinWidth * colspan
                    }
                },
            )
        } catch (error) {
            fixedWidth = false
        }

        if (fixedWidth && totalWidth > 0) {
            HTMLAttributes.style = `width: ${totalWidth}px`
        } else if (totalWidth && totalWidth > 0) {
            HTMLAttributes.style = `min-width: ${totalWidth}px`
        } else {
            HTMLAttributes.style = null
        }

        return [
            'div',
            { class: 'tableWrapper' },
            [
                'table',
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
                ['tbody', 0],
            ],
        ]
    },
})

export default Table
