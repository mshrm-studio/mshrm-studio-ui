import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Locale } from '@/utils/enums/locale'
import LocaleContextProvider from '@/components/Context/LocaleProvider'
import AuthContextProvider from '@/components/Context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'mshrm.studio',
    description: 'Bespoke apps, sites & software',
}

export async function generateStaticParams() {
    return [
        { lang: Locale.Chinese },
        { lang: Locale.English },
        { lang: Locale.German },
        { lang: Locale.Spanish },
    ]
}

export default function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: { lang: Locale }
}>) {
    return (
        <html lang={params.lang}>
            <body
                className={`${inter.className} dark:bg-black dark:text-white`}
            >
                <AuthContextProvider>
                    <LocaleContextProvider locale={params.lang}>
                        <Header locale={params.lang} />

                        <main>{children}</main>

                        <Footer />
                    </LocaleContextProvider>
                </AuthContextProvider>
            </body>
        </html>
    )
}
