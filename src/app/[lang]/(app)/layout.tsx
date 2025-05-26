import type { Metadata } from 'next'
import '@/app/app.css'
import { Locale } from '@/utils/enums/Locale'
import { Inter } from 'next/font/google'
import Header from '@/app/[lang]/(app)/_components/Header/Header'
import Footer from '@/app/[lang]/(app)/_components/Footer/Footer'
import clsx from 'clsx'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    style: 'normal',
})

export const metadata: Metadata = {
    title: 'mshrm.studio',
    description: 'Bespoke apps, sites & software',
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
            id="app-layout"
            className={clsx(
                inter.className,
                'overflow-x-hidden dark:bg-black dark:text-white'
            )}
        >
            <Header locale={params.lang} />

            <main>{children}</main>

            <Footer locale={params.lang} />
        </div>
    )
}
