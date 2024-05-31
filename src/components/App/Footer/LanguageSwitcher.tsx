'use client'

import { isLocale, Locale } from '@/utils/enums/locale'
import { usePathname, useRouter } from 'next/navigation'
import styles from '@/utils/styles/footer/languageSwitcher.module.css'
import { useContext, useMemo } from 'react'
import LocaleContext from '@/utils/context/Locale'

export default function FooterLanguageSwitcher() {
    const locale = useContext(LocaleContext)
    const router = useRouter()
    const pathname = usePathname()

    const changeLanguage = (newLocale: Locale) => {
        const expiryDate = new Date()

        expiryDate.setFullYear(expiryDate.getFullYear() + 1)

        document.cookie = `mshrmLocale=${newLocale};expires=${expiryDate.toUTCString()};path=/`

        const segments = pathname.split('/')

        if (isLocale(segments[1])) {
            segments[1] = newLocale
        }

        const newPathname = segments.join('/')

        router.push(newPathname)
    }

    const options = useMemo(() => {
        return [
            {
                label: 'English',
                value: Locale.English,
            },
            {
                label: 'عربي',
                value: Locale.Arabic,
            },
            {
                label: 'Español',
                value: Locale.Spanish,
            },
            {
                label: 'Deutsch',
                value: Locale.German,
            },
            {
                label: '日本語',
                value: Locale.Chinese,
            },
            {
                label: 'ខ្មែរ',
                value: Locale.Khmer,
            },
        ].map((option) => ({
            ...option,
            active: option.value === locale,
        }))
    }, [locale])

    return (
        <ul className={styles.ul}>
            {options.map((option) => (
                <li>
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
