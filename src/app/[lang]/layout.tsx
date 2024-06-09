import type { Metadata } from 'next'
import { Locale, locales } from '@/utils/enums/Locale'
import AuthContextProvider from '@/components/Provider/Msal'
import DimensionsContextProvider from '@/components/Provider/Dimensions'
import LocaleContextProvider from '@/components/Provider/Locale'
import Web3ModalProvider from '@/components/Provider/Web3Modal'
import { ThemeProvider } from 'next-themes'

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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthContextProvider>
                        <Web3ModalProvider>
                            <LocaleContextProvider locale={params.lang}>
                                <DimensionsContextProvider>
                                    {children}
                                </DimensionsContextProvider>
                            </LocaleContextProvider>
                        </Web3ModalProvider>
                    </AuthContextProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
