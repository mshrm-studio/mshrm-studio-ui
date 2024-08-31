'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/styles/header/main-navigation/mainNavigation.module.css'
import { useContext, useMemo } from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import UserContext from '@/utils/context/User'
import MainNavigationItem from '@/utils/dto/MainNavigationItem'
import MainNavigationAction from '@/components/App/Header/MainNavigation/Action'
import { FolderArrowDownIcon } from '@heroicons/react/24/outline'
import DimensionsContext from '@/utils/context/Dimensions'

type Props = {}

const HeaderMainNavigation: React.FC<Props> = ({}) => {
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
                  id: 'cryptoLogout',
                  actionText: dict.header.menuItem.logOut,
                  prependedLabel:
                      dict.header.menuItem.loggedInWithEthAddress.replace(
                          ':ethAddress',
                          dimensions.viewportWidth < 640
                              ? `${identifier.slice(0, 4)}...`
                              : identifier
                      ),
              }
            : {
                  id: 'cryptoLogin',
                  actionText: dict.header.menuItem.connectWallet,
              }
    }, [address, dict, dimensions.viewportWidth, isCryptoAuthenticated])

    const ssoMenuItem = useMemo(() => {
        const identifier = user?.email || 'SSO'

        return isAuthenticated
            ? {
                  id: 'microsoftLogout',
                  actionText: dict.header.menuItem.logOut,
                  href: '/auth/sso/logout',
                  prependedLabel:
                      dict.header.menuItem.loggedInWithEmail.replace(
                          ':email',
                          dimensions.viewportWidth < 640
                              ? `${identifier.slice(0, 4)}...`
                              : identifier
                      ),
              }
            : {
                  id: 'microsoftLogin',
                  actionText: dict.header.menuItem.microsoftLogin,
                  href: '/auth/sso',
              }
    }, [dict, dimensions.viewportWidth, isAuthenticated, user])

    const menu = useMemo<MainNavigationItem[]>(() => {
        return [
            ssoMenuItem,
            cryptoWalletMenuItem,
            {
                id: 'ourBrand',
                actionText: dict.header.menuItem.ourBrand,
                href: 'https://www.figma.com/design/qlL67hLsYStO1HlJbEcNtB/MSHRM.studio',
                appendedIcon: FolderArrowDownIcon,
            },
            { id: 'cms', actionText: dict.header.menuItem.cms, href: '/admin' },
            { id: 'contactUs', actionText: dict.header.menuItem.contactUs },
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
                {menu.map((item) => (
                    <li key={item.id} className={styles.li}>
                        <MainNavigationAction item={item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderMainNavigation
