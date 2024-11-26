import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Form from '@/app/[lang]/admin/users/_components/Form'
import { userFetcher } from '@/utils/repo/userFetcher'
import { userListFetcher } from '@/utils/repo/userListFetcher'

export const dynamic = 'force-static'

export async function generateStaticParams() {
    const data = await userListFetcher()

    if (data)
        return data.results.flatMap((user) =>
            locales.map((lang) => ({ guid: user.guidId, lang }))
        )

    return []
}

type PageProps = {
    params: { guid: string; lang: Locale }
}

export default async function Page({ params }: Readonly<PageProps>) {
    const { guid, lang } = await params

    const dict = await loadDictionaries(lang, [
        'admin/user',
        'attribute',
        'common',
        'enum',
        'form',
    ])

    const data = await userFetcher(guid)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-edit-user">
                <Form user={data} />
            </div>
        </DictionaryContextProvider>
    )
}
