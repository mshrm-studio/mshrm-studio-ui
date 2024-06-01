'use client'

import styles from '@/utils/styles/footer/languageSwitcher.module.css'
import useLanguage from '@/utils/hooks/useLanguage'

export default function FooterLanguageSwitcher() {
    const { changeLanguage, options } = useLanguage()

    return (
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
                        onClick={() => changeLanguage(option.value)}
                    >
                        {option.label}
                    </button>
                </li>
            ))}
        </ul>
    )
}
