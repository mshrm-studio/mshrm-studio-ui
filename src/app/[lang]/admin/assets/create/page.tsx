import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import Form from '@/app/[lang]/admin/assets/_components/Form'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, [
        'admin/asset',
        'common',
        'enum',
        'form',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-create-asset">
                <Form />
            </div>
        </DictionaryContextProvider>
    )
}
