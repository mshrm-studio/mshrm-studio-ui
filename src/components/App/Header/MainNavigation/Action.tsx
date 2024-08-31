'use client'

import MainNavigationItem from '@/utils/dto/MainNavigationItem'
import MainNavigationLink from '@/components/App/Header/MainNavigation/Link'

type Props = {
    item: MainNavigationItem
}

export default function HeaderMainNavigationAction({ item }: Props) {
    if (typeof item.href === 'string')
        return (
            <MainNavigationLink
                item={item as MainNavigationItem & { href: string }}
            />
        )

    return <button>{item.actionText}</button>
}
