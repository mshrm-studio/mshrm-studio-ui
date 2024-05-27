'use client'

import SpacesImage from '@/components/SpacesImg'
import ThemeContext from '@/utils/context/Theme'
import React, { useContext, useMemo } from 'react'

type Props = {
    onClick: (e: React.MouseEvent) => void
}

export default function HeaderMainNavigationToggle({ onClick }: Props) {
    const { darkClassToggled } = useContext(ThemeContext)

    const imgSrc = useMemo(() => {
        return darkClassToggled
            ? 'static/misc/MobileMenuToggle-White.svg'
            : 'static/misc/MobileMenuToggle-Black.svg'
    }, [darkClassToggled])

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
