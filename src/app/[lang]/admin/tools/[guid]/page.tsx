import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Details from '@/components/Admin/Tools/Details'

type PageProps = {
    params: { guid: string; lang: Locale }
}

export default async function Page({ params }: Readonly<PageProps>) {
    const dict = await loadDictionaries(params.lang, ['admin', 'enum'])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-tool">
                <Details guid={params.guid} />
            </div>
        </DictionaryContextProvider>
    )
}
