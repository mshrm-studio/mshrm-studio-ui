import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import { userListFetcher } from '@/utils/repo/userListFetcher'
import { userFetcher } from '@/utils/repo/userFetcher'
import DataDisplayItem from '@/components/Admin/DataDisplayItem'
import { Separator } from '@/components/Admin/shadcnui/separator'

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
    ])

    const user = await userFetcher(guid)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-user">
                <dl>
                    <DataDisplayItem label="GUID" copy={user.guidId}>
                        {user.guidId}
                    </DataDisplayItem>

                    <Separator />

                    <DataDisplayItem label={dict.attribute.name}>
                        {user.firstName} {user.lastName}
                    </DataDisplayItem>
                </dl>
            </div>
        </DictionaryContextProvider>
    )
}
