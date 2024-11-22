'use client'

import useLocalisedHref from '@/utils/hooks/useLocalisedHref'
import Link from 'next/link'

export default function LocaleLink({
    children,
    href,
    className,
    target,
}: Readonly<{
    children: React.ReactNode
    href: string
    className?: string | null
    target?: '_blank' | '_self' | '_parent' | '_top'
}>) {
    const { localisedHref } = useLocalisedHref(href)

    return (
        <Link
            href={localisedHref}
            className={className || undefined}
            target={target}
        >
            {children}
        </Link>
    )
}
