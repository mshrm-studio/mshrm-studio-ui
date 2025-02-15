import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import { toolListFetcher } from '@/utils/repo/toolListFetcher'
import { toolFetcher } from '@/utils/repo/toolFetcher'
import DataDisplayItem from '@/components/Admin/DataDisplayItem'
import { Separator } from '@/components/Admin/shadcnui/separator'

export const dynamic = 'force-static'

export async function generateStaticParams() {
    // const data = await toolListFetcher()

    // if (data)
    //     return data.results.flatMap((tool) =>
    //         locales.map((lang) => ({ guid: tool.guidId, lang }))
    //     )

    return []
}

type PageProps = {
    params: { guid: string; lang: Locale }
}

export default async function Page({ params }: Readonly<PageProps>) {
    const { guid, lang } = await params

    const dict = await loadDictionaries(lang, [
        'admin/tool',
        'attribute',
        'common',
        'enum',
    ])

    const tool = await toolFetcher(guid)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-tool">
                <dl>
                    <DataDisplayItem label="GUID" copy={tool.guidId}>
                        {tool.guidId}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.name}>
                        {tool.name}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.logo}>
                        <img src={tool.logoUrl} alt={tool.name} />
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.description}>
                        {tool.description || '-'}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem
                        label={dict.attribute.link}
                        copy={tool.link || undefined}
                        link={tool.link || undefined}
                    >
                        {tool.link || '-'}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.rank}>
                        {typeof tool.rank === 'number' ? tool.rank : '-'}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.type}>
                        {dict.enum['ToolType'][tool.toolType]}
                    </DataDisplayItem>
                </dl>
            </div>
        </DictionaryContextProvider>
    )
}
