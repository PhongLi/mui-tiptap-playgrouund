import { createSvgIcon } from '@mui/material/utils'

const AlignImageCenter = createSvgIcon(
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <rect
            width='19'
            height='19'
            x='2.5'
            y='2.5'
            fill='#D9D9D9'
            fillOpacity='0.01'
            stroke='#58667E'
            strokeDasharray='2 2'
            rx='0.5'
        />
        <path
            fill='#58667E'
            d='M17.25 6.75v10.5H6.75V6.75h10.5zm0-1.5H6.75c-.825 0-1.5.675-1.5 1.5v10.5c0 .825.675 1.5 1.5 1.5h10.5c.825 0 1.5-.675 1.5-1.5V6.75c0-.825-.675-1.5-1.5-1.5zm-3.645 6.645l-2.25 2.902-1.605-1.942L7.5 15.75h9l-2.895-3.855z'
        />
    </svg>,
    'AlignImageCenter',
)

export default AlignImageCenter
