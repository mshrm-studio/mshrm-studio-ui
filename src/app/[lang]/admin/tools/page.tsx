import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Tool from '@/utils/dto/Tool'
import tools from '@/utils/content/tools'
import ToolsDataTable from '@/components/Admin/Tools/DataTable'
import { Button } from '@/components/Admin/shadcnui/button'
import Link from 'next/link'

async function getData(): Promise<Tool[]> {
    // TODO: Fetch data from your API here.

    return tools
}

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dictionary = await getDictionary(lang)

    const data = await getData()

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <div id="admin-tools">
                <div className="mb-4">
                    <Button asChild>
                        <Link href="/admin/tools/create">
                            (TODO) Create tool
                        </Link>
                    </Button>
                </div>

                <ToolsDataTable tools={data} />
            </div>
        </DictionaryContextProvider>
    )
}
