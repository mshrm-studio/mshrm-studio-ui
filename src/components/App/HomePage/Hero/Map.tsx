'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import SpacesImage from '@/components/SpacesImage'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

export default function HomePageHeroMap({ dict }: { dict: Dictionary }) {
    const { resolvedTheme } = useTheme()

    const mapImgSrc = useMemo(() => {
        const path = resolvedTheme === 'dark' ? 'map-light.png' : 'map-dark.png'

        return `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/static/map/${path}`
    }, [resolvedTheme])

    return (
        <SpacesImage
            className="h-[320px] w-full sm:h-[520px] xl:h-[650px]"
            src={mapImgSrc}
            alt={dict.home.worldMap}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (min-width: 1281px) 715px"
        />
    )
}
