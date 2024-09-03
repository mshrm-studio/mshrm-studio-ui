'use client'

import { Dictionary } from '@/app/[lang]/dictionaries'
import styles from '@/styles/footer/languageSwitcher.module.css'
import useLanguage from '@/utils/hooks/useLanguage'

export default function FooterLanguageSwitcher({ dict }: { dict: Dictionary }) {
    const { changeLanguage, options } = useLanguage()

    return (
        <nav aria-label={dict.footer.languageMenu}>
            <ul className={styles.ul}>
                {options.map((option) => (
                    <li key={option.value}>
                        <button
                            className={
                                option.active
                                    ? styles.activeLocale
                                    : styles.inactiveLocale
                            }
                            disabled={option.active}
                            lang={option.value}
                            aria-label={dict.footer.selectLanguage}
                            title={dict.footer.selectLanguage}
                            onClick={() => changeLanguage(option.value)}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
