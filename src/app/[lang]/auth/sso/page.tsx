import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import MsalLogin from '@/app/[lang]/_components/Msal/Login'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, ['common'])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <MsalLogin />
        </DictionaryContextProvider>
    )
}
