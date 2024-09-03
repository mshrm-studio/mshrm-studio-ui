import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import EditTool from '@/components/Admin/Tools/Edit'

type PageProps = {
    params: { guid: string; lang: Locale }
}

export default async function Page({ params }: Readonly<PageProps>) {
    const dict = await loadDictionaries(params.lang, [
        'admin',
        'admin/form',
        'common',
        'enum',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-edit-tool">
                <EditTool guid={params.guid} />
            </div>
        </DictionaryContextProvider>
    )
}
