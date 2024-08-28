import type { Metadata } from 'next'
import { Locale, locales } from '@/utils/enums/Locale'
import AuthContextProvider from '@/components/Provider/Msal'
import DimensionsContextProvider from '@/components/Provider/Dimensions'
import LocaleContextProvider from '@/components/Provider/Locale'
import UserContextProvider from '@/components/Provider/User'
import Web3ModalProvider from '@/components/Provider/Web3Modal'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
    title: 'mshrm.studio',
    description: 'Bespoke apps, sites & software',
    icons: `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/static/brand/glyph/m-glyph-black.png`,
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
                        <UserContextProvider>
                            <Web3ModalProvider>
                                <LocaleContextProvider locale={params.lang}>
                                    <DimensionsContextProvider>
                                        {children}
                                    </DimensionsContextProvider>
                                </LocaleContextProvider>
                            </Web3ModalProvider>
                        </UserContextProvider>
                    </AuthContextProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
