/* eslint-disable @next/next/no-img-element */
'use client'

import { Box, Paper, Stack, Typography } from '@mui/material'
import type { Metadata } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { RiAlarmWarningFill } from 'react-icons/ri'

export const metadata: Metadata = {
    title: 'Not Found',
}

export default function NotFound() {
    const pathname = usePathname()
    return (
        <main>
            <Paper sx={{ textAlign: 'center' }}>
                <Box className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
                    <RiAlarmWarningFill
                        size={60}
                        className='drop-shadow-glow animate-flicker text-red-500'
                    />
                    <Typography variant='h2'>Page Not Found</Typography>
                    <Box>{pathname} NOT exists</Box>
                    <Typography variant='h5'>
                        change this in app/not-found.tsx
                    </Typography>
                    <Link href='/'>Back to home</Link>
                    <Stack
                        sx={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <img
                            src='https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7922.jpg'
                            alt='404'
                        />
                    </Stack>
                </Box>
            </Paper>
        </main>
    )
}
