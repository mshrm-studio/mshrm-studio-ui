import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import Hero from '@/components/App/HomePage/Hero'
import Stack from '@/components/App/HomePage/Stack'
import MarketEntityList from '@/components/App/MarketEntity/List'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import styles from '@/styles/homepage/homepage.module.css'
import marketEntities from '@/utils/content/marketEntities'

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

                <section className={styles.marketEntityListSection}>
                    <MarketEntityList marketEntities={marketEntities} />
                </section>

                <Stack />
            </div>
        </DictionaryContextProvider>
    )
}
