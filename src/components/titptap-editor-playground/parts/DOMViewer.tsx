import { TextareaAutosize } from '@mui/material'
import { styled } from '@mui/material/styles'

interface DOMviewProps {
    htmlString: string
    maxRows?: number
}

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(5),
}))
export const DOMViewer = ({ htmlString, maxRows }: DOMviewProps) => {
    return <StyledTextArea maxRows={maxRows || 30} value={htmlString} />
}
