import {
    alpha,
    Box,
    Tooltip,
    type TooltipProps,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { getModShortcutKey } from '@/utils/platform'

export type MenuButtonTooltipProps = {
    /**
     * Used to display what this button is responsible for. Ex: "Ordered list".
     */
    label: string
    /**
     * For the list of pre-configured Tiptap shortcuts, see
     * https://tiptap.dev/api/keyboard-shortcuts.
     */
    shortcutKeys?: string[]
    /** Where the tooltip should be placed. By default "top" (above). */
    placement?: TooltipProps['placement']
    contentWrapperClassName?: string
    /** The menu element for which we're showing a tooltip when hovering. */
    children: React.ReactNode
} & Pick<TooltipProps, 'open' | 'onOpen' | 'onClose'>

const classPrefix = 'MenuButtonTooltip'
const classes = {
    label: `${classPrefix}-label`,
    shortcutKey: `${classPrefix}-shortcutKey`,
}

const StyledEditorContainer = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    [`& .${classes.label}`]: {
        fontSize: theme.typography.pxToRem(13),
    },
    [`& .${classes.shortcutKey}`]: {
        fontSize: theme.typography.caption.fontSize,
        border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.3),
        height: '19px',
        lineHeight: '19px',
        padding: '0 4px',
        minWidth: 17,
        borderRadius: theme.shape.borderRadius,
        display: 'inline-block',

        '&:not(:first-of-type)': {
            marginLeft: 1,
        },
    },
}))

export const MenuButtonTooltip: React.FC<MenuButtonTooltipProps> = ({
    label,
    shortcutKeys,
    placement = 'top',
    contentWrapperClassName,
    children,
    ...otherTooltipProps
}) => {
    return (
        <Tooltip
            title={
                label || (shortcutKeys && shortcutKeys.length > 0) ? (
                    <StyledEditorContainer>
                        <Box className={classes.label}>{label}</Box>

                        {shortcutKeys && shortcutKeys.length > 0 && (
                            <Typography variant='body2' component='div'>
                                {shortcutKeys.map((shortcutKey, index) => (
                                    <span
                                        className={classes.shortcutKey}
                                        key={index}
                                    >
                                        {shortcutKey === 'mod'
                                            ? getModShortcutKey()
                                            : shortcutKey}
                                    </span>
                                ))}
                            </Typography>
                        )}
                    </StyledEditorContainer>
                ) : (
                    ''
                )
            }
            placement={placement}
            arrow
            {...otherTooltipProps}
        >
            {/* Use a span around the children so we show a tooltip even if the
    element inside is disabled */}
            <span className={contentWrapperClassName}>{children}</span>
        </Tooltip>
    )
}
