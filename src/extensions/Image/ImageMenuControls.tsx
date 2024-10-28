import DeleteIcon from '@mui/icons-material/Delete'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { deleteSelection } from '@tiptap/pm/commands'
import { TbLetterLSmall, TbLetterMSmall, TbLetterSSmall } from 'react-icons/tb'

import { IMAGE_SIZE } from '@/constants/extension'
import MenuButton from '@/controls/MenuButton'
import MenuControlsContainer from '@/controls/MenuControlsContainer'
import { AlignImageCenter, AlignImageLeft, AlignImageRight } from '@/icons'
import { useRichTextEditorContext } from '@/store/context'

export type ImageMenuControlsProps = {
    className?: string
    labels?: {
        sizeS?: string
        sizeM?: string
        sizeL?: string
        left?: string
        center?: string
        right?: string
        deleteImage?: string
    }
}

type BubbleImageType = 'sizeS' | 'sizeM' | 'sizeL'
type ImageAlignments = 'left' | 'center' | 'right'

const MenuDivider = styled(props => (
    <Divider orientation='vertical' {...props} />
))(({ theme }) => ({
    height: 18,
    margin: theme.spacing(0, 0.5),
})) as typeof Divider

export default function ImageMenuControls({
    className,
    labels,
}: ImageMenuControlsProps) {
    const editor = useRichTextEditorContext()
    const defaultLabels: Required<ImageMenuControlsProps['labels']> = {
        sizeS: 'Small',
        sizeM: 'Medium',
        sizeL: 'Large',
        left: 'Align Left',
        center: 'Align Center',
        right: 'Align Right',
        deleteImage: 'Delete Image',
    }

    const sizeTypes: BubbleImageType[] = ['sizeS', 'sizeM', 'sizeL']
    const alignmentTypes: ImageAlignments[] = ['left', 'center', 'right']

    const Icons: Record<BubbleImageType | ImageAlignments, any> = {
        sizeS: TbLetterSSmall,
        sizeM: TbLetterMSmall,
        sizeL: TbLetterLSmall,
        left: AlignImageLeft,
        center: AlignImageCenter,
        right: AlignImageRight,
    }

    return (
        <MenuControlsContainer debounced className={className}>
            {sizeTypes.map(size => (
                <MenuButton
                    key={`image-${size}`}
                    tooltipLabel={labels?.[size] ?? defaultLabels[size]}
                    IconComponent={Icons[size]}
                    onClick={() =>
                        editor?.commands?.updateImage({
                            width: IMAGE_SIZE[size],
                        })
                    }
                    disabled={
                        !editor?.can().updateImage({ width: IMAGE_SIZE[size] })
                    }
                    selected={editor?.isActive('image', {
                        width: IMAGE_SIZE[size],
                    })}
                />
            ))}
            <MenuDivider />
            {alignmentTypes.map(al => (
                <MenuButton
                    key={`align-image-${al}`}
                    tooltipLabel={labels?.[al] ?? defaultLabels[al]}
                    IconComponent={Icons[al]}
                    onClick={() => editor?.commands?.setAlignImage(al)}
                    disabled={
                        !editor?.isEditable || !editor?.can().setAlignImage(al)
                    }
                    selected={editor?.isActive({ align: al })}
                />
            ))}
            <MenuDivider />
            <MenuButton
                tooltipLabel={labels?.deleteImage ?? 'Delete Image'}
                IconComponent={DeleteIcon}
                onClick={() =>
                    editor &&
                    deleteSelection(editor?.view?.state, editor?.view?.dispatch)
                }
                disabled={
                    !editor?.isEditable || !editor.can().deleteSelection()
                }
            />
        </MenuControlsContainer>
    )
}
