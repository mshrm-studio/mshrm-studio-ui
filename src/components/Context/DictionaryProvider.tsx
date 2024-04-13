'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import DictionaryContext from '@/utils/context/Dictionary'

export default function DictionaryContextProvider({
    children,
    dictionary,
}: Readonly<{
    children: React.ReactNode
    dictionary: Dictionary
}>) {
    return (
        <DictionaryContext.Provider value={dictionary}>
            {children}
        </DictionaryContext.Provider>
    )
}
