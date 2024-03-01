'use client'

import LocaleContext from '@/utils/context/Locale'
import { useContext, useMemo } from 'react'
import Link from 'next/link'

export default function LocaleLink({
    children,
    href,
}: Readonly<{
    children: React.ReactNode
    href: string
}>) {
    const locale = useContext(LocaleContext)

    const hrefWithLocale = useMemo(() => {
        const normalizedHref = href.startsWith('/') ? href : `/${href}`

        return `/${locale}${normalizedHref}`
    }, [href, locale])

    return <Link href={hrefWithLocale}>{children}</Link>
}
