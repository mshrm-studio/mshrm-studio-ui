import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import ToolsDataTable from '@/app/[lang]/admin/tools/_components/DataTable'
import { Button } from '@/app/[lang]/admin/_components/shadcnui/button'
import LocaleLink from '@/app/[lang]/_components/LocaleLink'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, [
        'admin/dataTable',
        'admin/tool',
        'attribute',
        'common',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-tools">
                <div className="mb-4">
                    <LocaleLink href="/admin/tools/create">
                        <Button>{dict.tool.action.create}</Button>
                    </LocaleLink>
                </div>

                <ToolsDataTable />
            </div>
        </DictionaryContextProvider>
    )
}
