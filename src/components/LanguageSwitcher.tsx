'use client'

import LocaleContext from '@/utils/context/Locale'
import { isLocale, locales } from '@/utils/enums/locale'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useContext } from 'react'

export default function LanguageSwitcher() {
    const locale = useContext(LocaleContext)
    const router = useRouter()
    const pathname = usePathname()

    const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value

        if (isLocale(newLocale)) {
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
    }

    return (
        <select defaultValue={locale} onChange={changeLanguage}>
            {locales.map((l) => (
                <option key={l} value={l}>
                    {l}
                </option>
            ))}
        </select>
    )
}
