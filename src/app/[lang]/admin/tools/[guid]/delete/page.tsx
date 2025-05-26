import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import Form from '@/app/[lang]/admin/tools/[guid]/delete/_components/Form'
import { toolListFetcher } from '@/utils/repo/toolListFetcher'
import { toolFetcher } from '@/utils/repo/toolFetcher'

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
        'form',
    ])

    const data = await toolFetcher(guid)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-delete-tool">
                <Form tool={data} />
            </div>
        </DictionaryContextProvider>
    )
}
