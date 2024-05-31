import type { Metadata } from 'next'
import { Rethink_Sans } from 'next/font/google'
import '@/app/app.css'

const rethinkSans = Rethink_Sans({
    subsets: ['latin'],
    weight: ['400', '700', '800'],
    style: 'normal',
})

export const metadata: Metadata = {
    title: 'mshrm.studio',
    description: 'Bespoke apps, sites & software',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html>
            <body
                className={`${rethinkSans.className} dark:bg-black dark:text-white`}
            >
                {children}
            </body>
        </html>
    )
}
