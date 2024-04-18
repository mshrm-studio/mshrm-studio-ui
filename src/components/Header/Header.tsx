import ThemeSwitcher from '@/components/Header/ThemeSwitcher'
import styles from '@/utils/styles/header/header.module.css'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/locale'
import Link from '@/components/LocaleLink'
import LoginLogoutOption from '@/components/Header/LoginLogoutOption'
import MobileMenu from '@/components/Header/MobileMenu'
import ProgressBar from '@/components/Header/ProgressBar'

export default async function Header({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <header className={styles.header}>
            <ProgressBar />

            <div className={styles.column}>
                <Link href="/">M</Link>
            </div>

            <div className={`${styles.column} flex justify-center`}>
                <ThemeSwitcher />
            </div>

            <div className={`${styles.column} text-right`}>
                <LoginLogoutOption dictionary={dictionary} />
            </div>

            <div className="flex justify-end">
                <MobileMenu />
            </div>
        </header>
    )
}
