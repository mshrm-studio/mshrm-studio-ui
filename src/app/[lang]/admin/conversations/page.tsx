import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, [
        'action',
        'admin',
        'attribute',
        'common',
        'event',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-conversations">TODO: contact form submissions</div>
        </DictionaryContextProvider>
    )
}
