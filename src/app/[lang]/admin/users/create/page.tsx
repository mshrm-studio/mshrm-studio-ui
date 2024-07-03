import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import UserForm from '@/components/Admin/Users/Form'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(lang)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <div id="admin-create-user">
                <UserForm />
            </div>
        </DictionaryContextProvider>
    )
}
