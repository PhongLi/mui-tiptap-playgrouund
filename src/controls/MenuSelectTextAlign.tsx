import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import { MenuItem, type SelectChangeEvent } from '@mui/material'
import { styled } from '@mui/material/styles'
// eslint-disable-next-line import/no-extraneous-dependencies
import type { TextAlignOptions } from '@tiptap/extension-text-align'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import type { Except } from 'type-fest'

import { useRichTextEditorContext } from '@/store/context'

import { MENU_BUTTON_FONT_SIZE_DEFAULT } from './MenuButton'
import {
    MenuButtonTooltip,
    type MenuButtonTooltipProps,
} from './MenuButtonTooltip'
import MenuSelect, { type MenuSelectProps } from './MenuSelect'

export type TextAlignSelectOption = {
    value: string

    IconComponent: React.ElementType<{
        className: string
    }>

    label?: string

    shortcutKeys?: MenuButtonTooltipProps['shortcutKeys']
}

export type MenuSelectTextAlignProps = Except<
    MenuSelectProps<string>,
    'children'
> & {
    options?: TextAlignSelectOption[]

    alignmentOptions?: {
        alignment: string
        IconComponent: React.ElementType<{
            className: string
        }>
        label?: string
        shortcutKeys?: MenuButtonTooltipProps['shortcutKeys']
    }[]
    emptyLabel?: React.ReactNode
}

const classesPrefix = 'MenuSelect'
const classes = {
    selectInput: `${classesPrefix}-selectInput`,
    menuItem: `${classesPrefix}-menuItem`,
    menuButtonIcon: `${classesPrefix}-menuButtonIcon`,
    menuOption: `${classesPrefix}-menuOption`,
}

const StyledMenuSelect = styled(props => <MenuSelect {...props} />)(
    ({ theme }) => ({
        [`& .${classes.selectInput}`]: {
            width: MENU_BUTTON_FONT_SIZE_DEFAULT,
        },
        [`& .${classes.menuItem}`]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        [`& .${classes.menuButtonIcon}`]: {
            fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT,
            color: theme.palette.action.active,
        },
        [`& .${classes.menuOption}`]: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
        },
    }),
) as typeof MenuSelect

const DEFAULT_ALIGNMENT_OPTIONS: TextAlignSelectOption[] = [
    {
        value: 'left',
        label: 'Left',
        shortcutKeys: ['mod', 'Shift', 'L'],
        IconComponent: FormatAlignLeftIcon,
    },
    {
        value: 'center',
        label: 'Center',
        shortcutKeys: ['mod', 'Shift', 'E'],
        IconComponent: FormatAlignCenterIcon,
    },
    {
        value: 'right',
        label: 'Right',
        shortcutKeys: ['mod', 'Shift', 'R'],
        IconComponent: FormatAlignRightIcon,
    },
    {
        value: 'justify',
        label: 'Justify',
        shortcutKeys: ['mod', 'Shift', 'J'],
        IconComponent: FormatAlignJustifyIcon,
    },
]

export default function MenuSelectTextAlign({
    options = DEFAULT_ALIGNMENT_OPTIONS,
    emptyLabel = '',
    alignmentOptions,
    ...menuSelectProps
}: MenuSelectTextAlignProps) {
    const editor = useRichTextEditorContext()

    // Handle the deprecated name for the `options` prop if present
    options =
        alignmentOptions?.map(option => ({
            ...option,
            value: option.alignment,
        })) ?? options

    const handleAlignmentSelect: (event: SelectChangeEvent) => void =
        useCallback(
            event => {
                const alignment = event.target.value
                editor?.chain().setTextAlign(alignment).focus().run()
            },
            [editor],
        )

    // Figure out which settings the user has enabled with the heading extension
    const textAlignExtensionOptions = useMemo(() => {
        const textAlignExtension = editor?.extensionManager.extensions.find(
            extension => extension.name == 'textAlign',
        )
        return textAlignExtension?.options as TextAlignOptions | undefined
    }, [editor])

    const enabledAlignments: Set<TextAlignOptions['alignments'][0]> =
        useMemo(() => {
            return new Set(textAlignExtensionOptions?.alignments)
        }, [textAlignExtensionOptions])

    const selectedValue =
        Array.from(enabledAlignments).find(
            alignment => editor?.can()?.setTextAlign(alignment),
        ) ?? ''

    return (
        <StyledMenuSelect<string>
            onChange={handleAlignmentSelect}
            disabled={
                !editor?.isEditable ||
                !Array.from(enabledAlignments).some(
                    alignment => editor?.can()?.setTextAlign(alignment),
                )
            }
            // Override the rendering of the selected value so that we don't show
            // tooltips on hovering (like we do for the menu options)
            renderValue={value => {
                let content
                if (value) {
                    const alignmentOptionForValue = options.find(
                        option => option.value === value,
                    )
                    content = alignmentOptionForValue ? (
                        <alignmentOptionForValue.IconComponent
                            className={classes.menuButtonIcon}
                        />
                    ) : (
                        value
                    )
                } else {
                    content = emptyLabel
                }
                return <span className={classes.menuOption}>{content}</span>
            }}
            aria-label='Text alignments'
            tooltipTitle='Align'
            value={selectedValue}
            displayEmpty
            {...menuSelectProps}
            inputProps={{
                ...menuSelectProps.inputProps,
                className: clsx(
                    classes.selectInput,
                    menuSelectProps.inputProps?.className,
                ),
            }}
        >
            {options
                .filter(alignmentOption =>
                    enabledAlignments.has(alignmentOption.value),
                )
                .map(alignmentOption => (
                    <MenuItem
                        key={alignmentOption.value}
                        value={alignmentOption.value}
                        disabled={
                            !editor
                                ?.can?.()
                                ?.setTextAlign?.(alignmentOption.value)
                        }
                        className={classes.menuItem}
                    >
                        <MenuButtonTooltip
                            label={alignmentOption.label ?? ''}
                            shortcutKeys={alignmentOption.shortcutKeys}
                            placement='right'
                            contentWrapperClassName={classes.menuOption}
                        >
                            <alignmentOption.IconComponent
                                className={classes.menuButtonIcon}
                            />
                        </MenuButtonTooltip>
                    </MenuItem>
                ))}
        </StyledMenuSelect>
    )
}
