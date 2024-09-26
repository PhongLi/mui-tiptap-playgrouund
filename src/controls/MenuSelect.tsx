import {
    outlinedInputClasses,
    Select,
    selectClasses,
    type SelectProps,
    svgIconClasses,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { useState } from 'react'

import { MenuButtonTooltip } from './MenuButtonTooltip'

export type MenuSelectProps<T> = SelectProps<T> & {
    /** An optional tooltip to show when hovering over this Select. */
    tooltipTitle?: string
}

const classesPrefix = 'MenuSelect'
const classes = {
    selectRoot: `${classesPrefix}-selectRoot`,
    select: `${classesPrefix}-select`,
    selectDropdownIcon: `${classesPrefix}-selectDropdownIcon`,
    input: `${classesPrefix}-input`,
}

const StyledMenuButtonTooltip = styled(MenuButtonTooltip)(() => ({
    display: 'inline-flex',
}))

const StyledSelect = styled(Select)(({ theme }) => ({
    [`&.${classes.selectRoot}`]: {
        [`&:not(:hover):not(.${outlinedInputClasses.focused}) .${outlinedInputClasses.notchedOutline}`]:
            {
                borderWidth: 0,
            },
        [`& .${svgIconClasses.root}`]: {
            color: theme.palette.action.active,
        },
        [`&.${selectClasses.disabled} .${svgIconClasses.root}`]: {
            color: theme.palette.action.disabled,
        },
    },
    [`& .${classes.select}`]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(3),
    },
    [`& .${classes.selectDropdownIcon}`]: {
        right: 1,
    },
    [`& .${classes.input}`]: {
        paddingTop: '3px',
        paddingBottom: '3px',
        fontSize: '0.9em',
    },
})) as unknown as typeof Select

export default function MenuSelect<T>({
    tooltipTitle,
    ...selectProps
}: MenuSelectProps<T>) {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const select = (
        <StyledSelect<T>
            margin='none'
            variant='outlined'
            size='small'
            {...selectProps}
            onMouseEnter={(...args) => {
                setTooltipOpen(true)
                selectProps.onMouseEnter?.(...args)
            }}
            onMouseLeave={(...args) => {
                setTooltipOpen(false)
                selectProps.onMouseLeave?.(...args)
            }}
            onClick={(...args) => {
                setTooltipOpen(false)
                selectProps.onClick?.(...args)
            }}
            inputProps={{
                ...selectProps.inputProps,
                className: clsx(
                    classes.input,
                    selectProps.inputProps?.className,
                ),
            }}
            MenuProps={{
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
                ...selectProps.MenuProps,
            }}
            className={clsx(classes.selectRoot, selectProps.className)}
            classes={{
                ...selectProps.classes,
                select: clsx(classes.select, selectProps.classes?.select),
                icon: clsx(
                    classes.selectDropdownIcon,
                    selectProps.classes?.icon,
                ),
            }}
        />
    )
    return tooltipTitle ? (
        <StyledMenuButtonTooltip label={tooltipTitle} open={tooltipOpen}>
            {select}
        </StyledMenuButtonTooltip>
    ) : (
        select
    )
}
