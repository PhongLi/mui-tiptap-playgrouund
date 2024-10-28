import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate'

import { useRichTextEditorContext } from '@/store/context'

import MenuButton, { type MenuButtonProps } from './MenuButton'

export type MenuButtonUploadImageProps = Partial<MenuButtonProps>

export default function MenuButtonUploadImage(
    props: MenuButtonUploadImageProps,
) {
    const editor = useRichTextEditorContext()
    return (
        <MenuButton
            tooltipLabel='Insert image'
            IconComponent={AddPhotoAlternate}
            disabled={!editor?.can()?.setImage?.({})}
            onClick={() => editor?.commands?.setImageUpload()}
            {...props}
        />
    )
}
