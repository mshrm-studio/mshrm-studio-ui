import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Hero from '@/components/HomePage/Hero'
import Stack from '@/components/HomePage/Stack'
import AboutUsMessage from '@/components/HomePage/AboutUsMessage'
import MarketEntityList from '@/components/MarketEntity/List'
import DictionaryContextProvider from '@/components/Context/DictionaryProvider'
import styles from '@/utils/styles/homepage.module.css'
import WalletAddress from '@/components/WalletAddress'
import WalletConnect from '@/components/WalletConnect'
// import dynamic from 'next/dynamic'

// const WalletAddress = dynamic(() => import('@/components/WalletAddress'), {
//     ssr: false,
// })

// const WalletConnect = dynamic(() => import('@/components/WalletConnect'), {
//     ssr: false,
// })

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
            <Hero dictionary={dictionary} />

            <section className={styles.aboutAndMarketEntitySection}>
                <div className="mb-12 xl:max-w-site xl:mx-auto">
                    <AboutUsMessage />
                </div>

                <div className="mb-12">
                    <MarketEntityList marketEntities={marketEntityList} />
                </div>

                <div className="mb-12 space-y-6 xl:max-w-site xl:mx-auto">
                    <div>
                        <WalletConnect className="underline">
                            {dictionary.homepage.loginWithCryptoWallet}
                        </WalletConnect>
                    </div>

                    <div>
                        <WalletAddress />
                    </div>
                </div>
            </section>

            <Stack />
        </DictionaryContextProvider>
    )
}
