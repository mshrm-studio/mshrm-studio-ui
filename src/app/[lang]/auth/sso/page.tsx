import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import MsalReact from '@/components/MsalReact'
import DictionaryContextProvider from '@/components/Provider/Dictionary'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    return (
        <DictionaryContextProvider dictionary={dict}>
            <MsalReact />
        </DictionaryContextProvider>
    )
}
