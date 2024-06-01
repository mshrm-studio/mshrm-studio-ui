import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/locale'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import MainNavigation from '@/components/Admin/Header/MainNavigation'
import ThemeSwitcher from '@/components/Admin/Header/ThemeSwitcher'
import LanguageSwitcher from '@/components/Admin/Header/LanguageSwitcher'

export default async function AdminHeader({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <header className="py-4 px-6 flex items-center space-x-6 justify-between">
                <MainNavigation />

                <div className="flex items-center space-x-3">
                    <LanguageSwitcher />

                    <ThemeSwitcher />
                </div>
            </header>
        </DictionaryContextProvider>
    )
}
