'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/styles/header/mainNavigation.module.css'
import { useContext, useMemo } from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import UserContext from '@/utils/context/User'
import MainMenuItem from '@/utils/dto/MainMenuItem'
import MainMenuAction from '@/components/App/Header/MainMenu/Action'
import { FolderArrowDownIcon } from '@heroicons/react/24/outline'
import DimensionsContext from '@/utils/context/Dimensions'

type Props = {}

const HeaderMainMenu: React.FC<Props> = ({}) => {
    const dict = useDictionary()
    const { address, isConnected: isCryptoAuthenticated } =
        useWeb3ModalAccount()
    const isAuthenticated = useIsAuthenticated()
    const { user } = useContext(UserContext)
    const { dimensions } = useContext(DimensionsContext)

    const cryptoWalletMenuItem = useMemo(() => {
        const identifier = address || 'ETH'

        return isCryptoAuthenticated
            ? {
                  id: 'disconnectWallet',
                  actionText: dict.header.mainMenu.logOut,
                  prependedLabel:
                      dict.header.mainMenu.loggedInWithEthAddress.replace(
                          ':ethAddress',
                          dimensions.viewportWidth < 1024
                              ? `${identifier.slice(0, 6)}...`
                              : identifier
                      ),
              }
            : {
                  id: 'connectWallet',
                  actionText: dict.header.mainMenu.connectWallet,
              }
    }, [address, dict, dimensions.viewportWidth, isCryptoAuthenticated])

    const ssoMenuItem = useMemo(() => {
        const identifier = user?.email || 'SSO'

        return isAuthenticated
            ? {
                  id: 'microsoftLogout',
                  actionText: dict.header.mainMenu.logOut,
                  href: '/auth/sso/logout',
                  prependedLabel:
                      dict.header.mainMenu.loggedInWithEmail.replace(
                          ':email',
                          dimensions.viewportWidth < 640
                              ? `${identifier.slice(0, 4)}...`
                              : identifier
                      ),
              }
            : {
                  id: 'microsoftLogin',
                  actionText: dict.header.mainMenu.microsoftLogin,
                  href: '/auth/sso',
              }
    }, [dict, dimensions.viewportWidth, isAuthenticated, user])

    const menu = useMemo<MainMenuItem[]>(() => {
        return [
            ssoMenuItem,
            cryptoWalletMenuItem,
            {
                id: 'ourBrand',
                actionText: dict.header.mainMenu.ourBrand,
                href: 'https://www.figma.com/design/qlL67hLsYStO1HlJbEcNtB/MSHRM.studio',
                appendedIcon: FolderArrowDownIcon,
            },
            { id: 'cms', actionText: dict.header.mainMenu.cms, href: '/admin' },
            {
                id: 'contactUs',
                actionText: dict.header.mainMenu.contactUs,
                href: '/contact',
            },
            {
                id: 'email',
                actionText: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
                href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`,
            },
        ]
    }, [cryptoWalletMenuItem, dict, ssoMenuItem])

    return (
        <nav>
            <ul className={styles.ul}>
                {menu.map((item, i) => (
                    <li key={i} className={styles.li}>
                        <MainMenuAction item={item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderMainMenu
