import type { Metadata } from 'next'
import { Locale, locales } from '@/utils/enums/Locale'
import AuthContextProvider from '@/app/[lang]/_components/Provider/Msal'
import DimensionsContextProvider from '@/app/[lang]/_components/Provider/Dimensions'
import LocaleContextProvider from '@/app/[lang]/_components/Provider/Locale'
import UserContextProvider from '@/app/[lang]/_components/Provider/User'
import Web3ModalProvider from '@/app/[lang]/_components/Provider/Web3Modal'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'

export const metadata: Metadata = {
    creator: 'mshrm.studio team',
    description: 'Bespoke apps, sites & software', // Overwrite on page.tsx
    icons: `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/static/brand/m-favicon.png`,
    keywords: [
        'android app design',
        'android app development',
        'app design',
        'app development',
        'apple app design',
        'apple app development',
        'branding',
        'IT support',
        'mshrm.studio',
        'website design',
        'website development',
    ],
    openGraph: {
        description: 'Bespoke apps, sites & software', // Overwrite on page.tsx
        emails: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        images: [
            `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/static/brand/og-img.png`,
        ],
        siteName: process.env.NEXT_PUBLIC_SITE_NAME,
        title: process.env.NEXT_PUBLIC_SITE_NAME, // Overwrite on page.tsx
        type: 'website',
        url: process.env.NEXT_PUBLIC_URL,
    },
    other: {
        'fc:frame': 'vNext',
        'fc:frame:image': `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/static/brand/og-img.png`,
        'fc:frame:image:aspect_ratio': '1:1',
        'fc:frame:button:1':
            process.env.NEXT_PUBLIC_SITE_NAME || 'mshrm.studio',
        'fc:frame:button:1:action': 'link',
        'fc:frame:button:1:target':
            process.env.NEXT_PUBLIC_URL || 'https://www.mshrm.studio',
    },
    publisher: process.env.NEXT_PUBLIC_SITE_NAME,
    title: process.env.NEXT_PUBLIC_SITE_NAME, // Overwrite on page.tsx
    twitter: {
        card: 'summary_large_image',
        creator: `@${process.env.NEXT_PUBLIC_X_HANDLE}`,
        description: 'Bespoke apps, sites & software', // Overwrite on page.tsx
        images: `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/static/brand/og-img.png`,
        site: `@${process.env.NEXT_PUBLIC_X_HANDLE}`,
        title: process.env.NEXT_PUBLIC_SITE_NAME, // Overwrite on page.tsx
    },
}

// TODO: check logo
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    url: process.env.NEXT_PUBLIC_URL,
    logo: `${process.env.NEXT_PUBLIC_BLOB_STORAGE_URL}/static/brand/m-glyph-black.png`,
    description: 'Bespoke apps, sites & software', // TODO
    sameAs: [
        `https://x.com/${process.env.NEXT_PUBLIC_X_HANDLE}`,
        `https://www.linkedin.com/company/${process.env.NEXT_PUBLIC_LINKED_IN_HANDLE}`,
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        contactType: 'Customer Service',
        areaServed: 'Global',
        availableLanguage: ['Chinese', 'English', 'Spanish'],
    },
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
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>

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

                    <Analytics />
                </body>
            </html>
        </>
    )
}
