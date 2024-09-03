import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ToolsDataTable from '@/components/Admin/Tools/DataTable'
import { Button } from '@/components/Admin/shadcnui/button'
import Link from 'next/link'

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
        'event',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-tools">
                <div className="mb-4">
                    <Button asChild>
                        <Link href="/admin/tools/create">
                            {dict.tool.action.create}
                        </Link>
                    </Button>
                </div>

                <ToolsDataTable />
            </div>
        </DictionaryContextProvider>
    )
}
