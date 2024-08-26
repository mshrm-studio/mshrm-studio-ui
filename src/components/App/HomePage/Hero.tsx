'use client'

import DimensionsContext from '@/utils/context/Dimensions'
import useDictionary from '@/utils/hooks/useDictionary'
import { useContext, useMemo } from 'react'
import ContactUsBtn from '@/components/App/ContactUsBtn'

export default function HomePageHero() {
    const dict = useDictionary()
    const { dimensions } = useContext(DimensionsContext)

    const sectionHeight = useMemo(() => {
        return dimensions.viewportHeight - dimensions.headerHeight
    }, [dimensions.headerHeight, dimensions.viewportHeight])

    return (
        <section
            className="px-6 xl:max-w-site xl:mx-auto"
            style={{ height: sectionHeight }}
        >
            <h1>{dict.homepage.title}</h1>

            <ContactUsBtn />
        </section>
    )
}
