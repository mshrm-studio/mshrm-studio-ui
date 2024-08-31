'use client'

import DimensionsContext from '@/utils/context/Dimensions'
import { useContext, useEffect, useMemo } from 'react'

type Props = {
    children: React.ReactNode
}

const HeaderTouchMenu: React.FC<Props> = ({ children }) => {
    const { dimensions } = useContext(DimensionsContext)

    const navHeight = useMemo(() => {
        return dimensions.viewportHeight - dimensions.headerHeight
    }, [
        dimensions.headerHeight,
        dimensions.viewportHeight,
        dimensions.viewportWidth,
    ])

    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden'

        // Re-enable scrolling on unmount
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <div
            className="absolute z-[999] top-full left-0 w-full bg-white dark:bg-black"
            style={{ height: navHeight }}
        >
            <div className="h-full px-6 flex items-center">{children}</div>
        </div>
    )
}

export default HeaderTouchMenu
