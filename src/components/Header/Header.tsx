import ThemeSwitcher from '@/components/Header/ThemeSwitcher'
import styles from '@/utils/styles/header.module.css'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/locale'
import Link from '@/components/LocaleLink'
import LoginLogoutOption from '@/components/Header/LoginLogoutOption'

export default async function Header({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <header className={styles.header}>
            <div className={styles.column}>
                <Link href="/">M</Link>
            </div>

            <div className={`${styles.column} flex justify-center`}>
                <ThemeSwitcher />
            </div>

            <div className={`${styles.column} text-right`}>
                <LoginLogoutOption dictionary={dictionary} />
            </div>
        </header>
    )
}
