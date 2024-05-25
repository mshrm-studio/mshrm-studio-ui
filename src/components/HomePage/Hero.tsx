'use client'

import WelcomeMessage from '@/components/HomePage/WelcomeMessage'
import DimensionsContext from '@/utils/context/Dimensions'
import { useContext, useMemo } from 'react'
import ContactUsBtn from '@/components/ContactUsBtn'

export default function HomePageHero() {
    const { dimensions } = useContext(DimensionsContext)

    const sectionHeight = useMemo(() => {
        return dimensions.viewportHeight - dimensions.headerHeight
    }, [dimensions.headerHeight, dimensions.viewportHeight])

    return (
        <section
            className="flex items-center px-6 xl:max-w-site xl:mx-auto"
            style={{ height: sectionHeight }}
        >
            <div>
                <WelcomeMessage />

                <ContactUsBtn />
            </div>
        </section>
    )
}
