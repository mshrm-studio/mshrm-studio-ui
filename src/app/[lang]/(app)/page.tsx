import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Hero from '@/components/App/HomePage/Hero'
import Stack from '@/components/App/HomePage/Stack'
import MarketEntityList from '@/components/App/MarketEntity/List'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import styles from '@/utils/styles/homepage/homepage.module.css'
import dynamic from 'next/dynamic'
import marketEntities from '@/utils/content/marketEntities'

const CryptoWalletAddress = dynamic(
    () => import('@/components/CryptoWallet/Address'),
    {
        ssr: false,
    }
)

const CryptoWalletConnect = dynamic(
    () => import('@/components/CryptoWallet/Connect'),
    {
        ssr: false,
    }
)

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="homepage">
                <Hero />

                <section className={styles.aboutAndMarketEntitySection}>
                    <div>
                        <MarketEntityList marketEntities={marketEntities} />
                    </div>

                    {/* <div className="mb-12 space-y-6 xl:max-w-site xl:mx-auto">
                        <div>
                            <CryptoWalletConnect className="underline">
                                {dict.homepage.loginWithCryptoWallet}
                            </CryptoWalletConnect>
                        </div>

                        <div>
                            <CryptoWalletAddress />
                        </div>
                    </div> */}
                </section>

                <Stack />
            </div>
        </DictionaryContextProvider>
    )
}
