import { Locale } from '@/utils/enums/Locale'
import '@/app/admin.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/utils/shadcnui'
import { Toaster } from '@/app/[lang]/admin/_components/shadcnui/toaster'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

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
                <main className="px-6 py-12">{children}</main>
            </div>

            <Toaster />
        </>
    )
}
