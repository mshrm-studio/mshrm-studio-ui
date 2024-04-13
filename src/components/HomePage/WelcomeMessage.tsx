'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

export default function HomePageWelcomeMessage({
    dictionary,
}: {
    dictionary: Dictionary
}) {
    const hour = useMemo(() => {
        return DateTime.local().hour
    }, [])

    const message = useMemo(() => {
        if (hour >= 2 && hour < 12) {
            return dictionary.homepage.welcomeMessage.morning
        } else if (hour >= 12 && hour < 17) {
            return dictionary.homepage.welcomeMessage.afternoon
        } else {
            return dictionary.homepage.welcomeMessage.evening
        }
    }, [hour])

    return (
        <h1 className="text-[55px] leading-[1] font-extrabold xl:text-[131px]">
            {message}
        </h1>
    )
}
