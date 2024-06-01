'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/shadcnui'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/Admin/shadcnui/navigation-menu'
import useDictionary from '@/utils/hooks/useDictionary'

export default function AdminHeaderMainNavigation() {
    const dict = useDictionary()

    const menu = useMemo(() => {
        return [
            {
                title: dict.admin.mainNavigation.home,
                href: '/',
            },
            {
                title: dict.admin.mainNavigation.dashboard,
                href: '/admin/dashboard',
            },
            {
                title: dict.admin.mainNavigation.marketEntities,
                href: '/admin/market-entities',
            },
            {
                title: dict.admin.mainNavigation.tools,
                href: '/admin/tools',
            },
            {
                title: dict.admin.mainNavigation.contactFormSubmissions,
                href: '/admin/contact-form-submissions',
            },
            {
                title: dict.admin.mainNavigation.users,
                href: '/admin/users',
            },
        ]
    }, [dict])

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menu.map((item, index) => (
                    <NavigationMenuItem key={index}>
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
