import ThemeSwitcher from '@/components/App/Header/ThemeSwitcher'
import styles from '@/styles/header/header.module.css'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'
import LoginLogoutOption from '@/components/App/Header/LoginLogoutOption'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Logo from '@/components/App/Header/Logo'
import Menu from '@/components/App/Header/Menu'

export default async function Header({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <header className={styles.header}>
                <div className={styles.logoAndThemeSwitcher}>
                    <div className={styles.logoContainer}>
                        <Logo />
                    </div>

                    <div className={styles.themeSwitcherContainer}>
                        <ThemeSwitcher />
                    </div>
                </div>

                {/* <div className={`text-right`}>
                <LoginLogoutOption dictionary={dictionary} />
            </div> */}

                <Menu />
            </header>
        </DictionaryContextProvider>
    )
}
