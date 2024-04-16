'use client'

import { isLocale, Locale } from '@/utils/enums/locale'
import { usePathname, useRouter } from 'next/navigation'

export default function FooterLanguageSwitcher() {
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

    return (
        <ul className="grid gap-6 grid-cols-3 text-center xl:flex xl:space-x-3">
            <li>
                <button onClick={() => changeLanguage(Locale.English)}>
                    English
                </button>
            </li>

            <li>
                <button onClick={() => changeLanguage(Locale.Arabic)}>
                    عربي
                </button>
            </li>

            <li>
                <button onClick={() => changeLanguage(Locale.Spanish)}>
                    Español
                </button>
            </li>

            <li>
                <button onClick={() => changeLanguage(Locale.German)}>
                    Deutsch
                </button>
            </li>

            <li>
                <button onClick={() => changeLanguage(Locale.Chinese)}>
                    日本語
                </button>
            </li>

            <li>
                <button onClick={() => changeLanguage(Locale.Khmer)}>
                    ខ្មែរ
                </button>
            </li>
        </ul>
    )
}
