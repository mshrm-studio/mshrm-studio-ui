'use client'

import CryptoWalletConnect from '@/components/CryptoWallet/Connect'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import EthAddress from '@/components/EthAddress'
import { useIsAuthenticated } from '@azure/msal-react'
import UserContext from '@/utils/context/User'
import styles from '@/styles/homepage/hero.module.css'
import { useContext } from 'react'
import useDictionary from '@/utils/hooks/useDictionary'

export default function HomePageHeroAuthOptions() {
    const dict = useDictionary()
    const { address, isConnected: isCryptoAuthenticated } =
        useWeb3ModalAccount()
    const isAuthenticated = useIsAuthenticated()
    const { user } = useContext(UserContext)

    return (
        <div className={styles.authOptions}>
            <div
                className={`${styles.authOption} ${styles.microsoftAuthOption}`}
            >
                {isAuthenticated ? (
                    <>
                        {user && (
                            <span className={styles.ssoUserEmail}>
                                {user.email}
                            </span>
                        )}

                        <a href="#" className={styles.ssoLogoutLink}>
                            TODO: Logout
                        </a>
                    </>
                ) : (
                    <a href="/auth/sso" className={styles.ssoLink}>
                        {dict.action.signInWithMicrosoft}
                    </a>
                )}
            </div>

            <div className={`${styles.authOption} ${styles.cryptoAuthOption}`}>
                {isCryptoAuthenticated ? (
                    <>
                        {address && (
                            <span className={styles.cryptoAddress}>
                                <EthAddress address={address} shortened />
                            </span>
                        )}

                        <button className={styles.cryptoLogoutBtn}>
                            TODO: Logout
                        </button>
                    </>
                ) : (
                    <CryptoWalletConnect className={styles.cryptoLoginBtn}>
                        {dict.action.loginWithCryptoWallet}
                    </CryptoWalletConnect>
                )}
            </div>
        </div>
    )
}