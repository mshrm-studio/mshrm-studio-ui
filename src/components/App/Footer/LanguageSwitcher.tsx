'use client'

import styles from '@/styles/footer/languageSwitcher.module.css'
import useLanguage from '@/utils/hooks/useLanguage'

export default function FooterLanguageSwitcher() {
    const { changeLanguage, options } = useLanguage()

    return (
        <nav aria-label="TODO (translate): Language Switcher">
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
                            aria-label={`TODO (translate): Change language`}
                            title={`TODO (translate): Change language`}
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
