import ThemeSwitcher from '@/components/App/Header/ThemeSwitcher'
import styles from '@/styles/header/header.module.css'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'
import DictionaryContextProvider from '@/components/Provider/Dictionary'
import Logo from '@/components/App/Header/Logo'
import AuthAndMainNavigation from '@/components/App/Header/AuthAndMainNavigation'

export default async function Header({ locale }: { locale: Locale }) {
    const dictionary = await loadDictionaries(locale, ['app/header', 'common'])

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logoAndThemeSwitcher}>
                        <div className={styles.logoContainer}>
                            <Logo dict={dictionary} />
                        </div>

                        <div className={styles.themeSwitcherContainer}>
                            <ThemeSwitcher />
                        </div>
                    </div>

                    <AuthAndMainNavigation />
                </div>
            </header>
        </DictionaryContextProvider>
    )
}
