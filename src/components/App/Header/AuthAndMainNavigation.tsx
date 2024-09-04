'use client'

import styles from '@/styles/header/header.module.css'
import MainNavigation from '@/components/App/Header/MainNavigation'
import AuthNavigation from '@/components/App/Header/AuthNavigation'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useClickOutside } from '@/utils/hooks/useClickOutside'

type Props = {}

const HeaderAuthAndMainNavigation: React.FC<Props> = ({}) => {
    const [showAuthMenu, setShowAuthMenu] = useState(false)
    const [showMainMenu, setShowMainMenu] = useState(false)

    useEffect(() => {
        setShowAuthMenu(false)
    }, [showMainMenu])

    const pathname = usePathname()
    useEffect(() => {
        setShowAuthMenu(false)
        setShowMainMenu(false)
    }, [pathname])

    const authNavContainerRef = useRef<HTMLDivElement>(null)
    useClickOutside(authNavContainerRef, () => setShowAuthMenu(false))

    return (
        <div className={styles.authAndMainNavigation}>
            {!showMainMenu && (
                <div
                    ref={authNavContainerRef}
                    className={styles.authNavigationContainer}
                >
                    <AuthNavigation
                        showAuthMenu={showAuthMenu}
                        setShowAuthMenu={setShowAuthMenu}
                    />
                </div>
            )}

            <div className={styles.mainNavigationContainer}>
                <MainNavigation
                    showMainMenu={showMainMenu}
                    setShowMainMenu={setShowMainMenu}
                />
            </div>
        </div>
    )
}

export default HeaderAuthAndMainNavigation
