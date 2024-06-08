import { useContext, useMemo } from 'react'
import DictionaryContext from '@/utils/context/Dictionary'

const useAdminNavMenu = () => {
    const dict = useContext(DictionaryContext)

    if (!dict) {
        throw new Error('No dictionary found')
    }

    const menu = useMemo(() => {
        return [
            {
                title: dict.admin.mainNavigation.home,
                href: '/',
                shortcut: 'H',
            },
            {
                title: dict.admin.mainNavigation.marketEntities,
                href: '/admin/market-entities',
                shortcut: 'M',
            },
            {
                title: dict.admin.mainNavigation.tools,
                href: '/admin/tools',
                shortcut: 'O',
            },
            {
                title: dict.admin.mainNavigation.contactFormSubmissions,
                href: '/admin/contact-form-submissions',
                shortcut: 'S',
            },
            {
                title: dict.admin.mainNavigation.users,
                href: '/admin/users',
                shortcut: 'U',
            },
        ]
    }, [dict])

    return menu
}

export default useAdminNavMenu
