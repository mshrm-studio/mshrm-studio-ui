import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import Hero from '@/app/[lang]/(app)/_components/Hero/Hero'
import Stack from '@/app/[lang]/(app)/_components/Tools'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
// import Clients from '@/components/App/HomePage/Clients'
import MarketEntities from '@/app/[lang]/(app)/_components/MarketEntities'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { assetListFetcher } from '@/utils/repo/assetListFetcher'

type Props = Readonly<{
    params: { lang: Locale }
}>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const dict = await loadDictionaries(params.lang, ['app/pages/home'])

    return {
        alternates: {
            canonical: '/',
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}`
                return acc
            }, {} as Record<string, string>),
        },
        description: dict.home.metadata.description,
        openGraph: {
            description: dict.home.metadata.description,
            title: dict.home.metadata.title,
        },
        title: dict.home.metadata.title,
        twitter: {
            description: dict.home.metadata.description,
            title: dict.home.metadata.title,
        },
    }
}

async function getAssets() {
    const params = new URLSearchParams()

    params.append('perPage', '5')

    const response = await assetListFetcher(params.toString())

    if (!response) notFound()

    return response
}

export default async function Page({ params }: Props) {
    const dict = await loadDictionaries(params.lang, [
        'app/pages/home',
        'common',
    ])

    const assetsResponse = await getAssets()

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="homepage">
                <Hero dict={dict} />

                {/* <Clients dict={dict} /> */}

                <MarketEntities assets={assetsResponse.results} dict={dict} />

                <Stack dict={dict} />
            </div>
        </DictionaryContextProvider>
    )
}
