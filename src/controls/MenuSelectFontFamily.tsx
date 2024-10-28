import { MenuItem } from '@mui/material'
import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { Except } from 'type-fest'

import { useRichTextEditorContext } from '@/store/context'
import { getAttributesForEachSelected } from '@/utils/getAttributesForEachSelected'

import MenuSelect, { type MenuSelectProps } from './MenuSelect'

export type FontFamilySelectOption = {
    value: string
    label?: ReactNode
}

export type MenuSelectFontFamilyProps = Except<
    MenuSelectProps<string>,
    'value' | 'children'
> & {
    /**
     * Provide the list of font families to show as options.
     */
    options: FontFamilySelectOption[]

    unsetOptionLabel?: React.ReactNode

    hideUnsetOption?: boolean

    emptyLabel?: React.ReactNode
}

interface TextStyleAttrs extends ReturnType<Editor['getAttributes']> {
    fontFamily?: string | null
}

const classesPrefix = 'MenuSelectFontSize'
const classes = {
    selectInput: `${classesPrefix}-selectInput`,
}
const MULTIPLE_FAMILIES_SELECTED_VALUE = 'MULTIPLE'

/** A font-family selector for use with the Tiptap FontFamily extension.  */
export default function MenuSelectFontFamily({
    options,
    hideUnsetOption = false,
    unsetOptionLabel = 'Default',
    emptyLabel = 'Font',
    ...menuSelectProps
}: MenuSelectFontFamilyProps) {
    const editor = useRichTextEditorContext()

    // Determine if all of the selected content shares the same set font family.
    // Scenarios:
    // 1) If there is exactly one font family amongst the selected content and all
    //    of the selected content has the font family set, we'll show that as the
    //    current Selected value (as a user would expect).
    // 2) If there are multiple families used in the selected content or some
    //    selected content has font family set and other content does not, we'll
    //    assign the Select's `value` to a sentinel variable so that users can
    //    unset the families or can change to any given family.
    // 3) Otherwise (no font family is set in any selected content), we'll show the
    //    unsetOption as selected.
    const allCurrentTextStyleAttrs: TextStyleAttrs[] = editor
        ? getAttributesForEachSelected(editor.state, 'textStyle')
        : []
    const isTextStyleAppliedToEntireSelection = !!editor?.isActive('textStyle')
    const currentFontFamilies: string[] = allCurrentTextStyleAttrs.map(
        attrs => attrs.fontFamily ?? '', // Treat any null/missing font-family as ""
    )
    if (!isTextStyleAppliedToEntireSelection) {
        // If there is some selected content that does not have textStyle, we can
        // treat it the same as a selected textStyle mark with fontFamily set to
        // null or ""
        currentFontFamilies.push('')
    }
    const numUniqueCurrentFontFamilies = new Set(currentFontFamilies).size
    let currentFontFamily
    if (numUniqueCurrentFontFamilies === 1) {
        // There's exactly one font family selected, so show that
        currentFontFamily = currentFontFamilies[0]
    } else if (numUniqueCurrentFontFamilies > 1) {
        currentFontFamily = MULTIPLE_FAMILIES_SELECTED_VALUE
    } else {
        currentFontFamily = ''
    }

    return (
        <MenuSelect<string>
            onChange={event => {
                const value = event.target.value
                if (value) {
                    editor?.chain().setFontFamily(value).focus().run()
                } else {
                    editor?.chain().unsetFontFamily().focus().run()
                }
            }}
            disabled={
                // Pass an arbitrary value just to check `can()`
                !editor?.isEditable || !editor.can().setFontFamily('serif')
            }
            renderValue={value => {
                if (!value || value === MULTIPLE_FAMILIES_SELECTED_VALUE) {
                    return emptyLabel
                }
                return (
                    options.find(option => option.value === value)?.label ??
                    value
                )
            }}
            displayEmpty
            aria-label='Font families'
            tooltipTitle='Font'
            {...menuSelectProps}
            // We don't want to pass any non-string falsy values here, always falling
            // back to ""
            value={currentFontFamily || ''}
            inputProps={{
                ...menuSelectProps.inputProps,
                className: clsx(
                    classes.selectInput,
                    menuSelectProps.inputProps?.className,
                ),
            }}
            sx={{
                [`& .${classes.selectInput}`]: {
                    width: 55,
                },
            }}
        >
            {!hideUnsetOption && (
                // Allow users to unset the font-family
                <MenuItem value=''>{unsetOptionLabel}</MenuItem>
            )}

            <MenuItem
                style={{ display: 'none' }}
                value={MULTIPLE_FAMILIES_SELECTED_VALUE}
            />

            {options.map(fontFamilyOption => (
                <MenuItem
                    key={fontFamilyOption.value}
                    value={fontFamilyOption.value}
                >
                    <span style={{ fontFamily: fontFamilyOption.value }}>
                        {fontFamilyOption.label ?? fontFamilyOption.value}
                    </span>
                </MenuItem>
            ))}
        </MenuSelect>
    )
}
