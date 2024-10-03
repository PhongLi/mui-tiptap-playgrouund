import { useState } from 'react'

import { Table } from '@/icons'
import { useRichTextEditorContext } from '@/store/context'

import MenuButton, { type MenuButtonProps } from '../MenuButton'
import CreateTablePopover from './CreateTablePopover'

export type MenuButtonAddTableProps = Partial<MenuButtonProps>

export default function MenuButtonAddTable(props: MenuButtonAddTableProps) {
    const editor = useRichTextEditorContext()
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const createTable = (options: any) => {
        if (!props.disabled) {
            editor
                ?.chain()
                .focus()
                .insertTable({ ...options, withHeaderRow: false })
                .run()
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <MenuButton
                tooltipLabel='Insert table'
                IconComponent={Table}
                disabled={!editor?.isEditable || !editor?.can()?.insertTable()}
                onClick={handleOpen}
                {...props}
            />
            <CreateTablePopover
                anchorEl={anchorEl}
                handleClose={handleClose}
                createTable={createTable}
            />
        </>
    )
}
