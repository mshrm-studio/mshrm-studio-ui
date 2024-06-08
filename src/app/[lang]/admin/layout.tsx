import { Locale } from '@/utils/enums/Locale'
import type { Metadata } from 'next'
import '@/app/admin.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/utils/shadcnui'
import { Toaster } from '@/components/Admin/shadcnui/toaster'
import AdminLayoutSidebar from '@/components/Admin/Layout/Sidebar'
import AdminLayoutHeader from '@/components/Admin/Layout/Header'

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
                id="admin-layout"
                className={cn('font-sans antialiased', fontSans.variable)}
            >
                <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
                    <AdminLayoutSidebar locale={params.lang} />

                    <div className="max-w-[100vw] flex flex-col">
                        <AdminLayoutHeader locale={params.lang} />

                        <main className="w-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </div>

            <Toaster />
        </>
    )
}
