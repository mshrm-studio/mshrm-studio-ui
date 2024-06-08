import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'
import AdminLayoutTouchMenu from '@/components/Admin/Layout/TouchMenu'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import AdminLayoutProfileMenu from '@/components/Admin/Layout/ProfileMenu'

export default async function AdminLayoutHeader({
    locale,
}: {
    locale: Locale
}) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                <AdminLayoutTouchMenu />

                <AdminLayoutProfileMenu />
            </header>
        </DictionaryContextProvider>
    )
}
