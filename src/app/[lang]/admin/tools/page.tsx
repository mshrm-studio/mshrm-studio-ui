import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Tool from '@/utils/dto/Tool'
import tools from '@/utils/content/tools'
import ToolsDataTable from '@/components/Admin/Tools/DataTable'
import { Button } from '@/components/Admin/shadcnui/button'
import Link from 'next/link'
import { ToolType } from '@/utils/enums/ToolType'

async function getData(): Promise<Tool[]> {
    // TODO: Fetch data from your API here.

    return tools.map((tool) => ({
        ...tool,
        guidId: 'TODO',
        rank: 0,
        toolType: ToolType.Technology,
        description: null,
        logoGuidId: 'TODO',
    }))
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
                            {dictionary.admin.tool.action.create}
                        </Link>
                    </Button>
                </div>

                <ToolsDataTable tools={data} />
            </div>
        </DictionaryContextProvider>
    )
}
