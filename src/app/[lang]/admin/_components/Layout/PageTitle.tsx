'use client'

import LocaleContext from '@/utils/context/Locale'
import useDictionary from '@/utils/hooks/useDictionary'
import { usePathname } from 'next/navigation'
import { useContext, useMemo } from 'react'

export default function AdminLayoutPageTitle() {
    const dict = useDictionary()
    const locale = useContext(LocaleContext)
    const pathname = usePathname()

    const pathnameWithoutLocale = useMemo(() => {
        return pathname.replace(`/${locale}/admin/`, '')
    }, [pathname, locale])

    const translationKey = useMemo(() => {
        if (pathnameWithoutLocale === '/') return 'dashboard'

        return {
            conversations: 'conversations',
            'market-entities': 'marketEntities',
            tools: 'tools',
            users: 'users',
        }[pathnameWithoutLocale]
    }, [pathnameWithoutLocale])

    if (!translationKey) return null

    return (
        <h1 className="font-semibold text-lg">
            {dict.header.pageTitle[translationKey]}
        </h1>
    )
}
