/* eslint-disable @next/next/no-img-element */
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import clsx from 'clsx'
import { clamp, isNumber, throttle } from 'lodash-es'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'

import {
    IMAGE_MAX_SIZE,
    IMAGE_MIN_SIZE,
    IMAGE_THROTTLE_WAIT_TIME,
} from '@/constants/extension'

interface Size {
    width: number
    height: number
}

const classPrefix = 'ImageView'
const classes = {
    body: `${classPrefix}-body`,
    bodyFocused: `${classPrefix}-body--focused`,
    bodyResizing: `${classPrefix}-body--resizing`,
    image: `${classPrefix}-image`,
    resizer: `${classPrefix}-resizer`,
    resizerHandler: `${classPrefix}-resizerHandler`,
}

const StyledImageView = styled(NodeViewWrapper)(({ theme }) => ({
    display: 'inline-block',
    float: 'none',
    maxWidth: '100%',
    lineHeight: 0,
    verticalAlign: 'baseline',
    userSelect: 'none',
    width: '100%',

    [`& .${classes.body}`]: {
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        clear: 'both',
        outline: 'transparent solid 2px',
        transition: 'all 0.2s ease-in',
        '&:hover': {
            outlineColor: theme.palette.primary.main,
        },
        [`&.${classes.bodyFocused}, &.${classes.bodyResizing}`]: {
            outlineColor: 'transparent',
        },
        [`& .${classes.image}`]: {
            margin: 0,
            cursor: 'pointer !important',
        },
    },
}))

const ImageResizer = styled(Box)(({ theme }) => ({
    [`&.${classes.resizer}`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        border: `1px dashed ${theme.palette.grey[200]}`,

        [`& .${classes.resizerHandler}`]: {
            position: 'absolute',
            zIndex: 2,
            boxSizing: 'border-box',
            display: 'block',
            width: 12,
            height: 12,
            border: `1px solid ${theme.palette.common.white}`,
            borderRadius: 2,
            backgroundColor: theme.palette.primary.main,
            '&.tl': {
                top: -6,
                left: -6,
                cursor: 'nw-resize',
            },
            '&.tr': {
                top: -6,
                right: -6,
                cursor: 'ne-resize',
            },
            '&.bl': {
                bottom: -6,
                left: -6,
                cursor: 'sw-resize',
            },
            '&.br': {
                right: -6,
                bottom: -6,
                cursor: 'se-resize',
            },
        },
    },
}))

const ResizeDirection = {
    TOP_LEFT: 'tl',
    TOP_RIGHT: 'tr',
    BOTTOM_LEFT: 'bl',
    BOTTOM_RIGHT: 'br',
}

export const ImageView: React.FC<NodeViewProps> = props => {
    const { node, editor, getPos, selected, updateAttributes } = props

    const [maxSize, setMaxSize] = useState<Size>({
        width: IMAGE_MAX_SIZE,
        height: IMAGE_MAX_SIZE,
    })

    const [originalSize, setOriginalSize] = useState({
        width: 0,
        height: 0,
    })

    const [resizeDirections] = useState<string[]>([
        ResizeDirection.TOP_LEFT,
        ResizeDirection.TOP_RIGHT,
        ResizeDirection.BOTTOM_LEFT,
        ResizeDirection.BOTTOM_RIGHT,
    ])

    const [resizing, setResizing] = useState<boolean>(false)

    const [resizerState, setResizerState] = useState({
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: '',
    })

    const { align } = node?.attrs

    const imgAttrs = useMemo(() => {
        const { src, alt, width: w, height: h } = node?.attrs

        const width = isNumber(w) ? `${w}px` : w
        const height = isNumber(h) ? `${h}px` : h
        return {
            src: src || undefined,
            alt: alt || undefined,
            style: {
                width: width || undefined,
                height: height || undefined,
            },
        }
    }, [node?.attrs])

    const imageMaxStyle = useMemo(() => {
        const {
            style: { width },
        } = imgAttrs

        return { width: width === '100%' ? width : undefined }
    }, [imgAttrs])

    const onImageLoad = (e: Record<string, any>) => {
        setOriginalSize({
            width: e.target.width,
            height: e.target.height,
        })
    }

    const selectImage = useCallback(() => {
        editor.commands.setNodeSelection(getPos())
    }, [editor, getPos])

    const getMaxSize = useCallback(
        throttle(() => {
            const { width } = getComputedStyle(editor.view.dom)
            setMaxSize(prev => {
                return {
                    ...prev,
                    width: Number.parseInt(width, 10),
                }
            })
        }, IMAGE_THROTTLE_WAIT_TIME),
        [editor],
    )

    const onMouseDown = (e: MouseEvent, dir: string) => {
        e.preventDefault()
        e.stopPropagation()

        const originalWidth = originalSize.width
        const originalHeight = originalSize.height
        const aspectRatio = originalWidth / originalHeight

        let width = Number(node.attrs.width)
        let height = Number(node.attrs.height)
        const maxWidth = maxSize.width

        if (width && !height) {
            width = width > maxWidth ? maxWidth : width
            height = Math.round(width / aspectRatio)
        } else if (height && !width) {
            width = Math.round(height * aspectRatio)
            width = width > maxWidth ? maxWidth : width
        } else if (!width && !height) {
            width = originalWidth > maxWidth ? maxWidth : originalWidth
            height = Math.round(width / aspectRatio)
        } else {
            width = width > maxWidth ? maxWidth : width
        }

        flushSync(() => {
            setResizing(true)

            setResizerState({
                x: e.clientX,
                y: e.clientY,
                w: width,
                h: height,
                dir,
            })
        })
    }

    const onMouseMove = useCallback(
        throttle((e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            if (!resizing) {
                return
            }

            const { x, w, dir } = resizerState

            const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1)

            const width = clamp(w + dx, IMAGE_MIN_SIZE, maxSize.width)
            const height = null

            updateAttributes({
                width,
                height,
            })
        }, IMAGE_THROTTLE_WAIT_TIME),
        [resizing, resizerState, maxSize, updateAttributes],
    )

    const onMouseUp = useCallback(
        (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!resizing) {
                return
            }

            flushSync(() => {
                setResizerState({
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                    dir: '',
                })
                setResizing(false)
            })

            selectImage()
        },
        [resizing, selectImage],
    )

    const onEvents = useCallback(() => {
        document?.addEventListener('mousemove', onMouseMove, true)
        document?.addEventListener('mouseup', onMouseUp, true)
    }, [onMouseMove, onMouseUp])

    const offEvents = useCallback(() => {
        document?.removeEventListener('mousemove', onMouseMove, true)
        document?.removeEventListener('mouseup', onMouseUp, true)
    }, [onMouseMove, onMouseUp])

    useEffect(() => {
        if (resizing) {
            onEvents()
        } else {
            offEvents()
        }

        return () => {
            offEvents()
        }
    }, [resizing, onEvents, offEvents])

    const resizeOb: ResizeObserver = useMemo(() => {
        return new ResizeObserver(() => getMaxSize())
    }, [getMaxSize])

    useEffect(() => {
        resizeOb.observe(editor.view.dom)

        return () => {
            resizeOb.disconnect()
        }
    }, [editor.view.dom, resizeOb])

    return (
        <StyledImageView
            style={{
                ...imageMaxStyle,
                textAlign: align,
            }}
        >
            <Box
                draggable='true'
                data-drag-handle
                className={clsx(
                    classes.body,
                    selected && classes.bodyFocused,
                    resizing && classes.bodyResizing,
                )}
                style={imageMaxStyle}
            >
                <img
                    src={imgAttrs.src}
                    alt={imgAttrs.alt}
                    style={imgAttrs.style}
                    height='auto'
                    className={classes.image}
                    onLoad={onImageLoad}
                    onClick={selectImage}
                />
                {editor.view.editable && (selected || resizing) && (
                    <ImageResizer className={classes.resizer}>
                        {resizeDirections?.map(direction => {
                            return (
                                <span
                                    key={`image-dir-${direction}`}
                                    className={clsx(
                                        classes.resizerHandler,
                                        `${classes.resizerHandler} ${direction}`,
                                    )}
                                    onMouseDown={(e: any) =>
                                        onMouseDown(e, direction)
                                    }
                                ></span>
                            )
                        })}
                    </ImageResizer>
                )}
            </Box>
        </StyledImageView>
    )
}
