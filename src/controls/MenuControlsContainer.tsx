import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { Except } from 'type-fest'

import type { DebounceRenderProps } from '@/utils/DebounceRender'
import DebounceRender from '@/utils/DebounceRender'

const StyledRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    rowGap: theme.spacing(0.3),
    columnGap: theme.spacing(0.3),
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '90vw',
    padding: theme.spacing(0.5, 1),
}))

export type MenuControlsContainerProps = {
    children?: React.ReactNode
    className?: string
    debounced?: boolean
    DebounceProps?: Except<DebounceRenderProps, 'children'>
}

export default function MenuControlsContainer({
    children,
    className,
    debounced,
    DebounceProps,
    ...containerProps
}: MenuControlsContainerProps) {
    const content = (
        <StyledRoot className={className} {...containerProps}>
            {children}
        </StyledRoot>
    )
    return debounced ? (
        <DebounceRender {...DebounceProps}>{content}</DebounceRender>
    ) : (
        content
    )
}
