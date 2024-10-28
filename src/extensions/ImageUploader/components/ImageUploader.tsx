import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/UploadFile'
import {
    Box,
    Button,
    IconButton,
    Popover,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import type { ChangeEvent, FormEvent, MouseEvent } from 'react'
import React, { useRef, useState } from 'react'

import { createImageUpload } from '@/plugin/image-upload'

const StyledUploaderWrapper = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1.5, 0),
    cursor: 'pointer',
}))

const ImageUploader: React.FC<NodeViewProps> = props => {
    const [link, setLink] = useState<string>('')
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [tabValue, setTabValue] = useState<string>('upload')
    const fileInput = useRef<HTMLInputElement>(null)

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        const files = event?.target?.files
        if (
            !props.editor ||
            props.editor.isDestroyed ||
            !files ||
            files.length === 0
        ) {
            return
        }
        const file = files[0]
        const uploadOptions = props.editor.extensionManager.extensions.find(
            (extension: any) => extension.name === 'imageUpload',
        )?.options

        const uploadFn = createImageUpload({
            validateFn: () => {
                return true
            },
            onUpload: uploadOptions.upload,
            postUpload: uploadOptions.postUpload,
        })
        uploadFn([file], props.editor.view, props.getPos())
    }

    function handleApplyLink(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        props.editor
            .chain()
            .setImage({ src: link })
            .deleteRange({ from: props.getPos(), to: props.getPos() })
            .focus()
            .run()
    }

    function handleDelete(e?: MouseEvent<HTMLButtonElement>) {
        e?.preventDefault()
        props.deleteNode()
    }

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        fileInput.current?.click()
    }

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return (
        <NodeViewWrapper data-drag-handle>
            <StyledUploaderWrapper direction='row' onClick={handlePopoverOpen}>
                <Stack
                    direction='row'
                    spacing={1}
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <UploadIcon fontSize='small' />
                    <Typography variant='body2' component='span'>
                        Insert Image
                    </Typography>
                </Stack>
                <IconButton size='small' onClick={handleDelete}>
                    <DeleteIcon fontSize='small' />
                </IconButton>
            </StyledUploaderWrapper>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ width: '400px', p: 1 }}>
                    <Tabs
                        value={tabValue}
                        onChange={(e, newValue) => setTabValue(newValue)}
                        variant='fullWidth'
                        aria-label='image upload tabs'
                    >
                        <Tab label='Upload' value='upload' />
                        <Tab label='From URL' value='link' />
                    </Tabs>

                    {tabValue === 'upload' && (
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={handleClick}
                                sx={{ height: 40 }}
                            >
                                Upload Image
                            </Button>
                            <input
                                type='file'
                                accept='image/*'
                                ref={fileInput}
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFile}
                            />
                        </Box>
                    )}

                    {tabValue === 'link' && (
                        <Stack
                            component='form'
                            onSubmit={handleApplyLink}
                            direction='row'
                            spacing={2}
                            sx={{ mt: 2, justifyContent: 'space-between' }}
                        >
                            <TextField
                                type='url'
                                autoFocus
                                value={link}
                                onChange={e => setLink(e.target.value)}
                                required
                                fullWidth
                                variant='outlined'
                                size='small'
                                label='Image URL'
                            />
                            <Button type='submit' variant='contained'>
                                Apply
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Popover>
        </NodeViewWrapper>
    )
}

export default ImageUploader
