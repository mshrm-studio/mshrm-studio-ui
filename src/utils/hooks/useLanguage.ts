import { useContext, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Locale, isLocale } from '@/utils/enums/locale'
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
                label: '中文',
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

    return { changeLanguage, options }
}

export default useLanguage
