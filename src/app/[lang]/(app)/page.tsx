import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import Hero from '@/components/App/HomePage/Hero/Hero'
import Stack from '@/components/App/HomePage/Tools'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Clients from '@/components/App/HomePage/Clients'
import MarketEntities from '@/components/App/HomePage/MarketEntities'
import type { Metadata } from 'next'

type Props = Readonly<{
    params: { lang: Locale }
}>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const dict = await loadDictionaries(params.lang, [
        'app/pages/home',
        'common',
    ])

    return {
        description: 'TODO: Add description',
        openGraph: {
            description: 'TODO: Add description',
            title: dict.home.title,
        },
        title: dict.home.title,
        twitter: {
            description: 'TODO: Add description',
            title: dict.home.title,
        },
    }
}

export default async function Page({ params }: Props) {
    const dict = await loadDictionaries(params.lang, [
        'app/pages/home',
        'common',
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
