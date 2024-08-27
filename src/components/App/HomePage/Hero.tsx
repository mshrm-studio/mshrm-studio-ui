'use client'

import DimensionsContext from '@/utils/context/Dimensions'
import useDictionary from '@/utils/hooks/useDictionary'
import { useContext, useMemo } from 'react'
import ContactUsBtn from '@/components/App/ContactUsBtn'
import styles from '@/styles/homepage/hero.module.css'
import CryptoWalletConnect from '@/components/CryptoWallet/Connect'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import EthAddress from '@/components/EthAddress'
import { useIsAuthenticated } from '@azure/msal-react'
import UserContext from '@/utils/context/User'

export default function HomePageHero() {
    const dict = useDictionary()
    const { dimensions } = useContext(DimensionsContext)
    const { address, isConnected: isCryptoAuthenticated } =
        useWeb3ModalAccount()
    const isAuthenticated = useIsAuthenticated()
    const { user } = useContext(UserContext)

    const sectionHeight = useMemo(() => {
        return dimensions.viewportHeight - dimensions.headerHeight
    }, [dimensions.headerHeight, dimensions.viewportHeight])

    return (
        <section
            className={styles.heroSection}
            style={{ height: sectionHeight }}
        >
            <h1 className={styles.heading1}>{dict.homepage.title}</h1>

            <div className={styles.authOptionsAndContactBtn}>
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

                    <div
                        className={`${styles.authOption} ${styles.cryptoAuthOption}`}
                    >
                        {isCryptoAuthenticated ? (
                            <>
                                {address && (
                                    <span className={styles.cryptoAddress}>
                                        <EthAddress
                                            address={address}
                                            shortened
                                        />
                                    </span>
                                )}

                                <button className={styles.cryptoLogoutBtn}>
                                    TODO: Logout
                                </button>
                            </>
                        ) : (
                            <CryptoWalletConnect
                                className={styles.cryptoLoginBtn}
                            >
                                {dict.action.loginWithCryptoWallet}
                            </CryptoWalletConnect>
                        )}
                    </div>
                </div>

                <div className={styles.contactBtnContainer}>
                    <ContactUsBtn />
                </div>
            </div>
        </section>
    )
}
