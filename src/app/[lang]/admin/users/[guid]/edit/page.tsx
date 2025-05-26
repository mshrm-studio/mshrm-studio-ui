import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import UserPageProvider from '@/app/[lang]/admin/users/[guid]/_components/UserPageProvider'

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

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-edit-user">
                <UserPageProvider guid={guid} page="edit" />
            </div>
        </DictionaryContextProvider>
    )
}
