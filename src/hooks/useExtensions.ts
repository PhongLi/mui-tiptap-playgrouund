import type { EditorOptions } from '@tiptap/core'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Color from '@tiptap/extension-color'
import Dropcursor from '@tiptap/extension-dropcursor'
import FontFamily from '@tiptap/extension-font-family'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import History from '@tiptap/extension-history'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useMemo } from 'react'

//**Custom Extension
import DBlock from '@/extensions/DBlock/DBlock'
import Document from '@/extensions/Document'
import FontSize from '@/extensions/FontSize'
import Indent from '@/extensions/Indent'
import LinkBubbleMenuHandler from '@/extensions/LinkBubbleMenuHandler'
import Table from '@/extensions/Table/Table'
import TableCellBackground from '@/extensions/Table/TableCellBackground'

export type UseExtensionsOptions = {
    placeholder?: string
}

const CustomLinkExtension = Link.extend({
    inclusive: false,
})

const CustomSubscript = Subscript.extend({
    excludes: 'superscript',
})

const CustomSuperscript = Superscript.extend({
    excludes: 'subscript',
})
export default function useExtensions({
    placeholder,
}: UseExtensionsOptions): EditorOptions['extensions'] {
    return useMemo(() => {
        return [
            // Necessary
            Document,
            DBlock,
            Table.configure({
                resizable: true,
            }),
            TableCellBackground,
            TableRow,
            TableHeader,
            TableCell,
            Paragraph,
            Text,
            Dropcursor,
            Gapcursor,
            History,
            HardBreak,

            // Mark
            Heading,
            Bold,
            Italic,
            Underline,
            Strike,
            CustomLinkExtension.configure({
                openOnClick: false,
            }),
            LinkBubbleMenuHandler,
            CustomSubscript,
            CustomSuperscript,

            // Node
            BulletList,
            ListItem,
            CodeBlock,
            Code,
            Blockquote,
            OrderedList,

            Indent,
            TextAlign.configure({
                types: ['paragraph', 'heading'],
            }),
            TextStyle,
            Color,
            FontFamily,
            FontSize,
            Highlight.configure({ multicolor: true }),
            HorizontalRule,

            TaskList,
            TaskItem.configure({
                nested: true,
            }),

            Placeholder.configure({
                placeholder,
            }),
        ]
    }, [placeholder])
}
