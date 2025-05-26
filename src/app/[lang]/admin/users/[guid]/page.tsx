import { Locale, locales } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import DescriptionList from '@/app/[lang]/admin/users/[guid]/_components/DescriptionList'

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

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-user">
                <DescriptionList guid={guid} />
            </div>
        </DictionaryContextProvider>
    )
}
