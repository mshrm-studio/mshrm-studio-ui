import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import Hero from '@/components/App/HomePage/Hero/Hero'
import Stack from '@/components/App/HomePage/Tools'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Clients from '@/components/App/HomePage/Clients'
import MarketEntities from '@/components/App/HomePage/MarketEntities'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, [
        'action',
        'app/pages/home',
        'marketEntity',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="homepage">
                <Hero dict={dict} />

                <Clients dict={dict} />

                <MarketEntities dict={dict} />

                <Stack dict={dict} />
            </div>
        </DictionaryContextProvider>
    )
}
