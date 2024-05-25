'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext } from 'react'

export default function HomePageWelcomeMessage() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    return (
        <h1 className="text-[80px] leading-[1] font-extrabold xl:text-[131px]">
            {dictionary.homepage.aboutUsMessage.what}
        </h1>
    )
}
