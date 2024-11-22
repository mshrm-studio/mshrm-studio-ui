import { useContext, useMemo } from 'react'
import LocaleContext from '@/utils/context/Locale'
import { useRouter } from 'next/navigation'

export default function useLocalisedHref(href?: string) {
    const router = useRouter()
    const locale = useContext(LocaleContext)

    const localisedHref = useMemo(() => {
        if (!href) return `/${locale}`

        return href.startsWith('/') ? `/${locale}${href}` : `/${locale}/${href}`
    }, [href])

    function redirectTo(href: string) {
        router.push(
            href.startsWith('/') ? `/${locale}${href}` : `/${locale}/${href}`
        )
    }

    return { localisedHref, redirectTo }
}
