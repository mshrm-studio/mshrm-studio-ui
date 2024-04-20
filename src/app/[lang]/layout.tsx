import type { Metadata } from 'next'
import { Rethink_Sans } from 'next/font/google'
import '@/app/globals.css'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Locale, locales } from '@/utils/enums/locale'
import AuthContextProvider from '@/components/Context/AuthProvider'
import DimensionsContextProvider from '@/components/Context/DimensionsProvider'
import LocaleContextProvider from '@/components/Context/LocaleProvider'
import Web3ModalProvider from '@/components/Context/Web3ModalProvider'

const rethinkSans = Rethink_Sans({
    subsets: ['latin'],
    weight: ['400', '700', '800'],
    style: 'normal',
})

export const metadata: Metadata = {
    title: 'mshrm.studio',
    description: 'Bespoke apps, sites & software',
}

export async function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }))
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
                className={`${rethinkSans.className} dark:bg-black dark:text-white`}
            >
                <Web3ModalProvider>
                    <AuthContextProvider>
                        <LocaleContextProvider locale={params.lang}>
                            <DimensionsContextProvider>
                                <Header locale={params.lang} />

                                <main>{children}</main>

                                <Footer />
                            </DimensionsContextProvider>
                        </LocaleContextProvider>
                    </AuthContextProvider>
                </Web3ModalProvider>
            </body>
        </html>
    )
}
