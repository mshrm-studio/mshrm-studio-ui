import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Form from '@/app/[lang]/admin/users/[guid]/delete/_components/Form'
import { userListFetcher } from '@/utils/repo/userListFetcher'
import { userFetcher } from '@/utils/repo/userFetcher'

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
            <div id="admin-delete-user">
                <Form user={data} />
            </div>
        </DictionaryContextProvider>
    )
}
