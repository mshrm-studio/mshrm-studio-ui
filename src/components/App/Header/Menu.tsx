'use client'

import TouchMenu from '@/components/App/Header/TouchMenu'
import { useContext, useEffect, useState } from 'react'
import MainNavigationToggle from '@/components/App/Header/MainNavigation/Toggle'
import MainNavigation from '@/components/App/Header/MainNavigation/MainNavigation'
import ContactFormModalContext from '@/utils/context/ContactFormModal'

type Props = {}

const HeaderMenu: React.FC<Props> = ({}) => {
    const [showTouchMenu, setShowTouchMenu] = useState(false)

    function handleMainNavToggleClick(_e: React.MouseEvent) {
        setShowTouchMenu((prev) => !prev)
    }

    const { showContactFormModal } = useContext(ContactFormModalContext)

    useEffect(() => {
        if (showContactFormModal) setShowTouchMenu(false)
    }, [showContactFormModal])

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
