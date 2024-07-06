import { Locale } from '@/utils/enums/Locale'
import { getDictionary } from '@/app/[lang]/dictionaries'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import User from '@/utils/dto/User'
import users from '@/utils/content/users'
import { Button } from '@/components/Admin/shadcnui/button'
import Link from 'next/link'
import UsersDataTable from '@/components/Admin/Users/DataTable'

async function getData(): Promise<User[]> {
    // TODO: Fetch data from your API here.

    return users
}

export default async function Page({
    params: { lang },
}: Readonly<{
    params: { lang: Locale }
}>) {
    const dict = await getDictionary(lang)

    const data = await getData()

    return (
        <DictionaryContextProvider dictionary={dict}>
            <div id="admin-users">
                <div className="mb-4">
                    <Button asChild>
                        <Link href="/admin/users/create">
                            {dict.admin.user.action.create}
                        </Link>
                    </Button>
                </div>

                <UsersDataTable users={data} />
            </div>
        </DictionaryContextProvider>
    )
}
