import { Extension, getAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

import type { LinkBubbleMenuProps } from '@/components/LinkBubbleMenu'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linkBubbleMenu: {
            openLinkBubbleMenu: (
                options?: Partial<LinkBubbleMenuProps>,
            ) => ReturnType

            editLinkInBubbleMenu: () => ReturnType
            closeLinkBubbleMenu: () => ReturnType
        }
    }
}

export enum LinkMenuState {
    HIDDEN,
    VIEW_LINK_DETAILS,
    EDIT_LINK,
}

export type LinkBubbleMenuHandlerStorage = {
    state: LinkMenuState
    bubbleMenuOptions: Partial<LinkBubbleMenuProps> | undefined
}

const LinkBubbleMenuHandler = Extension.create<
    undefined,
    LinkBubbleMenuHandlerStorage
>({
    name: 'linkBubbleMenuHandler',

    addStorage() {
        return {
            state: LinkMenuState.HIDDEN,
            bubbleMenuOptions: undefined,
        }
    },

    addCommands() {
        return {
            openLinkBubbleMenu:
                (bubbleMenuOptions = {}) =>
                ({ editor, chain, dispatch }) => {
                    const currentMenuState = this.storage.state

                    console.log(
                        currentMenuState,
                        LinkMenuState.VIEW_LINK_DETAILS,
                    )
                    let newMenuState: LinkMenuState
                    if (editor.isActive('link')) {
                        if (
                            currentMenuState !== LinkMenuState.VIEW_LINK_DETAILS
                        ) {
                            chain().extendMarkRange('link').focus().run()
                        }

                        newMenuState = LinkMenuState.VIEW_LINK_DETAILS
                    } else {
                        // Otherwise open the edit link menu for the user to add a new link
                        newMenuState = LinkMenuState.EDIT_LINK
                    }

                    if (dispatch) {
                        this.storage.state = newMenuState
                        this.storage.bubbleMenuOptions = bubbleMenuOptions
                    }

                    return true
                },

            editLinkInBubbleMenu:
                () =>
                ({ dispatch }) => {
                    const currentMenuState = this.storage.state
                    const newMenuState = LinkMenuState.EDIT_LINK
                    if (currentMenuState === newMenuState) {
                        return false
                    }

                    if (dispatch) {
                        this.storage.state = newMenuState
                    }

                    return true
                },

            closeLinkBubbleMenu:
                () =>
                ({ commands, dispatch }) => {
                    const currentMenuState = this.storage.state
                    if (currentMenuState === LinkMenuState.HIDDEN) {
                        return false
                    }

                    // Re-focus on the editor (e.g. for re-selection) since the user was
                    // previously editing and has now canceled
                    commands.focus()

                    if (dispatch) {
                        this.storage.state = LinkMenuState.HIDDEN
                    }

                    return true
                },
        }
    },

    onSelectionUpdate() {
        if (this.storage.state === LinkMenuState.EDIT_LINK) {
            this.editor.commands.closeLinkBubbleMenu()
        } else if (
            this.storage.state === LinkMenuState.VIEW_LINK_DETAILS &&
            !this.editor.isActive('link')
        ) {
            this.editor.commands.closeLinkBubbleMenu()
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Shift-u': () => {
                this.editor.commands.openLinkBubbleMenu()
                return true
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('handleClickLinkForMenu'),
                props: {
                    handleClick: (view, pos, event) => {
                        const attrs = getAttributes(view.state, 'link')
                        const link = (event.target as HTMLElement).closest('a')
                        if (
                            link &&
                            attrs.href &&
                            this.storage.state === LinkMenuState.HIDDEN
                        ) {
                            this.editor.commands.openLinkBubbleMenu()
                        } else {
                            this.editor.commands.closeLinkBubbleMenu()
                        }
                        return false
                    },
                },
            }),
        ]
    },
})

export default LinkBubbleMenuHandler
