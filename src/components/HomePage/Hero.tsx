'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import WelcomeMessage from '@/components/HomePage/WelcomeMessage'
import DimensionsContext from '@/utils/context/Dimensions'
import { useContext } from 'react'
import Button from '@/components/Button'

export default function HomePageHero({
    dictionary,
}: {
    dictionary: Dictionary
}) {
    const { dimensions } = useContext(DimensionsContext)

    return (
        <section
            className="flex items-center xl:max-w-site xl:mx-auto"
            style={{
                height: dimensions.viewportHeight - dimensions.headerHeight,
            }}
        >
            <div>
                <WelcomeMessage dictionary={dictionary} />

                <Button>{dictionary.contactUs}</Button>
            </div>
        </section>
    )
}
