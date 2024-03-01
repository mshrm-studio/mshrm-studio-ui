'use client'

import LocaleContext from '@/utils/context/Locale'
import { Locale } from '@/utils/enums/locale'

export default function LocaleContextProvider({
    children,
    locale,
}: Readonly<{
    children: React.ReactNode
    locale: Locale
}>) {
    return (
        <LocaleContext.Provider value={locale}>
            {children}
        </LocaleContext.Provider>
    )
}
