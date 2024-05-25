'use client'

import SpacesImage from '@/components/SpacesImg'
import React from 'react'

type Props = {
    onClick: (e: React.MouseEvent) => void
}

export default function HeaderMainNavigationToggle({ onClick }: Props) {
    return (
        <button className="dark:text-white" type="button" onClick={onClick}>
            <SpacesImage
                className="h-[16px]"
                alt="Mobile Menu Toggle"
                src="static/misc/MobileMenuToggle.svg"
            />
        </button>
    )
}
