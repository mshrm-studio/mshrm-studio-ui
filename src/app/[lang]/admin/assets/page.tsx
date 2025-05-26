import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import AssetsDataTable from '@/app/[lang]/admin/assets/_components/DataTable'
import { Button } from '@/app/[lang]/admin/_components/shadcnui/button'
import LocaleLink from '@/app/[lang]/_components/LocaleLink'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, [
        'admin/dataTable',
        'admin/asset',
        'attribute',
        'common',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-assets">
                <div className="mb-4">
                    <LocaleLink href="/admin/assets/create">
                        <Button>{dict.asset.action.create}</Button>
                    </LocaleLink>
                </div>

                <AssetsDataTable />
            </div>
        </DictionaryContextProvider>
    )
}
