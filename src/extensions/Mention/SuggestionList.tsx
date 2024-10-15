import { List, ListItem, ListItemButton, Paper } from '@mui/material'
import type { MentionNodeAttrs } from '@tiptap/extension-mention'
import type { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import type { MentionSuggestion } from './Mention'

export type SuggestionListRef = {
    // For convenience using this SuggestionList from within the
    // mentionSuggestionOptions, we'll match the signature of SuggestionOptions's
    // `onKeyDown` returned in its `render` function
    onKeyDown: NonNullable<
        ReturnType<
            NonNullable<SuggestionOptions<MentionSuggestion>['render']>
        >['onKeyDown']
    >
}

export type SuggestionListProps = SuggestionProps<MentionSuggestion>

const SuggestionList = forwardRef<SuggestionListRef, SuggestionListProps>(
    (props, ref) => {
        const [selectedIndex, setSelectedIndex] = useState(0)

        const selectItem = (index: number) => {
            if (index >= props.items.length) {
                // Make sure we actually have enough items to select the given index. For
                // instance, if a user presses "Enter" when there are no options, the index will
                // be 0 but there won't be any items, so just ignore the callback here
                return
            }

            const suggestion = props.items[index]

            const mentionItem: MentionNodeAttrs = {
                id: suggestion.id,
                label: suggestion.label,
            }
            props.command(mentionItem)
        }

        const upHandler = () => {
            setSelectedIndex(
                (selectedIndex + props.items.length - 1) % props.items.length,
            )
        }

        const downHandler = () => {
            setSelectedIndex((selectedIndex + 1) % props.items.length)
        }

        const enterHandler = () => {
            selectItem(selectedIndex)
        }

        useEffect(() => setSelectedIndex(0), [props.items])

        useImperativeHandle(ref, () => ({
            onKeyDown: ({ event }) => {
                if (event.key === 'ArrowUp') {
                    upHandler()
                    return true
                }

                if (event.key === 'ArrowDown') {
                    downHandler()
                    return true
                }

                if (event.key === 'Enter') {
                    enterHandler()
                    return true
                }

                return false
            },
        }))

        return props.items.length > 0 ? (
            <Paper elevation={5}>
                <List
                    dense
                    sx={{
                        // In case there are contiguous stretches of long text that can't wrap:
                        overflow: 'hidden',
                    }}
                >
                    {props.items.map((item, index) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton
                                selected={index === selectedIndex}
                                onClick={() => selectItem(index)}
                            >
                                {item.label}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        ) : null
    },
)

SuggestionList.displayName = 'SuggestionList'

export default SuggestionList
