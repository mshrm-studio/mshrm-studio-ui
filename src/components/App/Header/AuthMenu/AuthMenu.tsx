'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import styles from '@/styles/header/authNavigation.module.css'
import { useContext, useMemo } from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import UserContext from '@/utils/context/User'
import AuthMenuItem from '@/utils/dto/AuthMenuItem'
import AuthMenuAction from '@/components/App/Header/AuthMenu/Action'

type Props = {}

const HeaderAuthMenu: React.FC<Props> = ({}) => {
    const dict = useDictionary()
    const { address, isConnected: isCryptoAuthenticated } =
        useWeb3ModalAccount()
    const isAuthenticated = useIsAuthenticated()
    const { user } = useContext(UserContext)

    const walletMenuItem = useMemo(() => {
        return isCryptoAuthenticated
            ? {
                  id: 'disconnectWallet',
                  actionText: dict.header.authMenu.disconnectWallet,
              }
            : {
                  id: 'connectWallet',
                  actionText: dict.header.authMenu.connectWallet,
              }
    }, [address, dict, isCryptoAuthenticated])

    const ssoMenuItem = useMemo(() => {
        return isAuthenticated
            ? {
                  id: 'microsoftLogout',
                  actionText: dict.header.authMenu.ssoSignOut,
                  href: '/auth/sso/logout',
              }
            : {
                  id: 'microsoftLogin',
                  actionText: dict.header.authMenu.ssoSignIn,
                  href: '/auth/sso',
              }
    }, [dict, isAuthenticated, user])

    const menu = useMemo<AuthMenuItem[]>(() => {
        return [ssoMenuItem, walletMenuItem]
    }, [ssoMenuItem, walletMenuItem])

    return (
        <nav>
            <ul className={styles.ul}>
                {menu.map((item, i) => (
                    <li key={i} className={styles.li}>
                        <AuthMenuAction item={item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderAuthMenu
