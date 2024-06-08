import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ToolForm from '@/components/Admin/Tools/Form'
import Card from '@/components/Admin/Card'
import Breadcrumbs from '@/components/Admin/Breadcrumbs'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(lang)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <div id="admin-create-tool">
                <ToolForm />
            </div>
        </DictionaryContextProvider>
    )
}
