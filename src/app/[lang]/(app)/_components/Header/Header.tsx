import ThemeSwitcher from '@/app/[lang]/(app)/_components/Header/ThemeSwitcher'
import styles from '@/app/[lang]/(app)/_styles/header/header.module.css'
import { loadDictionaries } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/Locale'
import DictionaryContextProvider from '@/app/[lang]/_components/Provider/Dictionary'
import Logo from '@/app/[lang]/(app)/_components/Header/Logo'
import AuthAndMainNavigation from '@/app/[lang]/(app)/_components/Header/AuthAndMainNavigation'

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
