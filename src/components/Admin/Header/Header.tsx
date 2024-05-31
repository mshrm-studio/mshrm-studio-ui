import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/locale'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import MainNavigation from '@/components/Admin/Header/MainNavigation'
import ThemeSwitcher from '@/components/Admin/Header/ThemeSwitcher'

export default async function AdminHeader({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <header className="py-4 px-6 flex items-center justify-between">
                <MainNavigation />

                <ThemeSwitcher />
            </header>
        </DictionaryContextProvider>
    )
}
