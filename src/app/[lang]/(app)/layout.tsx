import type { Metadata } from 'next'
import '@/app/app.css'
import { Locale } from '@/utils/enums/Locale'
import { Rethink_Sans } from 'next/font/google'
import Header from '@/components/App/Header/Header'
import Footer from '@/components/App/Footer/Footer'
import ContactFormModal from '@/components/App/ContactForm/Modal'
import ContactFormModalContextProvider from '@/components/App/Provider/ContactFormModal'
import ThemeProvider from '@/components/App/Provider/Theme'

const rethinkSans = Rethink_Sans({
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
            className={`${rethinkSans.className} overflow-x-hidden dark:bg-black dark:text-white`}
        >
            <ThemeProvider>
                <ContactFormModalContextProvider>
                    <Header locale={params.lang} />

                    <main>{children}</main>

                    <Footer locale={params.lang} />

                    <ContactFormModal locale={params.lang} />
                </ContactFormModalContextProvider>
            </ThemeProvider>
        </div>
    )
}
