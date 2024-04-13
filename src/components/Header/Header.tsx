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
            <Link href="/">M</Link>

            <ThemeSwitcher />

            <LoginLogoutOption dictionary={dictionary} />
        </header>
    )
}
