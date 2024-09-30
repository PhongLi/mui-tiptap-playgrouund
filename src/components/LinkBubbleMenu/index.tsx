import { Box } from '@mui/material'
import type { Except } from 'type-fest'

import ControlledBubbleMenu, {
    type ControlledBubbleMenuProps,
} from '@/components/shared/ControlledBubbleMenu'
import {
    type LinkBubbleMenuHandlerStorage,
    LinkMenuState,
} from '@/extensions/LinkBubbleMenuHandler'
import { useRichTextEditorContext } from '@/store/context'

import EditLinkMenuContent, {
    type EditLinkMenuContentProps,
} from './EditLinkMenuContent'
import ViewLinkMenuContent, {
    type ViewLinkMenuContentProps,
} from './ViewLinkMenuContent'

export interface LinkBubbleMenuProps
    extends Partial<
        Except<ControlledBubbleMenuProps, 'open' | 'editor' | 'children'>
    > {
    labels?: ViewLinkMenuContentProps['labels'] &
        EditLinkMenuContentProps['labels']
}

export default function LinkBubbleMenu({
    labels,
    ...controlledBubbleMenuProps
}: LinkBubbleMenuProps) {
    const editor = useRichTextEditorContext()

    if (!editor?.isEditable) {
        return null
    }

    if (!('linkBubbleMenuHandler' in editor.storage)) {
        throw new Error(
            'You must add the LinkBubbleMenuHandler extension to the useEditor `extensions` array in order to use this component!',
        )
    }
    const handlerStorage = editor.storage
        .linkBubbleMenuHandler as LinkBubbleMenuHandlerStorage

    // Update the menu step if the bubble menu state has changed
    const menuState = handlerStorage.state

    let linkMenuContent = null
    if (menuState === LinkMenuState.VIEW_LINK_DETAILS) {
        linkMenuContent = (
            <ViewLinkMenuContent
                editor={editor}
                onCancel={editor.commands.closeLinkBubbleMenu}
                onEdit={editor.commands.editLinkInBubbleMenu}
                onRemove={() => {
                    // Remove the link and place the cursor at the end of the link (which
                    // requires "focus" to take effect)
                    editor
                        .chain()
                        .unsetLink()
                        .setTextSelection(editor.state.selection.to)
                        .focus()
                        .run()
                }}
                labels={labels}
            />
        )
    } else if (menuState === LinkMenuState.EDIT_LINK) {
        linkMenuContent = (
            <EditLinkMenuContent
                editor={editor}
                onCancel={editor.commands.closeLinkBubbleMenu}
                onSave={({ text, link }) => {
                    editor
                        .chain()
                        .extendMarkRange('link')
                        .insertContent({
                            type: 'text',
                            marks: [
                                {
                                    type: 'link',
                                    attrs: {
                                        href: link,
                                    },
                                },
                            ],
                            text: text,
                        })
                        .setLink({
                            href: link,
                        })
                        .focus()
                        .run()

                    editor.commands.closeLinkBubbleMenu()
                }}
                labels={labels}
            />
        )
    }

    console.log(linkMenuContent)
    return (
        <ControlledBubbleMenu
            editor={editor}
            open={menuState !== LinkMenuState.HIDDEN}
            {...handlerStorage.bubbleMenuOptions}
            {...controlledBubbleMenuProps}
        >
            <Box sx={{ p: theme => theme.spacing(1.5, 2, 0.5) }}>
                {linkMenuContent}
            </Box>
        </ControlledBubbleMenu>
    )
}
