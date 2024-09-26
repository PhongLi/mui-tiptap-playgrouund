import { Divider, MenuItem, type SelectChangeEvent } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { Heading, Level } from '@tiptap/extension-heading'
import clsx from 'clsx'
import { type ReactNode, useCallback, useMemo } from 'react'
import type { Except } from 'type-fest'

import { useRichTextEditorContext } from '@/store/context'
import { getAttributesForEachSelected } from '@/utils/getAttributesForEachSelected'

import { MenuButtonTooltip } from './MenuButtonTooltip'
import MenuSelect, { type MenuSelectProps } from './MenuSelect'

export type MenuSelectHeadingProps = Except<
    MenuSelectProps<HeadingOptionValue | ''>,
    'value' | 'children'
> & {
    /**
     * Override the default labels for the select options. For any value that
     * is omitted in this object, it falls back to the default content.
     */
    labels?: {
        /** Label shown for the "Paragraph" (non-heading) option. */
        paragraph?: ReactNode
        /** Label shown for the level 1 heading (h1) option. */
        heading1?: ReactNode
        /** Label shown for the level 2 heading (h2) option. */
        heading2?: ReactNode
        /** Label shown for the level 3 heading (h3) option. */
        heading3?: ReactNode
        /** Label shown for the level 4 heading (h4) option. */
        heading4?: ReactNode
        /** Label shown for the level 5 heading (h5) option. */
        heading5?: ReactNode
        /** Label shown for the level 6 heading (h6) option. */
        heading6?: ReactNode
        /**
         * Label shown when the user is currently on a non-paragraph, non-heading.
         * By default shows "Change to…" in italics, since choosing a new option
         * will change the node type to one of the given heading/paragraph types.
         */
        empty?: ReactNode
        /** @deprecated Use `labels.empty` instead. */
        emptyValue?: React.ReactNode
    }
    /**
     * Whether to hide the shortcut key tooltips for each heading option. By
     * default false.
     */
    hideShortcuts?: boolean
}

const classesPrefix = 'MenuSelectHeading'
const classes = {
    selectInput: `${classesPrefix}-selectInput`,
    menuOption: `${classesPrefix}-menuOption`,
    headingOption: `${classesPrefix}-headingOption`,
    headingOption1: `${classesPrefix}-headingOption1`,
    headingOption2: `${classesPrefix}-headingOption2`,
    headingOption3: `${classesPrefix}-headingOption3`,
    headingOption4: `${classesPrefix}-headingOption4`,
    headingOption5: `${classesPrefix}-headingOption5`,
    headingOption6: `${classesPrefix}-headingOption6`,
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    [`& .${classes.menuOption}`]: {
        display: 'block',
        width: '100%',
    },
    [`& .${classes.headingOption}`]: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        fontWeight: 'bold',
    },
    [`& .${classes.headingOption1}`]: {
        fontSize: theme.typography.h3.fontSize,
    },
    [`& .${classes.headingOption2}`]: {
        fontSize: theme.typography.h4.fontSize,
    },
    [`& .${classes.headingOption3}`]: {
        fontSize: theme.typography.h5.fontSize,
    },
    [`& .${classes.headingOption4}`]: {
        fontSize: theme.typography.h6.fontSize,
    },
    [`& .${classes.headingOption5}`]: {
        fontSize: theme.typography.subtitle1.fontSize,
    },
}))

const HEADING_OPTION_VALUES = {
    Paragraph: 'Paragraph',
    Heading1: 'Heading 1',
    Heading2: 'Heading 2',
    Heading3: 'Heading 3',
    Heading4: 'Heading 4',
    Heading5: 'Heading 5',
    Heading6: 'Heading 6',
} as const

export type HeadingOptionValue =
    (typeof HEADING_OPTION_VALUES)[keyof typeof HEADING_OPTION_VALUES]

const HEADING_OPTION_VALUE_TO_LEVEL = {
    [HEADING_OPTION_VALUES.Heading1]: 1,
    [HEADING_OPTION_VALUES.Heading2]: 2,
    [HEADING_OPTION_VALUES.Heading3]: 3,
    [HEADING_OPTION_VALUES.Heading4]: 4,
    [HEADING_OPTION_VALUES.Heading5]: 5,
    [HEADING_OPTION_VALUES.Heading6]: 6,
} as const
const LEVEL_TO_HEADING_OPTION_VALUE = {
    1: HEADING_OPTION_VALUES.Heading1,
    2: HEADING_OPTION_VALUES.Heading2,
    3: HEADING_OPTION_VALUES.Heading3,
    4: HEADING_OPTION_VALUES.Heading4,
    5: HEADING_OPTION_VALUES.Heading5,
    6: HEADING_OPTION_VALUES.Heading6,
} as const

export default function MenuSelectHeading({
    labels,
    hideShortcuts = false,
    ...menuSelectProps
}: MenuSelectHeadingProps) {
    const editor = useRichTextEditorContext()

    const handleHeadingType: (
        event: SelectChangeEvent<'' | HeadingOptionValue>,
    ) => void = useCallback(
        event => {
            const value = event.target.value
            if (value === HEADING_OPTION_VALUES.Paragraph) {
                editor?.chain().setParagraph().focus().run()
            } else if (value in HEADING_OPTION_VALUE_TO_LEVEL) {
                editor
                    ?.chain()
                    .setHeading({
                        level: HEADING_OPTION_VALUE_TO_LEVEL[
                            value as keyof typeof HEADING_OPTION_VALUE_TO_LEVEL
                        ],
                    })
                    .focus()
                    .run()
            }
        },
        [editor],
    )

    let selectedValue: HeadingOptionValue | '' = ''
    let currentLevel: number | undefined

    if (editor?.isActive('paragraph')) {
        selectedValue = HEADING_OPTION_VALUES.Paragraph
    } else if (editor?.isActive('heading')) {
        const currentNodeHeadingAttributes = getAttributesForEachSelected(
            editor.state,
            'heading',
        )
        const currentNodeLevels = currentNodeHeadingAttributes.map(
            attrs => attrs.level as number | undefined,
        )
        const numCurrentNodeLevels = new Set(currentNodeLevels).size
        // We only want to show a selected level value if all of the selected nodes
        // have the same level. (That way a user can properly change the level when
        // selecting across two separate headings, and so we don't mistakenly just
        // show the first of the selected nodes' levels and not allow changing all
        // selected to that heading level. See
        // https://github.com/ueberdosis/tiptap/issues/3481.)
        currentLevel =
            numCurrentNodeLevels === 1 ? currentNodeLevels[0] : undefined
        if (currentLevel && currentLevel in LEVEL_TO_HEADING_OPTION_VALUE) {
            selectedValue =
                LEVEL_TO_HEADING_OPTION_VALUE[
                    currentLevel as keyof typeof LEVEL_TO_HEADING_OPTION_VALUE
                ]
        }
    }

    const isCurrentlyParagraphOrHeading = selectedValue !== ''
    const canSetParagraph = !!editor?.can().setParagraph()

    // Figure out which settings the user has enabled with the heading extension
    const enabledHeadingLevels: Set<Level> = useMemo(() => {
        const headingExtension = editor?.extensionManager.extensions.find(
            (extension): extension is typeof Heading =>
                extension.name == 'heading',
        )
        return new Set(headingExtension?.options.levels ?? [])
    }, [editor])

    // In determining whether we can set a heading, at least one heading level
    // must be enabled in the extension configuration. We have to pass a level
    // when running `can().setHeading()`, so we just use the first one that is
    // enabled. And since some Tiptap versions return `false` for
    // `can().setHeading()` when passing the current level, we also have to check
    // whether that arbitrary first level is the `currentLevel` (see
    // https://github.com/sjdemartini/mui-tiptap/issues/197).
    const firstEnabledHeadingResult = enabledHeadingLevels.values().next()
    const firstEnabledHeading = firstEnabledHeadingResult.done
        ? undefined
        : firstEnabledHeadingResult.value
    const canSetHeading =
        firstEnabledHeading !== undefined &&
        (currentLevel === firstEnabledHeading ||
            !!editor?.can().setHeading({ level: firstEnabledHeading }))

    return (
        <MenuSelect<HeadingOptionValue | ''>
            onChange={handleHeadingType}
            disabled={
                !editor?.isEditable ||
                (!isCurrentlyParagraphOrHeading &&
                    !canSetParagraph &&
                    !canSetHeading)
            }
            displayEmpty
            renderValue={selected => {
                let result: ReactNode | undefined
                if (selected === '') {
                    result = labels?.empty ?? <em>Change to…</em>
                } else if (selected === HEADING_OPTION_VALUES.Paragraph) {
                    result = labels?.paragraph
                } else if (selected === HEADING_OPTION_VALUES.Heading1) {
                    result = labels?.heading1
                } else if (selected === HEADING_OPTION_VALUES.Heading2) {
                    result = labels?.heading2
                } else if (selected === HEADING_OPTION_VALUES.Heading3) {
                    result = labels?.heading3
                } else if (selected === HEADING_OPTION_VALUES.Heading4) {
                    result = labels?.heading4
                } else if (selected === HEADING_OPTION_VALUES.Heading5) {
                    result = labels?.heading5
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                } else if (selected === HEADING_OPTION_VALUES.Heading6) {
                    result = labels?.heading6
                }
                return result ?? selected
            }}
            aria-label='Text headings'
            tooltipTitle='Styles'
            {...menuSelectProps}
            value={selectedValue}
            inputProps={{
                ...menuSelectProps.inputProps,
                className: clsx(
                    classes.selectInput,
                    menuSelectProps.inputProps?.className,
                ),
            }}
            sx={{
                [`& .${classes.selectInput}`]: {
                    width: 77,
                },
            }}
        >
            <StyledMenuItem
                value={HEADING_OPTION_VALUES.Paragraph}
                disabled={!isCurrentlyParagraphOrHeading && !canSetParagraph}
            >
                <MenuButtonTooltip
                    label=''
                    shortcutKeys={
                        hideShortcuts ? undefined : ['mod', 'alt', '0']
                    }
                    placement='right'
                    contentWrapperClassName={classes.menuOption}
                >
                    {labels?.paragraph ?? HEADING_OPTION_VALUES.Paragraph}
                </MenuButtonTooltip>
            </StyledMenuItem>
            <Divider orientation='horizontal' />
            {enabledHeadingLevels.has(1) && (
                <StyledMenuItem
                    value={HEADING_OPTION_VALUES.Heading1}
                    disabled={!canSetHeading}
                >
                    <MenuButtonTooltip
                        label=''
                        shortcutKeys={
                            hideShortcuts ? undefined : ['mod', 'alt', '1']
                        }
                        placement='right'
                        contentWrapperClassName={clsx(
                            classes.menuOption,
                            classes.headingOption,
                            classes.headingOption1,
                        )}
                    >
                        {labels?.heading1 ?? HEADING_OPTION_VALUES.Heading1}
                    </MenuButtonTooltip>
                </StyledMenuItem>
            )}

            {enabledHeadingLevels.has(2) && (
                <StyledMenuItem
                    value={HEADING_OPTION_VALUES.Heading2}
                    disabled={!canSetHeading}
                >
                    <MenuButtonTooltip
                        label=''
                        shortcutKeys={
                            hideShortcuts ? undefined : ['mod', 'alt', '2']
                        }
                        placement='right'
                        contentWrapperClassName={clsx(
                            classes.menuOption,
                            classes.headingOption,
                            classes.headingOption2,
                        )}
                    >
                        {labels?.heading2 ?? HEADING_OPTION_VALUES.Heading2}
                    </MenuButtonTooltip>
                </StyledMenuItem>
            )}

            {enabledHeadingLevels.has(3) && (
                <StyledMenuItem
                    value={HEADING_OPTION_VALUES.Heading3}
                    disabled={!canSetHeading}
                >
                    <MenuButtonTooltip
                        label=''
                        shortcutKeys={
                            hideShortcuts ? undefined : ['mod', 'alt', '3']
                        }
                        placement='right'
                        contentWrapperClassName={clsx(
                            classes.menuOption,
                            classes.headingOption,
                            classes.headingOption3,
                        )}
                    >
                        {labels?.heading3 ?? HEADING_OPTION_VALUES.Heading3}
                    </MenuButtonTooltip>
                </StyledMenuItem>
            )}

            {enabledHeadingLevels.has(4) && (
                <StyledMenuItem
                    value={HEADING_OPTION_VALUES.Heading4}
                    disabled={!canSetHeading}
                >
                    <MenuButtonTooltip
                        label=''
                        shortcutKeys={
                            hideShortcuts ? undefined : ['mod', 'alt', '4']
                        }
                        placement='right'
                        contentWrapperClassName={clsx(
                            classes.menuOption,
                            classes.headingOption,
                            classes.headingOption4,
                        )}
                    >
                        {labels?.heading4 ?? HEADING_OPTION_VALUES.Heading4}
                    </MenuButtonTooltip>
                </StyledMenuItem>
            )}

            {enabledHeadingLevels.has(5) && (
                <StyledMenuItem
                    value={HEADING_OPTION_VALUES.Heading5}
                    disabled={!canSetHeading}
                >
                    <MenuButtonTooltip
                        label=''
                        shortcutKeys={
                            hideShortcuts ? undefined : ['mod', 'alt', '5']
                        }
                        placement='right'
                        contentWrapperClassName={clsx(
                            classes.menuOption,
                            classes.headingOption,
                            classes.headingOption5,
                        )}
                    >
                        {labels?.heading5 ?? HEADING_OPTION_VALUES.Heading5}
                    </MenuButtonTooltip>
                </StyledMenuItem>
            )}

            {enabledHeadingLevels.has(6) && (
                <StyledMenuItem
                    value={HEADING_OPTION_VALUES.Heading6}
                    disabled={!canSetHeading}
                >
                    <MenuButtonTooltip
                        label=''
                        shortcutKeys={
                            hideShortcuts ? undefined : ['mod', 'alt', '6']
                        }
                        placement='right'
                        contentWrapperClassName={clsx(
                            classes.menuOption,
                            classes.headingOption,
                            classes.headingOption6,
                        )}
                    >
                        {labels?.heading6 ?? HEADING_OPTION_VALUES.Heading6}
                    </MenuButtonTooltip>
                </StyledMenuItem>
            )}
        </MenuSelect>
    )
}
