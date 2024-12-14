import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import { Button } from '@/components/Admin/shadcnui/button'
import UsersDataTable from '@/app/[lang]/admin/users/_components/DataTable'
import LocaleLink from '@/components/LocaleLink'

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await loadDictionaries(lang, [
        'admin/dataTable',
        'admin/user',
        'attribute',
        'common',
    ])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-users">
                <div className="mb-4">
                    <Button asChild>
                        <LocaleLink href="/admin/users/create">
                            {dict.user.action.create}
                        </LocaleLink>
                    </Button>
                </div>

                <UsersDataTable />
            </div>
        </DictionaryContextProvider>
    )
}
