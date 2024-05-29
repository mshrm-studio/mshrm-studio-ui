'use client'

import ArtTitle from '@/components/HomePage/Hero/Title/Art'
import DesignTitle from '@/components/HomePage/Hero/Title/Design'
import DevTitle from '@/components/HomePage/Hero/Title/Dev'
import DimensionsContext from '@/utils/context/Dimensions'
import { useContext, useMemo, useState } from 'react'
import Selector from '@/components/HomePage/Hero/Title/Selector'
import { HomepageHeroTitle } from '@/utils/enums/homepageHeroTitle'

export default function HomePageHeroTitle() {
    const { dimensions } = useContext(DimensionsContext)

    const [activeTitle, setActiveTitle] = useState<HomepageHeroTitle>(
        HomepageHeroTitle.Dev
    )

    const titleVersion = useMemo(() => {
        return dimensions.viewportWidth >= 1024 ? 'desktop' : 'mobile'
    }, [dimensions.viewportWidth])

    const titleComponent = useMemo(() => {
        switch (activeTitle) {
            case HomepageHeroTitle.Art:
                return <ArtTitle version={titleVersion} />
            case HomepageHeroTitle.Design:
                return <DesignTitle version={titleVersion} />
            default:
                return <DevTitle version={titleVersion} />
        }
    }, [activeTitle, titleVersion])

    return (
        <div className="relative flex items-center min-h-[200px]">
            {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[15px]">
                <Selector
                    activeTitle={activeTitle}
                    setActiveTitle={setActiveTitle}
                />
            </div> */}

            {titleComponent}
        </div>
    )
}
