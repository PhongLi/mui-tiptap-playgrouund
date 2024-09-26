import FormatSize from '@mui/icons-material/FormatSize'
import { MenuItem } from '@mui/material'
import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { Except } from 'type-fest'

import type { FontSizeAttrs } from '@/extensions/FontSize'
import { useRichTextEditorContext } from '@/store/context'

import { getAttributesForEachSelected } from '../utils/getAttributesForEachSelected'
import { MENU_BUTTON_FONT_SIZE_DEFAULT } from './MenuButton'
import MenuSelect, { type MenuSelectProps } from './MenuSelect'

export type FontSizeSelectOptionObject = {
    /**
     * The underlying `font-size` CSS value string, which can be any valid CSS
     * font-size (https://developer.mozilla.org/en-US/docs/Web/CSS/font-size); ex:
     * "12px", "2rem", "small".
     *
     * If a custom `label` is not provided for an option, a value that include
     * pixels like "12px" will be displayed in this component as just "12" for
     * simplicity (but it will still properly set the fontSize using the original
     * "12px" value).
     */
    value: string
    /**
     * A customized user-facing label to show for this font-size value. If not
     * provided, uses the `value` as the option label (with any "px" removed).
     */
    label?: ReactNode
}

/**
 * A size option shown in the select dropdown. If given as a string, that string
 * is used both as the CSS `font-size` value and the user-facing `label`
 * (equivalent to using an object with just the `value` set as that string).
 */
export type FontSizeSelectOption = string | FontSizeSelectOptionObject

export type MenuSelectFontSizeProps = Except<
    MenuSelectProps<string>,
    'value' | 'children'
> & {
    /**
     * Override the list of the size option strings shown in the dropdown.
     */
    options?: FontSizeSelectOption[]
    /**
     * Override the label content shown for the Select's MenuItem option that
     * allows a user to unset the font-size of the selected text. If not provided,
     * uses "Default" as the displayed text. To hide this select option entirely,
     * set `hideUnsetOption` to true.
     */
    unsetOptionLabel?: ReactNode
    hideUnsetOption?: boolean
    /**
     * What to render in the Select when either no font-size is currently set for
     * the selected text, or when multiple different values are set. By default,
     * uses the FormatSize MUI icon.
     */
    emptyLabel?: React.ReactNode
}

const classesPrefix = 'MenuSelectFontSize'
const classes = {
    selectInput: `${classesPrefix}-selectInput`,
}

const DEFAULT_FONT_SIZE_SELECT_OPTIONS: MenuSelectFontSizeProps['options'] = [
    '8px',
    '9px',
    '10px',
    '11px',
    '12px',
    '14px',
    '16px',
    '18px',
    '24px',
    '30px',
    '36px',
    '48px',
    '60px',
    '72px',
    '96px',
]

interface TextStyleAttrs
    extends ReturnType<Editor['getAttributes']>,
        FontSizeAttrs {}

function stripPxFromValue(value: string): string {
    return value.replace('px', '')
}

const MULTIPLE_SIZES_SELECTED_VALUE = 'MULTIPLE'

/** A font-size selector for use with the mui-tiptap FontSize extension.  */
export default function MenuSelectFontSize({
    options = DEFAULT_FONT_SIZE_SELECT_OPTIONS,
    hideUnsetOption = false,
    unsetOptionLabel = 'Default',
    emptyLabel,
    ...menuSelectProps
}: MenuSelectFontSizeProps) {
    const editor = useRichTextEditorContext()

    // Handle deprecated legacy names for some props:
    const optionObjects: FontSizeSelectOptionObject[] = (options ?? []).map(
        option => (typeof option === 'string' ? { value: option } : option),
    )

    // Determine if all of the selected content shares the same set font size.
    // Scenarios:
    // 1) If there is exactly one font size amongst the selected content and all
    //    of the selected content has the font size set, we'll show that as the
    //    current Selected value (as a user would expect).
    // 2) If there are multiple sizes used in the selected content or some
    //    selected content has font size set and other content does not, we'll
    //    assign the Select's `value` to a sentinel variable so that users can
    //    unset the sizes or can change to any given size.
    // 3) Otherwise (no font size is set in any selected content), we'll show the
    //    unsetOption as selected.
    const allCurrentTextStyleAttrs: TextStyleAttrs[] = editor
        ? getAttributesForEachSelected(editor.state, 'textStyle')
        : []
    const isTextStyleAppliedToEntireSelection = !!editor?.isActive('textStyle')
    const currentFontSizes: string[] = allCurrentTextStyleAttrs.map(
        attrs => attrs.fontSize ?? '', // Treat any null/missing font-size as ""
    )
    if (!isTextStyleAppliedToEntireSelection) {
        // If there is some selected content that does not have textStyle, we can
        // treat it the same as a selected textStyle mark with fontSize set to null
        // or ""
        currentFontSizes.push('')
    }
    const numUniqueCurrentFontSizes = new Set(currentFontSizes).size

    let currentFontSize
    if (numUniqueCurrentFontSizes === 1) {
        // There's exactly one font size selected, so show that
        currentFontSize = currentFontSizes[0]
    } else if (numUniqueCurrentFontSizes > 1) {
        // There are multiple font sizes (either explicitly, or because some of the
        // selection has a font size set and some does not). This is similar to what
        // Microsoft Word and Google Docs do, for instance, showing the font size
        // input as blank when there are multiple values. If we simply set
        // currentFontSize as "" here, then the "unset option" would show as
        // selected, which would prevent the user from unsetting the font sizes
        // for the selected content (since Select onChange does not fire when the
        // currently selected option is chosen again).
        currentFontSize = MULTIPLE_SIZES_SELECTED_VALUE
    } else {
        // Show as unset (empty), since there are no font sizes in any of the
        // selected content. This will show the "unset option" with the
        // unsetOptionLabel as selected, if `hideUnsetOption` is false.
        currentFontSize = ''
    }

    return (
        <MenuSelect<string>
            onChange={event => {
                const value = event.target.value
                if (value) {
                    editor?.chain().setFontSize(value).focus().run()
                } else {
                    editor?.chain().unsetFontSize().focus().run()
                }
            }}
            disabled={!editor?.isEditable || !editor.can().setFontSize('12px')}
            renderValue={value => {
                if (!value || value === MULTIPLE_SIZES_SELECTED_VALUE) {
                    return (
                        emptyLabel ?? (
                            <FormatSize
                                sx={{ fontSize: MENU_BUTTON_FONT_SIZE_DEFAULT }}
                            />
                        )
                    )
                }
                return stripPxFromValue(value)
            }}
            displayEmpty
            aria-label='Font sizes'
            tooltipTitle='Font size'
            {...menuSelectProps}
            // We don't want to pass any non-string falsy values here, always falling
            // back to ""
            value={currentFontSize || ''}
            inputProps={{
                ...menuSelectProps.inputProps,
                className: clsx(
                    classes.selectInput,
                    menuSelectProps.inputProps?.className,
                ),
            }}
            sx={{
                [`& .${classes.selectInput}`]: {
                    width: 17,
                    display: 'flex',
                    alignItems: 'center',
                },
            }}
        >
            {!hideUnsetOption && (
                // Allow users to unset the font size
                <MenuItem value=''>{unsetOptionLabel}</MenuItem>
            )}

            <MenuItem
                style={{ display: 'none' }}
                value={MULTIPLE_SIZES_SELECTED_VALUE}
            />

            {optionObjects.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label ?? stripPxFromValue(option.value)}
                </MenuItem>
            ))}
        </MenuSelect>
    )
}
