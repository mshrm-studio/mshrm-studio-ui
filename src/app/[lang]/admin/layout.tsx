import type { Metadata } from 'next'
import '@/app/admin.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/utils/shadcnui'
import { Locale } from '@/utils/enums/locale'
import Header from '@/components/Admin/Header/Header'
import { ThemeProvider } from '@/components/Admin/Provider/Theme'
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
        <div
            id="admin-layout"
            className={cn(
                'min-h-screen bg-background font-sans antialiased',
                fontSans.variable
            )}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Header locale={params.lang} />

                <main className="p-6">{children}</main>

                <footer></footer>

                <Toaster />
            </ThemeProvider>
        </div>
    )
}
