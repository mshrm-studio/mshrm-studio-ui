'use client'

import {
    CandlestickChart,
    DraftingCompass,
    Home,
    Mail,
    User,
} from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from '@/components/Admin/shadcnui/command'
import useKeyboardShortcut from '@/utils/hooks/useKeyboardShortcut'
import { useRouter } from 'next/navigation'
import useDictionary from '@/utils/hooks/useDictionary'
import { useMemo } from 'react'

export default function SidebarNavigation() {
    const dict = useDictionary()

    const menu = useMemo(() => {
        const iconClassName = 'mr-2 h-4 w-4'

        return [
            {
                title: dict.admin.mainNavigation.home,
                href: '/',
                icon: <Home className={iconClassName} />,
                shortcut: 'H',
            },
            {
                title: dict.admin.mainNavigation.marketEntities,
                href: '/admin/market-entities',
                icon: <CandlestickChart className={iconClassName} />,
                shortcut: 'M',
            },
            {
                title: dict.admin.mainNavigation.tools,
                href: '/admin/tools',
                icon: <DraftingCompass className={iconClassName} />,
                shortcut: 'O',
            },
            {
                title: dict.admin.mainNavigation.contactFormSubmissions,
                href: '/admin/contact-form-submissions',
                icon: <Mail className={iconClassName} />,
                shortcut: 'S',
            },
            {
                title: dict.admin.mainNavigation.users,
                href: '/admin/users',
                icon: <User className={iconClassName} />,
                shortcut: 'U',
            },
        ]
    }, [dict])

    const router = useRouter()

    function navigateTo(path: string) {
        router.push(path)
    }

    useKeyboardShortcut('S', () =>
        navigateTo('/admin/contact-form-submissions')
    )

    useKeyboardShortcut('H', () => navigateTo('/'))

    useKeyboardShortcut('M', () => navigateTo('/admin/market-entities'))

    useKeyboardShortcut('O', () => navigateTo('/admin/tools'))

    useKeyboardShortcut('U', () => navigateTo('/admin/users'))

    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder={dict.admin.sidebar.inputPlaceholder} />

            <CommandList>
                <CommandEmpty>{dict.admin.sidebar.noResults}</CommandEmpty>

                <CommandGroup heading={dict.admin.sidebar.menu}>
                    {menu.map((item, index) => (
                        <CommandItem
                            key={index}
                            onSelect={() => navigateTo(item.href)}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                            <CommandShortcut>⌘{item.shortcut}</CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
