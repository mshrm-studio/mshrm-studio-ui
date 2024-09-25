'use client'

import DimensionsContext from '@/utils/context/Dimensions'
import { useTheme } from 'next-themes'
import { useContext, useEffect, useMemo } from 'react'

type Props = {
    children: React.ReactNode
}

const HeaderMainMenuContainer: React.FC<Props> = ({ children }) => {
    const { dimensions } = useContext(DimensionsContext)
    const { resolvedTheme } = useTheme()

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

    useEffect(() => {
        const header = document.querySelector('header')

        if (header) {
            header.style.backgroundColor =
                resolvedTheme === 'dark' ? 'black' : 'white'

            return () => {
                header.style.backgroundColor = ''
            }
        }
    }, [resolvedTheme])

    return (
        <div
            className="absolute z-[998] top-full left-0 w-full bg-white dark:bg-black"
            style={{ height: navHeight }}
        >
            <div className="h-full px-6 flex items-center">{children}</div>
        </div>
    )
}

export default HeaderMainMenuContainer
