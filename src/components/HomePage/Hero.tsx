'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import WelcomeMessage from '@/components/HomePage/WelcomeMessage'
import DimensionsContext from '@/utils/context/Dimensions'
import { useContext } from 'react'

export default function HomePageHero({
    dictionary,
}: {
    dictionary: Dictionary
}) {
    const { dimensions } = useContext(DimensionsContext)

    return (
        <div
            className="flex items-center"
            style={{
                height: dimensions.viewportHeight - dimensions.headerHeight,
            }}
        >
            <WelcomeMessage dictionary={dictionary} />
        </div>
    )
}
