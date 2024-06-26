'use client'

import TouchMenu from '@/components/App/Header/TouchMenu'
import { useState } from 'react'
import MainNavigationToggle from '@/components/App/Header/MainNavigation/Toggle'
import MainNavigation from '@/components/App/Header/MainNavigation/MainNavigation'

type Props = {}

const HeaderMenu: React.FC<Props> = ({}) => {
    const [showTouchMenu, setShowTouchMenu] = useState(false)

    function handleMainNavToggleClick(_e: React.MouseEvent) {
        setShowTouchMenu((prev) => !prev)
    }

    return (
        <>
            <MainNavigationToggle onClick={handleMainNavToggleClick} />

            {showTouchMenu && (
                <TouchMenu>
                    <MainNavigation />
                </TouchMenu>
            )}
        </>
    )
}

export default HeaderMenu
