import ThemeSwitcher from '@/components/App/Header/ThemeSwitcher'
import styles from '@/utils/styles/header/header.module.css'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/locale'
import LoginLogoutOption from '@/components/App/Header/LoginLogoutOption'
import Menu from '@/components/App/Header/Menu'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Logo from '@/components/App/Header/Logo'

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
