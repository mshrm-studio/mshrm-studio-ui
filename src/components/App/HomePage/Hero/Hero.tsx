'use client'

import Title from '@/components/App/HomePage/Hero/Title/Title'
import DimensionsContext from '@/utils/context/Dimensions'
import { useContext, useMemo } from 'react'

export default function HomePageHero() {
    const { dimensions } = useContext(DimensionsContext)

    const sectionHeight = useMemo(() => {
        return dimensions.viewportHeight - dimensions.headerHeight
    }, [dimensions.headerHeight, dimensions.viewportHeight])

    return (
        <section
            className="px-6 xl:max-w-site xl:mx-auto"
            style={{ height: sectionHeight }}
        >
            <Title />
        </section>
    )
}
