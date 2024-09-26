/* eslint-disable @next/next/no-img-element */
'use client' // Error components must be Client Components

import WarningIcon from '@mui/icons-material/Warning'
import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <Box
            sx={{
                textAlign: 'center',
                bgcolor: 'background.paper',
                py: 10,
                height: '100vh',
            }}
        >
            <WarningIcon color='error' fontSize='large' />
            <Typography variant='h3'>Oops, something went wrong!</Typography>
            <Typography variant='h6' color='error'>
                {error.message}
            </Typography>
            <Box sx={{ m: 5 }}>
                <Button variant='contained' onClick={reset}>
                    Try again
                </Button>
            </Box>
            <Link href='/?slug=homepage'>Back to home</Link>
            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src='https://img.freepik.com/free-vector/500-internal-server-error-concept-illustration_114360-1905.jpg'
                    alt='500'
                    width={400}
                />
            </Stack>
        </Box>
    )
}
