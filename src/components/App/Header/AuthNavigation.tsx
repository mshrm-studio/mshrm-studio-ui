'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import AuthMenuToggle from '@/components/App/Header/AuthMenu/Toggle'
import AuthMenuContainer from '@/components/App/Header/AuthMenu/Container'
import AuthMenu from '@/components/App/Header/AuthMenu/AuthMenu'
import { Dispatch, SetStateAction } from 'react'

type Props = {
    showAuthMenu: boolean
    setShowAuthMenu: Dispatch<SetStateAction<boolean>>
}

const HeaderAuthNavigation: React.FC<Props> = ({
    showAuthMenu,
    setShowAuthMenu,
}) => {
    const dict = useDictionary()

    function handleAuthNavToggleClick(_e: React.MouseEvent) {
        setShowAuthMenu((prev) => !prev)
    }

    return (
        <div className="relative">
            <AuthMenuToggle
                dict={dict}
                menuVisible={showAuthMenu}
                onClick={handleAuthNavToggleClick}
            />

            {showAuthMenu && (
                <AuthMenuContainer>
                    <AuthMenu />
                </AuthMenuContainer>
            )}
        </div>
    )
}

export default HeaderAuthNavigation
