'use client'

import LocaleContext from '@/utils/context/Locale'
import { Locale } from '@/utils/enums/locale'
import { useEffect } from 'react'

export default function LocaleContextProvider({
    children,
    locale,
}: Readonly<{
    children: React.ReactNode
    locale: Locale
}>) {
    useEffect(() => {
        document.documentElement.lang = locale
    }, [locale])

    return (
        <LocaleContext.Provider value={locale}>
            {children}
        </LocaleContext.Provider>
    )
}
