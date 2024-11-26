import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import { assetListFetcher } from '@/utils/repo/assetListFetcher'
import { assetFetcher } from '@/utils/repo/assetFetcher'
import DataDisplayItem from '@/components/Admin/DataDisplayItem'
import { Separator } from '@/components/Admin/shadcnui/separator'

export const dynamic = 'force-static'

export async function generateStaticParams() {
    const data = await assetListFetcher()

    if (data)
        return data.results.flatMap((asset) =>
            locales.map((lang) => ({ guid: asset.guidId, lang }))
        )

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
    ])

    const asset = await assetFetcher(guid)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-asset">
                <dl>
                    <DataDisplayItem label="GUID" copy={asset.guidId}>
                        {asset.guidId}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.name}>
                        {asset.name}
                    </DataDisplayItem>

                    <Separator />

                    {asset.logoUrl && (
                        <DataDisplayItem label={dict.attribute.logo}>
                            <img src={asset.logoUrl} alt={asset.name || ''} />
                        </DataDisplayItem>
                    )}

                    <Separator />

                    <DataDisplayItem label={dict.attribute.description}>
                        {asset.description || '-'}
                    </DataDisplayItem>
                </dl>
            </div>
        </DictionaryContextProvider>
    )
}
