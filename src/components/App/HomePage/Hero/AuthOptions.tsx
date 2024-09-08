'use client'

import {
    useDisconnect,
    useWeb3Modal,
    useWeb3ModalAccount,
} from '@web3modal/ethers/react'
import EthAddress from '@/components/EthAddress'
import { useIsAuthenticated } from '@azure/msal-react'
import UserContext from '@/utils/context/User'
import styles from '@/styles/pages/home/hero.module.css'
import { useContext } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'

export default function HomePageHeroAuthOptions() {
    const { open } = useWeb3Modal()
    const dict = useDictionary()
    const { address, isConnected: isCryptoAuthenticated } =
        useWeb3ModalAccount()
    const isAuthenticated = useIsAuthenticated()
    const { user } = useContext(UserContext)
    const { disconnect } = useDisconnect()

    return (
        <div className={styles.authOptions}>
            <div
                className={`${styles.authOption} ${styles.microsoftAuthOption}`}
            >
                {isAuthenticated ? (
                    <>
                        {user && (
                            <span
                                key="ssoUserEmail"
                                className={styles.ssoUserEmail}
                            >
                                {user.email}
                            </span>
                        )}

                        <a
                            key="ssoLogoutLink"
                            href="#TODO"
                            className={styles.ssoLogoutLink}
                        >
                            {dict.home.ssoSignOut}
                        </a>
                    </>
                ) : (
                    <a
                        key="ssoLoginLink"
                        href="/auth/sso"
                        className={styles.ssoLink}
                    >
                        {dict.home.ssoSignIn}
                    </a>
                )}
            </div>

            <div className={`${styles.authOption} ${styles.cryptoAuthOption}`}>
                {isCryptoAuthenticated ? (
                    <>
                        {address && (
                            <span
                                ref="walletAddress"
                                className={styles.cryptoAddress}
                            >
                                <EthAddress address={address} shortened />
                            </span>
                        )}

                        <button
                            key="walletDisconnect"
                            className={styles.cryptoLogoutBtn}
                            aria-label={dict.home.disconnectWallet}
                            title={dict.home.disconnectWallet}
                            onClick={() => disconnect()}
                        >
                            {dict.home.disconnectWallet}
                        </button>
                    </>
                ) : (
                    <button
                        key="walletConnect"
                        className={styles.cryptoLoginBtn}
                        aria-label={dict.home.connectWallet}
                        title={dict.home.connectWallet}
                        onClick={() => open()}
                    >
                        {dict.home.connectWallet}
                    </button>
                )}
            </div>
        </div>
    )
}
