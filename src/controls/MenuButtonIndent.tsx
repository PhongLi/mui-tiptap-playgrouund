import FormatIndentIncrease from '@mui/icons-material/FormatIndentIncrease'

import { getIndent } from '@/extensions/Indent'
import { useRichTextEditorContext } from '@/store/context'

import MenuButton, { type MenuButtonProps } from './MenuButton'

export type MenuButtonIndentProps = Partial<MenuButtonProps>

export default function MenuButtonIndent(props: MenuButtonIndentProps) {
    const editor = useRichTextEditorContext()
    return (
        <MenuButton
            tooltipLabel='Indent'
            tooltipShortcutKeys={['Tab']}
            IconComponent={FormatIndentIncrease}
            disabled={!editor?.isEditable}
            onClick={() => editor && getIndent()({ editor })}
            {...props}
        />
    )
}
