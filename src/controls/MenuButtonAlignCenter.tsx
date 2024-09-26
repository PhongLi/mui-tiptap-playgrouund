import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'

import { useRichTextEditorContext } from '@/store/context'

import MenuButton, { type MenuButtonProps } from './MenuButton'

export type MenuButtonAlignCenterProps = Partial<MenuButtonProps>

export default function MenuButtonAlignCenter(
    props: MenuButtonAlignCenterProps,
) {
    const editor = useRichTextEditorContext()

    return (
        <MenuButton
            tooltipLabel='Center align'
            tooltipShortcutKeys={['mod', 'Shift', 'E']}
            IconComponent={FormatAlignCenterIcon}
            selected={editor?.isActive({ textAlign: 'center' }) ?? false}
            disabled={!editor?.can().setTextAlign?.('center')}
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            {...props}
        />
    )
}
