import {
    Box,
    Popover,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

const createArray = (length: number) =>
    Array.from({ length }).map((_, index) => index + 1)

export interface GridSize {
    rows: number
    cols: number
}

export interface CreateTablePayload extends GridSize {
    withHeaderRow: boolean
}

export type CreateTablePopoverProps = {
    anchorEl: HTMLElement | null
    createTable: (payload: CreateTablePayload) => void
    handleClose: () => void
}

/** Default number of rows and columns for grids when creating a table */
export const TABLE_INIT_GRID_SIZE = 10 as const
/** Maximum number of rows and columns for grids when creating a table */
export const TABLE_MAX_GRID_SIZE = 10 as const
/** Minimum number of rows and columns for grids when creating a table */
export const TABLE_DEFAULT_SELECTED_GRID_SIZE = 2 as const

const TableCell = styled(Box)(({ theme }) => ({
    width: '16px',
    height: '16px',
    padding: '4px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '2px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&.active': {
        backgroundColor: theme.palette.text.primary,
    },
}))

function CreateTablePopover(props: CreateTablePopoverProps) {
    const [withHeaderRow] = useState<boolean>(true)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [tableGridSize, setTableGridSize] = useState<GridSize>({
        rows: TABLE_INIT_GRID_SIZE,
        cols: TABLE_INIT_GRID_SIZE,
    })

    const [selectedTableGridSize, setSelectedTableGridSize] =
        useState<GridSize>({
            rows: TABLE_DEFAULT_SELECTED_GRID_SIZE,
            cols: TABLE_DEFAULT_SELECTED_GRID_SIZE,
        })

    useEffect(() => {
        if (isMobile) {
            setTableGridSize({
                rows: TABLE_MAX_GRID_SIZE,
                cols: TABLE_MAX_GRID_SIZE,
            })
        } else {
            setTableGridSize({
                rows: TABLE_INIT_GRID_SIZE,
                cols: TABLE_INIT_GRID_SIZE,
            })
        }
    }, [isMobile])

    const open = Boolean(props.anchorEl)

    function selectTableGridSize(rows: number, cols: number): void {
        if (rows === tableGridSize.rows) {
            setTableGridSize(prev => ({
                ...prev,
                rows: Math.min(rows + 1, TABLE_MAX_GRID_SIZE),
            }))
        }

        if (cols === tableGridSize.cols) {
            setTableGridSize(prev => ({
                ...prev,
                cols: Math.min(cols + 1, TABLE_MAX_GRID_SIZE),
            }))
        }

        setSelectedTableGridSize({ rows, cols })
    }

    function onMouseDown(rows: number, cols: number) {
        props.createTable({ rows, cols, withHeaderRow })
        resetTableGridSize()
        props.handleClose()
    }

    function resetTableGridSize(): void {
        setTableGridSize({
            rows: isMobile ? TABLE_MAX_GRID_SIZE : TABLE_INIT_GRID_SIZE,
            cols: isMobile ? TABLE_MAX_GRID_SIZE : TABLE_INIT_GRID_SIZE,
        })

        setSelectedTableGridSize({
            rows: TABLE_DEFAULT_SELECTED_GRID_SIZE,
            cols: TABLE_DEFAULT_SELECTED_GRID_SIZE,
        })
    }

    return (
        <Popover
            open={open}
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box sx={{ p: 2 }}>
                <Box display='flex' flexDirection='column' gap={1}>
                    {createArray(tableGridSize.rows).map(row => (
                        <Box key={`r-${row}`} display='flex' gap={1}>
                            {createArray(tableGridSize.cols).map(col => (
                                <TableCell
                                    key={`c-${col}`}
                                    className={
                                        col <= selectedTableGridSize.cols &&
                                        row <= selectedTableGridSize.rows
                                            ? 'active'
                                            : ''
                                    }
                                    onMouseEnter={() =>
                                        selectTableGridSize(row, col)
                                    }
                                    onMouseDown={() => onMouseDown(row, col)}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
                <Typography
                    variant='body2'
                    align='center'
                    sx={{ mt: 2, color: 'text.secondary' }}
                >
                    {selectedTableGridSize.rows} x {selectedTableGridSize.cols}
                </Typography>
            </Box>
        </Popover>
    )
}

export default CreateTablePopover
