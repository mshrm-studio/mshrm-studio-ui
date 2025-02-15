import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Form from '@/app/[lang]/admin/assets/[guid]/delete/_components/Form'
import { assetListFetcher } from '@/utils/repo/assetListFetcher'
import { assetFetcher } from '@/utils/repo/assetFetcher'

export const dynamic = 'force-static'

export async function generateStaticParams() {
    // const data = await assetListFetcher()

    // if (data)
    //     return data.results.flatMap((asset) =>
    //         locales.map((lang) => ({ guid: asset.guidId, lang }))
    //     )

    return []
}

type PageProps = {
    params: { guid: string; lang: Locale }
}

export default async function Page({ params }: Readonly<PageProps>) {
    const { guid, lang } = await params

    const dict = await loadDictionaries(lang, [
        'admin/asset',
        'attribute',
        'common',
        'enum',
        'form',
    ])

    const data = await assetFetcher(guid)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-delete-asset">
                <Form asset={data} />
            </div>
        </DictionaryContextProvider>
    )
}
