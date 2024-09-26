import FormatIndentDecrease from '@mui/icons-material/FormatIndentDecrease'

import { getOutdent } from '@/extensions/Indent'
import { useRichTextEditorContext } from '@/store/context'

import MenuButton, { type MenuButtonProps } from './MenuButton'

export type MenuButtonUnindentProps = Partial<MenuButtonProps>

export default function MenuButtonUnindent(props: MenuButtonUnindentProps) {
    const editor = useRichTextEditorContext()
    return (
        <MenuButton
            tooltipLabel='Unindent'
            tooltipShortcutKeys={['Shift', 'Tab']}
            IconComponent={FormatIndentDecrease}
            disabled={!editor?.isEditable}
            onClick={() => editor && getOutdent(false)({ editor })}
            {...props}
        />
    )
}
