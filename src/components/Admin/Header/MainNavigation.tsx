'use client'

import React, { useContext, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/shadcnui'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/Admin/shadcnui/navigation-menu'
import DictionaryContext from '@/utils/context/Dictionary'

export default function AdminHeaderMainNavigation() {
    const dictionary = useContext(DictionaryContext)

    if (!dictionary) {
        throw new Error('No dictionary found')
    }

    const menu = useMemo(() => {
        return [
            {
                title: dictionary.admin.header.mainNavigation.home,
                href: '/',
            },
            {
                title: dictionary.admin.header.mainNavigation.dashboard,
                href: '/admin/dashboard',
            },
            {
                title: dictionary.admin.header.mainNavigation.marketEntities,
                href: '/admin/market-entities',
            },
            {
                title: dictionary.admin.header.mainNavigation.tools,
                href: '/admin/tools',
            },
            {
                title: dictionary.admin.header.mainNavigation
                    .contactFormSubmissions,
                href: '/admin/contact-form-submissions',
            },
        ]
    }, [dictionary])

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menu.map((item) => (
                    <NavigationMenuItem>
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                {item.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>

                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
