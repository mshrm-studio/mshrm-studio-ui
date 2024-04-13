import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Hero from '@/components/HomePage/Hero'
import AboutUsMessage from '@/components/HomePage/AboutUsMessage'
import MarketEntityList from '@/components/MarketEntity/List'
import DictionaryContextProvider from '@/components/Context/DictionaryProvider'

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
    ]

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <Hero dictionary={dictionary} />

            <div className="bg-[#F8F8F8] py-12 dark:bg-[#131313]">
                <AboutUsMessage dictionary={dictionary} />

                <MarketEntityList marketEntities={marketEntityList} />
            </div>
        </DictionaryContextProvider>
    )
}
