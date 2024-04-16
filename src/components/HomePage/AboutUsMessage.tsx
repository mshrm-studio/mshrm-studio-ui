'use client'

import DictionaryContext from '@/utils/context/Dictionary'
import { useContext, useEffect, useMemo, useState } from 'react'

export default function HomePageAboutUsMessage() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    const messages = useMemo<string[]>(() => {
        return [
            dictionary.homepage.aboutUsMessage.what,
            dictionary.homepage.aboutUsMessage.who,
        ]
    }, [dictionary])

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(
                (currentIndex) => (currentIndex + 1) % messages.length
            )
        }, 2000)

        return () => {
            clearInterval(intervalId)
        }
    }, [messages.length])

    return (
        <h2 className="text-[33px] leading-[1] font-extrabold xl:text-[55px]">
            {messages[currentIndex]}
        </h2>
    )
}
