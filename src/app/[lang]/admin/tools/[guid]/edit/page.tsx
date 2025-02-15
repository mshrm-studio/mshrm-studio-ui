import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Form from '@/app/[lang]/admin/tools/_components/Form'
import { toolFetcher } from '@/utils/repo/toolFetcher'
import { toolListFetcher } from '@/utils/repo/toolListFetcher'

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
            <div id="admin-edit-tool">
                <Form tool={data} />
            </div>
        </DictionaryContextProvider>
    )
}
