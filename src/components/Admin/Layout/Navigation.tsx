'use client'

import useDictionary from '@/utils/hooks/useDictionary'
import {
    CandlestickChart,
    DraftingCompass,
    Home,
    Mail,
    User,
} from 'lucide-react'
import Link from 'next/link'
import { useContext, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import LocaleContext from '@/utils/context/Locale'

export default function AdminLayoutNavigation() {
    const dict = useDictionary()
    const locale = useContext(LocaleContext)
    const pathname = usePathname()

    const menu = useMemo(() => {
        const iconClassName = 'mr-2 h-4 w-4'

        return [
            {
                title: dict.header.mainNavigation.home,
                href: '/',
                icon: <Home className={iconClassName} />,
                shortcut: 'H',
            },
            {
                title: dict.header.mainNavigation.assets,
                href: '/admin/assets',
                icon: <CandlestickChart className={iconClassName} />,
                shortcut: 'M',
            },
            {
                title: dict.header.mainNavigation.tools,
                href: '/admin/tools',
                icon: <DraftingCompass className={iconClassName} />,
                shortcut: 'O',
            },
            {
                title: dict.header.mainNavigation.conversations,
                href: '/admin/conversations',
                icon: <Mail className={iconClassName} />,
                shortcut: 'S',
            },
            {
                title: dict.header.mainNavigation.users,
                href: '/admin/users',
                icon: <User className={iconClassName} />,
                shortcut: 'U',
            },
        ].map((item) => ({
            ...item,
            href: item.href === '/' ? `/${locale}` : `/${locale}${item.href}`,
        }))
    }, [dict, locale])

    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            {menu.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        pathname === item.href
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                    }`}
                >
                    {item.icon}
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}
