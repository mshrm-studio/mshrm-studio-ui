import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import MsalReact from '@/components/MsalReact'
import DictionaryContextProvider from '@/components/Provider/Dictionary'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, ['admin'])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <MsalReact />
        </DictionaryContextProvider>
    )
}
