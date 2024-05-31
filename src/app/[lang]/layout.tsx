import type { Metadata } from 'next'
import { Locale, locales } from '@/utils/enums/locale'
import AuthContextProvider from '@/components/Provider/Auth'
import DimensionsContextProvider from '@/components/Provider/Dimensions'
import LocaleContextProvider from '@/components/Provider/Locale'
import Web3ModalProvider from '@/components/Provider/Web3Modal'

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
            <body>
                <Web3ModalProvider>
                    <AuthContextProvider>
                        <LocaleContextProvider locale={params.lang}>
                            <DimensionsContextProvider>
                                {children}
                            </DimensionsContextProvider>
                        </LocaleContextProvider>
                    </AuthContextProvider>
                </Web3ModalProvider>
            </body>
        </html>
    )
}
