import ThemeSwitcher from '@/components/Header/ThemeSwitcher'
import styles from '@/utils/styles/header/header.module.css'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/utils/enums/locale'
import Link from '@/components/LocaleLink'
import LoginLogoutOption from '@/components/Header/LoginLogoutOption'
import BrandLogo from '@/components/Brand/Logo'
import Menu from '@/components/Header/Menu'
import DictionaryContextProvider from '@/components/Context/DictionaryProvider'

export default async function Header({ locale }: { locale: Locale }) {
    const dictionary = await getDictionary(locale)

    return (
        <DictionaryContextProvider dictionary={dictionary}>
            <header className={styles.header}>
                <div>
                    <Link href="/">
                        <BrandLogo className="h-[48px]" />
                    </Link>
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
