import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(lang)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <div id="admin-contact-form-submissions">
                TODO: contact form submissions
            </div>
        </DictionaryContextProvider>
    )
}
