import type { Except } from 'type-fest'

import type { ControlledBubbleMenuProps } from '@/components/ControlledBubbleMenu'
import ControlledBubbleMenu from '@/components/ControlledBubbleMenu'
import { useRichTextEditorContext } from '@/store/context'

import type { ImageMenuControlsProps } from './ImageMenuControls'
import ImageMenuControls from './ImageMenuControls'

export interface ImageBubbleMenuProps
    extends Partial<
        Except<ControlledBubbleMenuProps, 'open' | 'editor' | 'children'>
    > {
    labels?: ImageMenuControlsProps['labels']
}

function isImageNode(node: any) {
    return node.type.name === 'image'
}

const ImageBubbleMenu = ({
    labels,
    ...controlledBubbleMenuProps
}: ImageBubbleMenuProps) => {
    const editor = useRichTextEditorContext()

    if (!editor?.isEditable) {
        return null
    }

    const isImageActive = ({ editor }: any) => {
        const { selection } = editor?.view?.state
        const { $from, to } = selection
        let isImage = false

        editor.view.state.doc.nodesBetween($from.pos, to, (node: any) => {
            if (isImageNode(node)) {
                isImage = true
                return false // Stop iteration if an image is found
            }
        })

        return isImage
    }

    const controls = <ImageMenuControls labels={labels} />
    return (
        <ControlledBubbleMenu
            editor={editor}
            open={isImageActive({ editor })}
            placement='top'
            {...controlledBubbleMenuProps}
        >
            {controls}
        </ControlledBubbleMenu>
    )
}

export default ImageBubbleMenu
