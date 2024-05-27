import ThemeSwitcher from '@/components/Header/ThemeSwitcher'
import styles from '@/utils/styles/header/header.module.css'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/locale'
import LoginLogoutOption from '@/components/Header/LoginLogoutOption'
import Menu from '@/components/Header/Menu'
import DictionaryContextProvider from '@/components/Context/DictionaryProvider'
import Logo from '@/components/Header/Logo'

export default async function Header({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <header className={styles.header}>
                <div>
                    <Logo />
                </div>

                <div className="flex items-center justify-center">
                    <ThemeSwitcher />
                </div>

                {/* <div className={`text-right`}>
                <LoginLogoutOption dictionary={dictionary} />
            </div> */}

                <div className="flex justify-end items-center">
                    <Menu />
                </div>
            </header>
        </DictionaryContextProvider>
    )
}
