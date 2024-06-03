import DictionaryContextProvider from '@/components/Provider/Dictionary'
import SidebarNavigation from '@/components/Admin/Sidebar/Navigation'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'

export default async function AdminSidebar({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <aside>
                <SidebarNavigation />
            </aside>
        </DictionaryContextProvider>
    )
}
