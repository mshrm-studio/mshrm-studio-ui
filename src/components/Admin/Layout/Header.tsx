import { loadDictionaries } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'
import AdminLayoutTouchMenu from '@/components/Admin/Layout/TouchMenu'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import ThemeSwitcher from '@/components/Admin/Layout/ThemeSwitcher'
import LanguageSwitcher from '@/components/Admin/Layout/LanguageSwitcher'
import AdminLayoutAuthMenu from '@/components/Admin/Layout/AuthMenu'
import AdminLayoutPageTitle from '@/components/Admin/Layout/PageTitle'

export default async function AdminLayoutHeader({
    locale,
}: {
    locale: Locale
}) {
    const dict = await loadDictionaries(locale, ['action', 'admin', 'theme'])

    return (
        <DictionaryContextProvider dictionary={dict}>
            <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                <AdminLayoutTouchMenu />

                <div className="hidden lg:block flex-1">
                    <AdminLayoutPageTitle />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />

                        <ThemeSwitcher />

                        <AdminLayoutAuthMenu />
                    </div>
                </div>
            </header>
        </DictionaryContextProvider>
    )
}
