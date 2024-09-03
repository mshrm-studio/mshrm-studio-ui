'use client'

import TouchMenu from '@/components/App/Header/TouchMenu'
import { useEffect, useState } from 'react'
import MainNavigationToggle from '@/components/App/Header/MainNavigation/Toggle'
import MainNavigation from '@/components/App/Header/MainNavigation/MainNavigation'
import { usePathname } from 'next/navigation'
import useDictionary from '@/utils/hooks/useDictionary'

type Props = {}

const HeaderMenu: React.FC<Props> = ({}) => {
    const dict = useDictionary()

    const [showTouchMenu, setShowTouchMenu] = useState(false)

    function handleMainNavToggleClick(_e: React.MouseEvent) {
        setShowTouchMenu((prev) => !prev)
    }

    const pathname = usePathname()

    useEffect(() => {
        // Hide the menu whenever the route changes
        setShowTouchMenu(false)
    }, [pathname])

    return (
        <>
            <div>
                <MainNavigationToggle
                    dict={dict}
                    menuVisible={showTouchMenu}
                    onClick={handleMainNavToggleClick}
                />
            </div>

            {showTouchMenu && (
                <TouchMenu>
                    <MainNavigation />
                </TouchMenu>
            )}
        </>
    )
}

export default HeaderMenu
