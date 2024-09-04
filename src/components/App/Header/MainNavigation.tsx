'use client'

import MainMenuContainer from '@/components/App/Header/MainMenu/Container'
import MainMenuToggle from '@/components/App/Header/MainMenu/Toggle'
import MainMenu from '@/components/App/Header/MainMenu/MainMenu'
import useDictionary from '@/utils/hooks/useDictionary'
import { Dispatch, SetStateAction } from 'react'

type Props = {
    showMainMenu: boolean
    setShowMainMenu: Dispatch<SetStateAction<boolean>>
}

const HeaderMainNavigation: React.FC<Props> = ({
    showMainMenu,
    setShowMainMenu,
}) => {
    const dict = useDictionary()

    function handleMainNavToggleClick(_e: React.MouseEvent) {
        setShowMainMenu((prev) => !prev)
    }

    return (
        <>
            <div>
                <MainMenuToggle
                    dict={dict}
                    menuVisible={showMainMenu}
                    onClick={handleMainNavToggleClick}
                />
            </div>

            {showMainMenu && (
                <MainMenuContainer>
                    <MainMenu />
                </MainMenuContainer>
            )}
        </>
    )
}

export default HeaderMainNavigation
