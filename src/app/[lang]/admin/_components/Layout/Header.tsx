import { loadDictionaries } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'
import AdminLayoutTouchMenu from '@/app/[lang]/admin/_components/Layout/TouchMenu'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import ThemeSwitcher from '@/app/[lang]/admin/_components/Layout/ThemeSwitcher'
import LanguageSwitcher from '@/app/[lang]/admin/_components/Layout/LanguageSwitcher'
import AdminLayoutAuthMenu from '@/app/[lang]/admin/_components/Layout/AuthMenu'
import AdminLayoutPageTitle from '@/app/[lang]/admin/_components/Layout/PageTitle'

export default async function AdminLayoutHeader({
    locale,
}: {
    locale: Locale
}) {
    const dict = await loadDictionaries(locale, ['admin/header'])

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
