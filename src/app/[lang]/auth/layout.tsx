import { Locale } from '@/utils/enums/Locale'
import type { Metadata } from 'next'
import '@/app/admin.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/utils/shadcnui'
import { Toaster } from '@/components/Admin/shadcnui/toaster'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: 'mshrm.studio',
    description: 'Administration area',
}

export default function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: { lang: Locale }
}>) {
    return (
        <>
            <div
                id="auth-layout"
                className={cn('font-sans antialiased', fontSans.variable)}
            >
                <main className="p-6">{children}</main>
            </div>

            <Toaster />
        </>
    )
}
