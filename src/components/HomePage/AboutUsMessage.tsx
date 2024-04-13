'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import { useEffect, useMemo, useState } from 'react'

export default function HomePageAboutUsMessage({
    dictionary,
}: {
    dictionary: Dictionary
}) {
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
