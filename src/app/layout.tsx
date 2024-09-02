import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeConfig } from '@/styles/theme/ThemeConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Material Tiptap Editor Playground',
    description: 'Material Tiptap Editor Playground',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <ThemeConfig>{children}</ThemeConfig>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
