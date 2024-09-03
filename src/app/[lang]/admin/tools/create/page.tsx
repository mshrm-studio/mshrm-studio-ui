import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ToolForm from '@/components/Admin/Tools/Form'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, [
        'admin/form',
        'admin/tool',
        'common',
        'enum',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-create-tool">
                <ToolForm />
            </div>
        </DictionaryContextProvider>
    )
}
