import { Locale } from '@/utils/enums/locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Tool from '@/utils/dto/Tool'
import tools from '@/utils/content/tools'
import ToolsDataTable from '@/components/Admin/Tools/DataTable'

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
                <ToolsDataTable tools={data} />
            </div>
        </DictionaryContextProvider>
    )
}
