import type { Metadata } from 'next'
import '@/app/app.css'
import { Locale } from '@/utils/enums/Locale'
import { Inter } from 'next/font/google'
import Header from '@/components/App/Header/Header'
import Footer from '@/components/App/Footer/Footer'
import ContactFormModal from '@/components/App/ContactForm/Modal'
import ContactFormModalContextProvider from '@/components/App/Provider/ContactFormModal'

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
    // TODO: check logo
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'mshrm.studio',
        url: process.env.NEXT_PUBLIC_URL || 'https://mshrm.studio',
        logo: `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/static/brand/glyph/m-glyph-black.png`,
        description:
            'TODO (translate): Bespoke apps, sites & software development services.',
        sameAs: [
            'https://x.com/MSHRMDAO',
            'https://www.linkedin.com/company/mshrmstudio',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'tom@mshrm.studio',
            contactType: 'Customer Service',
            areaServed: 'Global',
            availableLanguage: ['Chinese', 'English', 'Spanish'],
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <ContactFormModalContextProvider>
                <div
                    id="app-layout"
                    className={`${inter.className} overflow-x-hidden dark:bg-black dark:text-white`}
                >
                    <Header locale={params.lang} />

                    <main>{children}</main>

                    <Footer locale={params.lang} />

                    <ContactFormModal locale={params.lang} />
                </div>
            </ContactFormModalContextProvider>
        </>
    )
}
