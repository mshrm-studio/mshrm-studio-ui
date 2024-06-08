import type { Metadata } from 'next'
import '@/app/admin.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/utils/shadcnui'
import { Locale } from '@/utils/enums/Locale'
import { ThemeProvider } from '@/components/Admin/Provider/Theme'
import { Toaster } from '@/components/Admin/shadcnui/toaster'
import Sidebar from '@/components/Admin/Sidebar/Sidebar'

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
                'grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] font-sans antialiased',
                fontSans.variable
            )}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                    <Sidebar locale={params.lang} />
                </div>

                <div className="flex flex-col">{children}</div>

                {/* <Toaster /> */}
            </ThemeProvider>
        </div>
    )
}
