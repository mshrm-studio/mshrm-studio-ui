import { Locale } from '@/utils/enums/Locale'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import User from '@/utils/dto/User'
import users from '@/utils/content/users'
import { Button } from '@/components/Admin/shadcnui/button'
import Link from 'next/link'
import UsersDataTable from '@/app/[lang]/admin/users/_components/DataTable'

async function getData(): Promise<User[]> {
    // TODO: Fetch data from your API here.

    return users
}

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

    const data = await getData()

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-users">
                <div className="mb-4">
                    <Button asChild>
                        <Link href="/admin/users/create">
                            {dict.user.action.create}
                        </Link>
                    </Button>
                </div>

                <UsersDataTable />
            </div>
        </DictionaryContextProvider>
    )
}
