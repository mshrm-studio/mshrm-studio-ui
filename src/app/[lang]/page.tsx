import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Hero from '@/components/HomePage/Hero/Hero'
import Stack from '@/components/HomePage/Stack'
import MarketEntityList from '@/components/MarketEntity/List'
import DictionaryContextProvider from '@/components/Context/DictionaryProvider'
import styles from '@/utils/styles/homepage/homepage.module.css'
import dynamic from 'next/dynamic'
import DraggableContactUsBtn from '@/components/HomePage/DraggableContactUsBtn'

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
    const dictionary = await getDictionary(lang)

    const marketEntityList = [
        {
            currency: 'USD',
            name: 'BTC',
            logo: 'IMAGE_URL',
            price: 71765,
            priceChangePercentage: 12.3,
            marketCap: 12000000000,
            volume: 400000000,
            lastUpdated: '2024-04-13T15:45:30Z',
            source: 'Coin Gecko',
        },
        {
            currency: 'USD',
            name: 'BTC',
            logo: 'IMAGE_URL',
            price: 71765,
            priceChangePercentage: 12.3,
            marketCap: 12000000000,
            volume: 400000000,
            lastUpdated: '2024-04-13T15:45:30Z',
            source: 'Coin Gecko',
        },
        {
            currency: 'USD',
            name: 'BTC',
            logo: 'IMAGE_URL',
            price: 71765,
            priceChangePercentage: 12.3,
            marketCap: 12000000000,
            volume: 400000000,
            lastUpdated: '2024-04-13T15:45:30Z',
            source: 'Coin Gecko',
        },
        {
            currency: 'USD',
            name: 'BTC',
            logo: 'IMAGE_URL',
            price: 71765,
            priceChangePercentage: 12.3,
            marketCap: 12000000000,
            volume: 400000000,
            lastUpdated: '2024-04-13T15:45:30Z',
            source: 'Coin Gecko',
        },
        {
            currency: 'USD',
            name: 'BTC',
            logo: 'IMAGE_URL',
            price: 71765,
            priceChangePercentage: 12.3,
            marketCap: 12000000000,
            volume: 400000000,
            lastUpdated: '2024-04-13T15:45:30Z',
            source: 'Coin Gecko',
        },
    ]

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <div id="homepage">
                <DraggableContactUsBtn />

                <Hero />

                <section className={styles.aboutAndMarketEntitySection}>
                    <div className="mb-12">
                        <MarketEntityList marketEntities={marketEntityList} />
                    </div>

                    <div className="mb-12 space-y-6 xl:max-w-site xl:mx-auto">
                        <div>
                            <CryptoWalletConnect className="underline">
                                {dictionary.homepage.loginWithCryptoWallet}
                            </CryptoWalletConnect>
                        </div>

                        <div>
                            <CryptoWalletAddress />
                        </div>
                    </div>
                </section>

                <Stack />
            </div>
        </DictionaryContextProvider>
    )
}
