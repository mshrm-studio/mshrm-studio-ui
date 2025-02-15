import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import { assetListFetcher } from '@/utils/repo/assetListFetcher'
import { assetFetcher } from '@/utils/repo/assetFetcher'
import DataDisplayItem from '@/components/Admin/DataDisplayItem'
import { Separator } from '@/components/Admin/shadcnui/separator'
import { priceListFetcher } from '@/utils/repo/priceListFetcher'
import AssetPrice from '@/components/Asset/Price'

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
    ])

    const asset = await assetFetcher(guid)

    const price = await priceListFetcher('symbols[0]=BTC&symbols[1]=ETH')

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

                    <DataDisplayItem label="Price">
                        <AssetPrice assetSymbol={asset.symbol} />
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.description}>
                        {asset.description}
                    </DataDisplayItem>

                    <Separator />

                    {asset.logoUrl && (
                        <DataDisplayItem label={dict.attribute.logo}>
                            <img src={asset.logoUrl} alt={asset.name || ''} />
                        </DataDisplayItem>
                    )}

                    <Separator />

                    <DataDisplayItem label={dict.attribute.assetType}>
                        {dict.enum.AssetType[asset.assetType]}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.pricingProvider}>
                        {asset.providerType}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.symbol}>
                        {asset.symbol}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.symbolNative}>
                        {asset.symbolNative}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.decimalPlaces}>
                        {asset.decimalPlaces}
                    </DataDisplayItem>
                </dl>
            </div>
        </DictionaryContextProvider>
    )
}
