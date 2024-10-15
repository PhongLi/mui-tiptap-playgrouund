import { Box, Button, DialogActions, Link } from '@mui/material'
import { type Editor, getMarkRange, getMarkType } from '@tiptap/core'
import truncate from 'lodash/truncate'
import type { ReactNode } from 'react'

import useKeyDown from '@/hooks/useKeyDown'
import truncateMiddle from '@/utils/truncateMiddle'

export type ViewLinkMenuContentProps = {
    editor: Editor
    onCancel: () => void
    onEdit: () => void
    onRemove: () => void
    /** Override default text content/labels used within the component. */
    labels?: {
        /** Content shown in the button used to start editing the link. */
        viewLinkEditButtonLabel?: ReactNode
        /** Content shown in the button used to remove the link. */
        viewLinkRemoveButtonLabel?: ReactNode
    }
}

/** Shown when a user is viewing the details of an existing Link for Tiptap. */
export default function ViewLinkMenuContent({
    editor,
    onCancel,
    onEdit,
    onRemove,
    labels,
}: ViewLinkMenuContentProps) {
    const linkRange = getMarkRange(
        editor.state.selection.$to,
        getMarkType('link', editor.schema),
    )
    const linkText = linkRange
        ? editor.state.doc.textBetween(linkRange.from, linkRange.to)
        : ''

    const currentHref =
        (editor.getAttributes('link').href as string | undefined) ?? ''

    // If the user presses escape, we should cancel
    useKeyDown('Escape', onCancel)

    return (
        <>
            <Box sx={{ overflowWrap: 'anywhere' }}>
                {truncate(linkText, {
                    length: 50,
                    omission: '…',
                })}
            </Box>

            <Box sx={{ overflowWrap: 'anywhere' }}>
                <Link href={currentHref} target='_blank' rel='noopener'>
                    {truncateMiddle(currentHref, 50)}
                </Link>
            </Box>

            <DialogActions sx={{ px: 0 }}>
                <Button
                    onClick={onEdit}
                    color='primary'
                    variant='outlined'
                    size='small'
                >
                    {labels?.viewLinkEditButtonLabel ?? 'Edit'}
                </Button>
                <Button
                    onClick={onRemove}
                    color='error'
                    variant='outlined'
                    size='small'
                >
                    {labels?.viewLinkRemoveButtonLabel ?? 'Remove'}
                </Button>
            </DialogActions>
        </>
    )
}
