'use client'

import TouchMenu from '@/components/App/Header/TouchMenu'
import { useEffect, useState } from 'react'
import MainNavigationToggle from '@/components/App/Header/MainNavigation/Toggle'
import MainNavigation from '@/components/App/Header/MainNavigation/MainNavigation'
import { usePathname } from 'next/navigation'

type Props = {}

const HeaderMenu: React.FC<Props> = ({}) => {
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
