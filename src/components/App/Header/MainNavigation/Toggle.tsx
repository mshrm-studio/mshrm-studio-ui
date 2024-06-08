'use client'

import SpacesImage from '@/components/SpacesImg'
import { useTheme } from 'next-themes'
import React, { useMemo } from 'react'

type Props = {
    onClick: (e: React.MouseEvent) => void
}

export default function HeaderMainNavigationToggle({ onClick }: Props) {
    const { resolvedTheme } = useTheme()

    const imgSrc = useMemo(() => {
        return resolvedTheme === 'dark'
            ? 'static/misc/MobileMenuToggle-White.svg'
            : 'static/misc/MobileMenuToggle-Black.svg'
    }, [resolvedTheme])

    return (
        <button className="dark:text-white" type="button" onClick={onClick}>
            <SpacesImage
                className="h-[16px]"
                alt="Mobile Menu Toggle"
                src={imgSrc}
            />
        </button>
    )
}
