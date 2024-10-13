import AddIcon from '@mui/icons-material/Add'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { IconButton, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React, { useMemo } from 'react'

const StyledNodeViewWrapper = styled(NodeViewWrapper)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    width: '100%',
    position: 'relative',
}))

const LeftMenu = styled(Stack)(() => ({
    height: '100%',
    paddingTop: 2,
}))

const StyledIconButton = styled(IconButton)(() => ({
    transition: 'all 0.2s ease-in',
    opacity: 0,
    '&:hover': {
        opacity: 1,
    },
    '.group:hover &': {
        opacity: 1,
    },
}))

const StyledNodeViewContent = styled(NodeViewContent, {
    shouldForwardProp: prop => prop !== 'isTable',
})<{ isTable: boolean }>(({ theme, isTable }) => ({
    width: '100%',
    marginLeft: isTable ? theme.spacing(6) : 0,
}))

export const DBlockNodeView: React.FC<NodeViewProps> = ({
    node,
    getPos,
    editor,
}) => {
    const isTable = useMemo(() => {
        const { content } = node.content as any
        return content[0].type.name === 'table'
    }, [node.content])

    const createNodeAfter = () => {
        const pos = getPos() + node.nodeSize
        editor.commands.insertContentAt(pos, {
            type: 'dBlock',
            content: [
                {
                    type: 'paragraph',
                },
            ],
        })
    }

    return (
        <StyledNodeViewWrapper className='group'>
            <LeftMenu direction='row' aria-label='left-menu'>
                <StyledIconButton onClick={createNodeAfter} size='small'>
                    <AddIcon fontSize='inherit' />
                </StyledIconButton>
                <StyledIconButton
                    size='small'
                    contentEditable={false}
                    draggable
                    data-drag-handle
                    sx={{ cursor: 'grab' }}
                >
                    <DragIndicatorIcon fontSize='inherit' />
                </StyledIconButton>
            </LeftMenu>

            <StyledNodeViewContent isTable={isTable} />
        </StyledNodeViewWrapper>
    )
}
