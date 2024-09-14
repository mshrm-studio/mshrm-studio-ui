import { useContext, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Locale, isLocale } from '@/utils/enums/Locale'
import LocaleContext from '@/utils/context/Locale'

const useLanguage = () => {
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
                label: 'عربي',
                value: Locale.Arabic,
            },
            {
                label: '中文',
                value: Locale.Chinese,
            },
            {
                label: 'English',
                value: Locale.English,
            },
            {
                label: 'Deutsch',
                value: Locale.German,
            },
            {
                label: '日本語',
                value: Locale.Japanese,
            },
            {
                label: 'ខ្មែរ',
                value: Locale.Khmer,
            },
            {
                label: 'Español',
                value: Locale.Spanish,
            },
            {
                label: 'Swahili',
                value: Locale.Swahili,
            },
        ].map((option) => ({
            ...option,
            active: option.value === locale,
        }))
    }, [locale])

    return { changeLanguage, options }
}

export default useLanguage
